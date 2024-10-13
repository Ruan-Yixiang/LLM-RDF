<template>
    <div class="p-main" v-loading="projectLoading">
      <el-row style="margin-bottom: 10px;" >
        <el-col :span="5"><div class="grid-content"></div></el-col>
        <el-col :span="16">
          <div class="header-icon-con">
            <el-row>
              <div style="font-size: 34px; position: relative;" class="grid-content" >
                {{ project_info.projectname }}
                <div class="grid-content header-icon el-icon-time" v-bind:title="headerIcon[0]">
                  {{ project_info.time }} min
                </div>
                <div class="grid-content header-icon el-icon-finished" v-bind:title="headerIcon[1]">
                  {{ res_table_data['Number of Termination'] }}
                </div>
                <div class="grid-content header-icon el-icon-tickets" v-bind:title="headerIcon[2]">
                  {{ res_table_data['Number of Experiments'] }}
                </div>
                <div class="grid-content header-icon el-icon-medal" v-bind:title="headerIcon[3]">
                  {{ res_table_data['Current Optimum'] }}
                </div>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="4" >
        </el-col>
        <el-col :span="4"><div class="grid-content"></div></el-col>
      </el-row>
      <el-row >
        <el-col :span="5"><div class="grid-content"></div></el-col>
        <el-col :span="16">
          <div class="grid-content header-btn-con" :style="{position: 'relative', width: fixWidth * 0.58 + 'px'}">
            <div  :style="{position: 'absolute', marginLeft: fixWidth *0.435 + 'px', marginTop: -25 + 'px', zIndex: 999}">
              <el-row >
                <el-col :span="8">
                  <div class="grid-content" >
                    <a v-bind:title="refreshBtn"><div class="head-btn el-icon-refresh"  @click="refresh()"></div></a>
                  </div>
                </el-col>
                <el-col :span="8" >
                  <div class="grid-content" style="margin-left: 10px; margin-bottom: -20px;">
                    <a v-bind:title="loadBtn"><div class="head-btn el-icon-folder-opened" @click="getUserData(),dialogTableVisible = true"></div></a>
                    <el-dialog :modal-append-to-body="false" style="width:102%; margin-top:-80px" :title="displayTable" :visible.sync="dialogTableVisible" v-draggable>
                      <el-table v-loading="userDataLoading" style="height:550px"
                        :data="userData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                        highlight-current-row @current-change="handleCurrentChange">
                        <el-table-column property="id" :label="displayTableTitle[0]" width="64"></el-table-column>
                        <el-table-column property="order_name" :label="displayTableTitle[1]" width="200"></el-table-column>
                        <el-table-column property="status" :label="displayTableTitle[2]" width="120"></el-table-column>
                        <el-table-column property="type" :label="displayTableTitle[3]" width="150"></el-table-column>
                        <el-table-column property="name" :label="displayTableTitle[4]" width="100"></el-table-column>
                        <el-table-column property="create_time" :label="displayTableTitle[5]" width="200"></el-table-column>
                        <el-table-column width="80">
                          <template slot-scope="scope">
                              <a @click="loadAll(scope.row)">
                                  <i class="el-icon-document"></i>
                              </a>
                          </template>
                        </el-table-column>
                      </el-table>
                      <span slot="footer" class="dialog-footer">
                        <div>
                          <el-pagination class="custom-pagination" style="float:center;" background layout="prev, pager, next"
                            :total="total" @current-change="current_change">
                          </el-pagination>
                        </div>
                        <div style="margin-top: 20px;">
                        </div>
                      </span>
                    </el-dialog>
                  </div>
                </el-col>
                <el-col :span="8" >
                  <div class="grid-content" style="margin-left: 20px;"  >
                    <a v-bind:title="resetBtn"><div class="head-btn el-icon-set-up" @click="resetFun()"></div></a>
                  </div>
                </el-col>
              </el-row>
            </div>

              <el-tabs v-model="valueTabs"  style="{position: relative}">
                <el-tab-pane  name="first">
                  <div slot="label"><i class="el-icon-s-unfold"></i>{{ displayTab[0] }}</div>
                      <div style="overflow: auto">
                        <el-scrollbar
                          class=" infinite-list "
                          style="overflow-x: hidden;
                          height: 680px; margin-top: 20px"
                          :native="false"
                          :noresize="false"
                          tag="section"
                          align="center"
                        >
                          <div
                            v-for="(item, index) in reaction_status"
                            :key="index"
                            style="margin-top: 0px"
                          >
                            <el-row>
                              <div  style="margin-right: 20px; margin-top: 15px;">
                                <el-collapse>
                                    <el-collapse-item  name="1" >
                                      <template  slot="title">
                                        <span >
                                          <el-row >
                                            <el-col :span="4" style="margin-left: 20px">
                                              <div :style="{float: 'left', fontSize: 20 + 'px', color: isColorWhite()}">Reaction {{ index }}</div>
                                            </el-col>
                                            <el-col :span="2" style="margin-left: -30px;">
                                                <div  class="grid-content indicate"  v-bind:title="'synthesis'" >
                                                    <el-button :type="checkType(reaction_status[index]['synthesis'])" :class="checkFlash(reaction_status[index]['synthesis'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div  class="grid-content indicate"  v-bind:title="'react'" >
                                                    <el-button :type="checkType(reaction_status[index]['react'])" :class="checkFlash(reaction_status[index]['react'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'workup'">
                                                    <el-button :type="checkType(reaction_status[index]['workup'])" :class="checkFlash(reaction_status[index]['workup'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'transfer'">
                                                    <el-button :type="checkType(reaction_status[index]['transfer'])" :class="checkFlash(reaction_status[index]['transfer'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'transport'">
                                                    <el-button :type="checkType(reaction_status[index]['transport'])" :class="checkFlash(reaction_status[index]['transport'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'upload'">
                                                    <el-button :type="checkType(reaction_status[index]['upload'])" :class="checkFlash(reaction_status[index]['upload'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'analyze'">
                                                    <el-button :type="checkType(reaction_status[index]['analyze'])" :class="checkFlash(reaction_status[index]['analyze'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'download'">
                                                    <el-button :type="checkType(reaction_status[index]['download'])" :class="checkFlash(reaction_status[index]['download'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'back_transport'">
                                                    <el-button :type="checkType(reaction_status[index]['back_transport'])" :class="checkFlash(reaction_status[index]['back_transport'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="grid-content indicate" v-bind:title="'back_transfer'">
                                                    <el-button :type="checkType(reaction_status[index]['back_transfer'])" :class="checkFlash(reaction_status[index]['back_transfer'])" circle>&#12288</el-button>
                                                </div>
                                            </el-col>
                                          </el-row>
                                        </span>
                                      </template>
                                      <template>
                                        <span >
                                          <el-table
                                            :cell-style="{'text-align':'center' }"
                                            :header-cell-style="{'text-align':'center'}"
                                            :data="[reaction_info[index]]">
                                            <el-table-column
                                              v-for="column in reaction_info_title[index]"
                                              :key="column.label"
                                              :prop="column.prop"
                                              :label="column.label"
                                            >
                                            </el-table-column>
                                          </el-table>
                                        </span>
                                      </template>
                                    </el-collapse-item>
                                </el-collapse>
                              </div>
                            </el-row>
                            <el-divider></el-divider>
                          </div>
                        </el-scrollbar>
                      </div>
                </el-tab-pane>

                <el-tab-pane label="Status" name="forth">
                  <span slot="label"><i class="el-icon-s-platform"></i> {{ displayTab[1] }}</span>
                  <el-row>
                    <div class="container">
                      <div align="center"  class="son el-table" :style="{ width: '880px', display: isShowTable()}">
                        <el-table
                          border
                          :cell-style="{'text-align':'center' }"
                          :header-cell-style="{'text-align':'center'}"
                          :show-header="true"
                          :data="trans_device_status">
                            <template slot="empty">
                              <span>{{tableEmptySpan}}</span>
                            </template>
                            <el-table-column
                              v-for="column in device_status_title"
                              :key="column.label"
                              :prop="column.prop"
                              :label="column.label"
                              >
                            </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </el-row>
                </el-tab-pane>

                <el-tab-pane label="Plates" name="second">
                  <span slot="label"><i class="el-icon-s-grid"></i> {{ displayTab[2] }}</span>
                  <el-scrollbar
                    class="infinite-list "
                    style="overflow-y: hidden;
                    height: 700px; margin-top: 0px"
                    :native="false"
                    :noresize="false"
                    tag="section"
                    align="center"
                  >
                    <div
                      v-for="(item, index) in trans_plate_info"
                      :key="index"
                      style="margin-top: 50px"
                    >
                    <div :class="plateBorder()">
                        <!-- hole -->
                        <div align="center"  class=" div-b el-table" >
                          <el-table
                            :cell-style="{border:0 + 'px','text-align':'center' }"
                            :row-style="{height: calPadding(item.nrows) + 'px'}"
                            :show-header="false"
                            :data="trans_plate_info[index].reaction">
                              <el-table-column
                                v-for="column in plata_info_title[index]"
                                :key="column.label"
                                :prop="column.prop"
                                :label="column.label"
                                >
                                <div
                                  class="circle"
                                  :style="{height:calSize(item.nrows) + 'px',width: calSize(item.nrows)+'px' }">
                                </div>
                              </el-table-column>
                          </el-table>
                        </div>
                        <!-- info -->
                        <div align="center"  class=" div-c el-table" >
                          <el-table
                            :cell-style="{border:0 + 'px','text-align':'center' }"
                            :row-style="{height: calPadding(item.nrows) + 'px'}"
                            :show-header="false"
                            :data="trans_plate_info[index].reaction">
                              <el-table-column
                                v-for="column in plata_info_title[index]"
                                :key="column.label"
                                :prop="column.prop"
                                :label="column.label"
                                >
                              </el-table-column>
                          </el-table>
                        </div>
                      </div>
                    <div style="font-size: 20px;">{{ item.name }}</div>
                    <el-divider></el-divider>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>

                <el-tab-pane label="Charts" name="third">
                  <span slot="label"><i class="el-icon-s-data"></i> {{ displayTab[3] }}</span>
                  <div style="height: 1000px;">
                    <el-row>
                      <el-col :span="14">
                        <div align="center" class="grid-content " id="myChart" :style="{ width: fixWidth * 0.6 + 'px', height: '380px'} "></div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="14">
                        <div align="center" class="grid-content " id="piChart" :style="{ width: fixWidth * 0.6 + 'px', height: '380px'} "></div>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
              </el-tabs>
          </div>
          </el-col>
        <el-col :span="4"><div class="grid-content"></div></el-col>
      </el-row>
      </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import * as echarts from "echarts";
import conf from "../../config";
Vue.prototype.$echarts = echarts;
import DevicePixelRatio from '../../utils/devicePixelRatio'
import draggable from '../../utils/draggable';

export default {
  directives: {
      draggable,
  },
  data() {
    return {
      ratioHeight: window.screen.height,
      ratioWidth: window.screen.width,
      fixWidth: window.screen.width,
      fixHeight : window.screen.height,
      primaryColor: '#000000',
      url: conf.backend_url,
      valueLights: true,
      valueTabs: "first",
      dialogTableVisible: false,
      project_info: {},
      reaction_status: [],
      reaction_info: [],
      reaction_info_title: [],
      plate_info: [],
      plata_info_title: [],
      trans_plate_info: [],
      res_chart_data: {},
      trans_chart_data: [],
      res_pi_data: {},
      trans_pi_data:[],
      res_table_data:{},
      device_status: [],
      trans_device_status: [],
      device_status_title: [
        {
          label: "Device",
          prop: "Device",
        },
        {
          label: "Status",
          prop: "Status",
        },
        {
          label: "Operation",
          prop: "Operation",
        },
        {
          label: "Reaction",
          prop: "Reaction",
        },
      ],
      activeName: "first",
      userData: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
      nowRow: null,
      currentID: null,
      myChart: null,
      piChart: null,
      projectLoading: false,
      userDataLoading: false,
      displayTab: ['Reactions','Status','Plates','Charts',],
      displayTableTitle: ['','','','','','',],
      displayTableBtn: ['Cancel', ' OK '],
      displayTable: 'Load',
      languageVal: 'En',
      refreshBtn: 'Refresh',
      loadBtn: 'Load',
      resetBtn: 'Reset',
      headerIcon: ['Time','Number of Termination','Number of Experiments','Current Optimum',],
      tableEmptySpan: '',
    };
  },
  mounted() {
    let root = document.querySelector(":root")
    root.style.setProperty("--indicate-gap", this.fixWidth / 1920 * 55 + "px")
    root.style.setProperty("--main-height", window.screen.height + 'px')
    root.style.setProperty("--header-icon-con-width", this.fixWidth *0.58 + "px")
    root.style.setProperty("--header-btn-con-width", this.fixWidth *0.58 + "px")
    root.style.setProperty("--header-btn-sub-con-width", this.fixWidth *0.435 + "px")
    var piDom = document.getElementById("piChart");
    if (this.piChart == null) {
      this.piChart = echarts.init(piDom);
    }
    var chartDom = document.getElementById("myChart");
    if (this.myChart == null) {
      this.myChart = echarts.init(chartDom);
    }
    this.initRatio()
    this.handleRatio()
    // default light mode
    this.valueLights = this.$route.params.backgroundColor
    console.log("--------  get created id", this.$route.params.createdID)
    // created project ID
    if (this.$route.params.createdID != null) {
      console.log("+++++++++ i get new id",  this.$route.params.createdID)
      this.handleData(this.$route.params.createdID)
    }
    window.addEventListener(
      "message",
      (event) => {
        if(event.data.type == "background-color"){
          this.valueLights = event.data.message.bool
          let root = document.querySelector(":root");
          if (this.valueLights == false) {
            root.style.setProperty("--dialog-title-color", "#ffffff")
            root.style.setProperty("--dialog-bg-clr", "#000000")
            root.style.setProperty("--main-color", "#313131")
            root.style.setProperty("--main-font-color", "#ffffff")
          }
          else {
            root.style.setProperty("--dialog-title-color", "#000000")
            root.style.setProperty("--dialog-bg-clr", "#ffffff")
            root.style.setProperty("--main-color", "#f4f5f6")
            root.style.setProperty("--main-font-color", "#000000")
          }
          this.isLightsOff()
          this.isColorWhite()
        }
        if(event.data.type == "project-sig"){
          this.projectLoading = true
          this.handleData(event.data.message.id);
          this.currentID = event.data.message.id;
        }
        if(event.data.type == "language-sig"){
          if (event.data.message.language == 'En') {
            this.setEn()
          }
          if (event.data.message.language == 'Cn') {
            this.setCn()
          }
        }
      },
      false
      );
      // setInterval(() => {
      //   this.refresh();
      // }, 3000);
    },
    methods: {
    _change(){this.projectLoading = true},
    initRatio(){
      if (window.devicePixelRatio < 1) {
          this.ratioHeight = this.ratioHeight /  window.devicePixelRatio
          this.ratioWidth = this.ratioWidth /  window.devicePixelRatio
      }
    },
    handleRatio(){
      let t = this
      let de = new DevicePixelRatio()
      de._addHandler(window, 'resize', function() {
        if (window.devicePixelRatio < 1) {
            t.ratioHeight = t.ratioHeight /  window.devicePixelRatio
            t.ratioWidth = t.ratioWidth /  window.devicePixelRatio
        }
      })
    },
    plateBorder(){
      if (this.valueLights == false) {
        return 'div-relative-white'
      }
      else{
        return 'div-relative-black'

      }
    },

    isShowTable(){
      if (this.trans_device_status.length != 0) {
        return ''
      }
      else{
        return 'none'
      }
    },

    // backgrand
    isShowSwitchText(){
      if (this.valueLights == false) {
        return 'Lights On';
      } else {
        return 'Lights Off';
      }
    },
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

    // get uder data from backend
    getUserData() {
      this.userDataLoading = true
      axios.post(this.url + "/main-page/get-projects").then((res) => {
        this.userData = res["data"];
        this.total = this.userData.length;
        this.userDataLoading = false
      });

      // this.userData = require("../../jsonFomatter/user_data.json");

    },

    current_change: function (currentPage) {
      this.currentPage = currentPage;
    },

    handleCurrentChange(val) {
      this.currentRow = val;
      this.nowRow = val;
    },

    cancel() {
      this.dialogTableVisible = false;
    },

    resetFun() {
      let msgList = ['ENSURE ALL INSTRUMENTS SAFETY!', 'WARNING', 'OK', 'Cancel']
      if (this.languageVal == 'Cn') {
        msgList = ['复位前确保所有设备安全！', '警告', '确定', '取消']
      }
      this.$confirm(msgList[0], msgList[1], {
        customClass: "confirm-dialog",
        confirmButtonText: msgList[2],
        cancelButtonText: msgList[3],
        type: "warning",
      })
      .then(() => {
        axios.post(this.url + "/display-optimization/reset", {
          id: this.currentID
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            this.handleData(this.currentID);
            this.$message({
              type: "success",
              message: "reset success!",
            });
          } else {
            this.$message({
              type: "error",
              message: "reset failed!",
            });
          }
        });
      });
    },

    refresh() {
      // this.piChart=echarts.init(document.getElementById("piChart"));
      if (this.currentID != null) {
        this.handleData(this.currentID);
      }
    },

    loadAll(_val) {
      this.nowRow = _val
      if (this.nowRow == null) {
        this.$message({
          message: "No Item Selected",
          type: "warning",
        });
      } else {
        this.handleData(this.nowRow.id);
        this.currentID = this.nowRow.id;
        this.dialogTableVisible = false;
      }
    },

    handleData(_val) {
      // this.projectLoading = true
      axios
        .post(this.url + "/display-optimization/load", {
          id: _val,
        })
        .then((res) => {
          this.project_info = res["data"]["project_info"];
          this.reaction_status = res["data"]["reaction_status"];
          this.reaction_info = res["data"]["reaction_info"];
          this.plate_info = res["data"]["plate_info"];
          this.res_chart_data = res["data"]["res_chart"];
          this.device_status = res["data"]["device_status"];
          this.res_pi_data =  res["data"]["pi_chart"];
          this.res_table_data = res["data"]["res_table"];

          //sim data
          // this.project_info = require("../../jsonFomatter/project_info.json");
          // this.reaction_status = require("../../jsonFomatter/reaction_status.json");
          // this.reaction_info = require("../../jsonFomatter/reaction_info.json");
          // this.plate_info = require("../../jsonFomatter/plate_info.json");
          // this.res_chart_data = require("../../jsonFomatter/res_chart.json");
          // this.device_status = require("../../jsonFomatter/device_status.json");
          // this.res_pi_data =  require("../../jsonFomatter/pi_chart.json");
          // this.res_table_data = require("../../jsonFomatter/res_table.json");
          // ⬆ ⬆ ⬆ ⬆ ⬆

          const now = new Date();

          const year = now.getFullYear();
          const month = ('0' + (now.getMonth() + 1)).slice(-2);
          const day = ('0' + now.getDate()).slice(-2);
          const hours = ('0' + now.getHours()).slice(-2);
          const minutes = ('0' + now.getMinutes()).slice(-2);
          const seconds = ('0' + now.getSeconds()).slice(-2);

          const formattedTime = year + '-' + month + '-'  + day + ' ' + hours + ':'  + minutes + ':' + seconds;

          console.log(formattedTime + " pi", this.res_pi_data);
          console.log(formattedTime + " >>>", this.reaction_status);
          this.handleReactionInfo();
          this.handlePlateInfo();
          this.handleResChart();
          this.handlePiChart();
          this.handleDeviceStatus();
          this.projectLoading = false
        });
    },

    handleReactionInfo() {
      //reaction info
      {
        // dynamic title
        this.reaction_info_title = [];
        this.reaction_info.forEach((element) => {
          let tmp = [];
          let keys = Object.keys(element);
          keys.forEach((key) => {
            tmp.push({
              label: key,
              prop: key,
            });
          });
          this.reaction_info_title.push(tmp);
        });
      }
    },

    handlePlateInfo() {
      //plate info
      {
        const _ = require("lodash");
        this.trans_plate_info = _.cloneDeep(this.plate_info);
        this.trans_plate_info.forEach((plate) => {
          let tmp_0 = [];
          plate.reaction.forEach((cols) => {
            let i = 1;
            let tmp_1 = {};
            cols.forEach((col) => {
              tmp_1[i] = col;
              i = i + 1;
            });
            tmp_0.push(tmp_1);
          });
          plate.reaction = tmp_0;
        });

        let i = 0;
        this.plate_info.forEach((element) => {
          let tmp = [];
          let keys = Object.keys(this.trans_plate_info[i].reaction[0]);
          keys.forEach((key) => {
            tmp.push({
              label: key,
              prop: key,
            });
          });
          this.plata_info_title.push(tmp);
          i = i + 1;
        });
      }
    },

    handleResChart() {
      //reschart
      {
        var chartDom = document.getElementById("myChart");
        if (this.myChart == null) {
          this.myChart = echarts.init(chartDom);
        }
        // var myChart = echarts.init(chartDom);
        var option;
        this.trans_chart_data = []
        let xLabel = []
        for (
          let index = 0;
          index < this.res_chart_data[Object.keys(this.res_chart_data)[0]].length;
          index++
        ) {
          xLabel.push(index - 1)
          this.trans_chart_data.push([
            index ,
            this.res_chart_data[Object.keys(this.res_chart_data)[0]][index],
          ]);
        }
        option = {
          tooltip: {
            formatter:function(datas) {
              return datas.value[1].toFixed(2);
            }
          },
          xAxis: [{
            // data: xLabel,
            boundaryGap: false ,
            min: 0,
            interval: 1,
            name: "Reaction No.",
            nameLocation: "middle",
            nameTextStyle:{
              padding:[10,0,0,0],
              fontSize: 14
            }
          }],
          yAxis: {
            name: Object.keys(this.res_chart_data)[0],
            nameTextStyle:{
              fontSize: 14
            }
          },
          series: [
            {
              symbolSize: 15,
              data: this.trans_chart_data,
              type: "scatter",
            },
          ],
        };
        option && this.myChart.setOption(option);
      }
    },

    handlePiChart(){
      // var PIDom = document.getElementById("piChart");
      // var piChart = echarts.init(PIDom);
      var option;
      const markLine = [];
      this.trans_pi_data = []
      let yArr = []
      for (
        let index = 0;
        index < this.res_pi_data[Object.keys(this.res_pi_data)[0]].length;
        index++
      ) {
        this.trans_pi_data.push([
          index + 1,
          this.res_pi_data[Object.keys(this.res_pi_data)[0]][index],
        ]);
        yArr.push(
          this.res_pi_data[Object.keys(this.res_pi_data)[0]][index],
        );
      }
      // add threshold to decide min number
      yArr.push(this.res_pi_data.pi_threshold)
      let yMin = Math.min(...yArr)
      var eformat = yMin.toExponential()
      var tmpArr = eformat.match(/(.?\d.?\d*)e(.?\d*)/)
      markLine.push({
        name: 'threshold',
        yAxis: this.res_pi_data.pi_threshold,
        label: {
          formatter: '{b}',
          // position: positions[i]
        }
      });
      option = {
        tooltip: {
          trigger: 'item',
          position: 'left',
          formatter:function(datas) {
            return datas.value[1].toFixed(6);
          }
        },
        animation: false,
        textStyle: {
          fontSize: 14
        },
        xAxis: {
          min: 1,
          interval: 1,
          name: "...",
          nameLocation: "middle",
          nameTextStyle:{
            padding:[10,0,0,0]
          }
        },
        yAxis: {
          // min:0.0000001,
          min: (10 **(Number(tmpArr[2]))) / 10,
          name: "PI",
          // max: 0,
          type: 'log'
        },
        series: [
          {
            name: 'line',
            type: 'line',
            stack: 'all',
            symbolSize: 6,
            data: this.trans_pi_data,
            markLine: {
              precision: 7,
              data: markLine,
              label: {
                distance: [-800, 8]
              }
            }
          }
        ],
      };
      option && this.piChart.setOption(option);
    },

    handleDeviceStatus() {
      //device_status
      {
        this.trans_device_status = [];
        this.device_status.forEach((device) => {
          let tmp = {};
          tmp.Device = device[0];
          tmp.Status = device[1];
          tmp.Operation = device[2][0]
          // let str = "";
          // device[2].forEach((react) => {
          //   str = str + react.toString() + " ";
          // });
          tmp.Reaction = device[2][1];
          this.trans_device_status.push(tmp);
        });
      }
    },

    calSize(_rows) {
      if (_rows == 1) {
        return 300;
      }
      if (_rows == 2) {
        return 170;
      }
      if (_rows == 4) {
        return 95;
      }
      if (_rows == 5) {
        return 65;
      }
      if (_rows == 8) {
        return 45;
      }
    },

    calPadding(_rows) {
      if (_rows == 1) {
        return 550;
      }
      if (_rows == 2) {
        return 275;
      }
      if (_rows == 4) {
        return 136;
      }
      if (_rows == 5) {
        return 110;
      }
      if (_rows == 8) {
        return 69;
      }
    },

    checkType(_val) {
      if (_val == 0) {
        return "primary";
      }
      if (_val == 1) {
        return "success";
      }
      if (_val == 2) {
        return "";
      }
    },

    checkFlash(_val) {
      if (_val == 1) {
        return "flash animated infinite";
      } else {
        return "";
      }
    },

    setEn(){
      this.displayTab[0] = 'Reactions'
      this.displayTab[1] = 'Status'
      this.displayTab[2] = 'Plates'
      this.displayTab[3] = 'Charts'
      this.valueTabs = 'second'
      this.valueTabs = 'first'
      this.displayTableTitle[0] = 'ID'
      this.displayTableTitle[1] = 'Name'
      this.displayTableTitle[2] = 'Status'
      this.displayTableTitle[3] = 'Type'
      this.displayTableTitle[4] = 'Owner'
      this.displayTableTitle[5] = 'Create Time'
      this.displayTableBtn[0] = 'Cancel'
      this.displayTableBtn[1] = ' OK '
      this.displayTable = 'Load'
      this.refreshBtn = 'Refresh'
      this.loadBtn = 'Load'
      this.resetBtn = 'Reset'
      this.headerIcon[0] = 'Time'
      this.headerIcon[1] = 'Number of Termination'
      this.headerIcon[2] = 'Number of Experiments'
      this.headerIcon[3] = 'Current Optimum'
      this.tableEmptySpan = 'No more data'
    },
    setCn(){
      this.displayTab[0] = ' 反应'
      this.displayTab[1] = ' 状态'
      this.displayTab[2] = ' 孔板'
      this.displayTab[3] = ' 图表'
      this.valueTabs = 'second'
      this.valueTabs = 'first'
      this.displayTableTitle[0] = '序号'
      this.displayTableTitle[1] = '名称'
      this.displayTableTitle[2] = '状态'
      this.displayTableTitle[3] = '类型'
      this.displayTableTitle[4] = '所有者'
      this.displayTableTitle[5] = '创建时间'
      this.displayTableBtn[0] = '取消'
      this.displayTableBtn[1] = '确认'
      this.displayTable = '加载'
      this.refreshBtn = '刷新'
      this.loadBtn = '加载'
      this.resetBtn = '重置'
      this.headerIcon[0] = '时间'
      this.headerIcon[1] = '已完成数'
      this.headerIcon[2] = '进行中'
      this.headerIcon[3] = '当前最优'
      this.tableEmptySpan = '无数据'
    },
    handleLan(){
      if (this.languageVal == 'En') {
        this.setEn()
      }
      if (this.languageVal == 'Cn') {
        this.setCn()
      }
    },
  },
};
</script>

<style>
/* :root{

} */
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
  height: var(--main-height);
}

.header-icon{
  float: right; margin-top: 20px; margin-left: 30px; font-size: 25px;
}

.header-icon-con{
  width: var(--header-icon-con-width);
   margin-top: 30px;
    margin-bottom: -20px
}

.header-btn-con{
  position: 'relative';
   width: var(--header-btn-con-width);
}

.header-btn-sub-con{
  position: 'absolute';
  margin-left: var(--header-btn-sub-con-width);
  margin-top: -40px;
  /* margin-bottom: -10px; */
  z-index: 999
}
.circle {
  margin: auto;
  border-radius: 50%;
  border: 2px solid;
}

.div-relative-black {
  position: relative;
  color: #000;
  border: 2px solid #000;
  border-radius: 10px;
  width: 980px;
  height: 560px;
}



.div-relative-white {
  position: relative;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 10px;
  width: 980px;
  height: 560px;
}

.div-a {
  position: absolute;
  /* left: 30px;
            top: 30px; */
  /* background: #F00; */
  /* width: 2000px;
            height: 800px */
}

.div-b {
  position: absolute;
  /* left: 550px;
            top: 60px; */
  /* background: #FF0; */
  /* width: 600px; */
  /* height: 1000px */
}

.div-c {
  position: absolute;
  /* left: 80px;
            top: 80px; */
  background: #eaeaec;
  /* width: 1000px; */
  /* height: 300px */
}

.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  /* background: #1890FF; */
}

.el-tabs__item {
  font-size: 24px !important;
  color: var(--primary-color) !important;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.table >>> .el-table th {
  background-color: transparent !important;
}

.table >>> .el-table tr {
  background-color: transparent !important;
}
.table >>> .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
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
.el-table td {
  background-color: transparent;
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

.head-btn{
    position: relative;
    display: flex;
    font-size: 26px;
    height: 40px;
    width: 90px;
    padding: 8px;
    margin-right: 10px;
    margin-top: 15px;
    background-color: #f7f7f7;
    color: #000;
    text-decoration: none;
    justify-content: center; /* Horizontal centering */
    align-items: center; 
    border-radius: 20px;
    font-weight: 500;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.button {
  width: 80px;
  height: 35px;
  line-height: 5px;
  display: inline-block;
  padding: 14px 14px;
  border-radius: 6px;
  color: #fff;
  background: #46a0fc;
  border: 1px solid #46a0fc;
  margin-top: 20px;
  margin: 0px;
  cursor: pointer;
  font-size: 18px;
}

.custom-pagination .btn-prev,
.custom-pagination .btn-next {
  background-color: #c0c4cc;
  border-color: #c0c4cc;
  border-radius: 15px !important;
}

.custom-pagination .el-pager li {
  background-color: #fff !important;
  border-radius: 15px !important;
}

.custom-pagination .el-pager li.active {
  background-color: #7ebbf8 !important;
}


.indicate {
  margin-left: var(--indicate-gap);
  z-index: 999;
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
.container {
  height: 420px;
  position: relative;
  /* background-color: black; */
}
.son {
  /* width: 300px; */
  height: 300px;
  /* background-color: white; */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.el-collapse {
  border-top: 0px solid transparent;
  border-bottom: 0px solid transparent;
}

.el-collapse-item__header {
  background: transparent;
  border-bottom: 0px solid transparent;
}

.el-collapse-item__wrap {
  background: transparent;
  border-bottom: 0px solid transparent;
}
.el-dialog__title{
  color: var(--dialog-title-color);
}
.el-dialog {
  background-color: var(--dialog-bg-clr);
  opacity: 1;
    border-radius: 15px;
}
.confirm-dialog {
    transform: translate(0%, -100%);
    border-radius: 10px;
}
.confirm-dialog .el-button {
  border-radius: 10px;
  width: 70px
}
</style>
