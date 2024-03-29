from fastapi import APIRouter
from pydantic import BaseModel
import glob
import os
import pickle
import copy
from typing import Dict, Any, List
import time
import shutil

router = APIRouter()


def get_data(f):
    log = f.log[-1]
    project_info = {
        "projectname": 'No.' + str(f.id) + '\t' + f.name + '(' + f.algorithm_para['schedule'] + ')' + '\t' + f.status,
        "time": round(log['timer'].opt_time / 60, 2)
    }
    obj = f.front_data['objective']['objective'][0]
    equipment = log['equipment']
    device_status = []
    for k, j in equipment.items():
        status = []
        attribute = dir(j)
        status.append(j.name)
        status.append(j.status)
        reaction_log = []
        for m in attribute:
            if 'now' in m:
                exec('if j.' + m + ': reaction_log += [m[4:]] + [l.reaction_number for l in j.' + m + ']')
        status.append(reaction_log)
        device_status.append(status)
    reaction = log['reaction']
    flow = [i[1] for i in f.pipeline['flow'].values()]
    reaction_status = []
    reaction_info = []
    res_chart = {obj: []}
    for i in reaction.values():
        info_dict = copy.deepcopy(i.condition)
        if i.reaction_time_actual:
            info_dict["ActualTime"] = round(i.reaction_time_actual, 3)
        else:
            info_dict["ActualTime"] = i.reaction_time_actual
        if i.y:
            info_dict[obj] = round(i.y.item(), 3)
            res_chart[obj].append(i.y.item())
        else:
            info_dict[obj] = i.y
            res_chart[obj].append(i.y)
        status_dict = {}
        status_code = 0
        if i.step == "proposed":
            for j in flow:
                status_dict[j] = 2
        elif "ed" in i.step:
            for j in flow:
                if i.step[0:-2] == j:
                    status_dict[j] = status_code
                    status_code += 2
                else:
                    status_dict[j] = status_code
        elif "ing" in i.step:
            for j in flow:
                if i.step[0:-3] == j:
                    status_code += 1
                    status_dict[j] = status_code
                    status_code += 1
                else:
                    status_dict[j] = status_code
        status_dict['synthesis'] = status_dict['prepare']
        status_dict['workup'] = status_dict['sample']
        status_dict.pop('prepare')
        status_dict.pop('sample')
        reaction_status.append(status_dict)
        reaction_info.append(info_dict)
    plate_list = log["plate_list"]
    plate_info = []
    for plate in plate_list:
        reaction_loc = [[None for _ in range(plate.column)] for _ in range(plate.row)]
        for i, val in enumerate(plate.history):
            reaction_loc[i // plate.column][i % plate.column] = val.reaction_number

        result = {
            "name": "reactor " + str(plate.plate_number),
            "nrows": plate.row,
            "ncolums": plate.column,
            "reaction": reaction_loc
        }
        plate_info.append(result)
    qpi = copy.deepcopy(log['qpi'])
    qpi = [1e-5 if x < 1e-5 else x.item() for x in qpi]
    pi_chart = {'PI': qpi, 'pi_threshold': f.algorithm_para['pi_threshold']}
    n_break = log['n_break']
    n_reaction = len(reaction)
    filtered_reaction = {key: value for key, value in reaction.items() if value.y is not None}
    if filtered_reaction:
        optimum = max(filtered_reaction, key=lambda key: filtered_reaction[key].y)
        optimum = str(optimum)
    else:
        optimum = None
    res_table = {"Current Optimum": optimum, "Number of Experiments": n_reaction,
                 "Number of Termination": n_break}

    return project_info, device_status, reaction_status, reaction_info, plate_info, res_chart, pi_chart, res_table


class IdData(BaseModel):
    id: Any


@router.post("/load")
async def load(data: IdData):
    id_data = str(data.id)
    pkl_files = glob.glob(os.path.join('D:\\CentralControl\\project', "*.pkl"))
    for i in pkl_files:
        if i.split("\\")[-1].split("_")[0] == id_data:
            with open(i, "rb") as file:
                f = pickle.load(file)
                project_info, device_status, reaction_status, reaction_info, plate_info, res_chart, pi_chart, res_table \
                    = get_data(f)
    return {"project_info": project_info, "device_status": device_status, 'reaction_status': reaction_status,
            'reaction_info': reaction_info, 'plate_info': plate_info, 'res_chart': res_chart, 'pi_chart': pi_chart,
            'res_table': res_table}


@router.post("/reset")
async def reboot(data: IdData):
    project_id = str(data.id)
    backup_path = 'D:\\CentralControl\\project\\backup\\'
    pkl_files = glob.glob(os.path.join('D:\\CentralControl\\project', "*.pkl"))
    for i in pkl_files:
        if i.split("\\")[-1].split("_")[0] == project_id:
            shutil.copyfile(i,
                            backup_path + project_id + '_' + time.strftime('%Y%m%d%H%M%S', time.localtime()) + '.pkl')
            with open(i, "rb") as file:
                bo = pickle.load(file)
                first_operation = bo.pipeline['flow']['0']
                for k in reversed(bo.log):
                    log = copy.deepcopy(k)
                    reaction = log['reaction']
                    plate_list = log['plate_list']
                    para = bo.algorithm_para
                    num_add = 0
                    n_idle = 0
                    for j in reaction.values():
                        if j.step == 'proposed':
                            num_add += 1
                    for j in plate_list:
                        if j.status == 'idle':
                            n_idle += 1
                    print(num_add, para['reactor_num'], n_idle)
                    if num_add == para['reactor_num'] == n_idle or (num_add == para['init_num']):
                        k['reboot'] = True
                        exec("k['equipment'][first_operation[0]].now_" + first_operation[1] + " = []")
                        exec("k['equipment'][first_operation[0]].waiting_" + first_operation[1] + " = []")
                        bo.log = bo.log[:bo.log.index(k) + 1]
                        bo.status = 'rebooted'
                        f = open(i, 'wb+')
                        pickle.dump(bo, f)
                        f.close()
                        break
