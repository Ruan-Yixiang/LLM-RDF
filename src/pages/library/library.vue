<template>
  <div :style="{backgroundColor: isLightsOff(), color: isColorWhite(),position: 'relative', width: ratioWidth + 'px', height : ratioHeight + 'px', }">
    <div :style="{backgroundColor: isLightsOff(), color: isColorWhite(),position: 'absolute', width: fixWidth + 'px', height : fixHeight + 'px', }">
        <el-col :span="4">
            <div class="grid-content"></div>
        </el-col>
        <el-col :span="16">
            <div class="grid-content" align="center">
                <el-autocomplete v-model="value_" :fetch-suggestions="querySearch" ref="autoRef" @focus="searchFocus"
                    style="margin-top: 50px;margin-bottom: 35px;width:90%;border-radius: 10px;" 
                    :placeholder="searchPlaceholder" prefix-icon="el-icon-search">
                </el-autocomplete>

                <div :style="{ position: 'relative', width: '90%', backgroundColor: colorTable(), borderRadius: '8px' }">
                    <el-scrollbar class="infinite-list"
                        :style="{ height: ratioHeight * 0.6 + 'px' }">
                        <div v-for="(item, index) in filterLibData" :key="index">
                            <el-collapse>
                                <div style="margin-top:20px" :v-if="(index==0)"></div>
                                <el-collapse-item name="1">
                                    <template slot="title">
                                        <div class="el-icon-folder" style="font-size: 20px;">
                                            {{ filterLibData[index]['class'] }}
                                            {{ " ("}}{{ item["data"].length }}{{ ")" }}
                                        </div>
                                    </template>
                                    <template>
                                        <el-table ref="libTable" style="margin-top: 5px;" :show-header="false"
                                            :data="filterLibData[index]['data']">
                                            <el-table-column property="name" label="name"
                                                :width="ratioWidth * 0.17 + 'px'"></el-table-column>
                                            <el-table-column property="note" label="Note" align=center
                                                :width="ratioWidth * 0.1 + 'px'">
                                                <template slot-scope="scope">
                                                    <a>
                                                        <div style=" font-size: 24px" @click="dialogInfoVisible=true, putDetail(scope.row['name'])">
                                                        <!-- <div style=" font-size: 24px" @click="libNote(scope.row['name'],scope.row['note'])"> -->
                                                            <i class="el-icon-document"></i>
                                                        </div>
                                                    </a>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="Flowchart" align=center
                                                :width="ratioWidth * 0.16 + 'px'">
                                                <template slot-scope="scope">
                                                    <a>
                                                        <div class="el-icon-picture" style=" font-size: 24px"
                                                            @click="flowchartVisible=true,getFlowchartDom(scope.row['name'])"></div>
                                                    </a>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="download" :width="ratioWidth * 0.06 + 'px'">
                                                <template slot-scope="scope">
                                                    <a>
                                                        <div style="float:right; font-size: 24px"
                                                            @click="transferVisible=true, getFlowchartJson(scope.row['name'])">
                                                            <i class="el-icon-download"></i>
                                                        </div>
                                                    </a>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="download" :width="ratioWidth * 0.04 + 'px'">
                                            </el-table-column>
                                        </el-table>
                                    </template>
                                </el-collapse-item>
                            </el-collapse>
                            <el-divider></el-divider>
                        </div>
                    </el-scrollbar>
                </div>

                <!-- info -->
                <el-dialog  :visible.sync="dialogInfoVisible" v-draggable  style="width:100%; ">
                    <div style="text-align:left ; font-size:20px; width:80%">Description</div>
                    <div class="info-class" >
                        &#12288&#12288{{ infoPara }}
                    </div>
                    <el-image :src="infoImgSrc" style="border-radius:15px; margin-top:20px"></el-image>
                </el-dialog>

                <el-dialog
                    v-draggable
                    style="width:100%"
                    :visible.sync="flowchartVisible"
                    v-if="flowchartVisible"
                    >
                        <iframe
                            ref="iframeflowchart"
                            src="http://localhost:83/graph-canvas"
                            id="frames"
                            frameborder="0"
                            style="width: 100%; height: 460px;"
                        ></iframe>
                </el-dialog>

                <el-dialog title="Transfer Parameter Files to Instrument IPC" :visible.sync="transferVisible" :modal-append-to-body="false" style="width:100%">
                    <div :style="{textAlign: 'center', height:'40vh', backgroundColor: tranferColor()}">
                        <el-transfer style="text-align: left; display: inline-block; margin-top:5vh" v-model="value" filterable
                            :render-content="renderFunc" filter-placeholder="search..." :titles="['Source', 'Target']"
                            :button-texts="['', '']" :format="{
                                noChecked: '${total}',
                                hasChecked: '${checked}/${total}'
                            }" @change="handleChange" @left-check-change="LeftCheckChange" :data="data">
                            <el-button round class="transfer-footer" slot="left-footer" size="small"
                                @click="modify(isCheck)">Modify</el-button>
                        </el-transfer>
                        <el-dialog title="Modify Parameter" :visible.sync="dialogFormVisible" style="margin-top: -5%;" align="center">
                            <el-form :model="form">
                                <el-form-item label="para">
                                    <el-input type="textarea" :rows="24" v-model="currentPara"
                                        autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button round type="primary" @click="dialogFormVisible = false, confirmPara()">Modify</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog :modal-append-to-body="false"  title="Flowchart Table" :visible.sync="dialogFlowchartVisible" :style="{marginTop: '-3%', width: fixWidth * 1.5 +'px', marginLeft:'-25%'}" align="center">
                            <el-form>
                                <el-form-item>
                                    <el-scrollbar class="infinite-list"
                                        :style="{ overflowX: 'hidden', height: ratioHeight * 0.55 + 'px' }">
                                        <el-table ref="flowchartTable" :show-header="true" :data="flowchartData">
                                            <template slot="empty">
                                                <span>No more data</span>
                                            </template>
                                            <el-table-column property="Instrument" label="Instrument"
                                                :width="ratioWidth * 0.05 + 'px'"></el-table-column>
                                            <el-table-column property="Command" label="Command"
                                                :width="ratioWidth * 0.05 + 'px'"></el-table-column>
                                            <el-table-column property="Parameter" label="Parameter"
                                                :width="ratioWidth * 0.18 + 'px'">
                                                <template slot-scope="scope">
                                                    <el-input type="textarea" :rows="3" v-model="scope.row['Parameter']"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column property="RemotePath" label="RemotePath"
                                            :width="ratioWidth * 0.12 + 'px'">
                                                <template slot-scope="scope">
                                                    <el-input type="textarea" :rows="2" v-model="scope.row['RemotePath']"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column property="LocalPath" label="LocalPath"
                                            :width="ratioWidth * 0.12 + 'px'">
                                                <template slot-scope="scope">
                                                    <el-input type="textarea" :rows="2" v-model="scope.row['LocalPath']"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column property="Time" label="Time"
                                                :width="ratioWidth * 0.03 + 'px'"></el-table-column>
                                            <el-table-column property="Parallel" label="Parallel"
                                                :width="ratioWidth * 0.04 + 'px'"></el-table-column>
                                            <el-table-column property="Release" label="Release"
                                                :width="ratioWidth * 0.04 + 'px'"></el-table-column>
                                            <el-table-column property="Status" label="Status"
                                                :width="ratioWidth * 0.04 + 'px'"></el-table-column>
                                        </el-table>
                                    </el-scrollbar>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button round type="primary" class="el-icon-download" @click=" exportExcel()"></el-button>
                            </div>
                        </el-dialog>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button round type="primary" class="el-icon-tickets"
                            @click="dialogFlowchartVisible = true, createFlowchartTable()"></el-button>
                        <!-- <el-button type="primary" class="el-icon-download" @click=" exportExcel()"></el-button> -->
                    </div>
                </el-dialog>
            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content"></div>
        </el-col>
    </div>
    </div>
</template>
<style>
.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}
</style>

<script>
import draggable from '../../utils/draggable';
import * as XLSX from 'xlsx';
export default {
    directives: {
        draggable,
    },
    data() {
        return {
            valueLight: true,
            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            fixWidth: window.screen.width,
            fixHeight : window.screen.height,
            value_: '',
            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            transferVisible: false,
            currentPara: '',
            currentIndex: null,
            form: { para: this.currentPara },
            dialogFormVisible: false,
            dialogFlowchartVisible: false,
            flowchartVisible: false,
            libData: [],
            filterLibData: [],
            completeLoad : false,
            isCheck: [],
            PARA: '',
            data: '',
            memoryData: '',
            value: [],
            totalMoved: [],
            renderFunc(h, option) {
                return <span>{option.key} - {option.label}</span>;
            },
            flowchartData: [],
            dialogInfoVisible: false,
            infoPara: "",
            infoImgSrc: "",
            searchPlaceholder: 'Search by name...',
        };
    },

    methods: {
        isShowSwitchText(){
            if (this.valueLight == false) {
                return 'Lights On';
            } else {
                return 'Lights Off';
            }
        },
        isLightsOff() {
            if (this.valueLight == false) {
                return "#313131";
            } else {
                return "#f4f5f6";
            }
        },
        isColorWhite() {
            if (this.valueLight == false) {
                return "#ffffff";
            } else {
                return "#000000";
            }
        },
        colorTable(){
            if (this.valueLight == false) {
                return "#000000";
            } else {
                return "#ffffff";
            }
        },
        tranferColor(){
            let root = document.querySelector(":root");
            if (this.valueLight == false) {
                root.style.setProperty("--dialog-color",  "#313131");
                return "#000000";
            } else {
                root.style.setProperty("--dialog-color",  "#ffffff");
                return "#ffffff";
            }
        },

        putDetail(_name){
            try {
                this.infoPara = require("../../jsonFomatter/flowchartPara/" + _name + "/info.json").info
                this.infoImgSrc = "../img/libs/" + _name + ".png"
                
            } catch (e) {
                this.infoPara = ""
                this.infoImgSrc = ""
            }
            
        },

        libNote(_name, _note){
            const h = this.$createElement;
            this.$msgbox({
            title: '',
            confirmButtonText: 'OK',
            message: h('p', null, [
                h('div', null, _name),
                h('div', null, _note),
                // h('i', { style: 'color: teal' }, 'VNode')
            ]),
            showConfirmlButton: false,
            })
        },

        getFlowchartDom(_name){
            this.flowchartVisible = true
            this.$nextTick(()=>{
                let iframedom = document.getElementById("frames");
                iframedom.onload = function () {
                    this.PARA = require("../../jsonFomatter/flowchartPara/" + _name + "/flowchart.json")
                    let _window = iframedom.contentWindow;
                    _window.postMessage(
                        {
                        type: "libSig",
                        message: {
                            flowchart: this.PARA,
                            },
                        },
                        "*"
                    );
                }
            })
        },

        getFlowchartJson(_name) {
            // this.totalMoved = []
            try {
                this.PARA = require("../../jsonFomatter/flowchartPara/" + _name + "/flowchart.json")
            } catch (error) {
                this.PARA = ''
            }
            this.data = [];
            if (this.PARA != '') {
                let i = 0
                this.PARA['nodes'].forEach(element => {
                    this.data.push({
                        key: i,
                        label: `${element['label']}`,
                        para: element['labelCfg']['dataConfig' + element['label']],
                        RemotePath: ''
                    });
                    i = i + 1
                });
            }
            this.assignParaAndPath()
        },

        LeftCheckChange(checks, nochecks) {
            this.isCheck = checks
            console.log(checks)
        },

        modify(_val) {
            if (_val.length == 1) {
                this.currentPara = this.data[_val[0]].para.para
                this.currentIndex = _val[0]
                this.dialogFormVisible = true
            }
        },

        confirmPara() {
            this.data[this.currentIndex].para.para = this.currentPara
        },

        assignParaAndPath() {
            this.data.forEach(dat => {
                this.data[dat.key].RemotePath = ""
                this.totalMoved.forEach(moved => {
                    if (dat.key == moved) {
                        this.data[dat.key].RemotePath = "demoremotepath"
                    }

                });
            });
        },

        handleChange(value, direction, movedKeys) {
            // console.log(checked)
            this.isCheck = []
            this.totalMoved = value
            console.log("------", this.totalMoved, direction, movedKeys);
            if (direction == 'right') {
                // transfer file
                this.assignParaAndPath()
                // this.data.forEach(dat => {
                //     this.data[dat.key].RemotePath = ""
                //     this.totalMoved.forEach(moved => {
                //         if (dat.key == moved) {
                //             this.data[dat.key].RemotePath = "demoremotepath"
                //         }

                //     });
                // });
                this.sleep(2000)
                console.log("transfer..........")
            }
            else {
                this.data.forEach(dat => {
                    this.data[dat.key].RemotePath = ""
                    this.assignParaAndPath()
                });
            }
            // const _ = require("lodash");
            // this.memoryData = _.cloneDeep(this.data);
        },

        sleep(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },

        createFlowchartTable() {
            this.flowchartData = []
            console.log(this.data)
            // this.flowchartData = require("../../jsonFomatter/flowchart_cc.json")
            this.data.forEach(element => {
                let tmpPara = ''
                if (element.RemotePath == '') {
                    tmpPara = element.para.para
                }
                else {
                    tmpPara = ''
                }
                this.flowchartData.push({
                    "Instrument": element.label,
                    "Command": element.para.cmd,
                    "Parameter": tmpPara,
                    "RemotePath": element.RemotePath,
                    "LocalPath": "",
                    "Time": "",
                    "Parallel": "",
                    "Release": "",
                    "Status": ""
                })
                // this.flowchartData[element.key]["Command"] = element.para.cmd
            });
        },

        exportExcel() {
            this.createFlowchartTable()
            const table = this.flowchartData;
            const rowLength = table.length;
            console.log(Object.keys(table[0]))
            // const colLength = Object.keys(table[0]).length ;
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
                // for (let j = 0; j < colLength; j++) {
                //     rowData.push(table.rows[i].cells[j].textContent);
                // }
                data.push(rowData);
            }

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'table.xlsx');
        },
        searchFocus(){
            this.$refs.autoRef.activated = false
        },
        querySearch(queryString, cb) {
            this.filterLibData = []
            this.libData.forEach(libEle => {
                let tmp = []
                libEle.data.filter(ele => {
                    if (ele.name.indexOf(queryString) != -1) {
                        tmp.push(ele)
                    }
                })
                if (tmp.length != 0) {
                    this.filterLibData.push(
                        { "class": libEle.class, "data": tmp }
                    )
                }
            });
            cb(this.filterLibData)
        }
    },
    mounted() {
        // library data
        this.libData = require("../../jsonFomatter/library.json")
        this.filterLibData = this.libData

        window.addEventListener(
            "message",
            (event) => {
                if(event.data.type == "background-color"){
                    this.valueLight = event.data.message.bool
                }
                if(event.data.type == "language-sig"){
                    if (event.data.message.language == 'En') {
                        this.searchPlaceholder = "Search by name..."
                    }
                    if (event.data.message.language == 'Cn') {
                        this.searchPlaceholder = "按名称搜索"
                    }
                }
            },
            false
            );
    }
};
</script>

<style>
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-collapse {
    border-top: 0px solid transparent;
    border-bottom: 0px solid transparent;
}

.el-collapse-item__header {
    /* padding: 3%; */
    margin-left: 6%;
    margin-right: 6%;
    padding-top: 2%;
    color: var(--sideColor);
    background: transparent;
    border-bottom: 0px solid transparent;
}

.el-collapse-item__wrap {
    background: transparent;
    border-bottom: 0px solid transparent;
}


.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
.el-table th {
  background-color: transparent !important;
  border: none;
}
.el-table tr {
  background-color: transparent;
  border: none;
}

.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0) !important;
}
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.el-scrollbar__wrap {overflow-x: hidden;
}
:root{
    --dialog-color: #ffffff
}
.el-dialog{
    top: -8%;
    border-radius: 15px;
    background: var(--dialog-color);
}

.info-class {
    width: 80%;
    word-break: break-word; 
    text-align:left;
    font-size: 16px;
    line-height: 30px;
    font-weight: 300;
}

.el-transfer__button{
    border-radius: 20px;
    color: rgb(0, 0, 0);}

</style>