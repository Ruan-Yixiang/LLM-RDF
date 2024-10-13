<template>
    <div class="p-main">
        <el-row>
            <el-col :span="5">
                <div class="grid-content">
                    <a @click="chooseStep(active, 'left')" v-if="isShowPrev(active)">
                        <div class="prev el-icon-arrow-left"></div>
                    </a>
                </div>
            </el-col>
            <div>
                <el-col :span="14">
                    <div class="grid-content" style="font-size: 35px;margin-top: 2%">{{ screenerTitle }}</div>
                    <el-divider></el-divider>
                    <div :span="10">
                        <el-steps :active="active" finish-status="success" align-center>
                            <el-step :title="stepList[0]"></el-step>
                            <el-step :title="stepList[1]"></el-step>
                            <el-step :title="stepList[2]"></el-step>
                        </el-steps>
                    </div>
                    <el-tabs v-model="activeName" ref="tabs">
                        <el-tab-pane label="Step 1" name="first">
                            <div class="tab1style">{{ GPTTitle[0] }}</div>
                            <el-input type="textarea" :rows="8" v-model="textSynthesis" resize="none"
                                :placeholder="placeholderSynthesis">
                            </el-input>
                            <div class="tab1style">{{ GPTTitle[1] }}</div>
                            <el-input type="textarea" :rows="8" v-model="textVariableRange" resize="none"
                                style="margin-bottom: 32px;" :placeholder="placeholderVariableRange">
                            </el-input>
                            <div>
                                <a @click="transfer">
                                    <div class="gpt" style="font-size: medium ; " align="center">
                                        <i class="iconfont icon-send-fill"></i>
                                    </div>
                                </a>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="Step 2" name="second">
                            <div style=" height: 500px;">
                                <div v-if="isShowNoteOfSteps(stepData)">
                                    <h1 style="font-size: 20px;width:90%;margin-left: 5%;">
                                        &#12288{{ stepsHint }}
                                    </h1>
                                </div>
                                <el-scrollbar style=" height: 435px;" wrap-style="overflow-x:hidden;" align="center">
                                    <div v-for="(item, index) in stepData" :key="index" style="margin-top: 0px">
                                        <el-row>
                                            <el-row>
                                                <h1 style="margin-left: 0%; float: left; font-size: 20px">
                                                    {{ stepTitle }} {{ index + 1 }}
                                                </h1>
                                                <el-link icon="el-icon-circle-plus-outline"
                                                    style="font-size:18px;margin-right: 4%; float: right"
                                                    @click="insertCurrentStep(index)"
                                                    v-bind:title="iconBind[1]"></el-link>
                                                <el-link icon="el-icon-delete"
                                                    style="font-size:18px; margin-right: 4%; float: right"
                                                    @click="deleteCurrentStep(index)"
                                                    v-bind:title="iconBind[0]"></el-link>
                                            </el-row>
                                            <el-row>
                                                <el-col :span="8">
                                                    <el-row>
                                                        <div>{{ stepHeader[0] }}</div>
                                                        <div class="grid-content">
                                                            <el-input v-model.trim="item['reagent']"
                                                                class="input-common" placeholder="choose"
                                                                style="width: 65%">
                                                            </el-input>
                                                        </div>
                                                        <div style="margin-left: -32%">
                                                            <el-checkbox v-model.trim="item['checkParameter']"
                                                                @change="handleCheckReagent(index, item)">{{
                                                                    variableCheck
                                                                }}</el-checkbox>
                                                        </div>
                                                    </el-row>
                                                </el-col>
                                                <el-col :span="8">
                                                    <div>{{ stepHeader[1] }}</div>
                                                    <div class="grid-content">
                                                        <el-input-number style="width: 65%"
                                                            v-model.trim="item['parameter']" class="input-common"
                                                            @change="handleChangeQuantity(index)" :precision="2"
                                                            :step="0.1" :min="0" :max="5000"
                                                            label="description"></el-input-number>
                                                    </div>
                                                </el-col>
                                                <el-col :span="8">
                                                    <div>{{ stepHeader[2] }}</div>
                                                    <div class="grid-content">
                                                        <el-select v-model.trim="item['unit']" placeholder="choose"
                                                            class="input-common" style="width: 65%">
                                                            <el-option v-for="itemunit in options" :key="itemunit.value"
                                                                :label="itemunit.label" :value="itemunit.label">
                                                            </el-option>
                                                        </el-select>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-row>
                                        <el-divider></el-divider>
                                    </div>
                                    <el-link icon="el-icon-circle-plus-outline"
                                        style="font-size:18px;margin-right: 4%; float: right"
                                        @click="insertBottomStep()" v-bind:title="iconBind[2]"></el-link>
                                </el-scrollbar>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="Step 3" name="third">
                            <el-scrollbar class="infinite-list" wrap-style="overflow-x:hidden;"
                                style="height: 500px; margin-top: 0px">
                                <div v-if="isShowNoteOfSpace(spaceData)">
                                    <h1 style="font-size: 20px">
                                        {{ spaceHint }}
                                    </h1>
                                </div>
                                <div style="overflow: auto">
                                    <div v-for="(item, index) in spaceData" :key="index" style="margin-top: 10px"
                                        align="center">
                                        <div v-if="isShowCategoricalVar(item)" style="width: 88.5%">
                                            <el-collapse show-border="false" @change="changeClickedStatus(index)"
                                                :class="chooseClass(index)">
                                                <el-collapse-item name="1" align="left">
                                                    <template slot="title">
                                                        <div style="margin-left: 2%">
                                                            {{ item["name"] }}{{ " ("
                                                            }}{{ item["range"].length }}{{ ")" }}
                                                        </div>
                                                    </template>
                                                    <div v-for="(it, ind) in item['range']" :key="ind">
                                                        <div style="margin-top: 1%">
                                                            <el-input style="margin-left: 2%; width: 20%"
                                                                v-model.trim="item['range'][ind]">
                                                            </el-input>
                                                            <el-link icon="el-icon-delete"
                                                                v-bind:title="iconBind[0]"
                                                                style="margin-right: 4%; float: right; font-size: 18px"
                                                                @click="reduceCategory(index, ind)"></el-link>
                                                        </div>
                                                    </div>
                                                </el-collapse-item>
                                            </el-collapse>
                                            <el-row>
                                                <el-link icon="el-icon-circle-plus-outline"
                                                    style="font-size:18px;margin-right: 3.8%; margin-top: 1%;margin-bottom: 4%; float: right"
                                                    @click="addCategory(index)"
                                                    v-bind:title="iconBind[2]"></el-link>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </el-scrollbar>

                            <el-dialog :title="savePart[0]" style="border-radius: 10px"
                                :visible.sync="finishTableVisible">
                                <div>
                                    <el-form label-width="120px" :model="project_form" :rules="project_rules"
                                        ref="ruleProjectForm" @submit.native.prevent>
                                        <el-form-item :label="savePart[1]" prop="project_name">
                                            <el-input class="input-common" v-model="project_form.project_name"
                                                @keyup.enter.native="finishStep('ruleProjectForm')"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <div style="margin-left: 88%; ">
                                        <a @click="finishStep('ruleProjectForm')">
                                            <div class="submit">
                                                {{ savePart[4] }}
                                            </div>
                                        </a>
                                    </div>
                                </span>
                            </el-dialog>

                            <div>
                                <a @click="finishTableVisible = true">
                                    <div class="gpt" style="font-size: medium ; font-weight: 700;">{{ finishBtn }}
                                    </div>
                                </a>
                            </div>
                        </el-tab-pane>

                    </el-tabs>

                </el-col>
            </div>
            <el-col :span="5">
                <div class="grid-content">
                    <a @click="chooseStep(active, 'right')" v-if="isShowRight(active)">
                        <div class="next el-icon-arrow-right"></div>
                    </a>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import DevicePixelRatio from '../../utils/devicePixelRatio'
import conf from "../../config"
import axios from "axios";

export default {
    data() {
        return {
            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            fixWidth: window.screen.width,
            fixHeight: window.screen.height,
            url: conf.backend_url,
            valueLights: true,
            screenerTitle: "Screener",
            activeName: 'first',
            active: -1,
            stepList: ['GPT', 'Steps', 'Space'],
            GPTTitle: ["Synthesis", "Screen variables & range"],
            iconBind: ["remove", "insert", "add"],
            stepOperation: ["remove", "insert",],
            spaceOperation: ["remove", "add"],
            step1: 'GPT',
            step2: 'Steps',
            step3: 'Space',
            textSynthesis: 'To a solution of alcohol (0.25 mmol) in DMSO (0.25 mL) in a reactor was added sequentially a solution of (1) Cu catalyst (0.25 mL,0.05M), (2) bpy(0.25 mL,0.05M), (3) TEMPO (0.25 mL, 0.05M), and (4) Base (0.25 mL,0.10M).',//'',
            textVariableRange: 'I want to screen four variables: 1. alcohol: alcohol_1, alcohol_2, alcohol_3, alcohol_4, alcohol_5, alcohol_6, 2. Cu catalyst: CuBr2, CuCl2, Cu(OTf)2, Cu(BF4)2 3. Base type: NMI, DBU.',//'',
            placeholderSynthesis: "Please input the synthesis of the screener...",
            placeholderVariableRange: "Please input the variables and range of the screener...",
            nextBtn: 'Next',
            prevBtn: 'Prev',
            finishBtn: 'Check All',
            transferBtn: 'Trans',
            getGPTAlarm: ['Get Data from GPT!', 'SUCCESS', 'Cancel', 'OK'],
            stepData: [],
            stepsHint: 'There is no screen steps. Please turn back to previous step and type some steps tobe inserted. Or you can insert some steps press the insert button.',
            spaceData: [],
            actionData: [],
            code: '',
            spaceHint: 'There is no screen variable selected. Please turn back to previous step and choose some screen variables.',
            spaceClickedList: [],
            countSteps: 100,
            stepHeader: ['Reagent', 'Parameter', 'Unit'],
            stepTitle: 'Step',
            variableCheck: 'screen variable',
            options: [
                {
                    value: "choice1",
                    label: "ml",
                },
                {
                    value: "choice2",
                    label: "mg",
                },
                {
                    value: "choice3",
                    label: "min",
                },
                {
                    value: "choice4",
                    label: "rpm",
                },
                {
                    value: "choice5",
                    label: "℃",
                },
            ],
            finishTableVisible: false,
            savePart: ['Save Project', 'Project Name', 'Please input project name', 'Cancel', 'Submit'],
            project_rules: {
                project_name: [
                    { required: true, message: 'Please input project name', trigger: 'blur' },
                ],
            },
            project_form: {
                project_name: '',
            },
        }
    },
    methods: {
        isLightsOff() {
            if (this.valueLights == false) {
                return "#313131";
            } else {
                return "#f4f5f6";
            }
        },
        isColorWhite() {
            if (this.valueLights == false) {
                return "#ffffff";
            } else {
                return "#000000";
            }
        },
        chooseStep(_active, _item) {
            console.log(_active)
            if (_item == 'right') {
                switch (_active) {
                    case 0:
                        this.goStep2()
                        break
                    case 1:
                        this.goStep3()
                        break
                }
            }
            if (_item == 'left') {
                switch (_active) {
                    case 1:
                        this.retStep1()
                        break
                    case 2:
                        this.retStep2()
                        break
                }
            }
        },
        isShowPrev(_active) {
            if (_active > 0 && _active < 3) {
                return true
            } else {
                return false
            }
        },

        isShowRight(_active) {
            if (_active > -1 && _active < 2) {
                return true
            } else {
                return false
            }
        },

        goStep2() {
            this.active = 1
            this.activeName = 'second'
        },
        retStep1() {
            this.active = 0
            this.activeName = 'first'
        },
        goStep3() {
            this.active = 2
            this.activeName = 'third'
            console.log("-----", this.stepData)

            console.log("******", this.spaceData)

        },
        retStep2() {
            this.active = 1
            this.activeName = 'second'
        },
        finishStep(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("---- stepsData", this.stepData, "spaceData", this.spaceData)
                    axios
                        .post(this.url + "/input-screen/create-project", {
                            para: {
                                code: this.code,
                                space: this.spaceData,
                                name: this.project_form.project_name
                            }
                        }).then((res) => {
                            // get created ID
                            this.$router.push({ name: 'display-screener', params: { backgroundColor: this.valueLights, createdID: res.data } })
                            this.$message({
                                showClose: true,
                                message: 'Create Success!',
                                type: 'success'
                            });
                        }, (err) => {
                            this.$message({
                                showClose: true,
                                message: 'Error, Pls Check Previous Info',
                                type: 'error'
                            });
                        })
                }
            })
        },
        transfer() {
            // this.stepData = require("../../jsonFomatter/screen_step.json")
            // let tmpSpace = require("../../jsonFomatter/screen_space.json")
            // const _ = require("lodash");
            // this.spaceData = _.cloneDeep(tmpSpace);

            // let numberOfElements = 5;
            // this.spaceClickedList = (this.spaceClickedList.length != 0) ? this.spaceClickedList : Array(numberOfElements).fill(false)
            axios
                .post(this.url + "/input-screen/nlp2action", {
                    nlp: this.textSynthesis
                })
                .then((res) => {
                    this.actionData = res['data']['action'];

                    axios
                        .post(this.url + "/input-screen/nlp2space", {
                            nlp: this.textVariableRange,
                            action: this.actionData
                        })
                        .then((res_space) => {
                            this.stepData = res_space['data']['action'];
                            let tmpSpace = res_space['data']['space'];
                            const _ = require("lodash");
                            this.spaceData = _.cloneDeep(tmpSpace);
                            let numberOfElements = this.stepData.length;
                            this.spaceClickedList = (this.spaceClickedList.length != 0) ? this.spaceClickedList : Array(numberOfElements).fill(false)
                            axios
                                .post(this.url + "/input-screen/nlp2code", {
                                    nlp: this.textSynthesis + " " + this.textVariableRange,
                                })
                                .then((res_code) => {
                                    this.code = res_code['data'];
                                    this.$message({
                                        message: this.getGPTAlarm[0],
                                        type: 'success'
                                    });
                                });
                        });
                });
            this.active = 0
        },

        getSynthesis() {
            console.log("get synthesis from backend")
        },

        getRange() {
            console.log("get range from backend")
        },

        isShowNoteOfSteps(_val) {
            if (_val.length == 0) {
                return true;
            }
        },

        deleteCurrentStep(_index) {
            this.stepData[_index]["checkParameter"] = false
            this.handleCheckReagent(_index, this.stepData[_index])

            this.$set(this, 'stepData', [...this.stepData]);
            this.stepData.splice(_index, 1);
        },

        insertCurrentStep(_index) {
            let newStep = {
                "reagent": "",
                "parameter": 0,
                "unit": "ml",
                "checkParameter": false,
            }
            this.$set(this, 'stepData', [...this.stepData]);
            this.stepData.splice(_index, 0, newStep)
            // this.$set(this, 'stepData', [...this.stepData]);
        },

        insertBottomStep() {
            this.$set(this, 'stepData', [...this.stepData]);
            this.stepData.splice(this.stepData.length, 0, {
                "reagent": "",
                "parameter": 0,
                "unit": "ml",
                "checkParameter": false,
            })
        },
        handleChangeQuantity() { },

        handleCheckReagent(_index, _item) {
            console.log("------stepdata: ", this.stepData)
            console.log("------spacedata: ", this.spaceData)
            if (_item.checkParameter == false) {
                for (let i = 0; i < this.spaceData.length; i++) {
                    if (_item.reagent == this.spaceData[i].name) {
                        this.spaceData.splice(i, 1);
                    }
                }
            }
            if (_item.checkParameter == true) {
                if (this.spaceData.length == 0) {
                    this.spaceData.push({
                        name: this.stepData[0].reagent,
                        type: "categorical",
                        range: []
                    })
                }
                this.stepData.forEach(step => {
                    if (step.checkParameter == true) {
                        for (let index = 0; index < this.spaceData.length; index++) {
                            if (step.reagent == this.spaceData[index].name) {
                                break
                            }
                            if (index == this.spaceData.length - 1) {
                                this.spaceData.push({
                                    name: step.reagent,
                                    type: "categorical",
                                    range: []
                                })
                            }
                        }
                    }
                });
                // this.spaceData.push(
                //     {
                //         "name": "",
                //         "type": "categorical",
                //         "range": [
                //         ]
                //     }
                // )
            }
        },

        changeClickedStatus(_index) {
            this.spaceClickedList[_index] = !this.spaceClickedList[_index]
            this.$forceUpdate();
        },

        chooseClass(_index) {
            return this.spaceClickedList[_index] ? "rounded-collapse" : "rounded-collapse-shut"
        },

        isShowNoteOfSpace() {
            return (this.spaceData.length == 0)
        },
        isShowCategoricalVar(_item) {
            // return (_item.range.length !=0)
            return true
        },

        addCategory(_index) {
            this.spaceData[_index].range.splice(this.spaceData[_index].range.length, 0, '')
        },
        reduceCategory(_index, _ind) {
            this.spaceData[_index].range.splice(_ind, 1)
        },
        initRatio() {
            let root = document.querySelector(":root");
            root.style.setProperty("--ratio-width", window.screen.width);
            root.style.setProperty("--ratio-height", window.screen.height);
            root.style.setProperty("--fixed-width", window.screen.width);
            root.style.setProperty("--fixed-height", window.screen.height);
            if (window.devicePixelRatio < 1) {

                this.ratioHeight = this.ratioHeight / window.devicePixelRatio
                this.ratioWidth = this.ratioWidth / window.devicePixelRatio

            }
            this.ratioHeight = window.screen.height;
            this.ratioWidth = window.screen.width;
            this.fixWidth = window.screen.width;
            this.fixHeight = window.screen.height;
        },

        handleRatio() {
            let root = document.querySelector(":root");
            console.log(getComputedStyle(root).getPropertyValue("--ratio-width"))
            let t = this
            let de = new DevicePixelRatio()
            de._addHandler(window, 'resize', function () {
                if (window.devicePixelRatio < 1) {
                    this.ratioHeight = this.ratioHeight / window.devicePixelRatio
                    this.ratioWidth = this.ratioWidth / window.devicePixelRatio
                }
            })
        }
    },
    mounted() {
        this.$refs.tabs.$children[0].$el.style.display = "none";
        this.initRatio()
        this.handleRatio()
        let root = document.querySelector(":root");
        root.style.setProperty("--main-height", window.screen.height + 'px')

        window.addEventListener(
            "message",
            (event) => {
                if (event.data.type == "background-color") {
                    this.valueLights = event.data.message.bool

                    let root = document.querySelector(":root");
                    if (this.valueLights == false) {
                        root.style.setProperty("--main-color", "#313131")
                        root.style.setProperty("--main-font-color", "#ffffff")
                    }
                    else {
                        root.style.setProperty("--main-color", "#f4f5f6")
                        root.style.setProperty("--main-font-color", "#000000")
                    }
                }
                if (event.data.type == "language-sig") {
                    if (event.data.message.language == 'En') {
                        this.screenerTitle = "Screener"
                        this.stepList = ['GPT', 'Steps', 'Space',]
                        this.GPTTitle = ["Synthesis", "Screen variables & range"]
                        this.getGPTAlarm = ['Get Data from GPT!', 'SUCCESS', 'Cancel', 'OK']
                        this.stepTitle = "Step"
                        this.stepHeader = ['Reagent', 'Parameter', 'Unit']
                        this.variableCheck = "screen variable"
                        this.iconBind = ["remove", "insert", "add"]
                        this.savePart = ['Save Project', 'Project Name', 'Please input project name', 'Cancel', 'Submit']
                        this.finishBtn = 'Check All'
                        this.stepsHint = 'There is no screen steps. Please turn back to previous step and type some steps tobe inserted. Or you can insert some steps press the insert button.'
                        this.spaceHint = 'There is no screen variable selected. Please turn back to previous step and choose some screen variables.'
                        this.project_rules.project_name[0].message = 'Please input project name'
                    }
                    if (event.data.message.language == 'Cn') {
                        this.screenerTitle = "自动筛选"
                        this.stepList = ['生成式预训练模型', '步骤', '空间',]
                        this.GPTTitle = ["合成", "筛选变量以及范围"]
                        this.getGPTAlarm = ['成功获取到数据!', '成功', '取消', '确认']
                        this.stepTitle = "步骤"
                        this.stepHeader = ['反应物', '参数', '单位']
                        this.variableCheck = "筛选变量"
                        this.iconBind = ["移除", "插入", "添加"]
                        this.savePart = ['保存项目', '项目名称', '请输入项目名称', '取消', '提交']
                        this.finishBtn = '检查所有'
                        this.stepsHint = '当前没有筛选步骤。 请返回上一步骤并输入筛选步骤。 或者你也可以插入筛选步骤按插入按钮。'
                        this.spaceHint = '当前没有筛选变量。 请返回上一步骤并选择筛选变量。'
                        this.project_rules.project_name[0].message = '请输入项目名称'

                    }
                }
            }
        )
    }
}
</script>

<style>
@import url(../../assets/font_viut27d3a7/iconfont.css);

:root {
    --ratio-width: '0px';
    --ratio-height: '0px';
    --fixed-width: '0px';
    --fixed-height: '0px';
    --dialog-bg-clr: #ffffff;
    --main-color: #f4f5f6;
    --main-font-color: #000000;
    --main-height: 0;
}

.p-main{
    background-color: var(--main-color) ;
    color: var(--main-font-color) ;
    position: 'relative';
    height: var(--main-height);
}

.grid-content {
    border-radius: 4px;
    min-height: 50px;
    position: relative;
}

.prev {
    margin-left: 73%;
    margin-top: 100%;
    width: 65px;
    height: 180px;
    font-size: 38px;
    color: #657c99;
    border-radius: 35px;
    position: absolute;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.prev:hover {
    background: #ffffff;
    box-shadow: 0px 2px 5px #e3e7f1,
        -2px -2px 5px #e3e7f1;
    transition: 0.3s;
}

.prev:not(:hover) {
    transition: 0.3s;
}

.prev:active {
    transform: scale(0.96);
}

.next {
    margin-left: 12%;
    margin-top: 100%;
    width: 65px;
    height: 180px;
    font-size: 38px;
    color: #657c99;
    border-radius: 35px;
    position: absolute;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}

.next:hover {
    background: #ffffff;
    box-shadow: 2px 2px 5px #e3e7f1,
        0px -2px 5px #e3e7f1;
    transition: 0.3s;
}

.next:not(:hover) {
    transition: 0.3s;
}

.next:active {
    transform: scale(0.96);
}


.gpt {
    width: 120px;
    height: 50px;
    font-size: 30px;
    color: #525252;
    border-radius: 25px;
    background: #ffffff;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 89%;
    box-shadow: 2px 4px 5px #e3e7f1,
        -2px -2px 3px #e3e7f1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gpt:active {
    transform: scale(0.96);
}

.input-common .el-input__inner {
    border-radius: 10px;
}

.input-common .el-select__input {
    border-radius: 10px;
}

.input-common .el-input-number__decrease,
.input-common .el-input-number__increase,
.input-common .el-input-number__input {
    border-radius: 10px;
}

.rel {
    background-color: #f4f5f6;
    color: #000000;
    position: 'relative';
    width: var(--ratio-width);
    height: var(--ratio-height);
}

.abs {
    background-color: #f4f5f6;
    color: #000000;
    position: 'absolute';
    width: var(--fixed-width);
    height: var(--fixed-height);
}

.confirm-dialog {
    transform: translate(0%, -100%);
    border-radius: 10px;
}

.confirm-dialog .el-button {
    border-radius: 10px;
    width: 70px
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-textarea__inner {
    border-radius: 10px;
}

.rounded-collapse .el-collapse-item__header {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.rounded-collapse-shut .el-collapse-item__header {
    border-radius: 10px;
}

.rounded-collapse .el-collapse-item__wrap {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.el-collapse-item__arrow {
    margin-right: 4%;
}

.el-step__head.is-process {
  color: #46a0fc !important;
  border-color: #46a0fc !important;
}
.el-step__title.is-process {
  color: #46a0fc !important;
}

.button0 {
    width: 100px;
    line-height: 10px !important;
    display: inline-block;
    padding: 14px 20px !important;
    border-radius: 6px;
    color: #fff;
    background: #46a0fc;
    border: 1px solid #46a0fc;
    margin-top: 20px;
    margin-left: 10px;
    float: right;
    cursor: pointer;
}

.tab1style {
    font-size: 20px;
    margin-bottom: 5px;
    margin-top: 15px;
}

.el-dialog {
    background-color: var(--dialog-bg-clr);
    border-radius: 15px;
    top: -1%;
    border: solid #fff 1px
}

.submit {
    width: 100px;
    height: 45px;
    margin-bottom: 20px;
    font-size: 16px;
    font-style: normal !important;
    font-weight: 600;
    color: #2b2b2b;
    border-radius: 25px;
    background: #ffffff;
    box-shadow: 2px 2px 3px #e3e7f1,
        -2px -2px 3px #e3e7f1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.submit:active {
    transform: scale(0.98);
}</style>
