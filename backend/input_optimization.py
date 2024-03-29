from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
from rdkit import Chem
from rdkit.Chem import Draw
import openai
from PIL import Image
from datetime import datetime
import uuid
from typing import Dict, Any, List
from action2unchained import transfer2unchained
from BoProject import BoProject
import copy

router = APIRouter()

cur_img_path = '/img/smiles2img/'
full_path = 'D:/develop_ryx/foundryGPT/frontend/dist' + cur_img_path
project_path = 'project/'


def transparent(_ori):
    image_rgba = _ori.convert('RGBA')
    pixels = image_rgba.getdata()
    transparent_image = Image.new('RGBA', image_rgba.size, (0, 0, 0, 0))
    transparent_pixels = []
    for pixel in pixels:
        if pixel[:3] != (255, 255, 255):
            transparent_pixels.append(pixel)
        else:
            transparent_pixels.append((0, 0, 0, 0))
    transparent_image.putdata(transparent_pixels)
    return transparent_image


def smiles2montageimg(_data):
    smiles = _data['smiles']
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    arr = smiles.split('>')
    reactions = arr[0].split('.')
    solvents = arr[1].split('.')
    productions = arr[2].split('.')
    PLUS_WIDTH = 60
    ARROW_WIDTH = 120
    COMMON_WIDTH = 300
    # PLUS_HEIGHT = 300
    COMMON_HEIGHT = 300

    target = Image.new('RGB', ((len(reactions) - 1) * PLUS_WIDTH + len(reactions) * COMMON_WIDTH
                               + ARROW_WIDTH
                               + (len(productions) - 1) * PLUS_WIDTH + len(productions) * COMMON_WIDTH,
                               COMMON_HEIGHT))
    target_s = Image.new('RGB', (len(solvents) * COMMON_WIDTH, COMMON_HEIGHT))

    index = 0
    for i in range(len(reactions)):
        m = Chem.MolFromSmiles(reactions[i])
        img = Draw.MolToImage(m)
        if (i != 0):
            target.paste(Image.open(full_path + 'plus.png'), (index, 0))
            index = index + PLUS_WIDTH
        target.paste(img, (index, 0))
        index = index + COMMON_WIDTH
    target.paste(Image.open(full_path + 'arrow.png'), (index, 0))
    index = index + ARROW_WIDTH
    for i in range(len(productions)):
        m = Chem.MolFromSmiles(productions[i])
        img = Draw.MolToImage(m)
        if (i != 0):
            target.paste(Image.open(full_path + 'plus.png'), (index, 0))
            index = index + PLUS_WIDTH
        target.paste(img, (index, 0))
        index = index + COMMON_WIDTH
    euation_image = transparent(target)
    index = 0
    for i in range(len(solvents)):
        m = Chem.MolFromSmiles(solvents[i])
        img = Draw.MolToImage(m)
        target_s.paste(img, (index, 0))
        index = index + COMMON_WIDTH
    solvents_image = transparent(target_s)
    uu = uuid.uuid4().hex
    equation_path = full_path + current_time + uu + '_equation.png'
    euation_image.save(equation_path)
    solvents_path = full_path + current_time + uu + '_solvents.png'
    solvents_image.save(solvents_path)
    # if solvents != ['']:
    url_path = [cur_img_path + current_time + uu + '_equation.png', cur_img_path + current_time + uu + '_solvents.png']

    return url_path


openai.api_key = ''
openai.api_base = 'https://foundry-gpt.openai.azure.com/'  # your endpoint should look like the following https://YOUR_RESOURCE_NAME.openai.azure.com/
openai.api_type = 'azure'
openai.api_version = '2023-05-15'  # this may change in the future

deployment_name = 'davinci-3'  # This will correspond to the custom name you chose for your deployment when you deployed a model.


class SmilesData(BaseModel):
    smiles: str


class NLPData(BaseModel):
    nlp: str
    operation: str


class NLPactionData(BaseModel):
    nlp: str
    action: dict


@router.post('/nlp2space')
def nlp2space(data: NLPactionData):
    nlp = data.nlp
    action = data.action
    prompt = """Assuming that you are an expert in the field of chemical reaction optimization and data science. I will provide a description about optimization variables and their range below, and you will transfer them into a space Json file. The following is an example:
    The description: I want to optimize four variables: 1. Reaction time: 60-90 minutes, 2. TEMPO volume: 1-2 ml, 3. Cu catalyst volume: 1-2 ml, 4. Cu catalyst: CuBr2, CuBr, CuCl, 5. Base type: NMI, DBU. The output {"Space": [{"name": "Time","type": "continuous","range": [60, 90]}, {"name": "volume of TEMPO","type": "continuous","range": [1, 2]}, {"name": "volume of Cu catalyst ","type": "continuous","range": [1, 2]}, {"name": "Cu catalyst","type": "categorical", "range": ["CuBr", "CuBr2", "CuCl"]}, {"name": "Base","type": "categorical", "range": ["NMI", "DBU"]}]}.
    Now I give you another description, you should only output space json and are not allowed to output other tokens. The description:
    """
    # s = 'I want to optimize four variables: 1. Reaction time: 60-80 minutes, 2. Base volume: 0.1-0.25 ml, 3. Cu catalyst: CuBr2, CuBr, 4. Base type: NMI, DBU.'
    response = openai.Completion.create(engine=deployment_name, prompt=prompt+nlp, temperature=0, max_tokens=2000,
                                        top_p=1.0)
    res = response["choices"][0]["text"]
    # res = '{"Space": [{"name": "Time","type": "continuous","range": [60, 80]}, {"name": "volume of Base","type": "continuous","range": [0.125, 0.25]}, {"name": "Cu catalyst","type": "categorical", "range": ["CuBr", "CuBr2", "Cu(OTf)", "Cu(OTf)2"]}, {"name": "Base","type": "categorical", "range": ["NMI", "DBU"]}]}'
    # action = {"1": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Substrate",
    #                 "tag": "SyringePump,ExtSingleTip"},
    #           "2": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Cu catalyst",
    #                 "tag": "SyringePump,ExtSingleTip"},
    #           "3": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "TEMPO",
    #                 "tag": "SyringePump,ExtSingleTip"},
    #           "4": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Base", "tag": "SyringePump,ExtSingleTip"}}
    # {"1": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Cu catalyst", "tag": "SyringePump,ExtSingleTip"}, "2": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "TEMPO", "tag": "SyringePump,ExtSingleTip"}, "3": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Base", "tag": "SyringePump,ExtSingleTip"}}
    space = json.loads(res[res.index('{'):])['Space']
    action_step = copy.deepcopy(action)
    time = False
    for i in action_step.values():
        i['checkParameter'] = False
        i['checkReagent'] = False
    for i in space:
        if 'time' in i['name'].lower():
            time = True
        for j in action_step.values():
            if j['name'].lower() in i['name'].lower():
                if i['type'] == 'continuous':
                    j['checkParameter'] = True
                    j['num'] = 'parameter'
                    break
                elif i['type'] == 'categorical':
                    j['checkReagent'] = True
                    break
    return {'space': space, 'action': action_step, 'time': time}


@router.post("/smiles2img")
async def get_image(data: SmilesData):
    try:
        smiles = data.smiles
        json_data = {'smiles': smiles}
        tmp = smiles2montageimg(json_data)
        return tmp
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing the request: " + str(e))


@router.post('/nlp2procedure')
def nlp2procedure(data: NLPData):
    nlp = data.nlp
    operation = data.operation
    prompt = """Assuming that you are an expert in the field of chemistry and are good at various operations in chemical synthesis, I will provide a description below, and you will modify it according to the specific operation. What you need to pay attention to in the operation is, first set the operation of adding raw materials, if it is a solid material then add it from solid source using Powder method, if it is a liquid then add it from the mother plate using SyringePump,ExtSingleTip method. If there are multiple ingredients, they are added in order from the corresponding position. Please note that you can finish after adding substances.
    This is two examples,you will be given a experimental procedure like"To a flask fitted with a magnetic stir bar was added 1.8 mg (0.01 mmol) of PdCl2, 11.1 mg (0.02 mmol) of TIP-Cy*Phine, 0.105 ml (1.2 mmol) of morpholine, 0.102 ml (1.0 mmol) of chlorobenzene, 134.5 mg (1.4 mmol) of NaOtBu and 0.75 ml of THF. The flask was sealed under air and the mixture was stirred at 80° C."
    {"procedure": "1. dispense 1.8 mg PdCl2 from solid source cell to reactor plate cell using Powder\n2. dispense 11.1 mg TIP-Cy*Phine from solid source cell to reactor plate cell using Powder\n3. dispense 0.105 ml morpholine from mother plate  cell to reactor plate cell using SyringePump,ExtSingleTip\n4. dispense 0.102 ml chlorobenzene from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n5. dispense 134.5 mg NaOtBu from solid source cell to reactor plate cell using Powder\n6. dispense 0.75 ml THF from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip", "action": {"1": {"action": "dispense", "num": 1.8, "unit": "mg", "name": "PdCl2", "tag": "Powder"}, "2": {"action": "dispense", "num": 11.1, "unit": "mg", "name": "TIP-Cy*Phine", "tag": "Powder"}, "3": {"action": "dispense", "num": 0.105, "unit": "ml", "name": "morpholine", "tag": "SyringePump,ExtSingleTip"}, "4": {"action": "dispense", "num": 0.102, "unit": "ml", "name": "chlorobenzene", "tag": "SyringePump,ExtSingleTip"}, "5": {"action": "dispense", "num": 134.5, "unit": "mg", "name": "NaOtBu", "tag": "Powder"},  "6": {"action": "dispense", "num": 0.75, "unit": "ml", "name": "THF", "tag": "SyringePump,ExtSingleTip"}}}
    you will be given another experimental procedure like"To a solution of benzoic acid (62.8 mg, 0.51 mmol), aniline (47 μl, 0.51 mmol) and DMAP (62.8 mg, 0.51 mmol) in dry DMF (8 ml) was added the fluorous Mukaiyama reagent 3d (500 mg, 0.61 mmol) at room temperature. The reaction mixture was stirred for 1 h at ambient temperature."
    {"procedure": "1. dispense 500 mg fluorous Mukaiyama reagent from solid source cell to reactor plate cell using Powder","action": {"1": {"action": "dispense", "num": 500, "unit": "mg", "name": "fluorous Mukaiyama reagent", "tag": "Powder"}}}
    It is worth noting that if the process of preparing the solution appears, such as "To a solution of" and "dissolved in", the solution has been added to the reactor by default and does not need to appear in the process. As shown in the above case, there is no addition step of benzoic acid (62.8 mg, 0.51 mmol), aniline (47 μ l）, drying DMF (8 ml), 0.51 mmol and DMAP (62.8 mg, 0.51 mmol)
    Below I will give you a description of the sentence that you give for the operation."""
    prompt = prompt + '\n' + nlp
    response = openai.Completion.create(engine=deployment_name, prompt=prompt, temperature=0,
                                        max_tokens=2500,
                                        top_p=0.5)
    res = response["choices"][0]["text"]
    for i, j in enumerate(res):
        if j == '{':
            res = res[i:]
            break
    res = res.replace('\n', '\\n')
    res = json.loads(res)
    procedure = res['procedure']
    action = res['action']

    # procedure = "1. stir (500rpm) \n2. temperature (25℃)\n3. dispense 0.25 mL CuOTf from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n4. dispense 0.25 mL bpy from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n5. dispense 0.25 mL TEMPO from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n6. dispense 0.25 mL NMI from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip"

    # if operation == 'synthesis':
    #     procedure = "1. stir (500rpm) \n2. temperature (25℃)\n3. dispense 0.25 mL CuOTf from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n4. dispense 0.25 mL bpy from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n5. dispense 0.25 mL TEMPO from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip\n6. dispense 0.25 mL NMI from mother plate cell to reactor plate cell using SyringePump,ExtSingleTip"
    # 
    #     action = {"1": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Substrate",
    #                     "tag": "SyringePump,ExtSingleTip"},
    #               "2": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Cu catalyst",
    #                     "tag": "SyringePump,ExtSingleTip"},
    #               "3": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "TEMPO",
    #                     "tag": "SyringePump,ExtSingleTip"},
    #               "4": {"action": "dispense", "num": 0.25, "unit": "ml", "name": "Base",
    #                     "tag": "SyringePump,ExtSingleTip"}}
    # else:
    #     procedure = "1. dispense 0.75 mL HEDP from solvent plate cell to reactor plate cell using SyringePump,ExtSingleTip"
    # 
    #     action = {"1": {"action": "dispense", "num": 0.75, "unit": "ml", "name": "HEDP",
    #                     "tag": "SyringePump,ExtSingleTip"}}
    para = transfer2unchained(action, operation)
    return {'procedure': procedure, 'action': action, 'parameter': para}


class ParaData(BaseModel):
    para: Dict[Any, Any]


@router.post("/create-project")
async def create_project(data: ParaData):
    bo_data = data.para
    bo = BoProject(bo_data)
    bo.save_instance()
    return bo.id


class StepData(BaseModel):
    step: Dict[Any, Any]


@router.post("/unchained")
async def unchained_step(data: StepData):
    step_data = data.step
    return transfer2unchained(step_data, 'synthesis')
