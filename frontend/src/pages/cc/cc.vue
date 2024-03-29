<template>
    <div style="position: relative">
        <el-dialog custom-class="help-dialog" :top="'80px'" :title="'Help'" :visible.sync="dialogHelpVisible" v-draggable>
            <div>
                1. Configue each instrument with the corresponding command and parameter. <br><br>
                2. Press the "Add" button to add a new command line to the progress table.<br><br>
                3. The table will be displayed at right side. The data could be export as an excel file when "Download" button pressed.<br><br>
            </div>
        </el-dialog>

        <el-col :span="8">
            <div style="font-size: 24px;font-weight: 600; margin-left: 3%;">IC Progress Assistant
                <el-button type="info"  size="mini" icon="el-icon-help" @click="dialogHelpVisible = true">Help</el-button>
            </div>
            
            <div class="grid-content bg-purple-dark" style="position: relative; border: 2px solid #929292; ">
                <el-tabs v-model="TabsValue" :tab-position="'left'" style="height: 1000px;">

                    <el-tab-pane label="Unchained">
                        <el-row>
                            <div class="grid-content " style="margin-top: 20px ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        CMD :
                                    </h3>
                                </el-col>
                                <el-select v-model="CmdUnchainedVal" placeholder="Choose">
                                    <el-option v-for="item in CmdUnchained" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-row>
                        <el-row v-if="CmdUnchainedVal == 'INIT'">

                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][0] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][0]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][1] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][1]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][2] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][2]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col>
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][3] }} :
                                    </h3>
                                </el-col>
                                <el-col>
                                    <el-switch class="input-common"
                                        v-model.trim="unchainedPara[unchainedPart['titles'][3]]">
                                    </el-switch>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][4] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][4]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][5] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][5]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][6] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][6]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][7] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="unchainedPara[unchainedPart['titles'][7]]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col>
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][8] }} :
                                    </h3>
                                </el-col>
                                <el-col>
                                    <el-switch class="input-common"
                                        v-model.trim="unchainedPara[unchainedPart['titles'][8]]">
                                    </el-switch>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col>
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][9] }} :
                                    </h3>
                                </el-col>
                                <el-col>
                                    <el-switch class="input-common"
                                        v-model.trim="unchainedPara[unchainedPart['titles'][9]]">
                                    </el-switch>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ unchainedPart['titles'][10] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input type="textarea" :rows="10" class="input-common" v-model="parachangerValue">
                                    </el-input>
                                </el-col>
                                <!-- <el-input type="textarea" :readonly="false" :rows="10" class="input-common" v-model.trim="JSON.stringify(unchainedPara[unchainedPart['titles'][10]], null, '\t')"> -->
                            </div>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row style="float:right;margin-right: 40px;">
                            <el-button round icon="el-icon-refresh" @click="refresh(paneValue[TabsValue])"></el-button>
                            <!-- <el-button round icon="el-icon-s-promotion"
                                @click="run(paneValue[TabsValue], CmdUnchainedVal, unchainedPara)"></el-button> -->
                            <el-button round icon="el-icon-plus" v-bind:title="'Add'"
                                @click="add(paneValue[TabsValue], CmdUnchainedVal, unchainedPara)"></el-button>
                        </el-row>
                    </el-tab-pane>

                    <el-tab-pane label="Robot1">
                        <el-row>
                            <div class="grid-content " style="margin-top: 20px ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        CMD :
                                    </h3>
                                </el-col>
                                <el-select v-model="CmdRobot1Val" placeholder="Choose">
                                    <el-option v-for="item in CmdRobot1" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-row>
                        <el-row>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ robot1Part['titles'][0] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-select v-model="DestinationVal" placeholder="Choose">
                                        <el-option v-for="item in Destination" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ robot1Part['titles'][1] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-select v-model="ActionVal" placeholder="Choose">
                                        <el-option v-for="item in Action" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </div>
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ robot1Part['titles'][2] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-select v-model="PlatesVal" placeholder="Choose">
                                        <el-option v-for="item in Plates" :key="item.value" :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </div>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row style="float:right;margin-right: 40px;">
                            <el-button round icon="el-icon-refresh" @click="refresh(paneValue[TabsValue])"></el-button>
                            <!-- <el-button round icon="el-icon-s-promotion"
                                @click="run(paneValue[TabsValue], CmdRobot1Val, robot1Para)"></el-button> -->
                            <el-button round icon="el-icon-plus" v-bind:title="'Add'"
                                @click="add(paneValue[TabsValue], CmdRobot1Val, robot1Para)"></el-button>
                        </el-row>
                    </el-tab-pane>

                    <el-tab-pane label="Thermo">
                        <el-row>
                            <div class="grid-content " style="margin-top: 20px ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        CMD :
                                    </h3>
                                </el-col>
                                <el-select v-model="CmdThermoVal" placeholder="Choose">
                                    <el-option v-for="item in CmdThermo" :key="item.value" :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-row>
                        <el-row v-if="CmdThermoVal == 'INIT'">
                            <div class="grid-content ">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][0] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="hplcPara['InstrumentMethod']">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][1] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="hplcPara['ProcessingMethod']">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][2] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="hplcPara['TemplateName']">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][3] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="hplcPara['SequenceName']">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][4] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="hplcPara['ProjectName']">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][5] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-input class="input-common" v-model.trim="hplcPara['Channels'][0]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][6] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="4">
                                    <el-input class="input-common" v-model.trim="hplcPara['Injection'][0][0]">
                                    </el-input>
                                </el-col>
                                <el-col :span="1">&#12288</el-col>
                                <el-col :span="4">
                                    <el-input class="input-common" v-model.trim="hplcPara['Injection'][0][1]">
                                    </el-input>
                                </el-col>
                                <el-col :span="1">
                                    <div class="method-unit">
                                        μL
                                    </div>
                                </el-col>
                                <el-col :span="4">
                                    <el-input class="input-common" v-model.trim="hplcPara['Injection'][0][2]">
                                    </el-input>
                                </el-col>
                            </div>
                            <div class="grid-content detail-top">
                                <el-col :span="8">
                                    <h3 class="detail-method">
                                        {{ analysisPart['titles'][7] }} :
                                    </h3>
                                </el-col>
                                <el-col :span="14">
                                    <el-switch class="input-common" v-model.trim="hplcPara['New']">
                                    </el-switch>
                                </el-col>
                            </div>
                        </el-row>
                        <el-divider></el-divider>
                        <el-row style="float:right;margin-right: 40px;">
                            <el-button round icon="el-icon-refresh" @click="refresh(paneValue[TabsValue])"></el-button>
                            <!-- <el-button round icon="el-icon-s-promotion"
                                @click="run(paneValue[TabsValue], CmdThermoVal, hplcPara)"></el-button> -->
                            <el-button round icon="el-icon-plus" v-bind:title="'Add'"
                                @click="add(paneValue[TabsValue], CmdThermoVal, hplcPara)"></el-button>
                        </el-row>

                    </el-tab-pane>
                    <el-tab-pane label="GC">
                    </el-tab-pane>
                    <el-tab-pane label="Hamilton">
                    </el-tab-pane>
                    <el-tab-pane label="Cytation1">
                    </el-tab-pane>
                    <el-tab-pane label="Discover">
                    </el-tab-pane>
                    <el-tab-pane label="PT">
                    </el-tab-pane>
                    <el-tab-pane label="EC">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
        <el-col :span="16">
            <div style="font-size: 24px">&#12288</div>
            <div class="grid-content bg-purple-dark" style="border: 2px solid #929292">
                <el-scrollbar class="infinite-list" :style="{ overflowX: 'hidden', height: ratioHeight + 'px' }">
                    <el-table ref="flowchartTable" :show-header="true" :data="flowchartData">
                        <template slot="empty">
                            <span>No more data</span>
                        </template>
                        <el-table-column property="Instrument" label="Instrument"
                            :width="ratioWidth * 0.05 + 'px'"></el-table-column>
                        <el-table-column property="Command" label="Command"
                            :width="ratioWidth * 0.05 + 'px'"></el-table-column>
                        <el-table-column property="Parameter" label="Parameter" :width="ratioWidth * 0.18 + 'px'">
                            <template slot-scope="scope">
                                <el-input type="textarea" :rows="3" v-model="scope.row['Parameter']"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="RemotePath" label="RemotePath" :width="ratioWidth * 0.12 + 'px'">
                            <template slot-scope="scope">
                                <el-input type="textarea" :rows="2" v-model="scope.row['RemotePath']"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="LocalPath" label="LocalPath" :width="ratioWidth * 0.12 + 'px'">
                            <template slot-scope="scope">
                                <el-input type="textarea" :rows="2" v-model="scope.row['LocalPath']"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column property="Time" label="Time" :width="ratioWidth * 0.03 + 'px'"></el-table-column>
                        <el-table-column property="Parallel" label="Parallel"
                            :width="ratioWidth * 0.04 + 'px'"></el-table-column>
                        <el-table-column property="Release" label="Release"
                            :width="ratioWidth * 0.04 + 'px'"></el-table-column>
                        <el-table-column property="Status" label="Status"
                            :width="ratioWidth * 0.04 + 'px'"></el-table-column>
                    </el-table>
                    <el-row style="float:right; margin: 20px;">
                        <!-- <el-button round id="buttonTitle" :type=showType @click="changeTitle()">{{ buttonTitle }}</el-button> -->
                        <el-button round icon="el-icon-folder-opened" @click="importExcel()"></el-button>
                        <el-button round icon="el-icon-download" @click="exportExcel()"></el-button>
                    </el-row>
                </el-scrollbar>
            </div>
        </el-col>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import axios from "axios";
import draggable from '../../utils/draggable';

export default {
    data() {
        return {
            ratioWidth: window.screen.width,
            ratioHeight: window.screen.height,
            dialogHelpVisible: false,
            flowchartData: [],
            TabsValue: 0,
            paneValue: ["Unchained", "Robot1", "Thermo", "GC", "Hamilton", "Cytation1", "Discover", "PT", "EC"],

            CmdUnchained: [{
                value: 'START',
                label: 'START'
            },
            {
                value: 'INIT',
                label: 'INIT'
            }],
            CmdRobot1: [{
                value: 'START',
                label: 'START'
            },
            ],
            CmdThermo: [
                {
                    value: 'INIT',
                    label: 'INIT'
                },
                {
                    value: 'START',
                    label: 'START'
                }, {
                    value: 'SAMPLELOAD',
                    label: 'SAMPLELOAD'
                }, {
                    value: 'SAMPLEUNLOAD',
                    label: 'SAMPLEUNLOAD'
                }],
            CmdThermoVal: 'INIT',
            CmdUnchainedVal: 'INIT',
            CmdRobot1Val: 'START',
            DestinationVal: 'Thermo',
            Destination: [
                {
                    value: "Unchained",
                    label: "Unchained"
                },
                {
                    value: "Thermo",
                    label: "Thermo"
                },
                {
                    value: "GC",
                    label: "GC"
                },
                {
                    value: "Hamilton",
                    label: "Hamilton"
                },
                {
                    value: "Cytation1",
                    label: "Cytation1"
                },
                {
                    value: "Discover",
                    label: "Discover"
                },
                {
                    value: "PT",
                    label: "PT"
                },
                {
                    value: "EC",
                    label: "EC"
                }
            ],
            Action: [
                {
                    value: "",
                    label: ""
                },
                {
                    value: "grab",
                    label: "grab"
                },
                {
                    value: "place",
                    label: "place"
                }
            ],
            ActionVal: "",
            Plates: [
                {
                    value: "96A",
                    label: "96A"
                },
                {
                    value: "16A",
                    label: "16A"
                }
            ],
            PlatesVal: "16A",
            hplcPara: {
                "ProcessingMethod": "",
                "InstrumentMethod": "",
                "Injection": [
                    [
                        "d",
                        "",
                        ""
                    ]
                ],
                "SequenceName": "",
                "Instrument": "",
                "TemplateName": "",
                "User": "",
                "ProjectName": "",
                "Channels": [
                    ""
                ],
                "New": false
            },
            unchainedPara: {
                "ProjectName": "",
                "ChooseDesignID": "",
                "LsrFilePath": "",
                "UseLsrFile": false,
                "LastLibraryID": "",
                "SetPrompts": "",
                "SetChemicalManager": "",
                "SetTipManagement": "",
                "UseAI": false,
                "NewDesign": false,
                "ParaChanger": ""
            },
            robot1Para: "",
            analysisPart: {
                'title': 'Analysis',
                'name': 'Method',
                'titles': [
                    'Instrument Method',
                    'Processing Method',
                    'Template Name',
                    'Sequence Name',
                    'Project Name',
                    'Channels',
                    'Injection Volume',
                    'New',
                ]
            },
            unchainedPart: {
                'title': 'Unchained',
                'titles': [
                    "ProjectName",
                    "ChooseDesignID",
                    "LsrFilePath",
                    "UseLsrFile",
                    "LastLibraryID",
                    "SetPrompts",
                    "SetChemicalManager",
                    "SetTipManagement",
                    "UseAI",
                    "NewDesign",
                    "ParaChanger"
                ]
            },
            parachangerValue: "",
            robot1Part: {
                'title': 'Robot1',
                'titles': [
                    "Destination",
                    "Action",
                    "Plates"
                ]
            },
            showType: "success",
            buttonTitle: "Start",
            currentID: 0,
            currentTable: "",
            sig: "",
            processStatus: 0,
            lastSTA: {}
        }
    },
    methods: {

        changeTitle() {
            if (this.showType == "success") {
                this.showType = "danger";
                this.buttonTitle = "Stop";
            }
            else {
                this.showType = "success";
                this.buttonTitle = "Start";
            }
        },
        processing(_currentID, _currentTable, _sig, _processStatus) {
            axios.post("http://192.168.1.33:5000/api/sta", {
                "Instrument": real_name
            })
            .then((res) => {
                if (res.data.sta == "Ready") { }
            })
        },
        dealPara(_instr, _cmd, _para) {
            console.log("...", _para)
            let tmp = {
                "user": "dell",
                "Instrument": _instr,
                "Command": _cmd,
                "CMD": _cmd,
                // "CMD": 'QUERY',
                "Parameter": JSON.stringify(_para),
                "Para": JSON.stringify(_para),
                "RemotePath": "",
                "LocalPath": "",
                "Time": 800,
                "TimeAllowed": 800,
                "Parallel": false,
                "Release": false,
                "Status": ""
            }
            console.log(_instr, _cmd, _para)
            if (_instr == "Robot1") {
                if (this.ActionVal == "") {
                    tmp["Parameter"] = this.DestinationVal
                }
                else {
                    tmp["Parameter"] = this.DestinationVal + "/" + this.ActionVal + "_" + this.PlatesVal
                }
                tmp["Para"] = tmp["Parameter"]
            }
            // if (_instr == "Unchained") {
            // _para["ParaChanger"] = JSON.parse(this.parachangerValue) 
            // tmp["Parameter"] = JSON.stringify(_para , null, '\t')
            // tmp["Parameter"] = this.parachangerValue
            // tmp["Para"] = tmp["Parameter"]
            // }
            return tmp
        },

        refresh(_instr) {
            let re = this.dealPara(_instr, "RESET", "")
            axios
                .post("http://192.168.1.33:5000/api/cmd", re)
                .then((res) => {
                })
        },
        run(_instr, _cmd, _para) {
            let tm = this.dealPara(_instr, _cmd, _para)
            tm.CMD = "START"
            tm.Para = "PT"
            console.log("----", tm)
            axios
                .post("http://192.168.1.33:5000/api/cmd", tm)
                .then((res) => {
                })
        },
        add(_instr, _cmd, _para) {

            this.flowchartData.push(this.dealPara(_instr, _cmd, _para))

        },
        exportExcel() {
            const table = this.flowchartData;
            const rowLength = table.length;
            console.log(Object.keys(table[0]))
            const data = [];
            data.push(["Instrument",
                "Command",
                "Parameter",
                "RemotePath",
                "LocalPath",
                "Time",
                "Parallel",
                "Release",
                "Status"])
            for (let i = 0; i < rowLength; i++) {
                const rowData = [];
                Object.keys(table[0]).forEach(key => {
                    rowData.push(table[i][key]);
                });
                data.push(rowData);
            }
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'table.xlsx');
            console.log("//////",this.flowchartData)
        },
    },
    mounted() {
        this.hplcPara = require("../../jsonFomatter/analyze.json");

        this.unchainedPara = require("../../jsonFomatter/synthesis.json");
        this.parachangerValue = JSON.stringify(this.unchainedPara.ParaChanger, null, '\t') //this.unchainedPara.ParaChanger 
    },


}
</script>

<style>
.help-dialog {
    width: 1200px !important;
    height: 760px !important;
}
</style>