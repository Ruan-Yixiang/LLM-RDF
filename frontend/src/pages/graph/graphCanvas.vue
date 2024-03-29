<template>
  <div class="root">
    <div id="canvasPanel" ref="canvasPanel" @dragover.prevent />

    <!-- Unchained -->
    <div id="configPanel0" :class="{ hidden: !config74 }">
      <i class="gb-toggle-btn" @click="config74 = !config74" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />
        <div class="config-item">instr: <input :value="label" /></div>
        <div>
          priority:
          <el-input-number
            size="mini"
            v-model.trim="labelCfg.dataConfigUnchained.priority"
            :min="1"
            :max="10"
            ref="getUnchainedpriority"
            @change="
              (currentValue, oldValue) => hangdlePriority(currentValue, label)
            "
          >
          </el-input-number>
        </div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select
            :value="labelCfg.dataConfigUnchained.cmd"
            ref="getUnchainedcmd"
            @change="save"
          >
            <option value="INIT">INIT</option>
            <option value="START">START</option>
          </select>
          operation:
          <select
            :value="labelCfg.dataConfigUnchained.operation"
            ref="getUnchainedoperation"
            @change="handleUnchainedPara(label), save()"
          >
            <option value="synthesis">synthesis</option>
            <option value="workup">workup</option>
            <option value="transfer">transfer</option>
            <option value="back transfer">back transfer</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigUnchained.para"
            @change="save"
            ref="getUnchainedpara"
          ></textarea>
        </div>
      </div>
      <button @click="config74 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

    <!-- Discover -->
    <div id="configPanel0" :class="{ hidden: !config75 }">
      <i class="gb-toggle-btn" @click="config75 = !config75" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigDiscover.cmd" ref="getDiscovercmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigDiscover.para"
            ref="getDiscoverpara"
          ></textarea>
        </div>
      </div>
      <button @click="config75 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

    <!-- Thermo -->
    <div id="configPanel0" :class="{ hidden: !config84 }">
      <i class="gb-toggle-btn" @click="config84 = !config84" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />
        <div class="config-item">instr: <input :value="label" /></div>
        <div>
          priority:
          <el-input-number
            size="mini"
            v-model="labelCfg.dataConfigThermo.priority"
            :min="1"
            :max="10"
            ref="getThermopriority"
            @change="
              (currentValue, oldValue) => hangdlePriority(currentValue, label)
            "
          >
          </el-input-number>
        </div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select
            :value="labelCfg.dataConfigThermo.cmd"
            ref="getThermocmd"
            @change="save"
          >
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          operation:
          <select
            :value="labelCfg.dataConfigThermo.operation"
            ref="getThermooperation"
            @change="handleThermoPara(label), save()"
          >
            <option value="analyze">analyze</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 300px"
            :value="labelCfg.dataConfigThermo.para"
            @change="save"
            ref="getThermopara"
          ></textarea>
        </div>
      </div>
      <button @click="config84 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

    <!-- Robot1 -->
    <div id="configPanel0" :class="{ hidden: !config93 }">
      <i class="gb-toggle-btn" @click="config93 = !config93" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />
        <div class="config-item">instr: <input :value="label" /></div>
        <div>
          priority:
          <el-input-number
            size="mini"
            v-model="labelCfg.dataConfigRobot1.priority"
            :min="1"
            :max="10"
            ref="getRobot1priority"
            @change="
              (currentValue, oldValue) => hangdlePriority(currentValue, label)
            "
          >
          </el-input-number>
        </div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select
            :value="labelCfg.dataConfigRobot1.cmd"
            ref="getRobot1cmd"
            @change="save"
          >
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
          </select>
          operation:
          <select
            :value="labelCfg.dataConfigRobot1.operation"
            ref="getRobot1operation"
            @change="handleRobot1Para(label), save()"
          >
            <option value="transport">transport</option>
            <option value="back transport">back transport</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 100px"
            :value="labelCfg.dataConfigRobot1.para"
            ref="getRobot1para"
            @change="save"
          ></textarea>
        </div>
      </div>
      <button @click="config93 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
    <!-- AROPS -->
    <div id="configPanel0" :class="{ hidden: !config62 }">
      <i class="gb-toggle-btn" @click="config62 = !config62" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <button @click="config62 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import registerFactory from "../../components/graph/graph";
import "default-passive-events";

export default {
  name: "AllGraph",
  data() {
    return {
      commonList: ['Discover', 'GC', ],
      mode: "drag-shadow-node",
      graph: {},
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
        dataConfigRobot1: {},
        dataConfigThermo: {},
        dataConfigUnchained: {},
        dataConfigDiscover: {},
      },
      node: {
        fill: "",
        lineDash: "none",
        borderColor: "",
        width: 160,
        height: 60,
        shape: "rect-node",
      },
      config74: false,
      config75: false,
      config84: false,
      config93: false,
      config62: false,
      config: {},
      listUnchainedParaMod: [
        { name: "synthesis", para: "" },
        { name: "workup", para: "" },
        { name: "transfer", para: "" },
        { name: "back transfer", para: "" },
      ],
      listRobot1ParaMod: [
        { name: "transport", para: "" },
        { name: "back transport", para: "" },
      ],
      listThermoParaMod: [{ name: "analyze", para: "" }],

      getunchainedpara: "",
      getdiscoverpara: "",
      getrobot1para: "",
      getthermopara: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.createGraphic();
      this.initGraphEvent();
    });

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type == "send") {
          // Stringfy parameter
          this.listRobot1ParaMod = this.handleListDataStringify(
            event.data.message.listRobot1ParaMod
          );
          this.listThermoParaMod = this.handleListDataStringify(
            event.data.message.listThermoParaMod
          );
          this.listUnchainedParaMod = this.handleListDataStringify(
            event.data.message.listUnchainedParaMod
          );
          this.graph.read(event.data.message.flowchart);
        }
        if (event.data.type == "sig") {
          this.retFlowchart2Opt();
        }
        if (event.data.type == "libSig") {
          this.graph.read(event.data.message.flowchart);
        }
      },
      false
    );
  },

  methods: {
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

    createGraphic() {
      const grid = new G6.Grid();
      const cfg = registerFactory(G6, {
        animate: true,
        width: window.innerWidth,
        height: window.innerHeight,
        layout: {
          type: "",
        },
        modes: {
          default: [
            "drag-canvas",
            "drag-shadow-node",
            "canvas-event",
            "select-node",
          ],
          originDrag: [
            "drag-canvas",
            "canvas-event",
            "select-node",
          ],
        },
        plugins: [ grid],
      });
      this.graph = new G6.Graph(cfg);
    },
    initGraphEvent() {
      this.graph.on("node:click", (e) => {
        this.setconfig();
        if (
          e.item._cfg.model.label == "Unchained" 
        ) {
          this.config74 = !!e;
        }
        if (
          e.item._cfg.model.label == "Discover" 
        ) {
          this.config75 = !!e;
        }
        if (
          e.item._cfg.model.label == "Thermo" 
        ) {
          this.config84 = !!e;
        }
        if (
          e.item._cfg.model.label == "Robot1" 
        ) {
          this.config93 = !!e;
        }
        if (
          e.item._cfg.model.label == "AROPS" 
        ) {
          this.config62 = !!e;
        }
      });

      this.graph.on("after-node-selected", (e) => {
        this.config74 = !!e;
        this.config75 = !!e;
        this.config84 = !!e;
        this.config93 = !!e;
        this.config62 = !!e;
        if (e && e.item) {
          const model = e.item.get("model");
          this.config = model;
          this.label = model.label;
          this.labelCfg = {
            fontSize: model.labelCfg.fontSize,
            style: {
              fill: model.labelCfg.style.fill,
            },
            dataConfigUnchained: {
              para: model.labelCfg.dataConfigUnchained.para,
              cmd: model.labelCfg.dataConfigUnchained.cmd,
              operation: model.labelCfg.dataConfigUnchained.operation,
              priority: model.labelCfg.dataConfigUnchained.priority,
            },
            dataConfigThermo: {
              para: model.labelCfg.dataConfigThermo.para,
              cmd: model.labelCfg.dataConfigThermo.cmd,
              operation: model.labelCfg.dataConfigThermo.operation,
              priority: model.labelCfg.dataConfigThermo.priority,
            },
            dataConfigRobot1: {
              para: model.labelCfg.dataConfigRobot1.para,
              cmd: model.labelCfg.dataConfigRobot1.cmd,
              operation: model.labelCfg.dataConfigRobot1.operation,
              priority: model.labelCfg.dataConfigRobot1.priority,
            },
            dataConfigDiscover: {},
          };
          if (this.commonList.includes(e.item._cfg.model.label) ) {
            this.labelCfg["dataConfig" + e.item._cfg.model.label] = {
              para: model.labelCfg["dataConfig" + e.item._cfg.model.label].para,
              cmd: model.labelCfg["dataConfig" + e.item._cfg.model.label].cmd,
              operation: model.labelCfg["dataConfig" + e.item._cfg.model.label].operation,
              priority: model.labelCfg["dataConfig" + e.item._cfg.model.label].priority,
            }
          }
        }
      })
    },

    setconfig() {
      this.config74 = false;
      this.config75 = false;
      this.config84 = false;
      this.config93 = false;
      this.config62 = false;
    },

    save() {
      const founditem = this.graph.findById(this.$refs.getnodeid.value);
      console.log(founditem._cfg.model.label)
      founditem._cfg.model.labelCfg["dataConfig" + founditem._cfg.model.label].para = 
        this.$refs["get" + founditem._cfg.model.label + "para"].value;
      founditem._cfg.model.labelCfg["dataConfig" + founditem._cfg.model.label].cmd =
        this.$refs["get" + founditem._cfg.model.label + "cmd"].value;
      if (!(this.commonList.includes(founditem._cfg.model.label))) {
        founditem._cfg.model.labelCfg["dataConfig" + founditem._cfg.model.label].operation =
          this.$refs["get" + founditem._cfg.model.label + "operation"].value;
      }
    },
  },
};
</script>

<style lang="scss">
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
</style>
