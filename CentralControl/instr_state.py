import os


# get state form ICSharedVariableLib
def get_dp_state():
    instr_state = {}
    for _ in range(1000):
        res = os.popen('opc\\opc.exe 192.168.1.200 read ICSharedVariableLib.InstrSTA').read()
        try:
            state = res.split("'")
            ic_state = [state[1], state[3], state[5]]
        except:
            continue
        if len(instr_state) < 3 and (
                ic_state[0] == 'Robot1' or ic_state[0] == 'Unchained' or ic_state[0] == 'Thermo'):
            instr_state[ic_state[0]] = ic_state[1]
        elif len(instr_state) == 3:
            break
    offline = {'Robot1', 'Unchained', 'Thermo'} - set(instr_state.keys())
    if offline:
        raise TimeoutError(str(offline) + ' is offline!')
    return instr_state


# get actual state from equipment
def get_actual_state():
    thermo = os.popen('opc\\opc.exe host read state.thermo').read()
    thermo_state = thermo.split("'")[1].split(",")[1]
    unchained = os.popen('opc\\opc.exe host read state.unchained').read()
    unchained_state = unchained.split("'")[1].split(",")[1]
    HPLC_Arm = os.popen('opc\\opc.exe host read state.lc_Arm').read()
    HPLC_Arm_state = HPLC_Arm.split("'")[1]
    if HPLC_Arm_state == '0':
        HPLC_Arm_state = 'Ready'
    elif HPLC_Arm_state == '1' or HPLC_Arm_state == '2':
        HPLC_Arm_state = 'Running'
    if thermo_state == '3':
        thermo_state = 'Ready'
    elif thermo_state == '2' or thermo_state == '0':
        thermo_state = 'Running'
    elif thermo_state == '-532462766':
        thermo_state = 'Offline'
    elif thermo_state == '1':
        thermo_state = 'Error'
    if unchained_state == 'No experiment running' or unchained_state == 'Experiment completed' or \
            unchained_state == 'Experiment aborted':
        unchained_state = 'Ready'
    elif unchained_state == 'Experiment running':
        unchained_state = 'Running'
    elif unchained_state == 'Experiment error/ Experiment paused':
        unchained_state = 'Error'
    elif unchained_state == 'Experiment paused':
        unchained_state = 'Running'
    elif unchained_state == '':
        unchained_state = 'Offline'
    return {'Thermo': thermo_state, 'Unchained': unchained_state, 'HPLC_Arm': HPLC_Arm_state}


# get state for actual use
def get_state():
    dp = get_dp_state()
    actual = get_actual_state()
    state_dict = {'Thermo': '', 'Unchained': ''}
    for instr in state_dict.keys():
        if dp[instr] == actual[instr] == 'Ready':
            state_dict[instr] = 'Ready'
        elif dp[instr] == 'Ready' and actual[instr] != 'Ready':
            state_dict[instr] = actual[instr]
        else:
            state_dict[instr] = dp[instr]
    if dp['Thermo'] == actual['HPLC_Arm'] == 'Ready':
        state_dict['HPLC_Arm'] = 'Ready'
    elif dp['Thermo'] == actual['HPLC_Arm'] != 'Ready':
        state_dict['HPLC_Arm'] = actual['HPLC_Arm']
    elif dp['Thermo'] == 'Ready' and actual['HPLC_Arm'] != 'Ready':
        state_dict['HPLC_Arm'] = actual['HPLC_Arm']
    else:
        state_dict['HPLC_Arm'] = dp['Thermo']
    state_dict['Robot1'] = dp['Robot1']
    return state_dict
