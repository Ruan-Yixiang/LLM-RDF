# class of device, reaction and data
import json
import time
import math
import os
from ftp_serve import ConnectFTP, UploadFile
import copy
import torch
from bo.transformer import transform
import xlrd


class Reaction:
    def __init__(self, reaction_number, reaction_time, condition):
        self.reaction_number = reaction_number
        self.reaction_time = reaction_time
        self.reactor_loc = []
        self.step = 'proposed'
        self.start_time = None
        self.end_time = None
        self.condition = condition
        self.reaction_time_actual = None
        self.x = None
        self.y = None
        # self.PI = None


    def update(self):
        now = time.time()
        offset_time = 1.5  # wash time after unchained execution
        if self.start_time and self.step == 'reacting':
            t = (now - self.start_time) / 60 - self.reaction_time + offset_time
            print('reaction time', t)
            if t > 0:
                self.step = 'reacted'
        if self.end_time:
            self.reaction_time_actual = (self.end_time - self.start_time) / 60


class LCPlate:
    def __init__(self):
        self.status = 'idle'  # 'idle', 'loaded'
        self.reaction = None

    def load(self, reaction):
        self.reaction = reaction

    def update(self):
        if self.reaction and self.reaction.step == 'back_transfered':
            self.reaction = None
            self.status = 'idle'
        elif self.reaction:
            self.status = 'loaded'
        elif not self.reaction:
            self.status = 'idle'


class LC:
    def __init__(self, template, local_path, remote_path, log_path, ip='192.168.1.102'):
        self.name = 'Thermo'
        self.ip = ip
        self.template = json.loads(template['analyze'])
        self.local_path = local_path
        self.remote_path = remote_path
        self.reaction = None
        self.status = 'Ready'
        self.waiting_analyze = []
        self.history_analyze = []
        self.now_analyze = []
        self.log = []
        self.log_path = log_path

    def analyze(self):
        self.now_analyze.append(self.waiting_analyze[0])
        del self.waiting_analyze[0]
        new_para = copy.deepcopy(self.template)
        new_para['Injection'][0][0] = str(self.now_analyze[0].reaction_number)
        new_para = json.dumps(new_para, indent=4)
        f = open(self.local_path, 'w+')
        f.write(new_para)
        f.close()
        f_log = open(self.log_path+'analyze_'+str(self.now_analyze[0].reaction_number)+'.json', 'w+')
        f_log.write(new_para)
        f_log.close()

    def run(self):
        if self.waiting_analyze and self.status == 'Ready' and self.now_analyze == []:
            LC.analyze(self)
        else:
            LC.skip(self)
        ftp = ConnectFTP(ip=self.ip)
        UploadFile(ftp, self.remote_path, self.local_path)

    def update(self, now_status):
        if now_status == 'Running' and self.status == 'Ready':
            if self.now_analyze:
                self.now_analyze[0].step = 'analyzeing'
                self.history_analyze.append(self.now_analyze[0])
                self.log.append([self.now_analyze[0].reaction_number, 'analyze', time.time()])
        elif now_status == 'Ready' and self.status == 'Running':
            if self.now_analyze:
                self.now_analyze[0].step = 'analyzeed'
                for i in self.log:
                    if i[0] == self.now_analyze[0].reaction_number and i[1] == 'analyze' and len(i) < 4:
                        i.append(time.time())
                del self.now_analyze[0]
        self.status = now_status

    def add_analyze(self, reaction):
        self.waiting_analyze.append(reaction)

    def skip(self):
        f = open(self.local_path, 'w')
        f.write('')
        f.close()


class LcArm:
    def __init__(self, up_local_path, up_remote_path, down_local_path, down_remote_path, ip='192.168.1.102'):
        self.name = 'HPLC_Arm'
        self.status = 'Ready'
        self.ip = ip
        # self.lc_plate = lc_plate
        self.up_local_path = up_local_path
        self.up_remote_path = up_remote_path
        self.down_local_path = down_local_path
        self.down_remote_path = down_remote_path
        self.waiting_upload = []
        self.history_upload = []
        self.now_upload = []
        self.waiting_download = []
        self.history_download = []
        self.now_download = []
        self.log = []

    def upload(self):
        self.now_upload.append(self.waiting_upload[0])
        del self.waiting_upload[0]
        new_para = '1'
        f = open(self.up_local_path, 'w')
        f.write(new_para)
        f.close()
        # self.lc_plate.loc = 'Thermo_in'

    def download(self):
        self.now_download.append(self.waiting_download[0])
        del self.waiting_download[0]
        new_para = '1'
        f = open(self.down_local_path, 'w')
        f.write(new_para)
        f.close()
        # self.lc_plate.loc = 'Thermo_out'

    def add_upload(self, reaction):
        self.waiting_upload.append(reaction)

    def add_download(self, reaction):
        self.waiting_download.append(reaction)

    def run(self):
        now = self.now_upload + self.now_download
        if self.status == 'Ready' and now == []:
            if self.waiting_upload:
                LcArm.upload(self)
            elif self.waiting_download:
                LcArm.download(self)
            else:
                LcArm.skip(self)
        else:
            LcArm.skip(self)
        ftp = ConnectFTP(ip=self.ip)
        UploadFile(ftp, self.up_remote_path, self.up_local_path)
        UploadFile(ftp, self.down_remote_path, self.down_local_path)


    def skip(self):
        f = open(self.up_local_path, 'w')
        f.write('')
        f.close()
        f1 = open(self.down_local_path, 'w')
        f1.write('')
        f1.close()

    def update(self, now_status):
        if now_status == 'Running' and self.status == 'Ready':
            if self.now_upload:
                self.now_upload[0].step = 'uploading'
                self.history_upload.append(self.now_upload[0])
                self.log.append([self.now_upload[0].reaction_number, 'upload', time.time()])
            elif self.now_download:
                self.now_download[0].step = 'downloading'
                self.history_download.append(self.now_download[0])
                self.log.append([self.now_download[0].reaction_number, 'download', time.time()])
        elif now_status == 'Ready' and self.status == 'Running':
            if self.now_upload:
                self.now_upload[0].step = 'uploaded'
                for i in self.log:
                    if i[0] == self.now_upload[0].reaction_number and i[1] == 'upload' and len(i) < 4:
                        i.append(time.time())
                del self.now_upload[0]
            elif self.now_download:
                self.now_download[0].step = 'downloaded'
                for i in self.log:
                    if i[0] == self.now_download[0].reaction_number and i[1] == 'download' and len(i) < 4:
                        i.append(time.time())
                del self.now_download[0]
        self.status = now_status


class RoboticArm:
    def __init__(self, template, local_path, remote_path, ip='192.168.1.98'):
        self.name = 'Robot1'
        self.template = template
        self.ip = ip
        self.local_path = local_path
        self.remote_path = remote_path
        self.status = 'Ready'
        self.waiting_transport = []
        self.history_transport = []
        self.now_transport = []
        self.waiting_back_transport = []
        self.now_back_transport = []
        self.history_back_transport = []
        self.log = []

    def transport(self):
        self.now_transport.append(self.waiting_transport[0])
        del self.waiting_transport[0]
        new_para = self.template['transport']
        f = open(self.local_path, 'w')
        f.write(new_para)
        f.close()

    def back_transport(self):
        self.now_back_transport.append(self.waiting_back_transport[0])
        del self.waiting_back_transport[0]
        new_para = self.template['back_transport']
        f = open(self.local_path, 'w')
        f.write(new_para)
        f.close()

    def update(self, now_status):
        if now_status == 'Ready' and self.status == 'Running':
            if self.now_transport:
                self.now_transport[0].step = 'transported'
                for i in self.log:
                    if i[0] == self.now_transport[0].reaction_number and i[1] == 'transport' and len(i) < 4:
                        i.append(time.time())
                del self.now_transport[0]
            elif self.now_back_transport:
                self.now_back_transport[0].step = 'back_transported'
                for i in self.log:
                    if i[0] == self.now_back_transport[0].reaction_number and i[1] == 'back_transport' and len(i) < 4:
                        i.append(time.time())
                del self.now_back_transport[0]
        self.status = now_status

    def add_transport(self, reaction):
        self.waiting_transport.append(reaction)

    def add_back_transport(self, reaction):
        self.waiting_back_transport.append(reaction)

    def run(self):
        now = self.now_transport + self.now_back_transport
        if self.status == 'Ready' and now == []:
            if self.waiting_transport:
                RoboticArm.transport(self)
            elif self.waiting_back_transport:
                RoboticArm.back_transport(self)
            else:
                RoboticArm.skip(self)
        else:
            RoboticArm.skip(self)
        ftp = ConnectFTP(ip=self.ip)
        UploadFile(ftp, self.remote_path, self.local_path)
        if self.now_transport:
            self.now_transport[0].step = 'transporting'
            self.history_transport.append(self.now_transport[0])
            self.log.append([self.now_transport[0].reaction_number, 'transport', time.time()])
            self.status = 'Running'
        elif self.now_back_transport:
            self.now_back_transport[0].step = 'back_transporting'
            self.history_back_transport.append(self.now_back_transport[0])
            self.log.append([self.now_back_transport[0].reaction_number, 'back_transport', time.time()])
            self.status = 'Running'
    
    def skip(self):
        f = open(self.local_path, 'w')
        f.write('')
        f.close()


class UnchainedLab:
    def __init__(self, template, local_path, remote_path, re_parameter, log_path, ip='192.168.1.77'):
        self.name = 'Unchained'
        self.local_path = local_path
        self.remote_path = remote_path
        self.template = template
        self.re_parameter = re_parameter
        self.ip = ip
        self.log_path = log_path
        self.status = 'Ready'
        self.waiting_prepare = []
        self.history_prepare = []
        self.now_prepare = []
        self.waiting_sample = []
        self.history_sample = []
        self.now_sample = []
        self.waiting_transfer = []
        self.history_transfer = []
        self.now_transfer = []
        self.waiting_back_transfer = []
        self.history_back_transfer = []
        self.now_back_transfer = []
        self.log = []

    def para_changer(self, para, reaction, if_sorce=False):
        data = copy.deepcopy(para)
        data['ProjectName'] = time.strftime('%Y%m%d%H%M%S', time.localtime())
        data['SetPrompts'] = para['SetPrompts'][0:para['SetPrompts'].rfind('_') + 1] + str(
            reaction.reactor_loc[0]) + '.xml'
        data['SetChemicalManager'] = para['SetChemicalManager'][0:para['SetChemicalManager'].rfind('_') + 1] + str(
            reaction.reactor_loc[0]) + '.xml'
        for i in data["ParaChanger"]:
            if i["recipe"]["Type"] == "LSArrayMap":
                if not if_sorce:
                    i['map']['DestinationArea'][0] = reaction.reactor_loc[1]
                    i['map']['Values'][0]['Item1'] = reaction.reactor_loc[1][0]
                    i['map']['Values'][0]['Item2'] = reaction.reactor_loc[1][1]
                else:
                    i['map']['SourceArea'][0] = reaction.reactor_loc[1]
        return data

    def prepare(self):
        self.now_prepare.append(self.waiting_prepare[0])
        del self.waiting_prepare[0]
        template = copy.deepcopy(json.loads(self.template['synthesis']))
        new_para = self.re_parameter(template, self.now_prepare[0])
        new_para = self.para_changer(new_para, self.now_prepare[0])
        new_para = json.dumps(new_para, indent=4)
        f = open(self.local_path, 'w+')
        f.write(new_para)
        f.close()
        f_log = open(self.log_path+'prepare_'+str(self.now_prepare[0].reaction_number)+'.json', 'w+')
        f_log.write(new_para)
        f_log.close()

    def sample(self):
        self.now_sample.append(self.waiting_sample[0])
        del self.waiting_sample[0]
        template = copy.deepcopy(json.loads(self.template['workup']))
        new_para = self.para_changer(template, self.now_sample[0])
        new_para = json.dumps(new_para, indent=4)
        f = open(self.local_path, 'w+')
        f.write(new_para)
        f.close()
        f_log = open(self.log_path+'sample_'+str(self.now_sample[0].reaction_number)+'.json', 'w+')
        f_log.write(new_para)
        f_log.close()

    def transfer(self):
        self.now_transfer.append(self.waiting_transfer[0])
        del self.waiting_transfer[0]
        template = copy.deepcopy(json.loads(self.template['transfer']))
        new_para = self.para_changer(template, self.now_transfer[0], if_sorce=True)
        new_para = json.dumps(new_para, indent=4)
        f = open(self.local_path, 'w+')
        f.write(new_para)
        f.close()
        f_log = open(self.log_path+'transfer_'+str(self.now_transfer[0].reaction_number)+'.json', 'w+')
        f_log.write(new_para)
        f_log.close()

    def back_transfer(self):
        self.now_back_transfer.append(self.waiting_back_transfer[0])
        del self.waiting_back_transfer[0]
        template = copy.deepcopy(json.loads(self.template['back_transfer']))
        new_para = self.para_changer(template, self.now_back_transfer[0])
        new_para = json.dumps(new_para, indent=4)
        f = open(self.local_path, 'w+')
        f.write(new_para)
        f.close()
        f_log = open(self.log_path+'back_transfer_'+str(self.now_back_transfer[0].reaction_number)+'.json', 'w+')
        f_log.write(new_para)
        f_log.close()

    def add_prepare(self, reaction):
        self.waiting_prepare.append(reaction)

    def add_sample(self, reaction):
        self.waiting_sample.append(reaction)

    def add_transfer(self, reaction):
        self.waiting_transfer.append(reaction)

    def add_back_transfer(self, reaction):
        self.waiting_back_transfer.append(reaction)

    def run(self):
        now = self.now_prepare + self.now_transfer + self.now_back_transfer + self.now_sample
        if self.status == 'Ready' and now == []:
            if self.waiting_transfer:
                UnchainedLab.transfer(self)
            elif self.waiting_sample:
                UnchainedLab.sample(self)
            elif self.waiting_prepare:
                UnchainedLab.prepare(self)
            elif self.waiting_back_transfer:
                UnchainedLab.back_transfer(self)
            else:
                UnchainedLab.skip(self)
        else:
            UnchainedLab.skip(self)
        ftp = ConnectFTP(ip=self.ip)
        UploadFile(ftp, self.remote_path, self.local_path)

    def update(self, now_status, lc_plate):
        if now_status == 'Running' and self.status == 'Ready':
            if self.now_prepare:
                self.now_prepare[0].step = 'prepareing'
                self.history_prepare.append(self.now_prepare[0])
                self.log.append([self.now_prepare[0].reaction_number, 'prepare', time.time()])
            elif self.now_sample:
                self.now_sample[0].step = 'sampleing'
                self.history_sample.append(self.now_sample[0])
                self.log.append([self.now_sample[0].reaction_number, 'sample', time.time()])
            elif self.now_transfer:
                lc_plate.load(self.now_transfer[0])
                self.now_transfer[0].step = 'transfering'
                self.history_transfer.append(self.now_transfer[0])
                self.log.append([self.now_transfer[0].reaction_number, 'transfer', time.time()])
            elif self.now_back_transfer:
                self.now_back_transfer[0].step = 'back_transfering'
                self.history_back_transfer.append(self.now_back_transfer[0])
                self.log.append([self.now_back_transfer[0].reaction_number, 'back_transfer', time.time()])
        elif now_status == 'Ready' and self.status == 'Running':
            if self.now_prepare:
                self.now_prepare[0].step = 'prepareed'
                for i in self.log:
                    if i[0] == self.now_prepare[0].reaction_number and i[1] == 'prepare' and len(i) < 4:
                        i.append(time.time())
                del self.now_prepare[0]
            elif self.now_sample:
                self.now_sample[0].step = 'sampleed'
                self.now_sample[0].end_time = time.time()
                for i in self.log:
                    if i[0] == self.now_sample[0].reaction_number and i[1] == 'sample' and len(i) < 4:
                        i.append(time.time())
                del self.now_sample[0]
            elif self.now_transfer:
                self.now_transfer[0].step = 'transfered'
                for i in self.log:
                    if i[0] == self.now_transfer[0].reaction_number and i[1] == 'transfer' and len(i) < 4:
                        i.append(time.time())
                del self.now_transfer[0]
            elif self.now_back_transfer:
                self.now_back_transfer[0].step = 'back_transfered'
                for i in self.log:
                    if i[0] == self.now_back_transfer[0].reaction_number and i[1] == 'back_transfer' and len(i) < 4:
                        i.append(time.time())
                del self.now_back_transfer[0]
        self.status = now_status

    def skip(self):
        f = open(self.local_path, 'w')
        f.write('')
        f.close()


class Plate:
    def __init__(self, plate_number, row, column, flow):
        self.plate_number = plate_number
        self.row = row
        self.column = column
        self.n_used = 0
        self.status = 'idle'  # reacting, idle, assigned, exhausted
        self.waiting = []
        self.history = []
        self.now = []
        self.flow = flow

    def add_task(self, reaction):
        self.waiting.append(reaction)
        self.n_used = self.n_used + 1
        reaction.reactor_loc.append(self.plate_number)
        if self.n_used % self.column != 0:
            reaction.reactor_loc.append([math.ceil(self.n_used / self.column), self.n_used % self.column])
        else:
            reaction.reactor_loc.append([math.ceil(self.n_used / self.column), self.column])
        self.status = 'assigned'

    def update(self):
        final_status = list(self.flow.values())[-1][1] + 'ed'
        status_list = [i[1] for i in self.flow.values()]
        before_react = status_list[status_list.index('react')-1]
        if self.now and self.now[0].step == before_react + 'ed':
            self.now[0].step = 'reacting'
            self.now[0].start_time = time.time()
        elif self.waiting and self.waiting[0].step == status_list[0] + 'ing':
            self.status = 'reacting'
            self.now.append(self.waiting[0])
            self.history.append(self.waiting[0])
            del self.waiting[0]
        elif self.now and self.now[0].step == final_status and self.now[0].y:
            del self.now[0]
            self.status = 'idle'
        if self.n_used >= self.row * self.column:
            self.status = 'exhausted'


class Timer:
    def __init__(self):
        self.opt_time = 0
        self.last_time = time.time()

    def update(self, reboot):
        current_time = time.time()
        if not reboot:
            self.opt_time += (time.time() - self.last_time)
        self.last_time = current_time


class Data:
    def __init__(self, init_x):
        self.train_x = None
        self.train_y = None
        self.all_x = init_x
        self.num = 0
        self.current_optima = None

    def update_data(self, reaction, space, max_time, n_break):
        if self.train_y is not None:
            self.current_optima = torch.max(self.train_y)
        n_data = 0
        dim_x = 0
        dim_y = 0
        for i in reaction.values():
            if i.y:
                n_data += 1
                condition = copy.deepcopy(i.condition)
                if i.reaction_time_actual <= max_time:
                    condition['time'] = i.reaction_time_actual
                else:
                    condition['time'] = max_time
                i.x = torch.tensor(transform([list(condition.values())], space))
                dim_x = i.x.size()[1]
                dim_y = i.y.size()[1]
        if n_data and dim_x and dim_y:
            self.train_x = torch.ones((n_data, dim_x))
            self.train_y = torch.ones((n_data, dim_y))
        n_new = 0
        for i in reaction.values():
            if i.y:
                self.train_x[n_new] = i.x
                self.train_y[n_new] = i.y
                n_new += 1
                if self.current_optima:
                    if i.y > self.current_optima:
                        n_break = 0
        self.num = n_data
        return n_break


class Results:
    def __init__(self, store_path):
        self.store_path = store_path
        # self.file_list = os.listdir(self.store_path)

    def update(self):
        file_list = os.listdir(self.store_path)
        new_file_list = []
        for i in file_list:
            if 'read' not in i:
                new_file_list.append(self.store_path + '\\' + i)
        return new_file_list
