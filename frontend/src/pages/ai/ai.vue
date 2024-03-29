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
      <div >
        <el-col :span="14">
          <div class="grid-content opt-title" >{{ optimizationTitle }}</div>
          <el-divider></el-divider>
          <div :span="10" class="step-bar">
            <el-steps :active="active" finish-status="success" align-center>
              <el-step :title=step1 ></el-step>
              <el-step :title=step2></el-step>
              <el-step :title=step3></el-step>
              <el-step :title=step4></el-step>
              <el-step :title=step5></el-step>
              <el-step :title=step6></el-step>
              <el-step :title=step7></el-step>
            </el-steps>
          </div>

          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick" ref="tabs">
              <el-tab-pane label="Step 1" name="first">
                <div>
                  <el-row>
                    <el-col @submit.native.prevent>
                      <div style="position: relative">
                        <el-input
                          style="position: absolute"
                          :placeholder="inputPlaceholder"
                          v-model="inputsmiles"
                          class="input-with-select"
                          @keyup.enter.native="searchFromText()"
                        >
                      </el-input>
                      <el-button
                        style="position :absolute;"
                        class="rounded-right-button"
                        @click="dialogTableVisible = true;"
                      >
                    <i class="el-icon-edit"></i>
                  </el-button>
                      </div>

                      <div>
                        <el-dialog
                          :title="canvasTitle"
                          class="canvas-container"
                          :visible.sync="dialogTableVisible"
                          v-draggable
                          >
                          <div>
                            <iframe
                              id="idKetcher"
                              src="./standalone/index.html"
                              width="100%"
                              height="580"
                            />
                          </div>
                          <span slot="footer" class="dialog-footer">
                            <div class=canvas-footer>
                              <a @click="dialogTableVisible = false; searchSmile();">
                                <div class="submit canvas-btn" >{{ doneBtn }}
                                </div>
                              </a>
                            </div>
                          </span>
                        </el-dialog>
                      </div>
                    </el-col>

                    <div>
                      <div
                        id="equation"
                        align="center"
                        style="visibility: hidden"
                        class="equation-img"
                        >
                        <canvas id="equation_src"></canvas>
                        <el-image :src="img_arrow"></el-image>
                        <canvas id="equation_dst"></canvas>
                      </div>
                    </div>

                    <div id="table1" style="display: none">
                    </div>
                  </el-row>
                </div>
              </el-tab-pane>

              <el-tab-pane label="Step 2" name="second">
                <div class="text-container">
                  <el-tabs v-model="nlpName">
                    <el-tab-pane :label="gptTab[0]" name="first">
                      <el-row>
                        <div class="text-gro">
                          <el-col :span="10" align="center">
                            <div class="text-part">{{gptTextTitle[0]}}</div>
                            <el-input
                              type="textarea"
                              :rows="10"
                              v-model="textarea1Synthesis"
                              resize="none"
                            >
                            </el-input>
                            <div class="text-part">
                              {{ gptTextTitle[1] }}
                            </div>
                            <el-input
                              type="textarea"
                              :rows="10"
                              v-model="textarea1Workup"
                              resize="none"
                            >
                            </el-input>
                          </el-col>
                          <el-col :span="4" align="center">
                            <a @click="nlp2procedure">
                              <div class="gpt">
                                <i class="iconfont icon-send-fill"></i>
                              </div>
                            </a>
                          </el-col>
                          <el-col :span="10" align="center">
                            <div clas="text-part">{{ gptTextTitle[0] }}</div>
                            <el-input
                              type="textarea"
                              :rows="10"
                              v-model="textarea2Synthesis"
                              resize="none"
                              :disabled="true"
                            >
                            </el-input>
                            <div class="text-part">
                              {{ gptTextTitle[1] }}
                            </div>
                            <el-input
                              type="textarea"
                              :rows="10"
                              v-model="textarea2Workup"
                              resize="none"
                              :disabled="true"
                            >
                            </el-input>
                          </el-col>
                        </div>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="gptTab[1]" name="second">
                      <div style="position:relative;">
                        <div class="text-range">
                          <el-input
                            type="textarea"
                            :rows="24"
                            v-model="variableAndRange"
                            resize="none"
                          >
                          </el-input>
                            <el-col :span="8" >
                              <a @click="nlp2space">
                                <div class="gpt text-range-btn"  >
                                  <i class="iconfont icon-send-fill"></i>
                                </div>
                              </a>
                            </el-col>
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-tab-pane>

              <el-tab-pane label="Step 3" name="third">
                <div style="overflow: auto">
                  <el-scrollbar
                    class="infinite-list steps-scroll"
                    v-infinite-scroll="loadSteps"
                    :native="false"
                    :noresize="false"
                    tag="section"
                    align="center"
                  >
                    <div
                      v-for="(item, index) in dataStep"
                      :key="index"
                    >
                      <el-row>
                        <el-row>
                          <h1 class="steps-ele-header">
                            {{ stepTitle }} {{ index + 1 }}
                          </h1>
                          <el-link icon="el-icon-circle-plus-outline"
                            class="steps-ele-icon"
                            @click="insertCurrentStep(index)" v-bind:title="iconBind[0]">
                          </el-link>
                          <el-link icon="el-icon-delete"
                            class="steps-ele-icon"
                            @click="deleteCurrentStep(index)" v-bind:title="iconBind[1]">
                          </el-link>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            <el-row>
                              <div>{{ stepHeader[0] }}</div>
                              <div class="grid-content">
                                <el-select
                                  class="input-common"
                                  v-model.trim="item['action']"
                                  :placeholder=inputChoose
                                  style="width: 65%"
                                >
                                  <el-option
                                    v-for="it in optionsAction"
                                    :key="it.value"
                                    :label="it.label"
                                    :value="it.label"
                                  >
                                </el-option>
                                </el-select>
                              </div>
                            </el-row>
                          </el-col>
                          <el-col :span="8">
                            <div>{{ stepHeader[1] }}</div>
                            <div class="grid-content">
                              <el-input-number
                                class="input-common"
                                :disabled="item['checkParameter']"
                                style="width: 65%"
                                v-model.trim="item['parameter']"
                                @change="handleChangeQuantity(index)"
                                :precision="2"
                                :step="0.1"
                                :min="0"
                                :max="5000"
                                label="description"
                              ></el-input-number>
                            </div>
                            <div style="margin-left: -24%">
                              <el-checkbox
                                v-model.trim="item['checkParameter']"
                                @change="handleCheckParameter(index)"
                                >{{ variableCheck }}</el-checkbox
                                >
                              </div>
                            </el-col>
                            <el-col :span="8">
                              <div>{{ stepHeader[2] }}</div>
                              <div class="grid-content">
                                <el-select
                                class="input-common"
                                v-model.trim="item['unit']"
                                :placeholder=inputChoose
                                style="width: 65%"
                              >
                                <el-option
                                  v-for="itemunit in options"
                                  :key="itemunit.value"
                                  :label="itemunit.label"
                                  :value="itemunit.label"
                                >
                                </el-option>
                              </el-select>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row
                          v-if="
                            isShowReagent(item['action']) &&
                            isShowTag(item['action'])
                            "
                        >
                        <el-col :span="8">
                          <div>{{ stepHeader[3] }}</div>
                          <div class="grid-content" style="width: 65%">
                            <el-input
                            class="input-common"
                            v-model.trim="item['name']"
                            placeholder="input"
                              ></el-input>
                            </div>
                            <div style="margin-left: -24%">
                              <el-checkbox
                              v-model.trim="item['checkReagent']"
                              @change="handleCheckReagent(index)"
                              >{{ variableCheck }}</el-checkbox
                              >
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div>{{ stepHeader[4] }}</div>
                            <div class="grid-content">
                              <el-select
                                class="input-common"
                                v-model.trim="item['tag']"
                                :placeholder=inputChoose
                                style="width: 65%"
                              >
                                <el-option
                                  v-for="itemtags in optionsTags"
                                  :key="itemtags.value"
                                  :label="itemtags.label"
                                  :value="itemtags.label"
                                >
                                </el-option>
                              </el-select>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content" />
                          </el-col>
                        </el-row>
                      </el-row>
                      <el-divider></el-divider>
                    </div>
                    <el-link icon="el-icon-circle-plus-outline"
                      class="steps-ele-icon"
                      @click="insertBottomStep()" v-bind:title="iconBind[2]">
                    </el-link>
                  </el-scrollbar>
                  <el-row>
                  </el-row>
                  <el-col :span="8">
                    <div>
                      <h1 class="steps-single-header">{{ timeTitle[0] }}</h1>
                    </div>
                    <div class="grid-content">
                      <el-input-number
                        class="input-common"
                        :disabled="checkTime"
                        style="width: 65%; margin-left: 17.5%;"
                        v-model.trim="getTime['time']"
                        :precision="1"
                        :step="1"
                        :min="0"
                        :max="500"
                        label="description"
                      ></el-input-number>
                      <span class="time-unit">{{ timeTitle[1] }}</span>
                    </div>
                    <div style="margin-left: 17.5%;">
                      <el-checkbox @change="handleCheckTime()" v-model="checkTime">
                        {{ variableCheck }}
                      </el-checkbox>
                    </div>
                  </el-col>
                </div>
              </el-tab-pane>

              <el-tab-pane label="Step 4" name="fourth">
                <el-scrollbar
                  class="infinite-list space-container"
                  >
                  <div v-if="isShowNoteOfSpace(getSpace)">
                    <h1 class="steps-single-header">
                      {{ spaceHint }}
                    </h1>
                  </div>
                  <el-row v-if="!isShowNoteOfSpace(getSpace)">
                    <h1 class="steps-ele-header">
                      {{ spaceTitle }} 
                    </h1>
                  </el-row>
                  <div style="overflow: auto">
                    <div
                      v-for="(item, index) in getSpace"
                      :key="index"
                      class="space-gap"
                      align="center"
                      >
                      <div>
                        <el-row v-if="isShowCountinousVar(item)">
                          <el-col :span="8">
                            <div class="grid-content" style="width: 65%">
                              <el-input
                                class="input-common"
                                v-model.trim="item['name']"
                                placeholder="input"
                              ></el-input>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content">
                              {{ rangeTitle[0] }}
                              <el-input-number
                                class="input-common"
                                v-model.trim="item['range'][0]"
                                style="width: 60%"
                                @change="handleChangeMin(index)"
                                :min="0"
                                :max="50"
                                label="description"
                              ></el-input-number>
                            </div>
                          </el-col>
                          <el-col :span="8">
                            <div class="grid-content">
                              {{ rangeTitle[1] }}
                              <el-input-number
                                class="input-common"
                                v-model.trim="item['range'][1]"
                                style="width: 60%"
                                @change="handleChangeMax(index)"
                                :min="0"
                                :max="100"
                                label="description"
                              ></el-input-number>
                            </div>
                          </el-col>
                        </el-row>
                      </div>

                      <div v-if="isShowCategoricalVar(item)" style="width: 88.5%">
                        <el-collapse @change="changeClickedStatus(index)" :class="chooseClass(index)">
                          <el-collapse-item name="1" align="left">
                            <template slot="title">
                              <div class=space-align >
                                {{ item["name"] }}{{ " ("
                                }}{{ item["range"].length }}{{ ")" }}
                              </div>
                            </template>
                            <div v-for="(it, ind) in item['range']" :key="ind">
                              <div >
                                <el-input
                                  class="input-common space-align"
                                  style="width: 20%"
                                  v-model.trim="item['range'][ind]"
                                >
                                </el-input>
                                <el-link
                                  icon="el-icon-delete"
                                  class="space-delete-icon"
                                  @click="reduceCategory(index, ind)"
                                ></el-link>
                              </div>
                            </div>
                          </el-collapse-item>
                        </el-collapse>
                        <el-row>
                          <el-link icon="el-icon-circle-plus-outline"
                            class="space-add-icon"
                            @click="addCategory(index)" v-bind:title="iconBind[2]"></el-link>
                        </el-row>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </el-tab-pane>

              <el-tab-pane label="Step 5" name="fifth">
                <el-scrollbar
                  class="infinite-list space-container"
                  >
                  <el-row>
                    <div align="center">
                      <el-row>
                        <h1 class=steps-ele-header>
                          {{ algorithmPart['name'] }}
                        </h1>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <div>{{ algorithmPart['titles'][0] }}</div>
                          <div class="grid-content">
                            <el-input-number
                              class="input-common"
                              style="width: 65%"
                              v-model.trim="reactionAlgorithm['reactor_num']"
                              :step="1"
                              :min="1"
                              :max="50"
                              label="description"
                            ></el-input-number>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <el-row>
                            <div>{{ algorithmPart['titles'][1] }}</div>
                            <div class="grid-content">
                              <el-select
                                class="input-common"
                                v-model.trim="reactionAlgorithm['schedule']"
                                :placeholder=inputChoose
                                style="width: 65%"
                              >
                                <el-option
                                  v-for="itemSchedule in optionsSchedule"
                                  :key="itemSchedule.value"
                                  :label="itemSchedule.label"
                                  :value="itemSchedule.label"
                                >
                                </el-option>
                              </el-select>
                            </div>
                          </el-row>
                        </el-col>
                        <el-col :span="8">
                          <div>{{ algorithmPart['titles'][2] }}</div>
                          <div class="grid-content">
                            <el-input-number
                              class="input-common"
                              style="width: 65%"
                              v-model.trim="reactionAlgorithm['init_num']"
                              :step="1"
                              :min="1"
                              :max="50"
                              label="description"
                            ></el-input-number>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <div>{{ algorithmPart['titles'][3] }}</div>
                          <div class="grid-content">
                            <el-select
                              class="input-common"
                              v-model.trim="reactionAlgorithm['init_method']"
                              :placeholder=inputChoose
                              style="width: 65%"
                            >
                              <el-option
                                v-for="itemInitMethod in optionsInitMethod"
                                :key="itemInitMethod.value"
                                :label="itemInitMethod.label"
                                :value="itemInitMethod.label"
                              >
                              </el-option>
                            </el-select>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div>{{ algorithmPart['titles'][4] }}</div>
                          <div class="grid-content">
                            <el-input-number
                              class="input-common"
                              style="width: 65%"
                              v-model.trim="reactionAlgorithm['max_exp']"
                              :step="1"
                              :min="0"
                              :max="100"
                              label="description"
                            ></el-input-number>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div>{{ algorithmPart['titles'][5] }}</div>
                          <div class="grid-content">
                            <el-input-number
                              class="input-common"
                              style="width: 65%"
                              v-model.trim="reactionAlgorithm['pi_threshold']"
                              :precision="5"
                              :step="0.0001"
                              :min="-0.0001"
                              :max="5"
                              label="description"
                            ></el-input-number>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-row>
                  <el-divider></el-divider>
                  <el-row>
                    <div align="center" style="margin-top: 2%">
                      <el-row>
                        <h1 class="steps-ele-header">
                          {{ algorithmPart['objective'] }}
                        </h1>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-select
                            class="input-common"
                            v-model="valueObjective['objective']"
                            multiple
                            :placeholder=inputChoose
                            style="width: 65%"
                          >
                            <el-option
                              v-for="itemObjective in optionsObjective"
                              :key="itemObjective.value"
                              :label="itemObjective.label"
                              :value="itemObjective.label"
                            >
                            </el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </div>
                  </el-row>
                </el-scrollbar>
              </el-tab-pane>

              <el-tab-pane label="Step 6" name="sixth">
                <el-scrollbar
                  class="infinite-list space-container"
                  >
                  <el-row>
                    <h1 class="steps-ele-header">
                      {{analysisPart['title']}}
                    </h1>
                  </el-row>
                  <el-row>
                    <div align="center">
                      <el-row>
                        <div class="grid-content">
                          <div>
                            <el-col :span="6">
                              <h1 class="analysis-header">
                                {{analysisPart['name']}} :
                              </h1>
                            </el-col>
                          </div>
                          <el-col :span="12">
                            <el-select
                              class="input-common"
                              v-model.trim="dataAnalysis['Method']"
                              :placeholder=inputChoose
                              style="width: 75%"
                            >
                              <el-option
                                v-for="itemAnalysisMethod in optionsAnalysisMethod"
                                :key="itemAnalysisMethod.value"
                                :label="itemAnalysisMethod.label"
                                :value="itemAnalysisMethod.label"
                              >
                              </el-option>
                            </el-select>
                          </el-col>
                        </div>
                      </el-row>

                      <!--  HPLC PARA   FIXED  ⬇ ⬇ ⬇ ⬇ ⬇  -->
                      <el-row v-if="isShowDetailMethod()">
                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][0]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['InstrumentMethod']"
                              style="width: 75%"
                            >
                            </el-input>
                          </el-col>
                        </div>

                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][1]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['ProcessingMethod']"
                              style="width: 75%"
                              >
                            </el-input>
                          </el-col>
                        </div>

                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][2]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['TemplateName']"
                              style="width: 75%"
                            >
                            </el-input>
                          </el-col>
                        </div>

                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][3]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['SequenceName']"
                              style="width: 75%"
                            >
                            </el-input>
                          </el-col>
                        </div>

                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][4]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['ProjectName']"
                              style="width: 75%"
                            >
                            </el-input>
                          </el-col>
                        </div>

                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][5]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['Channels'][0]"
                              style="width: 75%"
                            >
                            </el-input>
                          </el-col>
                        </div>

                        <div class="grid-content detail-top" >
                          <el-col :span="6">
                            <h1 class="detail-method">
                              {{analysisPart['titles'][6]}} :
                            </h1>
                          </el-col>
                          <el-col :span="12">
                            <el-input
                              class="input-common"
                              v-model.trim="hplcPara['Injection'][0][1]"
                              style="width: 75%"
                            >
                            </el-input>
                          </el-col>
                          <el-col :span="1">
                            <div class="method-unit">
                              μL
                            </div>
                          </el-col>
                        </div>
                      </el-row>
                      <!-- ⬆ ⬆ ⬆ ⬆ ⬆ -->
                    </div>
                  </el-row>
                </el-scrollbar>
              </el-tab-pane>

              <div>
                <div>
                  <el-dialog
                    :title="savePart[0]"
                    style="border-radius: 10px"
                    :visible.sync="finishTableVisible"
                  >
                    <div>
                      <el-form label-width="120px" 
                        :model="project_form" 
                        :rules="project_rules" 
                        ref="ruleProjectForm" 
                        @submit.native.prevent>
                        <el-form-item :label="savePart[1]" prop="project_name">
                          <el-input
                            class="input-common"
                            v-model="project_form.project_name"
                            @keyup.enter.native="finishStep('ruleProjectForm')"
                          ></el-input>
                        </el-form-item>

                      </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <div style="margin-left: 88%; ">
                        <a @click="finishStep('ruleProjectForm')">
                          <div class="submit" >
                            {{ savePart[4] }}
                          </div>
                        </a>
                      </div>
                    </span>
                  </el-dialog>
                </div>

                <div id="button1" :style="{height: isOccupying() + 'px'}">
                  <iframe
                    ref="iframedom"
                    src=""
                    id="frames"
                    frameborder="0"
                    style="visibility: hidden;"
                    class="occupy"
                    >
                  </iframe>
                </div>
                <el-tab-pane label="Step 7" name="seventh">
                    <div style="position:relative; margin-left: 89%; ">
                      <a @click="confirmAllPara">
                        <div class="gpt" style="font-size: medium ; font-weight: 700;">
                          {{checkBtn}}
                        </div>
                      </a>
                    </div>
                </el-tab-pane>
              </div>

              <el-tab-pane label="Step 8" name="eighth">
                <iframe
                  src=""
                  id="display"
                  frameborder="0"
                  style="width: 100%; height: 600px"
                ></iframe>
              </el-tab-pane>
            </el-tabs>

            <div style="visibility: hidden"></div>
          </div>
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
import axios from "axios";
import conf from "../../../vue.config";
import lodash from "lodash";
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
      valueLights: true,
      instanceId: "",
      url: conf.backend_url,
      testVmodel: "",
      postdataList: [],
      src: "./img/smiles2img/20230605171212.png",
      active: -1,
      tableData: [],
      radio: -1,
      hiddenTableHeader: false,
      dialogTableVisible: false,
      finishTableVisible: false,
      tablevisible: false,
      activeName: "first",
      optimalName: "optimalSpace",
      nlpName: "first",
      variableAndRange: "",  // Optimization variables & range  text content
      textarea1Synthesis: "",
      textarea1Workup: "",
      textarea2Synthesis: "",
      textarea2Workup: "",
      count: 0,
      countSteps: 0,
      countCategory: 0,
      datajson: [],
      getAction: {}, // from backend
      getTime: {},
      checkTime: false,
      getFlowchartData: {}, //whole flowchart
      getStringifyFlowchartData: "",
      listRobot1ParaMod: [
        { name: "transport", para: "" },
        { name: "back transport", para: "" },
      ],
      listThermoParaMod: [{ name: "analyze", para: "" }],
      listUnchainedParaMod: [
        { name: "synthesis", para: "" },
        { name: "workup", para: "" },
        { name: "transfer", para: "" },
        { name: "back transfer", para: "" },
      ], // Unchained para module
      getGPTSynthesisRes: {},
      getGPTWorkupRes: {},
      dataStep: [], //display data
      dataStepFromGPT: [],
      dataSpaceFromGPT: [],
      dataTimeFromGPT: false,  // from GPT, checked or not
      tempRange: [],  //temRange store Range from GPT
      retStep: {}, //return to backend, json1
      getSpace: [], //get from Steps Page
      retSpace: {}, //space json to backend
      spaceClickedList: [],
      projectName: '',
      //algorithm to backend
      reactionAlgorithm: {
        reactor_num: 3,
        schedule: "SRIA",
        init_num: 6,
        init_method: "Random",
        max_exp: 50,
        pi_threshold: 0.01,
      },
      dataAnalysis: {
        Method: "",
        info: [
          { role: "Product", retention_time: 0 },
          { role: "IS", retention_time: 0 },
        ],
      },
      hplcPara: {},
      dataTime: 0,
      dataCategory: [],
      thisname: "",
      nummin: 5,
      collapesNames: ["1"],
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
      optionsAction: [
        {
          value: "choice1",
          label: "stir",
        },
        {
          value: "choice2",
          label: "temperature",
        },
        {
          value: "choice3",
          label: "dispense",
        },
      ],
      optionsTags: [
        {
          value: "choice1",
          label: "SyringePump,ExtSingleTip",
        },
        {
          value: "choice2",
          label: "Powder",
        },
      ],
      optionsSchedule: [
        {
          value: "choice1",
          label: "SRBA",
        },
        {
          value: "choice2",
          label: "SRIA",
        },
        {
          value: "choice3",
          label: "ARIA",
        },
        {
          value: "choice4",
          label: "SRBA-PI",
        },
        {
          value: "choice5",
          label: "SRIA-PI",
        },
        {
          value: "choice6",
          label: "ARIA-PI",
        },
      ],
      optionsInitMethod: [
        {
          value: "choice1",
          label: "Random",
        },
        {
          value: "choice2",
          label: "LHS",
        },
      ],
      optionsObjective: [
        {
          value: "choice1",
          label: "Yield",
        },
        {
          value: "choice2",
          label: "Selectivity",
        },
      ],
      optionsAnalysisMethod: [
        {
          value: "choice1",
          label: "",
        },
        {
          value: "choice2",
          label: "HPLC",
        },
      ],
      valueObjective: { objective: ["Yield"] },
      valueunit: "",
      inputRef: "",
      inputsmiles: "C(C(O)C)1=CC=C(CO)C=C1>>C(C(O)C)1=CC=C(C=O)C=C1",
      project_rules: {
        project_name: [
            { required: true, message: 'Please input project name', trigger: 'blur' },
        ],
      },
      project_form: {
        project_name: '',
      },
      order_id: 0,
      smiles_ret: {},
      ketcher: null,
      fullscreenLoading: false,
      img_url: "./img/smiles2img/blank.png",
      img_arrow: "./img/smiles2img/arrow_trans.png",
      imgArr: [],
      currentRow: {},
      optimizationTitle: 'Reaction self-optimization',
      inputPlaceholder: 'Input Chemical Equation...',
      simpleAlertContent: "Wrong Input",
      step1: 'Reaction',
      step2: 'GPT',
      step3: 'Steps',
      step4: 'Space',
      step5: 'Algorithm',
      step6: 'Analysis',
      step7: 'Flowchart',
      languageVal: 'En',
      canvasTitle: 'Molecular Canvas',
      cancelBtn: 'Cancel',
      doneBtn: 'Done',
      nextBtn: 'Next',
      prevBtn: 'Prev',
      checkBtn: 'Check all',
      iconBind: ['insert', 'remove', 'add'],
      gptTab: ['Interpreter', 'Optimization variables & range'],
      gptTextTitle: ['Synthesis', 'Workup'],
      gpt2spaceAlarm: ['Get Optimization variables & range from GPT!', 'SUCCESS', 'Cancel', 'OK'],
      stepTitle: 'Step',
      stepHeader: ['Action','Parameter','Unit','Reagent','Tags',],
      variableCheck: 'optimization variable',
      timeTitle: ['Time', 'min'],
      spaceTitle: 'Space',
      spaceHint: 'There is no optimization variable selected. Please turn back to previous step and choose some parameter or reagent you want to be optimized.',
      rangeTitle: ['min', 'max'],
      algorithmPart: {
        'name': 'Algorithm',
        'titles': [
          'Reactor Num',
          'Schedule',
          'Init Num',
          'Init Method',
          'Max Exp',
          'PI Threshold'
        ],
        'objective': 'Objective'
      },
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
          'Injection Volume'
        ]
      },
      inputChoose: 'Choose',
      savePart: ['Save Project', 'Project Name', 'Please input project name', 'Cancel', 'Submit'],
    };
  },
  methods: {
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
    isOccupying(){
      if (this.activeName == "seventh") {
        return 560
      }
      else {
        return 60
      }
    },

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
    handleCollapseChange() {},

    handleCheckReagent(_index) {
      if (this.dataStep[_index]["checkReagent"] == true) {
        this.dataStep[_index]["name"] = "";
      }
      else{
        this.dataStep[_index]["name"] = this.dataStep[_index]["name_bak"]
      }
    },

    handleCheckParameter(_index) {
      if (this.dataStep[_index]["checkParameter"] == true) {
        console.log(this.getAction[_index + 1]);
        this.getAction[_index + 1]["parameter"] = "parameter";

      } else {
        this.getAction[_index + 1]["parameter"] =
          this.dataStep[_index + 1]["parameter"];
      }
    },
    handleCheckTime() {
      console.log(this.checkTime, this.dataTime);
      if (this.checkTime == true) {
        this.getTime["time"] = "parameter";
      } else {
        this.getTime["time"] = this.dataTime;
      }
    },
    deleteCurrentStep(_index) {
      this.dataStep.splice(_index, 1);
      console.log("%%%", this.dataStep, this.dataStep.length);
      delete this.getAction[_index + 1];
      console.log("+++", this.getAction);
      for (let index = _index; index < this.dataStep.length; index++) {
        this.getAction[index + 1] = this.getAction[index + 2];
        delete this.getAction[index + 2];
      }
      console.log("+++", this.getAction);
    },

    isShowReagent(_value) {
      return this.isShowComm(_value);
    },

    isShowTag(_value) {
      return this.isShowComm(_value);
    },

    isShowComm(_value) {
      if (_value == "dispense") {
        return true;
      }
      return false;
    },

    handleChangeAction(_ind, _val) {
      this.dataStep[_ind]["action"] = _val;
    },

    isShowCountinousVar(_val) {
      if (_val["type"] == "continuous") {
        return true;
      }
    },

    isShowCategoricalVar(_val) {
      if (_val["type"] == "categorical") {
        return true;
      }
    },

    isShowNoteOfSpace(_val) {
      let cnt = 0;
      if (_val.length == 0) {
        return true;
      }
    },

    isShowDetailMethod() {
      if (this.dataAnalysis["Method"] == "") {
        return false;
      } else {
        return true;
      }
    },

    isShowByproductDelete(_item) {
      if (_item["role"].includes("Byproduct")) {
        return true;
      } else {
        return false;
      }
    },

    deleteCurrentByproduct(_item, _index) {
      console.log(_item, _index);
      this.dataAnalysis["info"].splice(_index, 1);
      for (
        let index = _index;
        index < this.dataAnalysis["info"].length;
        index++
      ) {
        console.log(Number(this.dataAnalysis["info"][index]["role"].slice(10)));
        this.dataAnalysis["info"][index]["role"] =
          this.dataAnalysis["info"][index]["role"].slice(0, 10) +
          (
            Number(this.dataAnalysis["info"][index]["role"].slice(10)) - 1
          ).toString();
      }
    },
    addByproduct() {
      if (this.dataAnalysis["info"].length < 3) {
        this.dataAnalysis["info"].push({
          role: "Byproduct_1",
          retention_time: 0,
        });
      } else {
        let last =
          this.dataAnalysis["info"][this.dataAnalysis["info"].length - 1];
        this.dataAnalysis["info"].push({
          role: "Byproduct_" + (Number(last["role"].slice(10)) + 1).toString(),
          retention_time: 0,
        });
      }
    },
    showRow(row) {
      this.radio = this.tableData.indexOf(row);
    },

    getCurrentRow(val) {},

    handleCurrentChange(currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
      this.getCurrentRow(this.tableData.indexOf(currentRow));
    },

    openImg(_url) {
      this.$alert('<img src = "' + _url + '" >', "", {
        dangerouslyUseHTMLString: true,
        confirmButtonText: "OK",
      });
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },

    openeditor() {},

    loadParam() {
      this.count = 100;
    },

    loadSteps() {
      this.countSteps = 100;
    },

    loadCategory() {
      this.countCategory = 100;
    },

    handleChangeMin(_index) {},

    handleChangeMax(_index) {},

    handleChangeQuantity() {},

    insertCurrentStep(_index) {
      console.log("datastep....", this.dataStep)
      let newStep = { "action": "", "material": "", "quantity": "", "unit": "" }
      this.dataStep.splice(_index, 0, newStep)
    },

    insertBottomStep() {
        this.$set(this, 'dataStep', [...this.dataStep]);
        this.dataStep.splice(this.dataStep.length, 0, { "action": "", "material": "", "quantity": "", "unit": "" })
    },

    addStep() {
      var arr = { action: "", material: "", quantity: "", unit: "" };
      this.dataStep.push(arr);
      let len = this.dataStep.length;
      this.getAction[len] = arr;
    },

    reduceStep() {
      this.dataStep.pop();
    },

    addCategory(_i) {
      this.getSpace[_i]["range"].push("");
    },

    reduceCategory(_i, _j) {
      this.getSpace[_i]["range"].splice(_j, 1);
    },

    addParam() {
      var arr = { name: "", min: "", max: "", unit: "" };
      this.datajson.push(arr);
    },

    reduceParam() {
      this.datajson.pop();
    },

    bubbleSort(_arr) {
      for (let i = 0; i < _arr.length - 1; i++) {
        for (let j = 0; j < _arr.length - 1 - i; j++) {
          if (_arr[j] > _arr[j + 1]) {
            [_arr[j], _arr[j + 1]] = [_arr[j + 1], _arr[j]];
          }
        }
      }
      return _arr;
    },

    submitSmile() {
      this.fullscreenLoading = true;
      this.imgArr = [];
      let ketcherFrame = document.getElementById("idKetcher");
      let ketcher = null;
      if ("contentDocument" in ketcherFrame) {
        ketcher = ketcherFrame.contentWindow.ketcher;
      } else {
        ketcher = document.frames["idKetcher"].window.ketcher;
      }
      this.ketcher = ketcher;
      this.ketcher.getSmiles().then((res) => {
        this.inputsmiles = res;
        let tmpArr = this.inputsmiles.split(">>");
        this.emptyAlert(this.inputsmiles);
        axios
          .post(this.url + "/input-optimization/smiles2img", {
            smiles: this.inputsmiles,
          })
          .then((res) => {
            let sta = res["data"]["status"];
            if (sta != "20000") {
              this.simpleAlert();
              this.fullscreenLoading = false;
              return;
            }
            this.smiles_ret = res["data"]["msg"];
            this.smiles_ret.forEach((element) => {
              this.imgArr.push(element);
            });
            this.fullscreenLoading = false;
          });
      });
    },

    submitFromText() {
      this.fullscreenLoading = true;
      this.imgArr = [];
      this.emptyAlert(this.inputsmiles);
      axios
        .post(this.url + "/input-optimization/smiles2img", {
          smiles: this.inputsmiles,
        })
        .then((res) => {
          let sta = res["data"]["status"];
          if (sta != "20000") {
            this.simpleAlert();
            this.fullscreenLoading = false;
            return;
          }
          this.smiles_ret = res["data"]["msg"];
          this.smiles_ret.forEach((element) => {
            this.imgArr.push(element);
            this.fullscreenLoading = false;
          });
        });
    },

    searchSmile() {
      this.fullscreenLoading = true;
      this.imgArr = [];
      let ketcherFrame = document.getElementById("idKetcher");
      let ketcher = null;
      if ("contentDocument" in ketcherFrame) {
        ketcher = ketcherFrame.contentWindow.ketcher;
      } else {
        ketcher = document.frames["idKetcher"].window.ketcher;
      }
      this.ketcher = ketcher;
      this.ketcher.getSmiles().then((res) => {
        this.inputsmiles = res;
        if (!this.emptyAlert(this.inputsmiles)) {
          this.handleJSRDKit()
          this.smiles2backend(this.inputsmiles);
        }
      });
    },

    searchFromText() {
      this.fullscreenLoading = true;
      this.imgArr = [];
      if (!this.emptyAlert(this.inputsmiles)) {
        this.handleJSRDKit()
        this.smiles2backend(this.inputsmiles);
      }
    },

    handleJSRDKit(){
      let tmpArr = this.inputsmiles.split(">>");
      this.drawCanvas("equation_src", tmpArr[0]);
      this.drawCanvas("equation_dst", tmpArr[1]);
    },

    smiles2backend(_smiles) {
      axios
        .post(this.url + "/input-optimization/smiles2img", {
          smiles: _smiles,
        })
        .then((res) => {
          res["data"].forEach((element) => {
            this.imgArr.push(element);
          });

          this.fullscreenLoading = false;
          document.getElementById("table1").style.display = "";
          this.active = 0;
          document.getElementById("frames").style.height = "0";
          document.getElementById("equation").style.visibility = "";
        });
    },

    drawCanvas(_name, _smiles) {
      console.log("sad")
      window
        .initRDKitModule()
        .then(function (RDKitModule) {
            var mol = RDKitModule.get_mol(_smiles);
            const canvas = document.getElementById(_name);
            mol.draw_to_canvas(canvas, -1, -1);
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                if (red === 255 && green === 255 && blue === 255) {
                    data[i + 3] = 0; 
                }
            }
            ctx.putImageData(imageData, 0, 0);
        })
        .catch(() => {
            // handle loading errors here...
        });
    },

    simpleAlert() {
      this.$message({
        message: this.simpleAlertContent,
        type: 'warning'
      });
      document.getElementById("equation").style.visibility = "hidden";
    },

    emptyAlert(smiles_str) {
      // smiles_str = 'C.C.C1C=CC=CC=1.C1C=CC=CC=1.>C1C=CC=C1>'
      let tmpArr = smiles_str.split(">");
      if (tmpArr.length != 3 || tmpArr[0] == "" || tmpArr[2] == "") {
        this.simpleAlert();
        this.fullscreenLoading = false;
        return true;
      }
      return false;
    },

    isShowPlus(i) {
      let a = this.imgArr;
      if (i == a.length - 1) {
        return false;
      } else {
        let n0 = a[i].split("_");
        let n1 = a[i + 1].split("_");
        if (n0[1] == "reaction" && n1[1] == "production") {
          return false;
        } else {
          return true;
        }
      }
    },

    isShowArrow(i) {
      let a = this.imgArr;
      if (i == a.length - 1) {
        return false;
      } else {
        let n0 = a[i].split("_");
        let n1 = a[i + 1].split("_");
        if (n0[1] == "reaction" && n1[1] == "production") {
          return true;
        } else {
          return false;
        }
      }
    },

    funImgArr() {},

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
          case 2:
            this.goStep4()
            break
          case 3:
            this.goStep5()
            break
          case 4:
            this.goStep6()
            break
          case 5:
            this.getFlowchart();
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
          case 3:
            this.retStep3()
            break
          case 4:
            this.retStep4()
            break
          case 5:
            this.retStep5()
            break
          case 6:
            this.retStep6()
            break
        }
      }
    },

    isShowPrev(_active){
      if (_active > 0 && _active < 7) {
        return true
      } else {
        return false
      }
    },

    isShowRight(_active){
      if (_active > -1  && _active < 6) {
        return true
      } else {
        return false
      }
    },

    goStep2() {
      this.fullscreenLoading = true;
      // open this!!! data from GPT
      // axios
      //   .post(this.url + "/api/conditions", {
      //     data: this.inputsmiles, //to GPT backend!!!
      //   })
      //   .then((res) => {
      //     this.datajson = res["data"]["msg"];
      //     this.textarea1Synthesis = res["data"]["msg"]["Synthesis"];
      //     this.textarea1Workup = res["data"]["msg"]["Workup"];
      //     this.fullscreenLoading = false;
      //     this.activeName = "second";
      //     this.active = 1;
      //     document.getElementById("frames").style.height = "0";
      //   });
      this.textarea1Synthesis ="";
        // "To a solution of alcohol (0.25 mmol) in CH3CN (0.25 mL) in a 13 mm culture tube was added sequentially a solution of (1) CuOTf /bpy(0.25 mL,0.05M), (2) TEMPO (0.25 mL, 0.05M), and (3) NMI (0.25 mL,0.10M).";
      this.textarea1Workup = "";//"Add 0.75 mL HEDP";
      this.variableAndRange = "";//"I want to optimize four variables: 1. Reaction time: 60-80 minutes, 2. Base volume: 0.125-0.25 ml, 3. Cu catalyst: CuBr2, CuBr, Cu(OTf), Cu(OTf)2 4. Base type: NMI, DBU."
      this.fullscreenLoading = false;
      this.activeName = "second";
      this.active = 1;
      document.getElementById("frames").style.height = "0";
    },

    retStep1() {
      this.activeName = "first";
      this.active = 0;
      document.getElementById("frames").style.height = "0";
    },

    retStep2() {
      this.activeName = "second";
      this.active = 1;
      document.getElementById("frames").style.height = "0";
    },

    goStep3() {
      // sim data
      this.dataStep = [];
      const _ = require("lodash");
      const tmpData = _.cloneDeep(this.getGPTSynthesisRes);
      this.getAction = tmpData["action"];
      if (this.dataTimeFromGPT == true) {
        this.getTime = { time: "parameter" };
      }
      else{
        this.getTime = { time: 0}
      }

      this.dataTime = this.getTime["time"];
      let keys = Object.keys(this.getAction);
      let tmp = [];
      keys.forEach((key) => {
        key = Number(key);
        tmp.push(key);
      });
      tmp = this.bubbleSort(tmp);
      tmp.forEach((k) => {
        let tmpActionEle = this.getAction[k.toString()];

        this.isChooseOptimizationFromGPT(tmpActionEle, k , true)

        if (tmpActionEle["action"] == "dispense") {
          tmpActionEle["parameter"] = tmpActionEle["num"];
          // name_bak
          tmpActionEle["name_bak"] = tmpActionEle["name"]
        }
        this.dataStep.push(tmpActionEle);
      });
      console.log("display dataStep: ", this.dataStep)
      console.log("from GPT dataStep: ", this.dataStepFromGPT)

      // // if GPT space created:
      // this.getSpace = [];

      this.activeName = "third";
      this.active = 2;
      document.getElementById("frames").style.height = "0";
    },

    searchRange(_name, _GPTSpace){
      if (_GPTSpace != []) {
        _GPTSpace.forEach(spaceEle => {
          if (_name == spaceEle["name"]) {
            console.log(Array.from(spaceEle["range"]))
            this.tempRange = spaceEle["range"]
          }
        });
      }
      else{
        this.tempRange = []
      }
    },

    isChooseOptimizationFromGPT(_actionEle, _index, _bool){
      console.log("+++", this.dataStepFromGPT)
      if (this.dataStepFromGPT.length != 0) {
        this.$set(_actionEle, "checkReagent", this.dataStepFromGPT[_index]["checkReagent"]);
        this.$set(_actionEle, "checkParameter", this.dataStepFromGPT[_index]["checkParameter"]);
      }
      else{
        this.$set(_actionEle, "checkReagent", false);
        this.$set(_actionEle, "checkParameter", false);
      }
    },

    retStep3() {
      this.executeAsync();
      this.getSpace = []
    },

    goStep4() {
      this.activeName = "fourth";
      this.active = 3;
      let keys = Object.keys(this.getAction);
      const _ = require("lodash");
      const tmpData = _.cloneDeep(this.getAction);
      this.retStep = tmpData;
      keys.forEach((key) => {
        // create return step json
        {
          if (this.getAction[key]["action"] == "dispense") {
            if (this.retStep[key]["checkParameter"] == true) {
              // if checked, value is Reagent name:
              let pre = "";
                  if (this.getAction[key]["unit"] == "ml") {
                    pre = "volume of ";
                  }
                  if (this.getAction[key]["unit"] == "mg") {
                    pre = "mass of ";
                  }

                  this.retStep[key]["num"] =

                  pre + this.getAction[key]["name"]
            }
            delete this.retStep[key]["parameter"];
            // del name_bak
            delete this.retStep[key]["name_bak"]
          }

          else{if (this.retStep[key]["checkParameter"] == true){
            this.retStep[key]["parameter"] = this.getAction[key]["action"]}
          }
          delete this.retStep[key]["checkParameter"];
          delete this.retStep[key]["checkReagent"];
        }
      });

      this.handleCheckTime();

      //create reaction space json
      this.checkRange();
      console.log("tounchained", this.retStep);
      axios
        .post(this.url + "/input-optimization/unchained", {
          step: this.retStep,
        })
        .then((res) => {
          this.writeUnchainedParaMod(
            "synthesis", res['data']
          );
        });

      console.log(" 2 json to backend created: ", this.retStep, this.getTime);
      console.log("reaction space json created:", this.getSpace);

      this.paraSpaceCheckedList()

    },

    paraSpaceCheckedList() {
      let tmp = []
      this.getSpace.forEach(element => {
        if (element["type"] == "categorical") {
          tmp.push(false)
        }
      });
      this.spaceClickedList = tmp
      console.log("checklist: ", tmp)
    },

    changeClickedStatus(_index) {
      this.spaceClickedList[_index] = !this.spaceClickedList[_index]
      this.$forceUpdate();
    },

    chooseClass(_index) {
      return this.spaceClickedList[_index] ? "rounded-collapse" : "rounded-collapse-shut"
    },

    checkRange(){
      if (this.dataSpaceFromGPT.length != 0 ) {
        if (this.getTime["time"] == "parameter") {
          this.searchRange('Time', this.dataSpaceFromGPT)
          if (this.tempRange != []) {
            this.getSpace.push({
              name: "time",
              type: "continuous",
              range: this.tempRange,
            });
          }
          else{
            this.getSpace.push({
              name: "time",
              type: "continuous",
              range: [0, 0],
            });
          }
          this.tempRange = []
        }
        this.dataStep.forEach(stepEle => {
          if (stepEle["checkParameter"] == true) {
            if (stepEle["action"] !== "dispense") {
              this.searchRange(stepEle["action"], this.dataSpaceFromGPT)
              if (this.tempRange != []) {
                this.getSpace.push({
                  name: stepEle["action"],
                  type: "continuous",
                  range: this.tempRange,
                });
              }
              else{
                this.getSpace.push({
                  name: stepEle["action"],
                  type: "continuous",
                  range: [0, 0],
                });
              }
              this.tempRange = []
            } else {
              let pre = "";
              if (stepEle["unit"] == "ml") {
                pre = "volume of ";
              }
              if (stepEle["unit"] == "mg") {
                pre = "mass of ";
              }
              this.searchRange( pre + stepEle["name"], this.dataSpaceFromGPT)
              if (this.tempRange != []) {
                this.getSpace.push({
                  name: pre + stepEle["name"],
                  type: "continuous",
                  range: this.tempRange,
                });
              }
              else{
                this.getSpace.push({
                  name: pre + stepEle["name"],
                  type: "continuous",
                  range: [0, 0],
                });
              }
              this.tempRange = []
            }
          }
          if (
            stepEle["checkReagent"] == true &&
            stepEle["action"] == "dispense"
          ) {
            this.searchRange( stepEle["name"], this.dataSpaceFromGPT)
            if (this.tempRange != []) {

              this.getSpace.push({
                name: stepEle["name"],
                type: "categorical",
                range: this.tempRange,
              });
            }
            else{
              this.getSpace.push({
                name: stepEle["name"],
                type: "categorical",
                range: [],
              });

            }
          }
        });
      }
      else{
        if (this.getTime["time"] == "parameter") {
          this.getSpace.push({
            name: "time",
            type: "continuous",
            range: [0, 0],
          });
        }

        this.dataStep.forEach(stepEle => {
          if (stepEle["checkParameter"] == true) {
            if (stepEle["action"] !== "dispense") {
              this.getSpace.push({
                name: stepEle["action"],
                type: "continuous",
                range: [0, 0],
              });
            } else {
              let pre = "";
              if (stepEle["unit"] == "ml") {
                pre = "volume of ";
              }
              if (stepEle["unit"] == "mg") {
                pre = "mass of ";
              }
              this.getSpace.push({
                name: pre + stepEle["name"],
                type: "continuous",
                range: [0, 0],
              });
            }
          }
          if (
            stepEle["checkReagent"] == true &&
            stepEle["action"] == "dispense"
          ) {
            this.getSpace.push({
              name: stepEle["name"],
              type: "categorical",
              range: [],
            });
          }
        });
      }
    },

    retStep4() {
      document.getElementById("frames").style.height = "0";
      document.getElementById("frames").style.visibility = "hidden";
      this.activeName = "fourth";
      this.active = 3;
    },

    goStep5() {
      this.activeName = "fifth";
      this.active = 4;

      console.log({
        Step: this.retStep,
        Time: this.getTime,
        Space: this.getSpace,
      });
    },
    retStep5() {
      this.activeName = "fifth";
      this.active = 4;
    },
    goStep6() {
      this.activeName = "sixth";
      this.active = 5;
      console.log("1347 ^^^", this.reactionAlgorithm, this.valueObjective);
    },
    retStep6() {
      document.getElementById("frames").style.height = "0";
      document.getElementById("frames").style.visibility = "hidden";
      this.activeName = "sixth";
      this.active = 5;
    },
    async doSomethingAsync() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          document.getElementById("button1").style.visibility = "hidden";
          resolve("Done!");
        }, 1500);
      });
    },

    async executeAsync() {
      document.getElementById("frames").style.height = "0";
      document.getElementById("frames").style.visibility = "hidden";
      this.activeName = "third";
      this.active = 2;
    },

    confirmAllPara() {
      // query graph page flowchart data
      this.post2Iframe("sig", "");
      this.finishTableVisible = true;
    },

    finishStep(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios
            .post(this.url + "/input-optimization/create-project", {
              para: {
                smarts: this.inputsmiles,
                nlp: {synthesis: this.textarea1Synthesis, workup: this.textarea1Workup},
                gptRes: {synthesis: this.getGPTSynthesisRes, workup: this.getGPTWorkupRes},
                step: this.retStep,
                space: this.retSpace,
                time: this.dataTime,
                algorithm: this.reactionAlgorithm,
                objective: this.valueObjective,
                analysis: this.dataAnalysis,
                flowChat: this.getFlowchartData,
                name: this.project_form.project_name
              }
            }).then((res)=>{
              // get created ID
              this.$router.push({name:'display', params:{backgroundColor: this.valueLights, createdID: res.data}})
              this.$message({
                showClose: true,
                message: 'Create Success!',
                type: 'success'
              });
              },(err)=>{
                this.$message({
                  showClose: true,
                  message: 'Error, Pls Check Previous Info',
                  type: 'error'
                });
              })
        }
      })
    },

    getFlowchart() {
      // HPLC PARA:
      console.log("HPLC PARA: ", this.hplcPara)
      this.dataAnalysis["para"] = this.hplcPara
      // axios.post(this.url + '/api/gptflowchart', {
      //   "data": "123" // to GPT backend!!!
      // }).then(res => {

      // get flowchar demo json ,paste GPT data from API
      this.getFlowchartData = require("../../jsonFomatter/flowchart_demo.json");
      this.pasteInstrParaMod2Flowchart(this.listUnchainedParaMod, "Unchained");
      this.pasteInstrParaMod2Flowchart(this.listThermoParaMod, "Thermo")

      let iframedom = this.$refs.iframedom;
      let _window = iframedom.contentWindow;
      let _document = iframedom.contentDocument;
      _window.postMessage(
        {
          type: "send",
          message: {
            listRobot1ParaMod: this.listRobot1ParaMod,
            listThermoParaMod: this.listThermoParaMod,
            listUnchainedParaMod: this.listUnchainedParaMod,
            // flowchart with AROP to graph:
            // flowchart: this.getFlowchartData,
            flowchart: require("../../jsonFomatter/flowchart_arops.json")
          },
        },
        "*"
      );
      this.active = 6;
      this.activeName = "seventh";
      document.getElementById("frames").style.height = "540px";
      document.getElementById("frames").style.visibility = "";
      document.getElementById("button1").style.visibility = "";
      // })

      // create reaction space
      this.retSpace = {};
      this.getSpace.forEach((ele) => {
        this.retSpace[ele["name"]] = {};
        this.retSpace[ele["name"]]["type"] = ele["type"];
        this.retSpace[ele["name"]]["range"] = ele["range"];
      });
      console.log("reaction space created:", this.retSpace);
    },

    post2Iframe(_type, _message) {
      let iframedom = this.$refs.iframedom;
      let _window = iframedom.contentWindow;
      let _document = iframedom.contentDocument;
      _window.postMessage({ type: _type, message: _message }, "*");
    },

    pasteInstrParaMod2Flowchart(_list, _instr){
      _list.forEach((ele) => {
        for (
          let index = 0;
          index < this.getFlowchartData.nodes.length;
          index++
        ) {
          if (
            this.getFlowchartData.nodes[index].label == _instr &&
            this.getFlowchartData.nodes[index].labelCfg["dataConfig" + _instr]
              .operation == ele.name
          ) {
            this.getFlowchartData.nodes[
              index
            ].labelCfg["dataConfig" + _instr].para = JSON.stringify(
              ele.para,
              null,
              2
            );
          }
        }
      });
    },

    sendMesFroIframe() {
      const mapFrame = this.$refs["iframe"];
      const iframeWin = mapFrame.contentWindow;
      top.postMessage(
        {
          value: "backSuccess",
          id: "vue",
          success: true,
        },
        "./graph-canvas"
      );
    },

    hideTabs() {
      this.$refs.tabs.$children[0].$el.style.display = "none";
    },

    nlp2procedure() {
      let reqInstance = axios.create({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      axios
        .post(this.url + "/input-optimization/nlp2procedure", {
          nlp: this.textarea1Synthesis,
          operation: 'synthesis'
        })
        .then((res) => {
          this.getGPTSynthesisRes = res["data"];
          // this.getGPTSynthesisRes = require("../../jsonFomatter/gpt.json");
          this.textarea2Synthesis = this.getGPTSynthesisRes["procedure"];
          // this.writeUnchainedParaMod(
          //   "synthesis",
          //   this.getGPTSynthesisRes["parameter"]
          // );
        });
      axios
        .post(this.url + "/input-optimization/nlp2procedure", {
          nlp: this.textarea1Workup,
          operation: 'workup'
        })
        .then((res) => {
          this.getGPTWorkupRes = res["data"];
          this.textarea2Workup = this.getGPTWorkupRes["procedure"];
          this.writeUnchainedParaMod(
            "workup",
            this.getGPTWorkupRes["parameter"]
          );
          console.log(this.listUnchainedParaMod);
        });
    },

    nlp2space() {
      console.log("post  nlp2spase  >>>>> ", this.getGPTSynthesisRes["action"])
      axios
        .post(this.url + "/input-optimization/nlp2space", {
          nlp: this.variableAndRange,
          action: this.getGPTSynthesisRes["action"]
        })
        .then((res) => {
          this.checkTime = res['data']['time'] //True
          // this.getSpace = res['data']['space']
          // [{'name': 'Time', 'type': 'continuous', 'range': [60, 80]},
          //  {'name': 'volume of Base', 'type': 'continuous', 'range': [0.5, 2]},
          //  {'name': 'Cu Catalyst', 'type': 'categorical', 'range': ['CuBr', 'CuBr2']},
          //  {'name': 'Base', 'type': 'categorical', 'range': ['NMI', 'DBU']}]
          // this.getAction = res['data']['action']

          // {'1': {'action': 'dispense', 'num': 0.25, 'unit': 'ml', 'name': 'Cu catalyst', 'tag': 'SyringePump,ExtSingleTip', 'checkParameter': False, 'checkReagent': True},
          //'2': {'action': 'dispense', 'num': 0.25, 'unit': 'ml', 'name': 'TEMPO', 'tag': 'SyringePump,ExtSingleTip', 'checkParameter': False, 'checkReagent': False},
          //'3': {'action': 'dispense', 'num': 'parameter', 'unit': 'ml', 'name': 'Base', 'tag': 'SyringePump,ExtSingleTip', 'checkParameter': True, 'checkReagent': True}}
          const _ = require("lodash");
          this.dataStepFromGPT = _.cloneDeep(res['data']['action'])
          this.dataSpaceFromGPT = _.cloneDeep(res['data']['space'])
          this.dataTimeFromGPT = _.cloneDeep(res['data']['time'])

          // this.$confirm(this.gpt2spaceAlarm[0], this.gpt2spaceAlarm[1], {
          //   customClass: 'confirm-dialog',
          //   confirmButtonText: this.gpt2spaceAlarm[3],
          //   cancelButtonText: this.gpt2spaceAlarm[2],
          //   type: "success",

          // })
          //   .then(() => {
          //     // reset
          //     // axios.post(this.url + "/api/****").then((res) => {
          //     //   console.log(res)
          //     // this.handleData(this.currentID);
          //       this.$message({
          //         type: "success",
          //         message: "confirm",
          //       // });
          // });
          //   });
          this.$message({
            message: this.gpt2spaceAlarm[0],
            type: 'success'
          });
        });
    },
    writeUnchainedParaMod(_name, _para) {
      let i = 0;
      this.listUnchainedParaMod.forEach((ele) => {
        if (ele["name"] == _name) {
          this.listUnchainedParaMod[i].para.ParaChanger = _para;
        }
        i = i + 1;
      });
    },

    handleRef(v_index, v_row) {},

    handlePro(v_index, v_row) {
      this.$alert(v_row["procedure"], "", {
        confirmButtonText: "OK",
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
          return false;
        }
      }
    },

    setEn(){
      this.step1 = 'Reaction'
      this.step2 = 'GPT'
      this.step3 = 'Steps'
      this.step4 = 'Space'
      this.step5 = 'Algorithm'
      this.step6 = 'Analysis'
      this.step7 = 'Flowchart'
      this.optimizationTitle = 'Reaction self-optimization'
      this.inputPlaceholder = 'Input Chemical Equation...'
      this.simpleAlertContent = "Wrong Input",
      this.canvasTitle = 'Molecular Canvas'
      this.cancelBtn = 'Cancel'
      this.doneBtn = 'Done'
      this.nextBtn = 'Next'
      this.prevBtn = 'Prev'
      this.checkBtn = 'Check all'
      this.iconBind = ['insert', 'remove', 'add']
      this.gptTab[0] = 'Interpreter'
      this.gptTab[1] = 'Optimization variables & range'
      this.gptTextTitle[0] = 'Synthesis'
      this.gptTextTitle[1] = 'Workup'
      this.gpt2spaceAlarm = ['Get Optimization variables & range from GPT!', 'SUCCESS', 'Cancel', 'OK']
      this.stepTitle = 'Step'
      this.spaceTitle = 'Space'
      this.stepHeader = ['Action','Parameter','Unit','Reagent','Tags',]
      this.variableCheck = 'optimization variable'
      this.timeTitle = ['Time', 'min']
      this.spaceHint = 'There is no optimization variable selected. Please turn back to previous step and choose some parameter or reagent you want to be optimized.'
      this.rangeTitle = ['min', 'max']
      this.algorithmPart = {
        'title': 'Analysis',
        'name': 'Algorithm',
        'titles': ['Reactor Num', 'Schedule', 'Init Num', 'Init Method', 'Max Exp', 'PI Threshold'],
        'objective': 'Objective'
      }
      this.analysisPart = {
        'title':'Analysis',
        'name': 'Method',
        'titles': [
          'Instrument Method',
          'Processing Method',
          'Template Name',
          'Sequence Name',
          'Project Name',
          'Channels',
          'Injection Volume'
        ]
      }
      this.inputChoose = 'Choose'
      this.savePart = ['Save Project', 'Project Name', 'Please input project name', 'Cancel', 'Submit']
      this.project_rules.project_name[0].message = 'Please input project name'
    },
    setCn(){
      this.step1 = '反应式'
      this.step2 = '生成式预训练模型'
      this.step3 = '反应步骤'
      this.step4 = '反应空间'
      this.step5 = '算法参数'
      this.step6 = '表征参数'
      this.step7 = '流程图'
      this.optimizationTitle = '反应自优化'
      this.inputPlaceholder = '输入反应方程式'
      this.simpleAlertContent = "输入有误",
      this.canvasTitle = '分子画布'
      this.cancelBtn = '取消'
      this.doneBtn = '确认'
      this.nextBtn = '下一步'
      this.prevBtn = '上一步'
      this.checkBtn = '检查确认'
      this.iconBind = ['插入', '删除', '添加']
      this.gptTab[0] = '自然语言处理'
      this.gptTab[1] = '优化变量及范围'
      this.gptTextTitle[0] = '反应合成'
      this.gptTextTitle[1] = '后处理'
      this.gpt2spaceAlarm = ['成功获取变量以及范围！', '成功', '取消', '确认']
      this.stepTitle = '步骤'
      this.spaceTitle = '空间'
      this.stepHeader = ['操作','参数','单位','反应物','标签',]
      this.variableCheck = '优化变量'
      this.timeTitle = ['时间', '分']
      this.spaceHint = '未选择任何优化变量。请返回上一步，然后选择一些想要优化的参数或反应物。'
      this.rangeTitle = ['最小', '最大']
      this.algorithmPart = {
        'name': '优化算法',
        'titles': ['反应数', '调度', '初始数', '初始方法', '最大实验数', '阈值'],
        'objective': '目标'
      }
      this.analysisPart = {
        'title':'表征',
        'name': '方法',
        'titles': [
          '仪器方法',
          '过程方法',
          '模板名称',
          '序列名称',
          '项目名称',
          '通道',
          '注射体积'
        ]
      }
      this.inputChoose = '选择'
      this.savePart = ['保存项目', '项目名称', '请输入项目名称', '取消', '提交']
      this.project_rules.project_name[0].message = '请输入项目名称'
    },
  },

  mounted() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js';
    document.body.appendChild(script);

    let root = document.querySelector(":root");
    root.style.setProperty("--main-height", window.screen.height + 'px')
    this.initRatio()
    this.handleRatio()
    let i = 0;
    this.listUnchainedParaMod.forEach((ele) => {
      if (ele.name == "transfer") {
        this.listUnchainedParaMod[
          i
        ].para = require("../../jsonFomatter/transfer.json");
      }
      if (ele.name == "back transfer") {
        this.listUnchainedParaMod[
          i
        ].para = require("../../jsonFomatter/back_transfer.json");
      }
      if (ele.name == "synthesis") {
        this.listUnchainedParaMod[
          i
        ].para = require("../../jsonFomatter/synthesis.json");
      }
      if (ele.name == "workup") {
        this.listUnchainedParaMod[
          i
        ].para = require("../../jsonFomatter/workup.json");
      }
      i = i + 1;
    });
    i = 0;
    this.listRobot1ParaMod.forEach((ele) => {
      if (ele.name == "transport") {
        this.listRobot1ParaMod[
          i
        ].para = require("../../jsonFomatter/transport.json");
      }
      if (ele.name == "back transport") {
        this.listRobot1ParaMod[
          i
        ].para = require("../../jsonFomatter/back_transport.json");
      }
      i = i + 1;
    });
    this.listThermoParaMod[0].para = require("../../jsonFomatter/analyze.json");

    this.hplcPara = this.listThermoParaMod[0].para

    // get return flowchart data from graph page
    window.addEventListener(
      "message",
      (event) => {
        if (event.data.type == "flowchart") {
          const _ = require("lodash");
          this.getFlowchartData = _.cloneDeep(event.data.message);
          this.getStringifyFlowchartData = JSON.stringify(
            this.getFlowchartData,
            null,
            2
          );
          console.log("$$$ flowchart data received:", event.data);
        }
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
        }
        if (event.data.type == "language-sig") {
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

    document.getElementById("frames").src = "./graph-canvas";
    document.getElementById("display").src = "./display";
    this.hideTabs();
  },
};
</script>

<style >
@import url(../../assets/font_viut27d3a7/iconfont.css);

:root{
  --dialog-title-color: #000000;
  --dialog-bg-clr: #ffffff;
  --main-color: #f4f5f6;
  --main-font-color: #000000;
  --main-height: 0;
}

.p-main{
  background-color: var(--main-color) ;
  color: var(--main-font-color) ;
  position: 'relative';
  width: 1920;
  height: var(--main-height);
}

.opt-title{
  font-size: 35px;margin-top: 2%
}

.step-bar{
  margin-bottom: 40px
}

.canvas-container{
  border-radius: 10px; 
  margin-top: -100px; 
  width: 100%
}

.canvas-footer{
  position:relative; 
  margin-left: 89%; 
}

.canvas-btn{
  font-size: medium ; 
  font-weight: 700;
}

.equation-img{
   align-items: center; 
   margin-top: 120px;
}

.text-container{
  margin-bottom: 17px
}

.text-gro{
  display: flex; 
  align-items: center; 
  margin-bottom: 4px; 
  position: relative
}

.text-part{
  float: left; 
  font-size: 16px
}

.text-range{
  width: 100%; 
  position: relative
}

.text-range-btn{
  margin-left: 260%;
  margin-top: -80px;
}

.steps-scroll{
  overflow: hidden; 
  height: 490px; margin-top: 0px
}

.steps-ele-header{
  margin-left: 0%; 
  float: left; 
  font-size: 20px
}

.steps-ele-icon{
  font-size:18px;
  margin-right: 4%; 
  float: right
}
.steps-single-header{
  font-size: 20px
}

.time-unit{
  font-size: 16px; 
  margin-left: 10px
}

.space-container{
  overflow: hidden; 
  height: 588px; 
  margin-top: 0px
}

.space-gap{
  margin-top: 10px
}


.space-add-icon{
  font-size:18px;
  margin-right: 3.8%; 
  margin-top: 1%;
  margin-bottom: 4%; 
  float: right
}

.space-delete-icon{
  margin-right: 4%; 
  float: right; 
  font-size: 18px
}

.space-align{
  margin-left: 2%;
  margin-top: 1%
}

.analysis-header{
  float: right;
  font-size: 15px;
  margin-top: 2%;
}

.detail-method{
  float: right; 
  font-size: 15px; 
  margin-top: 4%;
}

.detail-top{
  margin-top: 20px;
}

.method-unit{
  float: left; 
  margin-top: 20%
}

.occupy{
  width: 99%; 
  height: 460px;  
  border-radius: 15px; 
  border: 2px solid #80bfff
}
.prev{
  margin-left: 73%;
  margin-top: 100%;
  width: 65px;
  height: 180px;
  font-size: 38px;
  color:#657c99;
  border-radius: 35px;
  position: absolute;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.prev:hover{
  background: #ffffff;
  box-shadow:  0px 2px 5px #e3e7f1,
             -2px -2px 5px #e3e7f1;
  transition: 0.3s;
}
.prev:not(:hover){
  transition: 0.3s;
}
.prev:active{
  transform: scale(0.96);
}
.next{
  margin-left: 12%;
  margin-top: 100%;
  width: 65px;
  height: 180px;
  font-size: 38px;
  color:#657c99;
  border-radius: 35px;
  position: absolute;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.next:hover{
  background: #ffffff;
  box-shadow:  2px 2px 5px #e3e7f1,
             0px -2px 5px #e3e7f1;
  transition: 0.3s;
}
.next:not(:hover){
  transition: 0.3s;
}
.next:active{
  transform: scale(0.96);
}

.gpt{
  width: 120px;
  height: 50px;
  margin-bottom: 20px;
  font-size: 30px;
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
.gpt:active{
  transform: scale(0.96);
}

.submit{
  width: 100px;
  height: 45px;
  margin-bottom: 20px;
  font-size: 16px;
  font-style: normal !important;
  font-weight: 600;
  color:#2b2b2b;
  border-radius: 25px;
  background: #ffffff;
  box-shadow:  2px 2px 3px #e3e7f1,
             -2px -2px 3px #e3e7f1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.submit:active{
  transform: scale(0.98);
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

.input-with-select .el-input__inner {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  width: 94.5%;
}
.rounded-right-button {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-left: 94.5%;
}
 .el-step__head.is-process {
  color: #46a0fc !important;
  border-color: #46a0fc !important;
}
.el-step__title.is-process {
  color: #46a0fc !important;
}

.el-row {
  margin-bottom: 0px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  position: relative;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-tabs__item {
  font-size: 24px !important;
  color: var(--primary-color) !important;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}

.save {
  color: #fff;
  background: #46a0fc;
  border-color: #46a0fc;
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
  /* margin: 0px !important; */
  /* margin-left: 10px; */
  margin-top: 0px;
  margin-left: 10px;
  float: right;
  cursor: pointer;
}

.button {
  width: 100px;
  line-height: 10px;
  display: inline-block;
  padding: 14px 20px;
  border-radius: 6px;
  color: #fff;
  background: #46a0fc;
  border: 1px solid #46a0fc;
  margin-top: 35px;
  margin: 0px;
  cursor: pointer;
}
.button_space {
  position: absolute;
  width: 100px;
  line-height: 0px;
  display: grid;
  padding: 8px 0px;
  border-radius: 6px;
  color: #fff;
  background: #46a0fc;
  border: 1px solid #46a0fc;
  /* cursor: pointer; */
  z-index: 999;
  margin-left:90%;
  margin-top: -50px;
}

.el-dialog__title{
  color: var(--dialog-title-color);
}
.el-dialog {
    background-color: var(--dialog-bg-clr);
    border-radius: 15px;
    top: -1%;
    border: solid #fff 1px
}
.el-textarea__inner {
    border-radius: 10px;
}
.confirm-dialog {
    transform: translate(0%, -100%);
    border-radius: 10px;
}
.confirm-dialog .el-button {
  border-radius: 10px;
  width: 70px
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

.el-collapse-item__arrow{
    margin-right: 4%;
}
</style>
