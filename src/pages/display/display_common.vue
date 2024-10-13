<template>
    <div class="root">
        <div :style="{marginLeft: test_val}"  id="canvasPanel" ref="canvasPanel" @dragover.prevent />

        <el-dialog 
            :visible.sync="inputVisible"
            :modal-append-to-body="false"
            style="position: relative;"
            > 
            <el-input type="textarea" :rows="6" v-model="inputText"></el-input>
            <el-row>&nbsp;
                <el-col :span="2">
                    <a @click="confirm('Script')">
                        <div class="btn" style="margin-top: 5px;margin-left: 42.5vw;">Confirm</div>
                    </a>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog
            v-draggable
            :style="{width:'174%', marginLeft: '-36%',marginTop: '-8%', }"
            :visible.sync="scriptVisible"
            :modal-append-to-body="false"
            >
            <el-rol>
                <el-col :span="2">
                    <a @click="toOpenWebUI('Manual')">
                        <div class="btn">Manual</div>
                    </a>
                </el-col>
                <el-col :span="2">
                    <a @click="toOpenWebUI('AI')">
                        <div class="btn">AI</div>
                    </a>
                </el-col>
            </el-rol>
            <!-- v-if="scriptVisible" -->
            <!-- v-if="scriptVisible" -->
            <div style="position: relative; width: 100%; height: 790px;">
                <iframe
                    ref="iframeScript"
                    src= "http://192.168.1.33:83/cc"
                    id="scriptIframe"
                    frameborder="0"
                    style="position: absolute; width: 100%; height: 780px;margin-left: -17%; margin-top: 1%; visibility: none"
                ></iframe>
                <iframe
                    ref="iframeScript2"
                    id="scriptIframe2"
                    style="position: absolute; width: 100%; height: 780px;margin-left: -17%; margin-top: 1%; visibility: hidden"
                    >this is AI script producer
                </iframe>
            </div>
            <el-row>&nbsp;
                <el-col :span="2">
                    <a @click="confirm('Run')">
                        <div class="btn" style="margin-top: 10px;margin-left: 72.5vw;">Confirm</div>
                    </a>
                </el-col>
            </el-row>
        </el-dialog>

        <el-dialog
            v-draggable
            style="width:174%; margin-left: -36%;margin-top: -8%;"
            :visible.sync="runVisible"
            :modal-append-to-body="false"
            >
            <div style="position: relative; width: 100%; height: 800px;">
                <iframe
                    :key="componentKey"
                    ref="iframeRun"
                    src= "http://192.168.1.33:83/display-general"
                    id="runIframe"
                    frameborder="0"
                    style="position: absolute; width: 100%; height: 800px;margin-top: 1%; visibility: none">

                </iframe>
            </div>
        </el-dialog>


        <div class="div-with-reverse-rounded-corners" style="z-index: 998;"></div>

        <el-row :style="{marginTop: table_top, marginLeft: '14%', borderRadius: '20px', zIndex: 999,}">
            <el-col :span="2"> &nbsp;
            </el-col>
            <el-col :span="16" >
                <el-scrollbar class="infinite-list" :style="{ overflowX: 'hidden', width: '100%', height: fixHeight * 0.82 + 'px' }">
                    <div :style="{}">
                        <el-table ref="singleTable"
                            style="border-radius: 20px;"
                            :data="tableData"
                        >
                            <template slot="empty">
                                <span>{{ "No Data" }}</span>
                            </template>
                            <el-table-column
                                :width="fixWidth * 0.02 + 'px'">
                            </el-table-column>
                            <el-table-column :width="fixWidth * 0.08 + 'px'" :label="'ID'">
                                <template slot-scope="scope">
                                    <el-radio  v-model="selected" @change.native = "handleSelectedChange(scope.row)" :label="scope.row.id">
                                    </el-radio>
                                </template>
                            </el-table-column>
                            <el-table-column property="name" :label="'Project Name'"
                                :width="fixWidth * 0.18 + 'px'"></el-table-column>
                            <el-table-column property="type" :label="'Type'"
                                :width="fixWidth * 0.06 + 'px'"></el-table-column>
                            <el-table-column :width="fixWidth * 0.14 + 'px'" :label="'Status'">
                                <template slot-scope="scope">
                                    <el-progress :text-inside="true" :stroke-width="24" :percentage=" scope.row.percentage" :color="'#409eff'"></el-progress>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :width="fixWidth * 0.02 + 'px'">
                            </el-table-column>
                            <el-table-column :label="'view'">
                                <template slot-scope="scope" v-if="scope.row.id == selected">
                                    <a @click="loadProject(scope.row)">
                                        <i class="el-icon-document"></i>
                                    </a>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-scrollbar>
            </el-col>
            <el-col :span="2"> &nbsp;
            </el-col>
        </el-row>
        <div
            v-if="tooltip"
            class="g6-tooltip"
            :style="`top: ${top}px; left: ${left}px;`"
        >
            id: {{ tooltip }}
        </div>
    </div>
</template>
  
<script>
    import G6 from "@antv/g6";
    import registerFactory from "../../components/graph/graph";
    //   import ItemPanel from "./ItemPanelCommon.vue";
    import axios from "axios";
    import "default-passive-events";
    import { saveAs } from "file-saver";
    import conf from "../../../vue.config";
    import draggable from '../../utils/draggable';

    export default {
    directives: {
        draggable,
    },
    name: "AllGraph",
    data() {
        return {
        test_val: "10%",
        table_top: "-34%",
        url: conf.backend_url,
        fixWidth: window.screen.width,
        fixHeight: window.screen.height,
        componentKey: 0,
        currentID: 0,
        nowRow: null,
        projectName: "",
        selected: "",
        rowInfo:{},
        inputVisible: false,
        inputText: "",
        scriptVisible: false,
        scriptDom : null,
        runVisible: false,
        runDom : null,
        mode: "drag-shadow-node",
        graph: {},
        highLight: {
            undo: false,
            redo: false,
        },
        lineStyle: {
            type: "line",
            width: 1,
        },
        label: "",
        labelCfg: {
            refY: 0,
            fontSize: 90,
            style: {
            fill: "#fff",
            },


        },
        node: {
            fill: "",
            lineDash: "none",
            borderColor: "",
            width: 160,
            height: 60,
            shape: "rect-node",
        },
        nodeShapes: [
            {
            name: "矩形",
            shape: "rect-node",
            },
            {
            name: "圆形",
            shape: "circle-node",
            },
            {
            name: "圆形2",
            shape: "circle-node2",
            },
            {
            name: "椭圆",
            shape: "ellipise-node",
            },
            {
            name: "菱形",
            shape: "diamond-node",
            },
            {
            name: "triangle",
            shape: "triangle-node",
            },
        ],
        headVisible: false,


        config: {},
        tooltip: "",
        top: 0,
        left: 0,

        dialogTableVisible: false,
        dialogResetAllVisible: false,
        // get order data
        gridData: [],
        nowRow: null,
        currentOrderID: null,
        currentOrderData: {},
        ret2OptData: {},
        valueAutoBoot: true,
        startclick: true,

        valueBtn: 1,
        display: "0",

        tableData: [],
        tableData_cp: [],
        multipleSelection: [],
        total: 0,
        pagesize: 10,
        currentPage: 1,

        autoboot: null,
        receiveMessage: "",


        staArr: [],
        };
    },
    mounted() {
        if (this.fixWidth > 1920) {
            this.test_val = "17%";
            this.table_top = "-28%";
        }

        if (this.$route.params.createdID != null) {
            this.projectLoading = true
            this.currentID = this.$route.params.createdID
            this.projectName = this.$route.params.projectName
            if (this.currentID != 0) {
                this.loadDBJson(this.currentID);
                this.confirm("Input")
                this.wait4SetTail()
            }
        }

        this.$nextTick(() => {
            this.createGraphic();
            this.initGraphEvent();
            // this.loadDBJson(this.currentID);
            this.scriptDom = document.getElementById('scriptIframe');
        });

        window.addEventListener(
            "message",
            (event) => {
                if(event.data.type == "project-sig"){
                    this.projectLoading = true
                    this.currentID = event.data.message.id
                    this.projectName = event.data.message.msg.order_name
                    this.loadDBJson(this.currentID);
                    this.wait4SetTail()
                }
            },
            false
        );

        setInterval(() => {
            this.getCommonProjects()
            this.loadDBJson(this.currentID);
        }, 5000);

    },
    beforeDestroy() {
        this.graph.destroy();
    },

    func() {
        return this.graph.findAll("node");
    },

    methods: {
        handleSelectedChange(row) {
                this.selected = row.id;  
                this.rowInfo = row
                this.nowRow = row
        },

        async wait4SetTail() {
            await axios
                .post(this.url + "/main-page/get-common-project", {
                    id: this.currentID
                })
                .then((res) => {
                    this.tableData = res["data"]["data"]['general'];
                    if (this.tableData.length > 0) {
                        this.selected = this.tableData[this.tableData.length - 1].id
                    }
                    this.inputText = res["data"]["data"]["parent"]["input"]
                });
        },

        getCommonProjects() {
            axios
            .post(this.url + "/main-page/get-common-project", {
                id: this.currentID
            })
            .then((res) => {
                this.tableData = res["data"]["data"]['general'];
            });
        },

        confirm(_node){
            axios
                .post(this.url + "/main-page/set-common-workflow", {
                    id: this.currentID,
                    node: _node,
                    status: 1,
                })
                .then((res) => {
                });
            this.inputVisible = false
            this.scriptVisible = false
            this.runVisible = false
          
        },

        getOrderStatus() {
        if (this.currentOrderID != null) {
            axios
                .post(this.url + "/api/node-status", {
                    order_id: this.currentOrderID,
                })
                .then((res) => {
                    this.graph.animating = true;
                    this.staArr = res["data"]["msg"];
                    let j = 0;
                    this.staArr.forEach((ele) => {
                    this.displayStatus(
                        ele["node_unique_id"],
                        ele["node_status"],
                        ele["status"],
                        ele["node_pointer"]
                    );
                    });
                });
            }
        },

        displayStatus(_node_unique_id, _node_status, _status, _node_pointer) {
        let i = 0;
        let nodeArr = this.currentOrderData.nodes;
        let label = "⬆";
        nodeArr.forEach((node) => {
            if (_node_unique_id == node["id"]) {
            if (_node_pointer == 1) {
                //indicate current pointer node
                if (
                this.currentOrderData["nodes"][i]["label"].indexOf(label) == -1
                ) {
                this.currentOrderData["nodes"][i]["label"] =
                    "\n" +
                    this.currentOrderData["nodes"][i]["label"] +
                    "\n" +
                    label;
                }
                //case error
                if (_status == "Error") {
                if (this.display == "1") {
                    //reset button
                    this.displayCheck();
                }
                if (node["type"].split("-").length - 1 == 1) {
                    this.currentOrderData["nodes"][i]["type"] =
                    this.currentOrderData["nodes"][i]["type"] + "-red";
                } else {
                    this.currentOrderData["nodes"][i]["type"] =
                    node["type"].slice(0, node["type"].indexOf("-")) +
                    "-node-red";
                }
                }
                //common case
                if (_status != "Error") {
                //running case
                if (_status == "Running" && _node_status == "Doing") {
                    if (node["type"].split("-").length - 1 == 1) {
                    this.currentOrderData["nodes"][i]["type"] =
                        this.currentOrderData["nodes"][i]["type"] + "-green";
                    } else {
                    this.currentOrderData["nodes"][i]["type"] =
                        node["type"].slice(0, node["type"].indexOf("-")) +
                        "-node-green";
                    }
                }
                //emergency case
                else {
                    this.currentOrderData["nodes"][i]["type"] =
                    node["type"].slice(0, node["type"].indexOf("-")) + "-node";
                }
                }
            }
            //not animating
            else {
                if (_status != "Error" && _node_status != "Doing") {
                //eliminate indicate
                if (
                    this.currentOrderData["nodes"][i]["label"].indexOf(label) != -1
                ) {
                    this.currentOrderData["nodes"][i]["label"] =
                    this.currentOrderData["nodes"][i]["label"].slice(
                        this.currentOrderData["nodes"][i]["label"].indexOf("\n") +
                        1,
                        this.currentOrderData["nodes"][i]["label"].lastIndexOf(
                        "\n"
                        ) - this.currentOrderData["nodes"][i]["label"].indexOf("\n")
                    );
                }
                this.currentOrderData["nodes"][i]["type"] =
                    node["type"].slice(0, node["type"].indexOf("-")) + "-node";
                }
            }
            }
            this.graph.read(this.currentOrderData);
            i = i + 1;
        });
        // let nodeArr = this.graph.cfg.data.nodes
        // console.log("++", this.graph)
        // console.log("--", nodeArr)
        // nodeArr.forEach(node => {
        //   if ((_node_unique_id == node['id']) && (node['type'].slice(-4) == 'node')) {
        //     this.graph['cfg']['data']['nodes'][i]['type'] =
        //     this.graph['cfg']['data']['nodes'][i]['type'] + _color
        //     this.graph['cfg']['nodes'][i]['_cfg']['animate'] = true
        //   }
        //   i = i + 1
        // });
        },

        handleListDataStringify(_list) {
        for (let index = 0; index < _list.length; index++) {
            _list[index].para = JSON.stringify(_list[index].para, null, 2);
        }
        return _list;
        },

        //special instr
        handleUnchainedPara(_val) {
        this.handleSinglePara(this.listUnchainedParaMod, _val);
        },
        handleThermoPara(_val) {
        this.handleSinglePara(this.listThermoParaMod, _val);
        },
        handleRobot1Para(_val) {
        this.handleSinglePara(this.listRobot1ParaMod, _val);
        },

        handleSinglePara(_listVal, _instr) {
        _listVal.forEach((ele) => {
            if (ele.name == this.$refs["get" + _instr + "operation"].value) {
            this.$refs["get" + _instr + "para"].value = ele.para;
            }
        });
        },

        hangdlePriority(_val, _label) {
        const founditem = this.graph.findById(this.$refs.getnodeid.value);
        founditem._cfg.model.labelCfg["dataConfig" + _label].priority = _val;
        },

        // return flowchart data to ai page
        retFlowchart2Opt() {
            window.parent.postMessage(
                { type: "flowchart", message: this.graph.save() },
                "*"
            );
        },

        open(_node) {
            if (_node=="Script") {
                this.scriptVisible = true;
                let _id = this.currentID
                let _name = this.projectName
                this.$nextTick(()=>{
                    let iframedom = document.getElementById("scriptIframe");
                    iframedom.onload = function () {
                        let _window = iframedom.contentWindow;
                        _window.postMessage(
                            {
                                type: "parent_info",
                                message: {
                                    id: _id,
                                    projectName: _name
                                },
                            },
                            "*"
                        );
                    }
                })
            }

            if (_node=="Run") {
                this.loadProject({id:this.selected})
            }

            if(_node=="Input"){
                this.inputVisible = true
            }
        },

        loadProject(_val){
            this.runVisible = true
            let name = this.projectName
            let id = _val.id

            if (document.getElementById("runIframe") == null) {
                this.$nextTick(()=>{    
                    let iframe = document.getElementById("runIframe");
                    iframe.onload = function () {
                        let _window = iframe.contentWindow;
                        _window.postMessage(
                            {
                                type: "project-sig",
                                message: {
                                    id: id,
                                    projectName: name
                                },
                            },
                            "*"
                        );
                    }
                })
            }

            else {
                let iframedom = document.getElementById("runIframe");
                let _window = iframedom.contentWindow;
                _window.postMessage(
                    {
                        type: "project-sig",
                        message: {
                            id: id,
                            projectName: name
                        },
                    },
                    "*"
                );
            }
        },

        toOpenWebUI(_val) {
        this.$nextTick(()=>{   
            let scriptIframe = document.getElementById("scriptIframe");
            let scriptIframe2 = document.getElementById("scriptIframe2");
                if (_val=="Manual") {
                    scriptIframe.style.visibility = "visible";
                    scriptIframe2.style.visibility = "hidden";
                } 
                if (_val=="AI") {
                    scriptIframe.style.visibility = "hidden";
                    scriptIframe2.style.visibility = "visible";
                }
            })
        },

        createGraphic() {
        const vm = this;
        const grid = new G6.Grid();
        const menu = new G6.Menu({
            offsetX: -20,
            offsetY: -50,
            // itemTypes: ['node', 'edge'],
            itemTypes: ["node"],
            getContent(e) {
            const outDiv = document.createElement("div");
            outDiv.style.width = "80px";
            outDiv.style.cursor = "pointer";
            // outDiv.innerHTML = '<p id="deleteNode">Reset</p>';
            outDiv.innerHTML = '<p id="resetNode">Reset</p>';
            return outDiv;
            },
            handleMenuClick(target, item) {
            const { id } = target;
            if (id) {
                vm[id](item);
            }
            },
        });
        const minimap = new G6.Minimap({
            size: [200, 100],
        });
        const cfg = registerFactory(G6, {
            animate: true,
            width: window.innerWidth,
            height: window.innerHeight,
            layout: {
            type: "",
            },
            defaultNode: {
            type: "rect-node",
            style: {
                radius: 10,
                width: 100,
                height: 50,
                cursor: "move",
                fill: "#ecf3ff",
            },
            labelCfg: {
                fontSize: 20,
                style: {
                cursor: "move",
                },
            },
            },
            defaultEdge: {
            type: "polyline-edge",
            style: {
                shadowColor: "#1890FF",
                shadowBlur: 3,
                radius: 5,
                offset: 15,
                stroke: "#1890FF",
                lineWidth: 3,
                lineAppendWidth: 5,
                endArrow: true,
            },
            },
            nodeStateStyles: {
            "nodeState:default": {
                opacity: 1,
            },
            "nodeState:hover": {
                opacity: 0.8,
            },
            "nodeState:selected": {
                opacity: 0.9,
            },
            },
            edgeStateStyles: {},
            modes: {
            default: [
            //   "drag-canvas",
            //   "drag-shadow-node",
                "canvas-event",
            //   "delete-item",
                "select-node",
            //   "hover-node",
            ],
            originDrag: [
            //   "drag-canvas",
            //   "drag-node",
                "canvas-event",
            //   "delete-item",
                "select-node",
            ],
            },
            plugins: [menu, minimap, grid],
        });

        this.graph = new G6.Graph(cfg);
        },
        initGraphEvent() {
        this.graph.on("drop", (e) => {
            const { originalEvent } = e;

            if (originalEvent.dataTransfer) {
            const transferData =
                originalEvent.dataTransfer.getData("dragComponent");

            if (transferData) {
                this.addNode(transferData, e);
            }
            }
        });

        this.graph.on("node:drop", (e) => {
            e.item.getOutEdges().forEach((edge) => {
            edge.clearStates("edgeState");
            });
        });

        this.graph.on("node:click", (e) => {
            this.open(e.item._cfg.model.label)
            console.log(e.item._cfg.model.label);
            if (
            e.item._cfg.model.label == "AAA" ||
            e.item._cfg.model.label == "\nAAA\n⬆"
            ) {
            this.setconfig();
            this.config0 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "BBB" ||
            e.item._cfg.model.label == "\nBBB\n⬆"
            ) {
            this.setconfig();
            this.config1 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "CCC" ||
            e.item._cfg.model.label == "\nCCC\n⬆"
            ) {
            this.setconfig();
            this.config2 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "DDD" ||
            e.item._cfg.model.label == "\nDDD\n⬆"
            ) {
            this.setconfig();
            this.config71 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "EEE" ||
            e.item._cfg.model.label == "\nEEE\n⬆"
            ) {
            this.setconfig();
            this.config72 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "FFF" ||
            e.item._cfg.model.label == "\nFFF\n⬆"
            ) {
            this.setconfig();
            this.config73 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "Unchained" ||
            e.item._cfg.model.label == "\nUnchained\n⬆"
            ) {
            this.setconfig();
            this.config74 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "Discover" ||
            e.item._cfg.model.label == "\nDiscover\n⬆"
            ) {
            this.setconfig();
            this.config75 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "GGG" ||
            e.item._cfg.model.label == "\nGGG\n⬆"
            ) {
            this.setconfig();
            this.config81 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "HHH" ||
            e.item._cfg.model.label == "\nHHH\n⬆"
            ) {
            this.setconfig();
            this.config82 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "III" ||
            e.item._cfg.model.label == "\nIII\n⬆"
            ) {
            this.setconfig();
            this.config83 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "Thermo" ||
            e.item._cfg.model.label == "\nThermo\n⬆"
            ) {
            this.setconfig();
            this.config84 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "JJJ" ||
            e.item._cfg.model.label == "\nJJJ\n⬆"
            ) {
            this.setconfig();
            this.config91 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "KKK" ||
            e.item._cfg.model.label == "\nKKK\n⬆"
            ) {
            this.setconfig();
            this.config92 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "Robot1" ||
            e.item._cfg.model.label == "\nRobot1\n⬆"
            ) {
            this.setconfig();
            this.config93 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "AROPS" ||
            e.item._cfg.model.label == "\nAROPS\n⬆"
            ) {
            this.setconfig();
            this.config62 = !!e;
            console.log(e.item._cfg);
            }
            if (
            e.item._cfg.model.label == "SIMAI" ||
            e.item._cfg.model.label == "\nSIMAI\n⬆"
            ) {
            this.setconfig();
            this.config63 = !!e;
            console.log(e.item._cfg);
            }
        });

        this.graph.on("after-node-selected", (e) => {
            

        });

        // this.graph.on("on-node-mouseenter", (e) => {
        //   if (e && e.item) {
        //     e.item.getOutEdges().forEach((edge) => {
        //       edge.clearStates("edgeState");
        //       edge.setState("edgeState", "hover");
        //     });
        //   }
        // });

        // this.graph.on('on-node-mousemove', e => {
        //   if (e && e.item) {
        //     this.tooltip = e.item.get('model').id;
        //     this.left = e.clientX + 40;
        //     this.top = e.clientY - 20;
        //   }
        // });

        this.graph.on("on-node-mouseleave", (e) => {
            if (e && e.item) {
            this.tooltip = "";
            if (e && e.item) {
                e.item.getOutEdges().forEach((edge) => {
                edge.clearStates("edgeState");
                });
            }
            }
        });

        this.graph.on("before-node-removed", ({ target, callback }) => {
            console.log(target);
            setTimeout(() => {
            callback(true);
            }, 1000);
        });

        this.graph.on("after-node-dblclick", (e) => {
            if (e && e.item) {
            console.log(e.item);
            }
        });

        this.graph.on("after-edge-selected", (e) => {
            if (e && e.item) {
            this.config = e.item.get("model").id;

            this.graph.updateItem(e.item, {
                style: {
                radius: 10,
                lineWidth: 2,
                },
            });
            }
        });

        this.graph.on("on-edge-mousemove", (e) => {
            if (e && e.item) {
            this.tooltip = e.item.get("model").label;
            this.left = e.clientX + 40;
            this.top = e.clientY - 20;
            }
        });

        this.graph.on("on-edge-mouseleave", (e) => {
            if (e && e.item) {
            this.tooltip = "";
            }
        });

        // this.graph.on(
        //   "before-edge-add",
        //   ({ source, target, sourceAnchor, targetAnchor }) => {
        //     setTimeout(() => {
        //       this.graph.addItem("edge", {
        //         id: `${+new Date() + (Math.random() * 10000).toFixed(0)}`, // edge id
        //         source: source.get("id"),
        //         target: target.get("id"),
        //         sourceAnchor,
        //         targetAnchor,
        //       });
        //     }, 100);
        //   }
        // );
        },

        setconfig() {
        this.config0 = false;
        this.config1 = false;
        this.config2 = false;
        this.config71 = false;
        this.config72 = false;
        this.config73 = false;
        this.config74 = false;
        this.config75 = false;
        this.config81 = false;
        this.config82 = false;
        this.config83 = false;
        this.config84 = false;
        this.config91 = false;
        this.config92 = false;
        this.config93 = false;
        this.config62 = false;
        this.config63 = false;
        },

        changeMode() {
        if (this.mode === "drag-node") {
            this.mode = "drag-shadow-node";
            this.graph.setMode("default");
        } else {
            this.mode = "drag-node";
            this.graph.setMode("originDrag");
        }
        },
        resetNode(item) {
        // this.graph.removeItem(item);
        console.log(item);
        if (this.currentOrderID != null) {
            axios
            .post(this.url + "/api/reset", {
                order_id: this.currentOrderID,
                node: item._cfg.id,
            })
            .then((res) => {
                console.log(res);
            });
        }
        },
        // deleteNode(item) {
        //   this.graph.removeItem(item);
        // },
        addNode(transferData, { x, y }) {
        const { label, shape, fill } = JSON.parse(transferData);

        const model = {
            label,

            type: shape,
            style: {
            fill: fill || "#ecf3ff",
            },
            x,
            y,
        };

        this.graph.addItem("node", model);
        },
        save() {
        const founditem = this.graph.findById(this.$refs.getnodeid.value);

        founditem._cfg.model.labelCfg.dataConfigAAA.para =
            this.$refs.getAAApara.value;
        founditem._cfg.model.labelCfg.dataConfigAAA.cmd =
            this.$refs.getAAAcmd.value;
        founditem._cfg.model.labelCfg.dataConfigBBB.para =
            this.$refs.getBBBpara.value;
        founditem._cfg.model.labelCfg.dataConfigBBB.cmd =
            this.$refs.getBBBcmd.value;
        founditem._cfg.model.labelCfg.dataConfigCCC.para =
            this.$refs.getCCCpara.value;
        founditem._cfg.model.labelCfg.dataConfigCCC.cmd =
            this.$refs.getCCCcmd.value;
        founditem._cfg.model.labelCfg.dataConfigDDD.para =
            this.$refs.getDDDpara.value;
        founditem._cfg.model.labelCfg.dataConfigDDD.cmd =
            this.$refs.getDDDcmd.value;
        founditem._cfg.model.labelCfg.dataConfigEEE.para =
            this.$refs.getEEEpara.value;
        founditem._cfg.model.labelCfg.dataConfigEEE.cmd =
            this.$refs.getEEEcmd.value;
        founditem._cfg.model.labelCfg.dataConfigFFF.para =
            this.$refs.getFFFpara.value;
        founditem._cfg.model.labelCfg.dataConfigFFF.cmd =
            this.$refs.getFFFcmd.value;
        founditem._cfg.model.labelCfg.dataConfigUnchained.para =
            this.$refs.getUnchainedpara.value;
        founditem._cfg.model.labelCfg.dataConfigUnchained.cmd =
            this.$refs.getUnchainedcmd.value;
        founditem._cfg.model.labelCfg.dataConfigUnchained.operation =
            this.$refs.getUnchainedoperation.value;
        founditem._cfg.model.labelCfg.dataConfigDiscover.para =
            this.$refs.getDiscoverpara.value;
        founditem._cfg.model.labelCfg.dataConfigDiscover.cmd =
            this.$refs.getDiscovercmd.value;
        // founditem._cfg.model.labelCfg.dataConfigDiscover.operation = this.$refs.getDiscoveroperation.value;
        founditem._cfg.model.labelCfg.dataConfigGGG.para =
            this.$refs.getGGGpara.value;
        founditem._cfg.model.labelCfg.dataConfigGGG.cmd =
            this.$refs.getGGGcmd.value;
        founditem._cfg.model.labelCfg.dataConfigHHH.para =
            this.$refs.getHHHpara.value;
        founditem._cfg.model.labelCfg.dataConfigHHH.cmd =
            this.$refs.getHHHcmd.value;
        founditem._cfg.model.labelCfg.dataConfigIII.para =
            this.$refs.getIIIpara.value;
        founditem._cfg.model.labelCfg.dataConfigIII.cmd =
            this.$refs.getIIIcmd.value;
        founditem._cfg.model.labelCfg.dataConfigThermo.para =
            this.$refs.getThermopara.value;
        founditem._cfg.model.labelCfg.dataConfigThermo.cmd =
            this.$refs.getThermocmd.value;
        founditem._cfg.model.labelCfg.dataConfigThermo.operation =
            this.$refs.getThermooperation.value;

        founditem._cfg.model.labelCfg.dataConfigJJJ.para =
            this.$refs.getJJJpara.value;
        founditem._cfg.model.labelCfg.dataConfigJJJ.cmd =
            this.$refs.getJJJcmd.value;

        founditem._cfg.model.labelCfg.dataConfigKKK.para =
            this.$refs.getKKKpara.value;
        founditem._cfg.model.labelCfg.dataConfigKKK.cmd =
            this.$refs.getKKKcmd.value;
        founditem._cfg.model.labelCfg.dataConfigRobot1.para =
            this.$refs.getRobot1para.value;
        founditem._cfg.model.labelCfg.dataConfigRobot1.cmd =
            this.$refs.getRobot1cmd.value;
        founditem._cfg.model.labelCfg.dataConfigRobot1.operation =
            this.$refs.getRobot1operation.value;

        const nn = this.graph.findAll("node", (node) => {
            return node;
        });
        const ee = this.graph.getEdges();
        },

        empty_alert() {
        this.$alert("EMPTY CONTENT", {
            confirmButtonText: "OK",
            callback: (action) => {
            this.$message({
                type: "info",
                message: `action: ${action}`,
            });
            },
        });
        },

        isJSON(str) {
        if (typeof str == "string") {
            try {
            var obj = JSON.parse(str);
            if (typeof obj == "object" && obj) {
                return true;
            } else {
                return false;
            }
            } catch (e) {
            console.log("error:" + str + "!!!" + e);
            return false;
            }
        }
        console.log("It is not a string!");
        },

        current_change: function (currentPage) {
        this.currentPage = currentPage;
        },
        mounted: function () {
        this.loadFromDB();
        },

        emergency() {
        console.log("===> ", this.staArr);
        axios
            .post(this.url + "/api/pause", {
            order_id: this.currentOrderID,
            method: "Emergency",
            })
            .then((res) => {
            this.$confirm("resume or break?", "Paused", {
                confirmButtonText: "Break",
                cancelButtonText: "Resume",
                type: "warning",
            })
                .then(() => {
                axios
                    .post(this.url + "/api/pause", {
                    order_id: this.currentOrderID,
                    method: "Break",
                    })
                    .then((res) => {
                    if (this.display == "1") {
                        //reset start button
                        this.displayCheck();
                    }
                    });
                })
                .catch(() => {
                axios.post(this.url + "/api/pause", {
                    order_id: this.currentOrderID,
                    method: "Resume",
                });
                });
            });
        },

        displayCheck(flat) {
        if (this.display == "0") {
            this.display = "1";
            if (this.valueAutoBoot) {
            this.autoboot = "continous";
            } else {
            this.autoboot = "single";
            }
            if (this.currentOrderID != null) {
            // axios.post('http://localhost:5000/api/start',{
            axios
                .post(this.url + "/api/start", {
                order_id: this.currentOrderID,
                auto_boot: this.autoboot,
                })
                .then((res) => {
                console.log(res);
                });
            }
            document.getElementById("startbtn").innerHTML = "Stop";
        } else {
            this.display = "0";
            // axios.post('http://localhost:5000/api/auto-boot',{
            axios
            .post(this.url + "/api/auto-boot", {
                auto_boot: "single",
            })
            .then((res) => {
                console.log(res);
            });
            document.getElementById("startbtn").innerHTML = "Start";
        }
        console.log(this.display);
        },

        clickChange() {
        !this.startclick, console.log(this.startclick);
        },
        settabs(item, index) {
        console.log(item, index);
        this.valueBtn = item.id;
        },

        clickRadio() {
        this.radio === "1";
        this.clickChange();
        },

        changeStatus() {
        console.log(this.valueAutoBoot);
        if (this.valueAutoBoot) {
            // axios.post(this.url + '/api/auto-boot', {
            //   "auto_boot": "continous"
            // }).then(res => {
            //   console.log(res);
            // })
        } else {
            axios
            .post(this.url + "/api/auto-boot", {
                auto_boot: "single",
            })
            .then((res) => {
                console.log(res);
            });
        }
        },

        //重置当前order_id下的所有仪器的状态
        resetOrder() {
        // axios.post('http://localhost:5000/api/init',{
        axios
            .post(this.url + "/api/init", {
            order_id: this.currentOrderID,
            })
            .then((res) => {
            console.log(res);
            });
        },

        handleCurrentChange(val) {
        this.currentRow = val;
        this.nowRow = val;
        },

        // 从数据库中导入指定orderID
        loadDBJson(_val) {
            console.log(_val);
            if (_val != null) {
                axios
                    .post(this.url + "/main-page/get-common-workflow", {
                    id: _val,
                    })
                    .then((res) => {
                        console.log(res["data"]);
                    this.graph.read(res["data"]['data']);
                    this.currentOrderID = _val;
                    });
                }
            },

        // 提交至服务器
        // 让后端做好参数存储至本地路径工作
        submitDB() {
        const dat = this.graph.save();
        // this.currentOrderData = dat
        for (let index = 0; index < dat["nodes"].length; index++) {
            var keys = Object.keys(dat["nodes"][index]["labelCfg"]);
            for (let j = 0; j < keys.length; j++) {
            let position = keys[j].search("dataConfig");
            if (
                position >= 0 &&
                this.isJSON(dat["nodes"][index]["labelCfg"][keys[j]]["para"])
            ) {
                dat["nodes"][index]["labelCfg"][keys[j]]["para"] = JSON.parse(
                dat["nodes"][index]["labelCfg"][keys[j]]["para"]
                );
            }
            }
            console.log("!!!", keys);
        }
        // axios.post('http://localhost:5000/api/submit', {
        axios
            .post(this.url + "/api/submit", {
            order_name: this.$refs.ChartName.value,
            // TODO：要获取到当前页面用户
            user_name: "abc",
            order_data: dat,
            })
            .then((res) => {
            console.log(res);
            this.openOrderIDResult(res);

            this.handleStringify(dat);
            // for (let index = 0; index < dat['nodes'].length; index++) {
            //   var keys = Object.keys(dat['nodes'][index]['labelCfg']);
            //   for (let j = 0; j < keys.length; j++) {
            //     let position = keys[j].search('dataConfig')
            //     if (position >= 0 && this.isJSON(JSON.stringify(dat['nodes'][index]['labelCfg'][keys[j]]['para']))) {
            //       dat['nodes'][index]['labelCfg'][keys[j]]['para'] =
            //         JSON.stringify(dat['nodes'][index]['labelCfg'][keys[j]]['para'])
            //     }
            //   }
            // }

            this.loadDBJson(res["data"]["msg"]);
            });
        },

        handleStringify(_data) {
        for (let index = 0; index < _data["nodes"].length; index++) {
            var keys = Object.keys(_data["nodes"][index]["labelCfg"]);
            for (let j = 0; j < keys.length; j++) {
            let position = keys[j].search("dataConfig");
            if (
                position >= 0 &&
                this.isJSON(
                JSON.stringify(_data["nodes"][index]["labelCfg"][keys[j]]["para"])
                )
            ) {
                _data["nodes"][index]["labelCfg"][keys[j]]["para"] = JSON.stringify(
                _data["nodes"][index]["labelCfg"][keys[j]]["para"],
                null,
                2
                );
            }
            }
        }
        },

        openOrderIDResult(_res) {
        this.$alert("Order ID: " + _res["data"]["msg"] + " has been saved!", "", {
            confirmButtonText: "OK",
            callback: (action) => {
            this.currentOrderID = _res["data"]["msg"];
            this.$message({
                type: "info",
                message: `action: ${action}`,
            });
            },
        });
        },

        //获取当前用户所有存储的order
        loadFromDB() {
        // axios.post('http://localhost:5000/api/orders',{
        axios
            .post(this.url + "/api/orders", {
            user_name: "abc",
            })
            .then((res) => {
            this.tableData = res["data"]["msg"];
            console.log(this.tableData);
            this.total = res["data"]["msg"].length;
            console.log(this.total);
            });
        },

        // 保存数据
        saveall() {
        const nodes = this.graph.findAll("node", (node) => {
            return node;
        });
        const edges = this.graph.findAll("edge", (edge) => {
            return edge;
        });
        const dat = this.graph.save();
        const j = this.format(JSON.stringify(dat));
        var FileSaver = require("file-saver");

        var blob = new Blob([JSON.stringify(dat, null, 2)], {
            type: "text/plain;charset=utf-8",
        });
        // var blob = new Blob([j], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "FlowChart.json");
        },

        //load
        loadall() {
        var s = document.getElementById("file");
        s.click();
        s.addEventListener(
            "change",
            (handleFiles) => {
            var selectedFile = document.getElementById("file").files[0]; //获取读取的File对象
            var reader = new FileReader(); //这里是核心！！！读取操作就是由它完成的。
            // 赋予参数！
            reader.gr = this.graph;
            reader.readAsText(selectedFile); //读取文件的内容
            reader.onload = function () {
                const _json = JSON.parse(this.result);
                this.gr.read(_json);
            };
            },
            false
        );
        },

        format(str) {
        var stack = [];
        var tmpStr = "";
        var len = str.length;
        for (let i = 0; i < len; i++) {
            if (str[i] == "{" || str[i] === "[") {
            tmpStr += str[i] + "\n";
            stack.push(str[i]);
            tmpStr += "\t".repeat(stack.length);
            } else if (str[i] == "]" || str[i] === "}") {
            stack.pop();
            tmpStr += "\n" + "\t".repeat(stack.length) + str[i];
            } else if (str[i] == ",") {
            tmpStr += str[i] + "\n" + "\t".repeat(stack.length);
            } else {
            tmpStr += str[i];
            }
        }
        return tmpStr;
        },
    },
    };
</script>
  
<style lang="scss">

    .el-dialog{
        border-radius: 10px;
    }

    .btn{
        width: 100px;
        height: 40px;
        margin-top: -38px;
        margin-bottom: 20px;
        font-size: 20px;
        color:#525252;
        border-radius: 25px;
        background: #ffffff;
        box-shadow:  2px 2px 3px #e3e7f1,
                    -2px -2px 3px #e3e7f1;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        }
        .btn:active{
        transform: scale(0.96);
    }


    .div-with-reverse-rounded-corners {
        position: relative;
        padding: 20px;
        width: 100vw;
        height: 1000px;
        border-left: 21vw solid #f4f5f6;
        border-top: 90px solid #f4f5f6;
        border-right: 21vw solid #f4f5f6;
        border-bottom: 700px solid #f4f5f6;
        
        // background-clip: padding-box;
        border-radius: 15px; 
        pointer-events: none; 
        overflow: hidden;
    }
    

  button {
    width: 80px;
    line-height: 10px;
    display: inline-block;
    padding: 5px 0px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .save {
    color: #fff;
    background: #46a0fc;
    border-color: #46a0fc;
  }
  
  .notsave {
    color: #fff;
    background-color: #e93c45;
    border-color: #e93c45;
  }
  
  .g6-tooltip {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 12px;
    color: #545454;
    border-radius: 4px;
    border: 1px solid #e2e2e2;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: rgb(174, 174, 174) 0 0 10px;
    padding: 10px 8px;
  }
  
  .g6-minimap {
    position: absolute;
    right: 0;
    bottom: 0;
    background: #fff;
  }
  
  .set-other-btn {
    color: #fff;
    background: #46a0fc;
    border-color: #46a0fc;
  }
  
  .set-other-btn:focus {
    background-color: #e93c45;
    border-color: #e93c45;
  }
  
  .show {
    background-color: #1890ff;
    color: #fff;
  }
  
  .config-number {
    height: 50%;
  }
  </style>
  