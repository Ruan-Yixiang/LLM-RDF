import json
import copy


def transfer2unchained(action, operation):
    """
    Converts a sequence of actions into a standardized format (unchained) based on a template.

    Parameters:
    action (dict): Dictionary containing actions with details.
    operation (str): Type of operation ('synthesis' or 'workup').

    Returns:
    list: List of actions in the unchained format.
    """
    # Load the template JSON file
    template = json.loads(open('template.json', 'r').read())

    # Initialize unchained list based on the operation type
    if operation == 'synthesis':
        unchained = [template['init_mother'], template['init_solvent']]
    elif operation == 'workup':
        unchained = [template['init_solvent'], template['stop_shake']]

    # Set LayerIndex for initial elements
    for i, item in enumerate(unchained):
        item['map']['LayerIndex'] = i + 1
        item['recipe']['LayerIndex'] = i + 1

    # Process each action in the input
    for i, details in action.items():
        if details['action'] == 'stir' or details['action'] == 'temperature':
            # Handle stir or temperature actions
            para = copy.deepcopy(template[details['action']])
            para['map']['LayerIndex'] = len(unchained) + 1
            para['recipe']['LayerIndex'] = len(unchained) + 1
            for value in para['map']['Values']:
                value['Item3'] = details['parameter']
            unchained.append(para)
        elif details['action'] == 'dispense':
            # Handle dispense actions
            para = copy.deepcopy(template[details['action']][details['tag']])
            para['map']['LayerIndex'] = len(unchained) + 1
            para['recipe']['LayerIndex'] = len(unchained) + 1
            for value in para['map']['Values']:
                value['Item3'] = details['num']
            if operation == 'synthesis':
                para['map']['reagent'] = details['name']
            elif operation == 'workup':
                para['map']['Name'] = 'solvent'
                para['map']['SourceArea'] = [[1, 2]]
            unchained.append(para)

    # Add a specific dispense action if the operation is synthesis
    if operation == 'synthesis':
        para = copy.deepcopy(template['dispense']["SyringePump,ExtSingleTip"])
        para['map']['LayerIndex'] = len(unchained) + 1
        para['recipe']['LayerIndex'] = len(unchained) + 1
        para['map']['Name'] = 'solvent'
        para['map']['SourceArea'] = [[1, 1]]
        unchained.append(para)

    # Add the start_shake action
    start_shake = copy.deepcopy(template['start_shake'])
    start_shake['map']['LayerIndex'] = len(unchained) + 1
    start_shake['recipe']['LayerIndex'] = len(unchained) + 1
    unchained.append(start_shake)

    return unchained
