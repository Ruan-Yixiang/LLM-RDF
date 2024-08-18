from fastapi import FastAPI
import uvicorn
import warnings
import pickle
import copy
from process import reaction_add, res2obj, candidate_verify, calc_complete
import glob
from instr_state import get_state
from bo.Bayesian_Optimization import Bo
import os

# Suppress warnings
warnings.filterwarnings('ignore')

# Initialize FastAPI app
app = FastAPI()

@app.get('/gen_command')
def gen_command(project_id: str):
    """
    Generates commands for running a project based on the given project ID.

    Parameters:
    - project_id (str): The ID of the project.

    Returns:
    - break_indicate (int): Indicates whether to continue (200) or stop (500) the project.
    """
    # Get current state of the instruments
    state = get_state()

    # Find the project file based on the project ID
    pkl_files = glob.glob(os.path.join('D:\\CentralControl\\project', "*.pkl"))
    project_path = None
    for i in pkl_files:
        if i.split("\\")[-1].split("_")[0] == project_id:
            project_path = i
            break

    # Load the project from the file
    with open(project_path, 'rb+') as file:
        project = pickle.loads(file.read())

    # Copy the last log entry of the project
    log = copy.deepcopy(project.log[-1])

    # Initialize variables
    n_min = 18
    equipment = log['equipment']
    reaction = log['reaction']
    plate_list = log['plate_list']
    para = project.algorithm_para
    res = log['res']
    space = project.space
    pipeline = project.pipeline
    data = log['data']
    n_break = log['n_break']
    reboot = log['reboot']
    lc_plate = log['lc_plate']
    timer = log['timer']
    obj = project.front_data['objective']['objective'][0]
    n_obj = len(project.front_data['objective']['objective'])
    pi_list = log['qpi']

    # Update project status and timer
    project.status = 'running'
    timer.update(reboot)
    reboot = False

    # Update results and reactions
    new_data = res.update()
    reaction = res2obj(new_data, reaction, obj)
    n_break = data.update_data(reaction, space, project.max_time, n_break)

    # Update equipment and plates with current state
    for i, j in equipment.items():
        if j.name == 'Unchained':
            j.update(state[i], lc_plate)
        else:
            j.update(state[i])

    for i in plate_list:
        i.update()

    for i in reaction.values():
        i.update()

    lc_plate.update()

    # Check if the initial number of experiments is complete
    n_complete = calc_complete(reaction, pipeline['flow'])
    if_iter = n_complete >= para['init_num']
    q = 0
    for i in plate_list:
        i.update()
        print(i.status)
        if i.status == 'idle':
            q += 1

    # Determine if additional reactions need to be added
    reaction_delete = []
    if 'PI' in para['schedule']:
        if_pi = True
    else:
        if_pi = False

    if 'AR' in para['schedule']:
        classify = q != 0  # AR modes
    else:
        classify = q >= para['reactor_num']  # SR modes

    if classify and if_iter and len(reaction) < para['max_exp'] and n_break < 3:  # para['max_break']:
        bo = Bo(space, data.train_x, data.train_y, n_obj, None)
        bo.fit_gp()
        candidate, qpi = bo.get_next_exps(para['reactor_num'])
        pi_list += qpi
        EI = bo.ei()
        num_add, reaction, n_break = candidate_verify(candidate, qpi, EI, reaction, data, n_break, q, para['pi_threshold'],
                                                      if_pi, space, project.space_data, n_min)
    else:
        num_add = 0

    # Add reactions to equipment and plates
    reaction, equipment, plate_list = reaction_add(pipeline, reaction, equipment, plate_list, lc_plate)
    for i in equipment.values():
        i.run()

    timer.update(reboot)

    # Log the current state
    project.log.append(copy.deepcopy({'equipment': equipment, 'reaction': reaction,
                                       'plate_list': plate_list, 'lc_plate': lc_plate,
                                       'res': res, 'data': data, 'n_break': n_break,
                                       'reboot': False, 'timer': timer, 'qpi': pi_list}))

    if_break = False
    # Determine whether to stop
    if if_iter and len(reaction) > n_min:
        if q == para['reactor_num'] and num_add == 0:
            if_break = True
        if para['schedule'] == 'ARIA' and para['reactor_num'] == 1:
            if n_complete >= para['max_exp'] or n_break >= para['max_break']:
                if_break = True
        else:
            if n_complete >= len(reaction) - len(reaction_delete) and (
                    n_break >= para['max_break'] or len(reaction) >= para['max_break']):
                if_break = True

    if not if_break:
        break_indicate = 200
    else:
        project.status = 'completed'
        break_indicate = 500

    # Save the updated project state
    with open(project_path, 'wb') as f:
        pickle.dump(project, f)

    return break_indicate

if __name__ == '__main__':
    uvicorn.run(app='central:app', host="127.0.0.1", port=8555)
