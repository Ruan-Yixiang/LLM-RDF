import pickle
from typing import Dict
import time
from skopt.utils import normalize_dimensions
from skopt.space import Real, Categorical, Space
import math
from device import LC, UnchainedLab, Reaction, RoboticArm, Plate, Results, LcArm, Data, Timer, LCPlate
from process import reaction_update, format_data
import torch
from bo.transformer import transform
from skopt.sampler import Lhs
import copy
import os
import json


class BoProject:
    def __init__(self, front_data: Dict):
        self.front_data = front_data
        self.name = self.front_data['name']
        self.smarts = self.front_data['smarts']
        self.nlp_procedure = self.front_data['nlp']
        self.gpt_res = self.front_data['gptRes']
        self.time = self.front_data['time']
        self.space_data = self.front_data['space']
        self.step_data = self.front_data['step']
        self.algorithm_para = self.front_data['algorithm']
        self.analysis_data = self.front_data['analysis']
        self.pipeline_data = self.front_data['flowChat']
        self.thermo_local_path = 'D:\\device_para\\thermo.json'
        self.thermo_remote_path = 'thermo.json'
        self.Robot1_local_path = 'D:\\device_para\\Robot1.json'
        self.Robot1_remote_path = 'Robot1.json'
        self.Unchained_local_path = 'D:\\device_para\\unchained.json'
        self.Unchained_remote_path = 'unchained.json'
        self.HPLC_Arm_up_local_path = 'D:\\device_para\\HPLC_Arm_up.json'
        self.HPLC_Arm_up_remote_path = 'HPLC_Arm_up.json'
        self.HPLC_Arm_down_local_path = 'D:\\device_para\\HPLC_Arm_down.json'
        self.HPLC_Arm_down_remote_path = 'HPLC_Arm_down.json'
        self.status = 'non-execution'
        self.id = self.get_id()
        self.create_time = time.strftime('%Y-%m-%d-%H-%M', time.localtime())
        self.log_path = self.create_log_path(self.id)
        self.max_vol = self.max_vol(self.step_data, self.space_data)
        self.max_time = self.space_data['time']['range'][1]
        self.space, self.space_data = self.data2space(self.space_data)
        self.pipeline, self.template = self.handle_pipeline(self.pipeline_data)
        self.source, _ = self.coordinate(self.step_data, self.space_data)
        self.equipment_dict = self.load_equipment(self.template)
        self.res = self.create_res(self.template)
        self.lc_plate = LCPlate()
        self.plate_list = [Plate(i+1, 4, 6, self.pipeline['flow']) for i in range(self.algorithm_para['reactor_num'])]
        self.timer = Timer()
        self.reaction_dict, self.data = self.data_init(self.space, self.algorithm_para, self.space_data)
        self.n_break = 0
        self.qpi = []
        self.log = copy.deepcopy([{'equipment': self.equipment_dict, 'reaction': self.reaction_dict,
                                   'plate_list': self.plate_list, 'lc_plate': self.lc_plate,
                                   'res': self.res, 'data': self.data, 'n_break': self.n_break,
                                   'reboot': True, 'timer': self.timer, 'qpi': self.qpi}])




    def create_log_path(self, id):
        log_path = 'D:\\CentralControl\\log\\' + str(id)
        if not os.path.exists(log_path):
            os.mkdir(log_path)
        log_path = log_path + '\\'
        return log_path

    def create_res(self, template):
        ftp_path = 'D:\\FTP\\'
        project_name = json.loads(template['Thermo']['analyze'])['ProjectName']
        user = json.loads(template['Thermo']['analyze'])['User']
        if not os.path.exists(ftp_path + user):
            os.mkdir(ftp_path + user)
        res_path = ftp_path + user + '\\' + project_name
        if not os.path.exists(res_path):
            os.mkdir(res_path)
        res = Results(res_path)
        return res

    def unchained_reparamter(self, para, reaction):
        data = copy.deepcopy(para)
        vol = 0
        for i in data["ParaChanger"]:
            if i["tags"] == "SyringePump,ExtSingleTip" and i['map']['Name'] != 'solvent':
                try:
                    vol += i['map']['Values'][0]['Item3']
                except:
                    pass
            if i['map']['Values'][0]['Item3'] in reaction.condition.keys():
                vol += reaction.condition[i['map']['Values'][0]['Item3']]
                for j in i['map']['Values']:
                    j['Item3'] = reaction.condition[j['Item3']]
            if 'reagent' in i['map'].keys():
                if i['map']['reagent'] in reaction.condition.keys():
                    i['map']['SourceArea'] = self.source[reaction.condition[i['map']['reagent']]]
                else:
                    i['map']['SourceArea'] = self.source[i['map']['reagent']]
                del i['map']['reagent']

            if i['map']['Name'] == 'solvent' and i["recipe"]["Type"] == "LSArrayMap":
                for j in i['map']['Values']:
                    # j['Item3'] = round(self.max_vol - vol, 3)
                    j['Item3'] = round(self.max_vol - vol + 0.25, 3)
        return data

    def get_id(self):
        with open('D:/CentralControl/project/id.txt', 'r', encoding='utf-8') as f:
            id = int(f.read())
        with open('D:/CentralControl/project/id.txt', 'w', encoding='utf-8') as f:
            f.write(str(id + 1))
        return id

    def max_vol(self, step, space):
        max_vol = 0
        for i in step.values():
            if i['tag'] == 'SyringePump,ExtSingleTip':
                if type(i['num']) != str:
                    max_vol += i['num']
                else:
                    max_vol += space[i['num']]['range'][1]
        return max_vol

    def load_equipment(self, template):
        Thermo = LC(template['Thermo'], self.thermo_local_path, self.thermo_remote_path, self.log_path)
        Robot1 = RoboticArm(template['Robot1'], self.Robot1_local_path, self.Robot1_remote_path)
        Unchained = UnchainedLab(template['Unchained'], self.Unchained_local_path, self.Unchained_remote_path,
                                 self.unchained_reparamter, self.log_path)
        HPLC_Arm = LcArm(self.HPLC_Arm_up_local_path, self.HPLC_Arm_up_remote_path,
                         self.HPLC_Arm_down_local_path, self.HPLC_Arm_down_remote_path)
        equipment_dict = {'Thermo': Thermo, 'Unchained': Unchained, 'Robot1': Robot1, 'HPLC_Arm': HPLC_Arm}
        return equipment_dict

    def data_init(self, space, algorithm_para, space_data):
        if algorithm_para['init_method'] == 'LHS':
            lhs = Lhs(lhs_type="centered", criterion=None)
            origin_con_x = lhs.generate(space.dimensions, algorithm_para['init_num'], random_state=30)
        elif algorithm_para['init_method'] == 'Random':
            origin_con_x = space.rvs(n_samples=algorithm_para['init_num'], random_state=30)
        # origin_con_x = [[75, 0.17, 'CuBr2', 'DBU'], [75, 0.17, 'CuBr2', 'DBU'], [75, 0.17, 'CuBr2', 'DBU']]
        n = int(algorithm_para['init_num'] / algorithm_para['reactor_num'])
        time_index = list(space_data.keys()).index('time')
        sorted_con_x = sorted(origin_con_x, key=lambda x: x[time_index], reverse=False)
        list_con_x = [sorted_con_x[i::n] for i in range(n)]
        con_x = [item for sublist in list_con_x for item in sublist]
        con_x = format_data(con_x, space_data)
        reaction_dict = {}
        reaction_dict = reaction_update(reaction_dict, con_x, space)
        init_x = torch.ones((len(con_x), reaction_dict[0].x.size()[1]))
        for i, j in enumerate(con_x):
            init_x[i] = torch.tensor(transform([list(j.values())], space))
        data = Data(init_x)
        return reaction_dict, data

    def save_instance(self):
        filename = 'D:/CentralControl/project/' + str(self.id) + '_' + self.name + '.pkl'
        with open(filename, 'wb') as f:
            pickle.dump(self, f)

    def data2space(self, space_info):
        space_data = {}
        para = []
        for i, j in space_info.items():
            if j['type'] == 'continuous':
                para.append(Real(j['range'][0], j['range'][1], name=i))
                space_data[i] = j
        for i, j in space_info.items():
            if j['type'] == 'categorical':
                para.append(Categorical(j['range'], name=i))
                space_data[i] = j
        space = Space(normalize_dimensions(para))
        return space, space_data

    def handle_pipeline(self, pipeline_data):
        pipeline = {'flow': {}, 'prior': []}
        template = {}
        source = []
        target = []
        for j in pipeline_data['edges']:
            source.append(j['source'])
            target.append(j['target'])
        seq_node = [list(set(source + target) - set(target))[0]]
        for i in pipeline_data['edges']:
            if seq_node[-1] == i['source']:
                seq_node.append(i['target'])
        seq = []
        for i in seq_node:
            for j in pipeline_data['nodes']:
                if i == j['id']:
                    seq.append(j)
        flow_list = []
        for j, i in enumerate(seq):
            data_config = i["labelCfg"]['dataConfig' + i['label']]
            template[i["label"]] = {}
            action = [i["label"], data_config['operation']]
            try:
                action.append(data_config['priority'])
            except:
                pass
            if ' ' in action[1]:
                action[1] = action[1].replace(' ', '_')
            if action[1] == 'synthesis':
                action[1] = 'prepare'
            elif action[1] == 'workup':
                action[1] = 'sample'
            flow_list.append(action)
            if action[1] == 'prepare':
                flow_list.append(['', 'react'])
            elif action[0] == 'Thermo':
                flow_list.insert(j+1, ["HPLC_Arm", "upload"])
                flow_list.append(["HPLC_Arm", "download"])
        flow_dict = {}
        for j, i in enumerate(flow_list):
            flow_dict[str(j)] = i
        for k in range(len(flow_dict)):
            for i, j in flow_dict.items():
                try:
                    if j[2] == k+1:
                        pipeline['prior'].append(i)
                except:
                    pass
        for i, j in flow_dict.items():
            flow_dict[i] = j[0: 2]
        pipeline['flow'] = flow_dict
        for i in seq:
            data_config = i["labelCfg"]['dataConfig' + i['label']]
            template[i["label"]][data_config['operation'].replace(' ', '_')] = data_config['para']
        return pipeline, template

    def coordinate(self, step, space, column=4):
        def loc(num, column):
            num += 1
            if num % column != 0:
                loc = [math.ceil(num / column), num % column]
            else:
                loc = [math.ceil(num / column), column]
            return loc, num
        liquid = 0
        powder = 0
        source_liquid = {}
        source_powder = {}
        for i, j in step.items():
            try:
                if j['tag'] == 'SyringePump,ExtSingleTip':
                    if j['name'] in space.keys():
                        for k in space[j['name']]['range']:
                            location, num = loc(liquid, column)
                            source_liquid[k] = [location]
                            liquid = num
                    else:
                        location, num = loc(liquid, column)
                        source_liquid[j['name']] = [location]
                        liquid = num
                elif j['tag'] == 'Powder':
                    if j['name'] in space.keys():
                        for k in space[j['name']]['range']:
                            location, num = loc(powder, column)
                            source_powder[k] = [location]
                            powder = num
                    else:
                        location, num = loc(powder, column)
                        source_powder[j['name']] = [location]
                        powder = num
            except:
                pass
        return source_liquid, source_powder

