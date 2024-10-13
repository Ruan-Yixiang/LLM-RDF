<template>
    <!-- <div class="p-main" v-loading="projectLoading"> -->
    <div class="p-main"  v-loading="projectLoading">
        <el-row style=" margin-bottom: 10px;">
            <el-col :span="5">
                <div class="grid-content">&nbsp;</div>
            </el-col>
            <el-col :span="16">
                <el-row>
                    <el-col :span="12">
                        <div style="font-size: large; margin-top: 40px;">
                            Project No.: {{ currentID }}
                        </div>
                    </el-col>
                    <el-col :span="9" >
                        <div style="font-size: large; margin-top: 30px;" align="right"> Loop:
                            <template>
                                <el-input-number v-model="cc_data['loop']" @change="handleLoopChange" :min="0" :max="10" label="描述文字"></el-input-number>
                            </template>
                        </div>
                    </el-col>
                    <!-- <el-col :span="3">
                        <div style="margin: 30px; " align="right">
                            <el-tooltip :content="'mode: ' + mode" placement="top" style="margin-right: 10px; margin-top: 10px">
                                <el-switch
                                    active-value="continous"
                                    inactive-value="single"
                                    :disabled=disable_val
                                    v-model="mode"
                                    >
                                </el-switch>
                            </el-tooltip>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <el-button :disabled=disable_emergency type="warning" round @click="openEmergency()" style="margin-top: 30px">Emergency</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-button :disabled=disable_cc round id="controlButton" :type=showType @click="BOOT()" style="margin-top: 30px">{{ controlButton }}</el-button>
                    </el-col> -->
                </el-row>
                <div :style="{ width: fixWidth * 0.58 + 'px', marginTop: 15 + 'px', marginBottom: -20 + 'px' }">
                    <el-scrollbar class="infinite-list" :style="{ overflowX: 'hidden', height: ratioHeight * 0.6 + 'px', borderRadius: '10px'}">
                        <el-table ref="flowchartTable" :show-header="true" :data="flowchartData" style="border-radius: 10px">
                            <template slot="empty">
                                <span>No more data</span>
                            </template>
                            <el-table-column :width="ratioWidth * 0.04 + 'px'">
                                <template slot-scope="scope">
                                    <el-radio :disabled=disable_radio @change.native="handleSelectionChange(scope.row)" v-model="seleted" :label="scope.row.local_id" border>
                                    </el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column  property="instrument" label="Instrument"
                                :width="ratioWidth * 0.07+ 'px'">
                                <template slot-scope="scope" >{{ scope.row['instrument'] }}
                                    <el-button :disabled=disable_reset circle icon="el-icon-refresh" @click="refresh(scope.row)" v-bind:title="'RESET'">  </el-button>
                                </template>
                            </el-table-column>
                          
                            <el-table-column property="command" label="Command"
                                :width="ratioWidth * 0.046 + 'px'"></el-table-column>
                            <el-table-column property="parameter" label="Parameter" :width="ratioWidth * 0.12 + 'px'">
                                <template slot-scope="scope">
                                    <el-input :readonly="true" type="textarea" :rows="3" v-model="scope.row['parameter']"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column property="remote_path" label="RemotePath" :width="ratioWidth * 0.074 + 'px'">
                                <template slot-scope="scope">
                                    <el-input :readonly="true" type="textarea" :rows="2" v-model="scope.row['remote_path']"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column property="local_path" label="LocalPath" :width="ratioWidth * 0.074 + 'px'">
                                <template slot-scope="scope">
                                    <el-input :readonly="true" type="textarea" :rows="2" v-model="scope.row['local_path']"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column property="time_allowed" label="Time(s)" :width="ratioWidth * 0.052 + 'px'">
                                <template slot-scope="scope">
                                    <el-input :readonly="true" type="textarea" :rows="1" v-model="scope.row['time_allowed']"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column property="parallel" label="Parallel" :width="ratioWidth * 0.035 + 'px'" align="center">
                                <template slot-scope="scope">
                                    <el-button :type="valueDisp(scope.row.parallel)" circle></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="release" label="Release" :width="ratioWidth * 0.039 + 'px'" align="center">
                                <template slot-scope="scope">
                                    <el-button :type="valueDisp(scope.row.release)" circle></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column property="status" label="Status" :width="ratioWidth * 0.032 + 'px'" align="center">
                                <template slot-scope="scope">
                                    <el-button :type="valueDisp(scope.row)" :class="checkStatus(scope.row)" circle></el-button>
                                    <!-- <el-button :class="checkStatus(scope.row)" circle></el-button> -->
                                </template>
                            </el-table-column>
                            <!-- <el-table-column property="Status" label="Status"
                            :width="ratioWidth * 0.04 + 'px'"></el-table-column> -->
                        </el-table>
                        <el-row style="float:right; margin: 20px;">
                            <!-- <el-button round id="buttonTitle" :type=showType @click="changeTitle()">{{ buttonTitle }}</el-button> -->
                            <!-- <el-button round icon="el-icon-folder-opened" @click="importExcel()"
                                v-bind:title="'Import'"></el-button>
                            <el-button round icon="el-icon-download" @click="exportExcel()"
                                v-bind:title="'Export'"></el-button>
                            <el-button round icon="el-icon-upload" @click="submit()" v-bind:title="'Submit'"></el-button> -->
                        </el-row>
                    </el-scrollbar>
                    <div style="margin: 10px; border-top: 2px solid #DCDFE6;" align="right">
                        <el-tooltip :content="'mode: ' + mode" placement="top" style="margin-right: 10px; margin-top: 10px">
                            <el-switch
                                active-value="continous"
                                inactive-value="single"
                                :disabled=disable_val
                                v-model="mode"
                                >
                            </el-switch>
                        </el-tooltip>
                        <el-button :disabled=disable_emergency type="warning" round @click="openEmergency()" style="margin-top: 10px">Emergency</el-button>
                        <el-button :disabled=disable_cc round id="controlButton" :type=showType @click="BOOT()" style="margin-top: 10px">{{ controlButton }}</el-button>
                    </div>

                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import conf from "../../../vue.config";

export default {
    name: "display_general",
    data() {
        return {
            url: conf.backend_url,
            projectLoading: false,
            ratioWidth: window.screen.width,
            ratioHeight: window.screen.height,
            fixWidth: window.screen.width,
            fixHeight : window.screen.height,
            currentID: 0,
            flowchartData: [],
            value_release: true,
            controlButton: "START",
            showType: "primary",
            mode: true,
            disable_val: false,
            disable_radio: false,
            disable_cc: false,
            disable_emergency: false,
            disable_reset: false,
            visibleReset: "",
            seleted: 0,
            currentInstr: "",
            currentInstrStatus: 0,
            currentProjectIsRunning: 0,
            ram_status: 0,
            radioChanger: 0,
            cc_data: 
                {
                    "project_id": 0,
                    "local_id": 0,
                    "action": "stop",
                    "mode": "single",
                    "loop": 0
                }
            
        }
    },
    mounted() {
        if (this.$route.params.createdID != null) {
            this.projectLoading = true
            this.currentID = this.$route.params.createdID
            this.currentProjectIsRunning = this.$route.params.running

            // this.currentProjectIsRunning = this.$route.params.running
            if (this.currentProjectIsRunning == 1) {
                this.controlButton = "STOP"
                this.showType = "danger"
            }
            this.handleData(this.$route.params.createdID)
        }

        window.addEventListener(
            "message",
            (event) => {
                if(event.data.type == "project-sig"){
                    this.projectLoading = true
                    this.currentID = event.data.message.id

                    axios.post("/srv/GET-LOOP",{
                        "id": this.currentID
                    })
                    // axios.post("http://192.168.1.33:5001/api/get-loop",{
                    //     "id": this.currentID
                    // })
                    .then((res) => {
                        console.log("=======", res.data)
                        this.cc_data.loop = res.data['data']['loop']
                    })

                    this.currentProjectIsRunning = event.data.message.running
                    if (this.currentProjectIsRunning == 1) {
                        this.controlButton = "STOP"
                        this.showType = "danger"
                        this.disable_val = true
                        this.disable_radio = true
                    }
                    this.handleData(this.currentID);
                    this.cc_data.project_id = this.currentID
                }
            }
        )

        // RAM currentProjectStatus
        setInterval(() => {
            if (this.currentID != 0) {
                this.getCurrentLocalID()
                this.getCurrentSelectedInstrStatus(this.currentInstr)
                this.projectStatusMonitor()
                // this.checkStatus()
            }
        }, 3000);
    },
    methods: {
        handleLoopChange(){
            console.log(this.cc_data.loop)
        },
        _change(){this.projectLoading = true},
        handleData(_id){
            axios.post(this.url + "/main-page/get-cc-chart", {"id":_id}).then((res) => {
            // axios.post("http://192.168.1.33:5000/api/get-cc-chart", {"id":_id}).then((res) => {
                console.log(">>>>>>>>>>", this.flowchartData)
                this.flowchartData = res['data']['data']

                this.getCurrentLocalID()
                // this.tableData = res['data']['data'];
                // this.total = this.tableData.length;
                // this.hideDiv()
                // this.putBottom()
                // document.getElementById("project").style.display = ""
                // document.getElementById("project").style.zIndex = 991
            })
        },
        
        getCurrentLocalID(){
            if (this.radioChanger == 0) {

                axios.post("/srv/LOCAL-ID-FINDER",
                // axios.post("http://192.168.1.33:5001/api/local-id-finder", 
                {"project_id": this.currentID})
                .then((res) => {
                    console.log(res,"local-id-finder......")
                    this.cc_data.local_id = parseInt(res.data.data.local_id)
                    this.seleted = parseInt(res.data.data.local_id)
                    this.currentInstr = res.data.data.instrument
                    this.projectLoading = false
                })
            }
        },

        handleSelectionChange(val){
            this.radioChanger = 1
            if(val){
                this.seleted = val.local_id;
                this.cc_data.local_id = val.local_id;
                axios.post("/srv/LOCAL-ID-CHANGER", 
                // axios.post("http://192.168.1.33:5001/api/local-id-changer", 
                    {
                        "project_id": this.currentID,
                        "local_id": parseInt(this.seleted)
                    }
                ).then((res) => {
                    console.log(res,"locaid-changer>>>>")
                })
            }
            this.radioChanger = 0
        },

        // main button status
        projectStatusMonitor(){
            axios.post("/srv/GET-PROJECT-STATUS",)
            // axios.post("http://192.168.1.33:5000/api/get-project-status",)
            .then((res) => {
                console.log(res)
                var targetElement = { id: this.currentID };
                // 当前项目在运行
                if (res.data.data.some(item => Object.keys(targetElement).every(key => item[key] === targetElement[key]))) {
                    res.data.data.forEach(element => {
                        if (element["id"] == this.currentID) {
                            const _ = require("lodash");
                            // this.cc_data.loop = _.cloneDeep(element["loop"]);
                            this.cc_data.loop = element["loop"]
                        }
                    });
                    console.log(this.cc_data.loop, ".....")
                    this.currentProjectIsRunning = 1
                    if (this.currentProjectIsRunning == 1 && this.ram_status == 0) {
                        this.controlButton = "STOP"
                        this.showType = "danger"
                    }
                    this.disable_val = true
                    this.disable_radio = true
                    this.disable_cc = false
                    this.disable_reset = true
                } else {
                    this.currentProjectIsRunning = 0
                    // 如果是从运行转到不运行的状态
                    if (this.currentProjectIsRunning == 0 && this.ram_status == 1) {
                        this.controlButton = "START"
                        this.showType = "primary"
                    }
                    this.disable_radio = false
                    this.disable_val = false
                    // 当前项目未运行，但其他有项目正在运行
                    if (res.data.data.length != 0 ) {
                        // this.disable_val = true
                        // this.disable_radio = true

                        // this.disable_cc = true
                        // this.disable_emergency = true
                        this.disable_reset = true
                    }
                    // 当前项目未运行，且没有项目正在运行
                    else{
                        this.disable_cc = false
                        this.disable_emergency = false
                        this.disable_reset = false
                    }
                }
                this.ram_status = this.currentProjectIsRunning
            })

        },


        getCurrentSelectedInstrStatus(_val){
            if (this.currentProjectIsRunning == 1){ 
                if (_val != "" ){ 
                    axios.post("/srv/STA", 
                        {"Instrument": _val})
                    .then((res) => {
                        console.log(res.data,"srv.STA")
                        if (res.data.sta == "Running") {
                            this.currentInstrStatus = 1
                        }
                        else{
                            this.currentInstrStatus = 0
                        }
                    })
                    // axios.post("http://192.168.1.33:5000/api/sta", 
                    //     {"Instrument": _val})
                    // .then((res) => {
                    //     if (res.data.sta == "Running") {
                    //         this.currentInstrStatus = 1
                    //     }
                    //     else{
                    //         this.currentInstrStatus = 0
                    //     }
                    // })
                }
            }
            else{
                this.currentInstrStatus = 0
            }
        },

        BOOT(){
            this.cc_data.project_id = this.currentID
            if (this.mode == true) {
                this.cc_data.mode = this.mode
            }
            else{
                this.cc_data.mode = this.mode
            }
            if (this.controlButton == "START"){
                this.cc_data.action = "start"
                this.controlButton = "STOP"
                this.showType = "danger"
                this.disable_val = true
                this.disable_radio = true
            }
            else{
                this.cc_data.action = "stop"
                this.cc_data.mode = "single"
                this.controlButton = "START"
                this.showType = "primary"
                this.disable_val = false
                this.disable_radio = false

                this.currentProjectIsRunning = 0   //self judge
            }
            axios.post("/srv/SRV", this.cc_data).then((res) => {
                console.log(this.cc_data, "%%%%%%%%%%%%")
            })
            // axios.post("http://192.168.1.33:5001/api/cc", this.cc_data).then((res) => {
            //     console.log(this.cc_data, "////////")
            // })
        },

        openEmergency(){
            let tmp = {
                "user": "dell",
                "Instrument": this.currentInstr,
                "Command": "",
                "CMD": "",
                // "CMD": 'QUERY',
                "Parameter": "",
                "Para": "",
                "RemotePath": "",
                "LocalPath": "",
                "Time": 80000,
                "TimeAllowed": 80000,
                "Parallel": false,
                "Release": false,
                "Status": false
            }

            console.log(this.cc_data)
            this.cc_data.action = "Emergency"
            tmp.CMD = "Emergency"
            tmp.Command = "Emergency"
            axios.post("/srv/CMD", tmp).then((res) => {
                
            })
            // axios.post("http://192.168.1.33:5001/api/cc", this.cc_data).then((res) => {
                
            // })
            this.$confirm('Emergency', 'hint', {
                confirmButtonText: 'Continue',
                cancelButtonText: 'Break',
                type: 'warning'
            }).then(() => {
                console.log("Continue!")
                this.cc_data.action = "Resume"
                tmp.CMD = "Resume"
                tmp.Command = "Resume"
                axios.post("/srv/CMD", tmp).then((res) => {
                    
                })
                // axios.post("http://192.168.1.33:5001/api/cc", this.cc_data).then((res) => {
                    
                // })
                this.$message({
                    type: 'success',
                    message: 'Continue!'
                });
            }).catch(() => {
                console.log("Break!")
                this.cc_data.action = "Break"
                tmp.CMD = "Break"
                tmp.Command = "Break"
                axios.post("/srv/CMD", tmp).then((res) => {
                    this.cc_data.action = "stop"
                    axios.post("/srv/SRV", this.cc_data).then((res) => {
                        this.controlButton = "START"
                        this.showType = "primary"
                        this.disable_val = false
                        this.disable_radio = false
                    })
                })
                // axios.post("http://192.168.1.33:5001/api/cc", this.cc_data).then((res) => {
                //     this.cc_data.action = "stop"
                //     axios.post("http://192.168.1.33:5001/api/cc", this.cc_data).then((res) => {
                //         this.controlButton = "START"
                //         this.showType = "primary"
                //         this.disable_val = false
                //         this.disable_radio = false
                //     })
                // })
                this.$message({
                    type: 'info',
                    message: 'Break!'
                });          
            });
        },

        refresh(_val){
            let tmp = {
                "user": "dell",
                "Instrument": _val.instrument,
                "Command": "RESET",
                "CMD": "RESET",
                "Parameter": "",
                "Para": "",
                "RemotePath": "",
                "LocalPath": "",
                "Time": 80000,
                "TimeAllowed": 80000,
                "Parallel": false,
                "Release": false,
                "Status": false
            }
            axios.post("/srv/CMD", tmp).then((res) => {
                
            })
            // axios.post("http://192.168.1.33:5001/api/cmd", tmp).then((res) => {
                
            // })
        },

        checkStatus(_val){
            if (_val.local_id == this.seleted && this.currentInstrStatus == 1) {
                return "flash animated infinite"
            }
            else{
                return ""
            }
        },

        valueDisp(_val){
            if (_val.local_id == this.seleted && this.currentInstrStatus == 1) {
                return "success"
            }
            else{
                return "info"
            }
        }
    }
}
</script>

<style>
:root{
  --indicate-gap: 0;
  --main-color: #f4f5f6;
  --main-font-color: #000000;
  --header-btn-con-width: 0;
  --header-btn-sub-con-width:0;
}
.p-main{
  background-color: var(--main-color) ;
  color: var(--main-font-color) ;
  position: 'relative';
  /* width: 1920; */
  /* height: var(--main-height); */
}


.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.animated.infinite {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.flash {
  -webkit-animation-name: flash;
  animation-name: flash;
}

@-webkit-keyframes flash {
  0%,
  100%,
  50% {
    opacity: 1;
    transform: scale(1);
  }

  25%,
  75% {
    opacity: 0.4;
    transform: scale(1);
  }
}

@keyframes flash {
  0%,
  100%,
  50% {
    opacity: 1;
    transform: scale(1);
  }
  /* 0%, */
  25%,
  50% {
    opacity: 0.5;
    transform: scale(1);
  }
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>