from fastapi import APIRouter
from pydantic import BaseModel
import openai
import json
import copy
import re
from ScreenProject import ScreenProject
from typing import Dict, Any, List


router = APIRouter()


openai.api_key = ''
openai.api_base = 'https://foundry-gpt.openai.azure.com/' # your endpoint should look like the following https://YOUR_RESOURCE_NAME.openai.azure.com/
openai.api_type = 'azure'
openai.api_version = '2023-07-01-preview'

deployment_name = 'davinci-3'  # This will correspond to the custom name you chose for your deployment when you deployed a model.


class NlpData(BaseModel):
    nlp: str


class NlpSpaceData(BaseModel):
    nlp: str
    action: Any


class ParaData(BaseModel):
    para: Dict[Any, Any]


@router.post("/create-project")
async def create_project(data: ParaData):
    screen_data = data.para
    screen = ScreenProject(screen_data)
    screen.save_instance()
    return screen.id


@router.post('/nlp2space')
def nlp2space(data: NlpSpaceData):
    nlp = data.nlp
    action = data.action
    prompt = """Assuming that you are an expert in the field of chemical reaction screen and data science. I will provide a description about screen variables and their range below, and you will transfer them into a Json file including space and full permutation. The following is an example:
    The description: I want to screen four variables: 1. Cu catalyst: CuBr2, CuCl2, 2. Base type: NMI, DBU. The output {"Space": [{"name": "Cu catalyst","type": "categorical", "range": ["CuBr2", "CuCl2"]}, {"name": "Base","type": "categorical", "range": ["NMI", "DBU"]}], "permutation":[{Cu catalyst: "CuBr2", "Base": "NMI"}, {Cu catalyst: "CuBr2", "Base": "DBU"}, {Cu catalyst: "CuCl2", "Base": "NMI"}, {Cu catalyst: "CuCl2", "Base": "DBU"}]}.
    Now I give you another description, you should only output the json and are not allowed to output other tokens. The description:
    """
    response = openai.Completion.create(engine=deployment_name, prompt=prompt+nlp, temperature=0, max_tokens=2000,
                                        top_p=1.0)
    res = response["choices"][0]["text"]
    # res = '''{"Space": [{"name": "alcohol", "type": "categorical",
    #         "range": ["alcohol_1", "alcohol_2", "alcohol_3", "alcohol_4", "alcohol_5", "alcohol_6"]},
    #        {"name": "Cu catalyst", "type": "categorical", "range": ["CuBr2", "CuCl2", "Cu(OTf)2", "Cu(BF4)2"]},
    #        {"name": "Base", "type": "categorical", "range": ["NMI", "DBU"]}]}'''
    space = json.loads(res[res.index('{'):])['Space']
    action_step = copy.deepcopy(json.loads(action))
    for i in action_step:
        i['checkParameter'] = False
    for i in space:
        for j in action_step:
            if j['reagent'].lower() in i['name'].lower():
                    j['checkParameter'] = True
                    break
    return {'space': space, 'action': action_step}


@router.post('/nlp2action')
def nlp2action(data: NlpData):
    nlp = data.nlp
    prompt = """I will provide a description below, and you will output a json file. What you need to pay attention to in the operation is setting the operation of adding raw materials. The procedure will be executed in the liquid handler, so the unit key in the json action key must be volme unit, such as "ml" and "ul". If there are multiple ingredients, they are added in order. Please note that you can finish after adding substances.
            This is an example,you will be given a experimental procedure like "To a solution of 1,4-benzoquinone (9.25 mmol) in ethanol (1.2 ml) was added freshly distilled cyclopentadiene (1.27 ml, 18.5 mmol) at 0 °C and stirred for 0.5 h."
        	you should output:
           [{"reagent": "1,4-benzoquinone","parameter": 1.2,"unit": "ml"},{"reagent": "cyclopentadiene","parameter": 1.27,"unit": "ml"}]
            you should only output the json and are not allowed to output other tokens. Below I will give you a description of the sentence that you give for the json."""
    response = openai.ChatCompletion.create(
        engine="gpt-4",
        messages=[{"role": "system",
                   "content": "Assuming that you are an expert in the field of chemistry and are good at various operations in chemical synthesis."},
                  {"role": "user",
                   "content": prompt + '\n' + nlp}],
        temperature=0,
        max_tokens=2000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None)
    res = response["choices"][0]["message"]["content"]
    action = res[res.index('['):]

#     action = """[
#   {
#     "reagent": "alcohol",
#     "parameter": 0.25,
#     "unit": "ml"
#   },
#     {
#     "reagent": "Cu catalyst",
#     "parameter": 0.25,
#     "unit": "ml"
#   },
#     {
#     "reagent": "bpy",
#     "parameter": 0.25,
#     "unit": "ml"
#   },
#     {
#     "reagent": "TEMPO",
#     "parameter": 0.25,
#     "unit": "ml"
#   },
#    {
#     "reagent": "Base",
#     "parameter": 0.25,
#     "unit": "ml"
#   }
# ]"""
    return {'action': action}


@router.post('/nlp2code')
def nlp2code(data: NlpData):
    nlp = data.nlp
    prompt_1 = "Now you need to complete a reaction screening task. the reaction step and screen range is:"
    prompt_2 = """you need to distinguish the reagent between their roles, whether they are substrates or additives(including catalyst and other additives), and they are in the corresponding labware.
    You should continue to write and modify the code in order to fully arrange the screening reaction combination and complete every reaction in the combination by transferring the reagents in order to the wells of the reactor labware(one reaction in reaction combination occupies one well in the reactor labware).
    the well index in the reactor labware must grow from 0 and step is 1.

    Code:"
    # import opentrons library
    from opentrons import protocol_api

    # metadata
    metadata = {
        "protocolName": "6x8_test",
        "author": "Name <opentrons@example.com>",
        "description": "Simple protocol to get started using the OT-2",
    }

    # requirements
    requirements = {"robotType": "OT-2", "apiLevel": "2.14"}

    # protocol run function
    def run(protocol: protocol_api.ProtocolContext):
        # labware
        reactor = protocol.load_labware(
            "unchained_48_tuberack_2000ul", location="1"
        )
        substrate = protocol.load_labware(
            "unchained_8_tuberack_20000ul", location="2"
        )
    	additive = protocol.load_labware(
            "unchained_8_tuberack_20000ul", location="3"
        )
        tiprack_1 = protocol.load_labware(
            "opentrons_96_tiprack_300ul", location="4"
        )
    	tiprack_2 = protocol.load_labware(
            "opentrons_96_tiprack_300ul", location="5"
        )
    	tiprack_3 = protocol.load_labware(
            "opentrons_96_tiprack_300ul", location="6"
        )
    	tiprack_4 = protocol.load_labware(
            "opentrons_96_tiprack_300ul", location="7"
        )

        # pipettes
        left_pipette = protocol.load_instrument(
            "p300_single", mount="left", tip_racks=[tiprack_1, tiprack_2, tiprack_3]
        )
    	right_pipette = protocol.load_instrument(
            "p1000_single", mount="right", tip_racks=[tiprack_4]
        )

        # commands
    "

    you should write the command part based on the transfer function and modify the protocolName and description according to the task situation, with the author filling in your own name.


    the transfer function's description is:
       def transfer(
            self,
            volume: Union[float, Sequence[float]],
            source: AdvancedLiquidHandling,
            dest: AdvancedLiquidHandling,
            trash: bool = True,
            **kwargs: Any,
        ) -> InstrumentContext:
            # source: Union[Well, List[Well], List[List[Well]]],
            # dest: Union[Well, List[Well], List[List[Well]]],
            # TODO: Reach consensus on kwargs
            # TODO: ..trash or the original well.
            # TODO: What should happen if the user passes a non-first-row well

            Transfer will move a volume of liquid from a source location(s)
            to a dest location(s). It is a higher-level command, incorporating
            other :py:class:`InstrumentContext` commands, like :py:meth:`aspirate`
            and :py:meth:`dispense`, designed to make protocol writing easier at
            the cost of specificity.

            :param volume: The amount of volume to aspirate from each source and
                           dispense to each destination.
                           If volume is a list, each volume will be used for the
                           sources/targets at the matching index. If volumes is a
                           tuple with two elements, like `(20, 100)`, then a list
                           of volumes will be generated with a linear gradient
                           between the two volumes in the tuple.
            :param source: A single well or a list of wells from where liquid
                           will be aspirated.
            :param dest: A single well or a list of wells where liquid
                         will be dispensed to.
            :param \\**kwargs: See below

            :Keyword Arguments:

                * *mix_before* (``tuple``) --
                  The tuple, if specified, gives the amount of volume to
                  :py:meth:`mix` preceding each :py:meth:`aspirate` during the
                  transfer. The tuple is interpreted as (repetitions, volume).

                * *mix_after* (``tuple``) --
                  The tuple, if specified, gives the amount of volume to
                  :py:meth:`mix` after each :py:meth:`dispense` during the
                  transfer. The tuple is interpreted as (repetitions, volume).

            :returns: This instance

    For example, this transfer command will create a 20 µL air gap after each of its aspirations. When dispensing, it will clear the air gap and dispense the full 100 µL of liquid:

    pipette.transfer(
        volume=100,
        source=plate["A1"],
        dest=plate["B1"],
        air_gap=20,
    )

    The mix_after parameter controls mixing in source wells after each dispense. Its value must be a tuple with two numeric values. The first value is the number of repetitions, and the second value is the amount of liquid to mix in µL.

    For example, this transfer command will mix 50 µL of liquid 3 times after each of its dispenses:

    pipette.transfer(
        volume=100,
        source=plate["A1"],
        dest=[plate["B1"], plate["B2"]],
        mix_after=(3, 50),
    )

    air_gap is 20μL, mixed volume in mix_after parameter is the same as the added volume and mix liquid 1 time after each of its dispenses .
    If the transfer volume is 20-300 μL, use left pipette. If the transfer volume is 301-1000 μL, use right pipette.
    
    Labware.wells() = [labware:A1, labware:B1, labware:C1...]
    you must use "Labware.wells()[i]" to describe the ith well in the rack as the transfer function's parameter.
    the code output must include import part
    
    please check your output code before the final output, especially the volume of every liquid transfer!
    """
    response = openai.ChatCompletion.create(
        engine="gpt-4",
        messages=[{"role": "system",
                   "content": "Assuming that you are an expert in the field of chemistry and computer science and are good at various operations in chemical synthesis and data handling."},
                  {"role": "user",
                   "content": prompt_1 + '\n' + nlp + '\n' + prompt_2}],
        temperature=0,
        max_tokens=5000,
        top_p=1.0,
        frequency_penalty=0,
        presence_penalty=0,
        stop=None)
    pattern = re.compile(r'```python(.*?)```', re.DOTALL)
    matches = re.findall(pattern, response["choices"][0]["message"]["content"])
    code = matches[0].strip()
#     code = """# import opentrons library
# from opentrons import protocol_api
# 
# # metadata
# metadata = {
#     "protocolName": "Chemical Reaction Screening",
#     "author": "Your Name <yourname@example.com>",
#     "description": "Protocol for screening various combinations of alcohols, Cu catalysts, and bases",
# }
# 
# # requirements
# requirements = {"robotType": "OT-2", "apiLevel": "2.14"}
# 
# # protocol run function
# def run(protocol: protocol_api.ProtocolContext):
#     # labware
#     reactor = protocol.load_labware("unchained_48_tuberack_2000ul", location="1")
#     substrate = protocol.load_labware("unchained_8_tuberack_20000ul", location="2")
#     additive = protocol.load_labware("unchained_8_tuberack_20000ul", location="3")
#     tiprack_1 = protocol.load_labware("opentrons_96_tiprack_300ul", location="4")
#     tiprack_2 = protocol.load_labware("opentrons_96_tiprack_300ul", location="5")
#     tiprack_3 = protocol.load_labware("opentrons_96_tiprack_300ul", location="6")
#     tiprack_4 = protocol.load_labware("opentrons_96_tiprack_300ul", location="7")
# 
#     # pipettes
#     left_pipette = protocol.load_instrument("p300_single", mount="left", tip_racks=[tiprack_1, tiprack_2, tiprack_3])
#     right_pipette = protocol.load_instrument("p1000_single", mount="right", tip_racks=[tiprack_4])
# 
#     # commands
#     alcohols = substrate.wells()[0:6]  # alcohol_1 to alcohol_6
#     cu_catalysts = additive.wells()[0:4]  # CuBr2, CuCl2, Cu(OTf)2, Cu(BF4)2
#     bases = additive.wells()[4:6]  # NMI, DBU
#     bpy = additive.wells()[6]  # bpy
#     tempo = additive.wells()[7]  # TEMPO
# 
#     well_index = 0
#     for alcohol in alcohols:
#         for cu_catalyst in cu_catalysts:
#             for base in bases:
#                 # Transfer alcohol
#                 left_pipette.transfer(250, alcohol, reactor.wells()[well_index], air_gap=20, mix_after=(1, 250))
#                 # Transfer Cu catalyst
#                 left_pipette.transfer(250, cu_catalyst, reactor.wells()[well_index], air_gap=20, mix_after=(1, 250))
#                 # Transfer bpy
#                 left_pipette.transfer(250, bpy, reactor.wells()[well_index], air_gap=20, mix_after=(1, 250))
#                 # Transfer TEMPO
#                 left_pipette.transfer(250, tempo, reactor.wells()[well_index], air_gap=20, mix_after=(1, 250))
#                 # Transfer base
#                 left_pipette.transfer(250, base, reactor.wells()[well_index], air_gap=20, mix_after=(1, 250))
#                 well_index += 1"""
    return code

