import os
import xlrd
from device import Reaction
from bo.transformer import transform, i_transform
import torch

import random


# update obj to reaction instance
def res2obj(data, reaction, obj):
    for i in data:
        workbook = xlrd.open_workbook(i)
        sheet = workbook.sheet_by_name('Integration')
        product_row_index = None
        for row_index in range(sheet.nrows):
            if sheet.cell_value(row_index, 1) == 'Product':
                product_row_index = row_index
                break
        num_row_index = None
        for row_index in range(sheet.nrows):
            if sheet.cell_value(row_index, 0) == 'Integration Results':
                num_row_index = row_index + 1
                break
        obj_column_index = None
        for col_index in range(sheet.ncols):
            if sheet.cell_value(num_row_index, col_index).strip() == obj:
                obj_column_index = col_index
                break
        value = sheet.cell_value(product_row_index, obj_column_index)
        # value = random.random()  # 从workbook取值
        if value == 'n.a.':
            value = 0
        value = torch.tensor([[value]])
        injection_name_row = None
        injection_name = None
        for row_index in range(sheet.nrows):
            if sheet.cell_value(row_index, 0) == 'Injection Name:':
                injection_name_row = row_index
                break

        if injection_name_row is not None:
            injection_name = sheet.cell_value(injection_name_row, 2)
        os.rename(i, i[:i.rfind('.')] + '_read.' + i.split('.')[-1])
        reaction[int(injection_name)].y = value
    return reaction

# add new reactions' data to reaction dict
def reaction_add(pipeline, reaction_dict, equipment_dict, plate_list, lc_plate):
    line = pipeline['flow']
    prior = pipeline['prior']
    for i, j in equipment_dict.items():
        exec(i + '=j')
    step = [i[1] for i in list(line.values())]
    reaction_step = {}
    for i in step:
        reaction_step[i] = []
    for i in reaction_dict.values():
        if i.step == 'proposed':
            list(reaction_step.values())[0].append(i)
        for k, j in enumerate(step):
            if i.step == j + 'ed' and k < len(step) - 1:
                list(reaction_step.values())[k + 1].append(i)
    print('step', reaction_step)
    for j, i in enumerate(reaction_step['prepare']):
        plate_exist_number = []
        plate_idle = []
        for plate in plate_list:
            if plate.status == 'idle':
                plate_idle.append(plate)
        for num in range(1, len(plate_idle)):
            for index in range(0, len(plate_idle) - num):
                if plate_idle[index].n_used > plate_idle[index + 1].n_used:
                    plate_idle[index], plate_idle[index + 1] = plate_idle[index + 1], plate_idle[index]
        for k in plate_list:
            for m in k.now:
                plate_exist_number.append(m.reaction_number)
            for m in k.waiting:
                plate_exist_number.append(m.reaction_number)
            for m in k.history:
                plate_exist_number.append(m.reaction_number)
        if i.reaction_number not in plate_exist_number and len(plate_idle) != 0:
            plate_idle[0].add_task(i)
    for j in line.values():
        if j[0] != '':
            exist_number = []
            instr = equipment_dict[j[0]].name
            instr_step = j[1]
            for k in ['waiting', 'now', 'history']:
                exec('for m in ' + instr + '.' + k + '_' + instr_step + ': exist_number.append(m.reaction_number)')
            for i in reaction_step[instr_step]:
                if i.reaction_number not in exist_number and i.reactor_loc:
                    exec(instr + '.add_' + instr_step + '(i)')
    for i, j in enumerate(reversed(prior)):
        # num_prior = 0
        for k in prior[0:len(prior) - i - 1]:
            exec('if ' + line[k][0] + '.waiting' + '_' + line[k][1] + ' != []:' + line[j][0] + '.waiting' + '_' +
                 line[j][1] + '=[]')
    if lc_plate.status != 'idle':
        exec('Unchained.waiting_transfer = []')
    return reaction_dict, equipment_dict, plate_list

# transfer reaction conditions data to formatted data
def format_data(original_data, keys_info, decimal_places=3):
    formatted_data = []
    for item in original_data:
        formatted_item = {}
        for index, key in enumerate(keys_info.keys()):
            try:
                formatted_item[key] = round(item[index], decimal_places)
            except:
                formatted_item[key] = item[index]
        formatted_data.append(formatted_item)
    return formatted_data

# update the reaction dict
def reaction_update(reaction_dict, con_x, space):
    n_reaction = len(reaction_dict)
    for i, j in enumerate(con_x):
        reaction_dict[i + n_reaction] = Reaction(i + n_reaction, j['time'], j)
        reaction_dict[i + n_reaction].x = torch.tensor(transform([list(j.values())], space))
    return reaction_dict


def candidate_verify(candidate, qpi, EI, reaction, data, n_break, q, pi_min, if_pi,
                     space, space_data, n_min, least_dist=1e-3):
    time_index = list(space_data.keys()).index('time')
    first_column = candidate[:, time_index]
    sorted_indices = torch.argsort(first_column)
    candidate = candidate[sorted_indices]
    # Remove the similar conditions (to previous condition) in the candidates
    # add n_break
    similar_delete_all = []
    dist_delete = []
    similar_delete = []
    num_add = 0
    print('qpi', qpi)
    for i, j in enumerate(candidate):
        for k in data.all_x:
            if torch.dist(j, k, p=2) < least_dist:
                dist_delete.append(i)
                similar_delete_all.append(i)
        for o in data.train_x:
            if torch.dist(j, o, p=2) < least_dist:
                n_break += 1
                similar_delete.append(i)

    # Remove the similar conditions (to other candidates) in the candidates

    tep_x = list(range(q))
    for j, i in enumerate(candidate):
        tep_x.remove(j)
        if not tep_x:
            break
        for k in torch.index_select(candidate, 0, torch.tensor(tep_x)):
            if torch.dist(i, k, p=2) < least_dist and EI(i.unsqueeze(0)) <= EI(k.unsqueeze(0)):
                dist_delete.append(j)

    # PI stopping criterion, add n_break
    for i, j in enumerate(qpi):
        if j < pi_min and i not in similar_delete and len(reaction) > n_min:
            n_break += 1
            if if_pi:
                dist_delete.append(i)  # PI discarding mechanism, Remove unpromising candidates

    for i, j in enumerate(qpi):
        if i not in dist_delete and num_add < q:
            new_con = [i_transform(candidate, space)[i]]
            data.all_x = torch.vstack([data.all_x, candidate[i]])
            new_con = format_data(new_con, space_data)
            reaction = reaction_update(reaction, new_con, space)
            num_add += 1
    return num_add, reaction, n_break

# calculate number of compelte reaction
def calc_complete(reaction, pipeline):
    n_complete = 0
    for i in reaction.values():
        if i.y and i.step == list(pipeline.values())[-1][1] + 'ed':
            n_complete += 1
    return n_complete
