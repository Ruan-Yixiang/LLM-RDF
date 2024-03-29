import os
import pickle
import glob
import copy
import time
import shutil



# reboot for SR mode
def reboot(project_id):
    project_id = str(project_id)
    backup_path = 'D:\\CentralControl\\project\\backup\\'
    pkl_files = glob.glob(os.path.join('D:\\CentralControl\\project', "*.pkl"))
    for i in pkl_files:
        if i.split("\\")[-1].split("_")[0] == project_id:
            shutil.copyfile(i, backup_path+project_id+'_'+time.strftime('%Y%m%d%H%M%S', time.localtime())+'.pkl')
            with open(i, "rb") as file:
                bo = copy.deepcopy(pickle.load(file))
                log = bo.log[-1]
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
                if num_add == para['reactor_number'] == n_idle:
                    print(i)
                    for j in reaction.values():
                        if j.step == 'proposed':
                            print(j.reaction_number)
                    log['reboot'] = True
                    bo.log[-1] = log
                    f = open(i, 'wb+')
                    pickle.dump(bo, f)
                    f.close()
                    break

