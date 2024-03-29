import json
import math
import copy


def transfer2unchained(action, operation):
    template = json.loads(open('template.json', 'r').read())
    if operation == 'synthesis':
        unchained = [template['init_mother'], template['init_solvent']]
    elif operation == 'workup':
        unchained = [template['init_solvent'], template['stop_shake']]
    for i, j in enumerate(unchained):
        j['map']['LayerIndex'] = i + 1
        j['recipe']['LayerIndex'] = i + 1
    # liquid = 0
    # powder = 0
    # column = 4

    for i, j in action.items():
        if j['action'] == 'stir' or j['action'] == 'temperature':
            para = copy.deepcopy(template[j['action']].copy())
            para['map']['LayerIndex'] = len(unchained) + 1
            para['recipe']['LayerIndex'] = len(unchained) + 1
            for k in para['map']['Values']:
                k['Item3'] = j['parameter']
            unchained.append(para)
        elif j['action'] == 'dispense':
            para = copy.deepcopy(template[j['action']][j['tag']].copy())
            para['map']['LayerIndex'] = len(unchained) + 1
            para['recipe']['LayerIndex'] = len(unchained) + 1
            for k in para['map']['Values']:
                k['Item3'] = j['num']
            if operation == 'synthesis':
                para['map']['reagent'] = j['name']
            if operation == 'workup':
                para['map']['Name'] = 'solvent'
                para['map']['SourceArea'] = [[1, 2]]
            unchained.append(para)
    if operation == 'synthesis':
        para = copy.deepcopy(template['dispense']["SyringePump,ExtSingleTip"])
        para['map']['LayerIndex'] = len(unchained) + 1
        para['recipe']['LayerIndex'] = len(unchained) + 1
        para['map']['Name'] = 'solvent'
        para['map']['SourceArea'] = [[1, 1]]
        unchained.append(para)
    start_shake = copy.deepcopy(template['start_shake'])
    start_shake['map']['LayerIndex'] = len(unchained) + 1
    start_shake['recipe']['LayerIndex'] = len(unchained) + 1
    unchained.append(start_shake)
    return unchained

