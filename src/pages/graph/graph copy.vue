<template>
  <div class="root">
    <div id="headPanel" :class="{ hidden: headVisible }">
      <span class="logo" style="font-weight: bold">Instrument Flow Chart</span>
      <button class="save" style="float: right" @click="saveall">
        Save Data
      </button>
      <i class="space"></i>

      <span>
        <input type="file" id="file" style="display: none" multiple />
        <button class="save" style="float: right" @click="loadall">
          Load Data
        </button>
      </span>

      <span>
        <button class="save" style="float: right" @click="submitDB">
          Submit DB
        </button>
      </span>

      <span>
        <button
          class="save"
          style="float: right"
          @click="
            loadFromDB();
            dialogTableVisible = true;
          "
        >
          Load DB
        </button>
        <el-dialog
          title="Please choose order ID"
          :visible.sync="dialogTableVisible"
        >
          <el-table
            ref="singleTable"
            :data="
              tableData.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
            "
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column
              property="id"
              label="ID"
              width="370"
            ></el-table-column>
            <el-table-column
              property="order_name"
              label="ChartName"
              width="550"
            ></el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <div>
              <el-pagination
                style="float: center"
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="current_change"
              >
              </el-pagination>
              <div></div>
              <el-button @click="dialogTableVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="
                  dialogTableVisible = false;
                  loadDBJson();
                "
                >OK</el-button
              >
            </div>
          </span>
        </el-dialog>
      </span>

      <span>
        <button
          class="save"
          style="float: right"
          @click="dialogResetAllVisible = true"
        >
          Init All
        </button>
        <el-dialog
          title="Warning"
          :visible.sync="dialogResetAllVisible"
          width="30%"
        >
          <span>Confirm all instruments and HOLE SYSTEM SAFETY!</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogResetAllVisible = false">Cancel</el-button>
            <el-button
              type="primary"
              @click="
                dialogResetAllVisible = false;
                resetOrder();
              "
              >OK</el-button
            >
          </span>
        </el-dialog>
      </span>

      <span>
        <button
          id="emergencybtn"
          style="float: right"
          class="save"
          size="mini"
          @click="emergency()"
        >
          emergency
        </button>
      </span>
      <span>
        <button
          id="startbtn"
          style="float: right"
          :class="0 == display ? 'save' : 'notsave'"
          size="mini"
          @click="displayCheck()"
        >
          start
        </button>
      </span>

      <span>
        <el-switch
          style="float: right"
          v-model="valueAutoBoot"
          @change="changeStatus()"
          active-text="continous"
          inactive-text="single"
        >
        </el-switch>
      </span>

      <span style="float: right">
        Chart Name
        <input type="text" name="" id="" ref="ChartName" />
      </span>
    </div>
    <!-- 左侧按钮 -->
    <item-panel />

    <div id="canvasPanel" ref="canvasPanel" @dragover.prevent />
    <!-- AAA -->
    <div id="configPanel0" :class="{ hidden: !config0 }">
      <i class="gb-toggle-btn" @click="config0 = !config0" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigAAA.cmd" ref="getAAAcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigAAA.para"
            ref="getAAApara"
          ></textarea>
        </div>
      </div>
      <button @click="config0 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
    <!-- BBB -->
    <div id="configPanel0" :class="{ hidden: !config1 }">
      <i class="gb-toggle-btn" @click="config1 = !config1" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: {{ config.id }}, data: {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigBBB.cmd" ref="getBBBcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigBBB.para"
            ref="getBBBpara"
          ></textarea>
        </div>
      </div>
      <button @click="config1 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

    <!-- CCC -->
    <div id="configPanel0" :class="{ hidden: !config2 }">
      <i class="gb-toggle-btn" @click="config2 = !config2" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigCCC.cmd" ref="getCCCcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigCCC.para"
            ref="getCCCpara"
          ></textarea>
        </div>
      </div>
      <button @click="config2 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

    <!-- DDD -->
    <div id="configPanel0" :class="{ hidden: !config71 }">
      <i class="gb-toggle-btn" @click="config71 = !config71" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigDDD.cmd" ref="getDDDcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigDDD.para"
            ref="getDDDpara"
          ></textarea>
        </div>
      </div>
      <button @click="config71 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
    <!-- EEE -->
    <div id="configPanel0" :class="{ hidden: !config72 }">
      <i class="gb-toggle-btn" @click="config72 = !config72" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigEEE.cmd" ref="getEEEcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigEEE.para"
            ref="getEEEpara"
          ></textarea>
        </div>
      </div>
      <button @click="config72 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
    <!-- FFF -->
    <div id="configPanel0" :class="{ hidden: !config73 }">
      <i class="gb-toggle-btn" @click="config73 = !config73" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigFFF.cmd" ref="getFFFcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 600px"
            :value="labelCfg.dataConfigFFF.para"
            ref="getFFFpara"
          ></textarea>
        </div>
      </div>
      <button @click="config73 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
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

    <!-- GGG -->
    <div id="configPanel0" :class="{ hidden: !config81 }">
      <i class="gb-toggle-btn" @click="config81 = !config81" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigGGG.cmd" ref="getGGGcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 300px"
            :value="labelCfg.dataConfigGGG.para"
            ref="getGGGpara"
          ></textarea>
        </div>
      </div>
      <button @click="config81 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
    <!-- HHH -->
    <div id="configPanel0" :class="{ hidden: !config82 }">
      <i class="gb-toggle-btn" @click="config82 = !config82" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigHHH.cmd" ref="getHHHcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 300px"
            :value="labelCfg.dataConfigHHH.para"
            ref="getHHHpara"
          ></textarea>
        </div>
      </div>
      <button @click="config82 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>
    <!-- III -->
    <div id="configPanel0" :class="{ hidden: !config83 }">
      <i class="gb-toggle-btn" @click="config83 = !config83" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigIII.cmd" ref="getIIIcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 300px"
            :value="labelCfg.dataConfigIII.para"
            ref="getIIIpara"
          ></textarea>
        </div>
      </div>
      <button @click="config83 = false">Cancel</button>
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

    <!-- JJJ -->
    <div id="configPanel0" :class="{ hidden: !config91 }">
      <i class="gb-toggle-btn" @click="config91 = !config91" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigJJJ.cmd" ref="getJJJcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 100px"
            :value="labelCfg.dataConfigJJJ.para"
            ref="getJJJpara"
          ></textarea>
        </div>
      </div>
      <button @click="config91 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

    <!-- KKK -->
    <div id="configPanel0" :class="{ hidden: !config92 }">
      <i class="gb-toggle-btn" @click="config92 = !config92" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />, data:
        {{ config.data }}
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <h2 class="panel-title">Parameter</h2>
      <div class="config-data">
        <div class="config-item">
          cmd:
          <select :value="labelCfg.dataConfigKKK.cmd" ref="getKKKcmd">
            <option selected value="INIT">INIT</option>
            <option value="START">START</option>
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
          </select>
          <div>para:</div>
          <textarea
            style="width: 450px; height: 100px"
            :value="labelCfg.dataConfigKKK.para"
            ref="getKKKpara"
          ></textarea>
        </div>
      </div>
      <button @click="config92 = false">Cancel</button>
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
            <option value="SAMPLELOAD">SAMPLELOAD</option>
            <option value="SAMPLEUNLOAD">SAMPLEUNLOAD</option>
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

    <!-- AROP -->
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
    <!-- SIMAI -->
    <div id="configPanel0" :class="{ hidden: !config63 }">
      <i class="gb-toggle-btn" @click="config63 = !config63" />
      <h2 class="panel-title">Node</h2>
      <div class="config-data">
        id: <input :value="config.id" ref="getnodeid" />
        <div class="config-item">instr: <input :value="label" /></div>
      </div>
      <button @click="config63 = false">Cancel</button>
      <button class="save" @click="save">Save</button>
    </div>

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
import ItemPanel from "./ItemPanel.vue";
import axios from "axios";
import "default-passive-events";
import { saveAs } from "file-saver";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default {
  name: "AllGraph",
  components: {
    ItemPanel,
  },
  data() {
    return {
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

        dataConfigAAA: {},
        dataConfigBBB: {},
        dataConfigCCC: {},
        dataConfigDDD: {},
        dataConfigEEE: {},
        dataConfigFFF: {},
        dataConfigGGG: {},
        dataConfigHHH: {},
        dataConfigIII: {},
        dataConfigJJJ: {},
        dataConfigKKK: {},
        dataConfigRobot1: {},
        dataConfigRobot2: {},
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
      config0: false,
      config1: false,
      config2: false,
      config71: false,
      config72: false,
      config73: false,
      config74: false,
      config75: false,
      config81: false,
      config82: false,
      config83: false,
      config84: false,
      config91: false,
      config92: false,
      config93: false,
      config94: false,

      config62: false,
      config63: false,

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
      multipleSelection: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,

      autoboot: null,
      receiveMessage: "",

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
      getrobot1para: "",
      getrobot2para: "",
      getthermopara: "",
      getscaratpara: "",

      staArr: [],
      url: "http://192.168.1.165:5000",
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
          // const _ = require("lodash");
          // this.ret2OptData = _.cloneDeep(event.data.message.flowchart);
        }
        if (event.data.type == "sig") {
          this.retFlowchart2Opt();
        }
      },
      false
    );

    setInterval(() => {
      this.getOrderStatus();
    }, 2000);
  },
  beforeDestroy() {
    this.graph.destroy();
  },

  func() {
    return this.graph.findAll("node");
  },

  methods: {
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
            dataConfigAAA: {},
            dataConfigBBB: {},
            dataConfigCCC: {},
            dataConfigDDD: {},
            dataConfigEEE: {},
            dataConfigFFF: {},
            dataConfigGGG: {},
            dataConfigHHH: {},
            dataConfigIII: {},
            dataConfigJJJ: {},
            dataConfigKKK: {},
            dataConfigUnchained: {},
            dataConfigDiscover: {},
            dataConfigThermo: {},
            dataConfigRobot1: {},
            dataConfigRobot2: {},
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
            "drag-canvas",
            "drag-shadow-node",
            "canvas-event",
            "delete-item",
            "select-node",
            "hover-node",
          ],
          originDrag: [
            "drag-canvas",
            "drag-node",
            "canvas-event",
            "delete-item",
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
        this.config0 = !!e;
        this.config1 = !!e;
        this.config2 = !!e;
        this.config71 = !!e;
        this.config72 = !!e;
        this.config73 = !!e;
        this.config74 = !!e;
        this.config75 = !!e;

        this.config81 = !!e;
        this.config82 = !!e;
        this.config83 = !!e;
        this.config84 = !!e;

        this.config91 = !!e;
        this.config92 = !!e;
        this.config93 = !!e;

        this.config62 = !!e;
        this.config63 = !!e;
        if (e && e.item) {
          const model = e.item.get("model");

          this.config = model;
          this.label = model.label;
          this.labelCfg = {
            fontSize: model.labelCfg.fontSize,
            style: {
              fill: model.labelCfg.style.fill,
            },
            dataConfigAAA: {
              para: model.labelCfg.dataConfigAAA.para,
              cmd: model.labelCfg.dataConfigAAA.cmd,
            },
            dataConfigBBB: {
              para: model.labelCfg.dataConfigBBB.para,
              cmd: model.labelCfg.dataConfigBBB.cmd,
            },
            dataConfigCCC: {
              para: model.labelCfg.dataConfigCCC.para,
              cmd: model.labelCfg.dataConfigCCC.cmd,
            },
            dataConfigDDD: {
              para: model.labelCfg.dataConfigDDD.para,
              cmd: model.labelCfg.dataConfigDDD.cmd,
            },
            dataConfigEEE: {
              para: model.labelCfg.dataConfigEEE.para,
              cmd: model.labelCfg.dataConfigEEE.cmd,
            },
            dataConfigFFF: {
              para: model.labelCfg.dataConfigFFF.para,
              cmd: model.labelCfg.dataConfigFFF.cmd,
            },
            dataConfigUnchained: {
              para: model.labelCfg.dataConfigUnchained.para,
              cmd: model.labelCfg.dataConfigUnchained.cmd,
              operation: model.labelCfg.dataConfigUnchained.operation,
              priority: model.labelCfg.dataConfigUnchained.priority,
            },
            dataConfigDiscover: {
              para: model.labelCfg.dataConfigDiscover.para,
              cmd: model.labelCfg.dataConfigDiscover.cmd,
              operation: model.labelCfg.dataConfigDiscover.operation,
              priority: model.labelCfg.dataConfigDiscover.priority,
            },
            dataConfigGGG: {
              para: model.labelCfg.dataConfigGGG.para,
              cmd: model.labelCfg.dataConfigGGG.cmd,
            },
            dataConfigHHH: {
              para: model.labelCfg.dataConfigHHH.para,
              cmd: model.labelCfg.dataConfigHHH.cmd,
            },
            dataConfigIII: {
              para: model.labelCfg.dataConfigIII.para,
              cmd: model.labelCfg.dataConfigIII.cmd,
            },
            dataConfigThermo: {
              para: model.labelCfg.dataConfigThermo.para,
              cmd: model.labelCfg.dataConfigThermo.cmd,
              operation: model.labelCfg.dataConfigThermo.operation,
              priority: model.labelCfg.dataConfigThermo.priority,
            },

            dataConfigJJJ: {
              para: model.labelCfg.dataConfigJJJ.para,
              cmd: model.labelCfg.dataConfigJJJ.cmd,
            },
            dataConfigKKK: {
              para: model.labelCfg.dataConfigKKK.para,
              cmd: model.labelCfg.dataConfigKKK.cmd,
            },
            dataConfigRobot1: {
              para: model.labelCfg.dataConfigRobot1.para,
              cmd: model.labelCfg.dataConfigRobot1.cmd,
              operation: model.labelCfg.dataConfigRobot1.operation,
              priority: model.labelCfg.dataConfigRobot1.priority,
            },
          };

          console.log("====");
          console.log(this.labelCfg);
          this.node = {
            fill: model.style.fill,
            borderColor: model.style.stroke,
            lineDash: model.style.lineDash || "none",
            width: model.style.width,
            height: model.style.height,
            shape: model.type,
          };
          console.log("-----");
          console.log(this.config);
          console.log(this.labelCfg);
        }
      });

      this.graph.on("on-node-mouseenter", (e) => {
        if (e && e.item) {
          e.item.getOutEdges().forEach((edge) => {
            edge.clearStates("edgeState");
            edge.setState("edgeState", "hover");
          });
        }
      });

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

      this.graph.on(
        "before-edge-add",
        ({ source, target, sourceAnchor, targetAnchor }) => {
          setTimeout(() => {
            this.graph.addItem("edge", {
              id: `${+new Date() + (Math.random() * 10000).toFixed(0)}`, // edge id
              source: source.get("id"),
              target: target.get("id"),
              sourceAnchor,
              targetAnchor,
            });
          }, 100);
        }
      );
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
      if (_val == null) {
        _val = this.nowRow.id;
      }
      // axios.post('http://localhost:5000/api/load',{
      axios
        .post(this.url + "/api/load", {
          order_id: _val,
        })
        .then((res) => {
          let tmp = res["data"]["msg"];
          this.handleStringify(tmp);
          // for (let index = 0; index < tmp['nodes'].length; index++) {
          //   var keys = Object.keys(tmp['nodes'][index]['labelCfg']);
          //   for (let j = 0; j < keys.length; j++) {
          //     let position = keys[j].search('dataConfig')
          //     if (position >= 0 && this.isJSON(JSON.stringify(tmp['nodes'][index]['labelCfg'][keys[j]]['para']))) {
          //       tmp['nodes'][index]['labelCfg'][keys[j]]['para'] =
          //         JSON.stringify(tmp['nodes'][index]['labelCfg'][keys[j]]['para'], null, 2)
          //     }
          //   }
          // }
          this.currentOrderData = tmp;
          this.graph.read(tmp);
          this.currentOrderID = _val;
        });
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
