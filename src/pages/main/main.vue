<template>
    <div
        :style="{ position: 'relative', width: ratioWidth - 6 + 'px', height: ratioHeight + 'px', backgroundColor: '#f4f5f6', overflowX: 'hidden' }">
        <div v-loading="loadingProject"
            :style="{ position: 'relative', width: fixWidth + 'px', height: fixHeight + 'px', backgroundColor: '#f4f5f6', overflow: 'hidden' }">
            <el-row :style="{ height: '65px', backgroundColor: sideBarColor, borderBottom: 1 + 'px solid #c7c7c7' }">
                
                <div class="logo" :style="{ color: logoColor }">
                    {{ iconTitle }}
                </div>
                <div class="header-tool-cover"></div>
                <div id="title-list">
                    <el-row>
                        <el-col class="sub-tool" style="margin-left: 73%;"><a @click="logOut()">
                                <div class="sub-tool-bg">
                                    {{ headerTool[3].name }}
                                </div>
                            </a></el-col>
                        <el-col class="sub-tool" style="margin-left: 78.5%;"><a @click="dialogSettingsVisible = true">
                                <div class="sub-tool-bg">
                                    {{ headerTool[2].name }}
                                </div>
                            </a></el-col>
                        <el-col class="sub-tool" style="margin-left: 83.95%;"><a @click="dialogHelpVisible = true">
                                <div class="sub-tool-bg">
                                    {{ headerTool[1].name }}
                                </div>
                            </a></el-col>
                        <el-col class="sub-tool" style="margin-left: 89.4%;"><a @click="dialogProfileVisible = true">
                                <div class="sub-tool-bg">
                                    {{ headerTool[0].name }}
                                </div>
                            </a></el-col>
                    </el-row>
                </div>
                <div style="position:relative; float: right;height: 50px;">
                    <div id="user" :style="{ marginTop: '12%', marginRight: fixWidth * 0.03 + 'px' }">
                        <a>
                            <el-image :src="userAvatar"></el-image>
                        </a>
                    </div>
                </div>
                <!-- settings -->
                <el-dialog :title="headerTool[2].name" :visible.sync="dialogSettingsVisible" v-draggable>
                    <el-form>
                        <el-form-item :label="headerTool[1].sub[0].name" :label-width="formLabelWidth">
                            <el-switch v-model="valueLights" @change="changeColor()" v-bind:title="isShowSwitchText()">
                            </el-switch>
                        </el-form-item>
                        <el-form-item :label="headerTool[1].sub[1].name" :label-width="formLabelWidth">
                            <el-select v-model="languageVal" placeholder="Please choose language" @change="handleLan()">
                                <el-option label="English" value="En"></el-option>
                                <el-option label="中文" value="Cn"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- help -->
                <el-dialog custom-class="help-dialog" :top="'80px'" :title="headerTool[1].name" :visible.sync="dialogHelpVisible" v-draggable>
                    <el-carousel indicator-position="none" :autoplay='false' :width="'800px'" :height="'640px'" >
                        <el-carousel-item>
                            <el-image :src="require('@/assets/img/help/00-homepage.png')"/>
                            <div class="help-title">Homepage</div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image :src="require('@/assets/img/help/02-Function.png')"></el-image>
                            <div class="help-title">Function</div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image :src="require('@/assets/img/help/03-Display.png')"></el-image>
                            <div class="help-title">Display</div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image :src="require('@/assets/img/help/04-Projects.png')"></el-image>
                            <div class="help-title">Projects</div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <el-image :src="require('@/assets/img/help/06-Library.png')"></el-image>
                            <div class="help-title">Library</div>
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
                <!-- profile -->
                <el-dialog :title="headerTool[0].name" :visible.sync="dialogProfileVisible" >
                    <el-form  :model="profileForm" label-width="70px">
                        <el-form-item label="Name">
                            <el-input readonly  class="input-common" style="width: 218px;" v-model="profileForm.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="Group">
                            <el-select class="input-common" v-model="profileForm.group" placeholder="please choose your group">
                            <el-option label="Group1" value="Group1"></el-option>
                            <el-option label="Group2" value="Group2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Avatar">
                            <el-image
                                :src=avatarSrc
                                ></el-image>
                                <a @click="avatarVisible = true">
                                    <i style="font-size: large;" class="el-icon-edit" ></i>
                                </a>
                            </el-form-item>
                        <el-form-item >
                            <el-row>
                                <a>
                                    <div class="head-btn" @click="dialogProfileVisible = false; updateUserprofile()" >Update Profile</div>
                                </a>
                            </el-row>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <el-dialog  title="Avatar" :visible.sync="avatarVisible" v-draggable>
                    <div>
                        <a><el-image style="margin:20px" :src="require('@/assets/img/img/GitHub.png')" @click="avatarVisible =false; changeAtatar('./img/img/GitHub.png')"></el-image> </a>
                        <a><el-image style="margin:20px" :src="require('@/assets/img/img/Avatar-111.png')" @click="avatarVisible =false;changeAtatar('./img/img/Avatar-111.png')"></el-image> </a>
                        <a><el-image style="margin:20px" :src="require('@/assets/img/img/Avatar-222.png')" @click="avatarVisible =false;changeAtatar('./img/img/Avatar-222.png')"></el-image> </a>
                        <a><el-image style="margin:20px" :src="require('@/assets/img/img/Avatar-333.png')" @click="avatarVisible =false;changeAtatar('./img/img/Avatar-333.png')"></el-image> </a>
                        <a><el-image style="margin:20px" :src="require('@/assets/img/img/Avatar-444.png')" @click="avatarVisible =false;changeAtatar('./img/img/Avatar-444.png')"></el-image> </a>
                    </div>                  
                </el-dialog>
            </el-row>
            <el-row style="margin-top: -1px;">
                <el-col :span="3">
                    <div style="margin-top: 1px;" align="center">
                        <el-menu
                            :style="{ height: menuHeight + 'px', backgroundColor: sideBarColor, position: 'relative' }">
                            <el-menu-item class="menu-top-gap" style="margin-top: 25px;" @click="homeClick()">
                                <div class="disp">
                                    <div class="iconfont icon-home"></div>
                                    <div class="side-title">{{ sideTitle[0].name }}&nbsp;
                                        <div class="check-lable-iconfont"></div>
                                    </div>
                                    <div>&nbsp;</div>
                                </div>
                            </el-menu-item>
                            <el-menu-item @click="projectClick()">
                                <div class="disp">
                                    <div class="iconfont icon-table-fill"></div>
                                    <div class="side-title">{{ sideTitle[1].name }}&nbsp;
                                        <div class="check-lable-iconfont"></div>
                                    </div>
                                    <div>&nbsp;</div>
                                </div>
                            </el-menu-item>
                            <el-divider></el-divider>
                            <div class="margin-block"></div>
                            <el-menu-item @click="funClick()">
                                <div class="disp">
                                    <div class="iconfont icon-customization-fill"></div>
                                    <div class="side-title">{{ sideTitle[2].name }}&nbsp;
                                        <div class="check-lable-iconfont"></div>
                                    </div>
                                    <div class="arrow-class">
                                        <div id="arrow" class=" el-icon-arrow-down"></div>
                                    </div>
                                </div>
                            </el-menu-item>
                            <div id="item" class="toggle">
                                <el-menu-item @click="toOpenWebUI('literature search')">
                                    <div class="disp">
                                        <div class="iconfont icon-sousuopaixu"></div>
                                        <div class="side-title">{{ sideTitle[2].sub[4].name }}&nbsp;
                                            <div class="check-lable-iconfont"></div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </div>
                                </el-menu-item>
                                <el-menu-item @click="toOpenWebUI('screening')">
                                    <div class="disp">
                                        <div class="iconfont  icon-plate" :style="{fontSize: iconScreen + 'px', marginLeft: '2px', fontWeight: '600'}"></div>
                                        <div class="side-title">{{ sideTitle[2].sub[1].name }}&nbsp;
                                            <div class="check-lable-iconfont"></div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </div>
                                </el-menu-item>
                                <el-menu-item @click="toOpenWebUI('kinetics')">
                                    <div class="disp">
                                        <div class="iconfont  icon-molecular" :style="{fontSize: iconKinetics + 'px', marginLeft: '2px', fontWeight: '600'}"></div>
                                        <div class="side-title">{{ sideTitle[2].sub[3].name }}&nbsp;
                                            <div class="check-lable-iconfont"></div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </div>
                                </el-menu-item>
                                <el-menu-item @click="toOpenWebUI('optimization'), changeColor()">
                                    <div class="disp">
                                        <div class="iconfont icon-ranking-list"></div>
                                        <div class="side-title">{{ sideTitle[2].sub[0].name }}&nbsp;
                                            <div class="check-lable-iconfont"></div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </div>
                                </el-menu-item>
                                <el-menu-item @click="toOpenWebUI('scale-up')">
                                    <div class="disp">
                                        <div class="iconfont icon-zoom-in"></div>
                                        <div class="side-title">{{ sideTitle[2].sub[2].name }}&nbsp;
                                            <div class="check-lable-iconfont"></div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </div>
                                </el-menu-item>

                                <el-menu-item @click="toOpenWebUI('purification')">
                                    <div class="disp">
                                        <div class="iconfont icon-editor-filling"></div>
                                        <div class="side-title">{{ sideTitle[2].sub[5].name }}&nbsp;
                                            <div class="check-lable-iconfont"></div>
                                        </div>
                                        <div>&nbsp;</div>
                                    </div>
                                </el-menu-item>
                            </div>
                            <div class="cover-menu-item">
                                <div class="cover-block"></div>
                                <div style="margin-top: 10%;">
                                    <el-menu-item @click="toReactionSystem()">
                                        <div class="disp-dup">
                                            <div class="iconfont icon-teaching"></div>
                                            <div class="side-title-dup">{{ sideTitle[3].name }}&nbsp;
                                                <div class="check-lable-iconfont-dup"></div>
                                            </div>
                                            <div>&nbsp;</div>
                                        </div>
                                    </el-menu-item>
                                    <el-divider></el-divider>
                                    <el-menu-item @click="toLayout()">
                                        <div class="disp-dup">
                                            <div class="iconfont icon-gallery"></div>
                                            <div class="side-title-dup">{{ sideTitle[4].name }}&nbsp;
                                                <div class="check-lable-iconfont-dup"></div>
                                            </div>
                                            <div>&nbsp;</div>
                                        </div>
                                    </el-menu-item>
                                    <el-menu-item @click="toExplore()">
                                        <div class="disp-dup">
                                            <div class="iconfont icon-a-3Dhuichang"></div>
                                            <div class="side-title-dup">{{ sideTitle[5].name }}&nbsp;
                                                <div class="check-lable-iconfont-dup"></div>
                                            </div>
                                            <div>&nbsp;</div>
                                        </div>
                                    </el-menu-item>
                                    <el-menu-item @click="toWebcam()">
                                        <div class="disp-dup">
                                            <div class="iconfont icon-video"></div>
                                            <div class="side-title-dup">{{ sideTitle[6].name }}
                                                <div class="check-lable-iconfont-dup"></div>
                                            </div>
                                            <div>&nbsp;</div>
                                        </div>
                                    </el-menu-item>
                                </div>
                            </div>
                        </el-menu>
                    </div>
                </el-col>
                <el-col :span="21">
                    <div style=" margin-top:-15px;">
                        <div :style="{ position: 'relative', backgroundColor: contentColor }">

                            <el-tabs v-model="activeName" ref="tabs" >
                                <el-tab-pane name="first">
                                    <div id="home" v-loading="loadingProject">
                                        <div :style="{ height: menuHeight + 'px' }" style="margin-left: 20px; margin-right:20px;">
                                            <div style="margin-top : 20px">

                                                <div class="container">
                                                    <!--Method Search-->
                                                    <div class="card">
                                                        <div class="img">
                                                            <a @click="toOpenWebUI('literature search')">
                                                                <el-image :src="require('@/assets/img/img/method search.png')"></el-image>
                                                            </a>
                                                        </div>
                                                        <div class="h2">
                                                            {{ functionsList[4].title }}
                                                        </div>
                                                        <div class="content">
                                                            <p>{{ functionsList[4].description }}</p>
                                                            <a href="#">{{ functionsList[4].btn }}</a>
                                                        </div>
                                                    </div>
                                                    <!--Screening-->
                                                    <div class="card">
                                                        <div class="img">
                                                            <a @click="toOpenWebUI('screening')" >
                                                                <el-image :src="require('@/assets/img/img/screen.png')" ></el-image>
                                                            </a>
                                                        </div>
                                                        <div class="h2">
                                                            {{ functionsList[1].title }}
                                                        </div>
                                                        <div class="content">
                                                            <p>{{ functionsList[1].description }}</p>
                                                            <a href="#" >{{
                                                                functionsList[1].btn }}</a>
                                                        </div>
                                                    </div>
                                                    <!--Kinetics-->
                                                    <div class="card">
                                                        <div class="img">
                                                            <a @click="toOpenWebUI('kinetics')">
                                                                <el-image :src="require('@/assets/img/img/kinetics.png')"></el-image>
                                                            </a>
                                                        </div>
                                                        <div class="h2">
                                                            {{ functionsList[3].title }}
                                                        </div>
                                                        <div class="content">
                                                            <p>{{ functionsList[3].description }}</p>
                                                            <a href="#">{{ functionsList[3].btn }}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="card-gap">
                                                <div class="container">
                                                    <!--Optimization-->
                                                    <div class="card">
                                                        <div class="img">
                                                            <a @click="toOpenWebUI('optimization')">
                                                                <el-image :src="require('@/assets/img/img/optimization.png')"></el-image>
                                                            </a>
                                                        </div>
                                                        <div class="h2">
                                                            {{ functionsList[0].title }}
                                                        </div>
                                                        <div class="content">
                                                            <p>{{ functionsList[0].description }}</p>
                                                            <a href="#" @click="dialogOptimizationDetail = true">{{ functionsList[0].btn }}</a>
                                                        </div>
                                                    </div>
                                                    <!--Scale-up-->
                                                    <div class="card">
                                                        <div class="img">
                                                            <a  @click="toOpenWebUI('scale-up')" >
                                                                <el-image :src="require('@/assets/img/img/scale-up.png')" ></el-image>
                                                            </a>
                                                        </div>
                                                        <div class="h2">
                                                            {{ functionsList[2].title }}
                                                        </div>
                                                        <div class="content">
                                                            <p>{{ functionsList[2].description }}</p>
                                                            <a href="#" @click="dialogOptimizationDetail = true">{{
                                                                functionsList[2].btn }}</a>
                                                        </div>
                                                    </div>
                                                    <!--Purification-->
                                                    <div class="card">
                                                        <div class="img">
                                                            <a @click="toOpenWebUI('purification')">
                                                                <el-image :src="require('@/assets/img/img/purification.png')"></el-image>
                                                            </a>
                                                        </div>
                                                        <div class="h2">
                                                            {{ functionsList[5].title }}
                                                        </div>
                                                        <div class="content">
                                                            <p>{{ functionsList[5].description }}</p>
                                                            <a href="#">{{ functionsList[5].btn }}</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>

                                <el-tab-pane name="second">
                                    <!-- <openwebui/> -->
                                    <iframe id="3rdPartUI-page" ref="3rdPartUI-dom" frameborder="1" scrolling="no"
                                        :style="{ width: moduleWidth + 300 + 'px', height: moduleHeight + 300 + 'px', marginRight: 10 + '%', marginLeft: 0 + '%', marginTop: '-18px', marginRight: 10 + '%',  }"
                                        src="./#/3rdPartAI">
                                    </iframe>
                                </el-tab-pane>

                                <el-tab-pane name="third">
                                    <iframe id="frames" ref="optimization-dom" frameborder="0" scrolling="no"
                                        :style="{ width: moduleWidth + 300 + 'px', height: moduleHeight + 300 + 'px', marginLeft: -13 + '%',}"
                                        src="./#/ai">
                                    </iframe>
                                </el-tab-pane>

                                <el-tab-pane name="fourth">
                                    <div id="project"
                                        :style="{ position: 'relative', backgroundColor: contentColor, marginTop: 20 + 'px', height: fixHeight * 0.955 + 'px', }">
                                        <div style="margin-left: 3%; position: relative;">
                                            <el-autocomplete v-model="value_" :fetch-suggestions="querySearch" ref="autoRef" @focus="searchFocus"
                                                style="margin-top: 20px; margin-bottom: 6px;width:40%;border-radius: 20px;" 
                                                :placeholder="'Search by project name...'" prefix-icon="el-icon-search">
                                            </el-autocomplete>
                                            <el-button round icon="el-icon-plus" @click="dialogCreateVisible = true" v-bind:title="'Add'" style="position: absolute;margin-top: 20px; margin-left: 53%;"></el-button>
                                        </div>
                                        <div style=" position:relative;left: 0%;top: 2%;right: 0%;bottom: 0; margin: auto; "
                                            align='center'>
                                            <el-dialog title="Create a new project" :visible.sync="dialogCreateVisible" v-draggable :modal-append-to-body="false"  >
                                                <div style="margin-top: 10px;  height: 130px; ">
                                                    <a @click="toScreener(), dialogCreateVisible=false">
                                                        <div class="iconfont  icon-plate" style=" font-size: 30px; margin-top: -10px; margin-left: 10px;  font-weight: 600; padding: 10px;padding-top: 20px; padding-bottom: 18px; border: 2px solid; border-radius: 10px;"></div>
                                                    </a>
                                                    <a @click="toOptimization(), dialogCreateVisible=false">
                                                        <div class="iconfont  icon-sousuopaixu" style="font-size: 40px; margin-top: -10px; margin-left: 100px; font-weight: 600; padding: 10px; border: 2px solid; border-radius: 10px;"></div>
                                                    </a>
                                                    <a @click="toOpenWebUI(), dialogCreateVisible=false">
                                                        <div class="iconfont  icon-molecular" style="padding-top: 14px; padding-bottom: 14px; font-size: 36px; margin-top: -10px; margin-left: 190px; font-weight: 600; padding: 12px; border: 2px solid; border-radius: 10px;"></div>
                                                    </a>
                                                    <a @click=" toOpenWebUI(),dialogCreateVisible=false">
                                                        <div class="iconfont  icon-zoom-in" style="font-size: 40px; margin-top: -10px; margin-left: 280px; font-weight: 600; padding: 10px; border: 2px solid; border-radius: 10px;"></div>
                                                    </a>
                                                    <a @click="toCC(), dialogCreateVisible=false">
                                                        <div class="iconfont  icon-list" style="font-size: 40px; margin-top: -10px; margin-left: 370px; font-weight: 600; padding: 10px; border: 2px solid; border-radius: 10px;"></div>
                                                    </a>
                                                    <a @click="toCommon(), dialogCreateVisible=false">
                                                        <div class="iconfont  icon-pcm" style="font-size: 40px; margin-top: -10px; margin-left: 460px; font-weight: 600; padding: 10px; border: 2px solid; border-radius: 10px;"></div>
                                                    </a>
                                                </div>
                                            </el-dialog>
                                        
                                            <div
                                                :style="{ height: fixHeight * 0.62 + 'px', marginTop:-10 + 'px', marginLeft: '3%', marginRight: '3%', backgroundColor: projectTableColor, borderRadius: '15px' }">
                                                <el-table ref="singleTable"
                                                    :data="filterTableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                                                    highlight-current-row @current-change="handleCurrentChange">
                                                    <template slot="empty">
                                                        <span>{{ tableEmptySpan }}</span>
                                                    </template>
                                                    <el-table-column
                                                        :width="fixWidth * 0.02 + 'px'">
                                                    </el-table-column>
                                                    <el-table-column property="id" :label="projectTableTitle[0]"
                                                        :width="fixWidth * 0.08 + 'px'">
                                                    </el-table-column>
                                                    <el-table-column property="order_name" :label="projectTableTitle[1]"
                                                        :width="fixWidth * 0.2 + 'px'"></el-table-column>
                                                    <el-table-column property="create_time" :label="projectTableTitle[2]"
                                                        :width="fixWidth * 0.2 + 'px'"></el-table-column>
                                                    <el-table-column property="type" :label="projectTableTitle[3]"
                                                        :width="fixWidth * 0.15 + 'px'"></el-table-column>
                                                    <el-table-column property="name" :label="projectTableTitle[4]"
                                                        :width="fixWidth * 0.12 + 'px'"></el-table-column>
                                                    <el-table-column :label="projectTableTitle[5]">
                                                        <template slot-scope="scope">
                                                            <a @click="loadProject(scope.row), changeColor()">
                                                                <i class="el-icon-document"></i>
                                                            </a>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                            <div slot="footer" class="dialog-footer"
                                                :style="{ float: 'right', marginRight: ratioWidth * 0.028 + 'px', marginTop: 20 + 'px' }">
                                                <div>
                                                    <el-pagination class="custom-pagination" style="float:center;" layout="prev, pager, next"
                                                        :page-count="handleCount()" :background="true" @current-change="current_change">
                                                    </el-pagination>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>

                                <el-tab-pane name="fifth">
                                    <iframe id="screener-page" ref="screener-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: moduleHeight + 300 + 'px', marginLeft: -13 + '%', }"
                                        src="./#/screener">
                                    </iframe>
                                </el-tab-pane>
                            </el-tabs>

                            

                            <div>
                                <!-- optimization detail -->
                                <el-dialog customClass="detail-class" title="" :visible.sync="dialogOptimizationDetail"
                                    v-draggable>
                                    <el-form>
                                        <!-- <div class="detail-button" style="margin-left:80%">
                                            <el-button round @click="dialogOptimizationDetail=false">Cancel</el-button>
                                            <el-button round type="primary">&nbsp;OK&nbsp;</el-button>
                                        </div> -->
                                    </el-form>
                                </el-dialog>
                            </div>

                            

                            <!-- <div id="center-control"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>
                                <iframe id="frames-cc" ref="cc-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%',  marginLeft: -13 + '%', visibility: '', }"
                                    src="./cc">
                                </iframe>
                            </div>
                            <div id="common-control"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>
                                <iframe id="frames-common" ref="common-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%',  marginLeft: -13 + '%', visibility: '', }"
                                    src="./common">
                                </iframe>
                            </div>
                            <div id="display-general"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>
                                <iframe id="gen-display" ref="gen-display-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: -13 + '%', visibility: '' }"
                                    src="./display-general">
                                </iframe>
                            </div>
                            <div id="display-common"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>
                                <iframe id="common-display" ref="common-display-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: -13 + '%', visibility: '' }"
                                    src="./display-common">
                                </iframe>
                            </div>

                            <div id="optimization"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>
                                <iframe id="frames" ref="optimization-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: -13 + '%', visibility: '' }"
                                    src="./ai">
                                </iframe>
                            </div>
                            <div id="display"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>
                                <iframe id="opt-display" ref="opt-display-dom" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: -13 + '%', visibility: '' }"
                                    src="./display">
                                </iframe>
                            </div>
                            <div id="screener"
                            :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                            align='center'>
                                <iframe id="screener-page" ref="screener-dom" frameborder="0" scrolling="no"
                                :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: -13 + '%', visibility: '' }"
                                    src="./screener">
                                </iframe>
                            </div>
                            <div id="display-s"
                                :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                                align='center'>

                                <iframe id="opt-display-s" ref="opt-display-dom-s" frameborder="0" scrolling="no"
                                    :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: -13 + '%', visibility: '' }"
                                    src="./display-screener">
                                </iframe>
                            </div>

                            <div id="3rdPartUI"
                            :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                            align='center'>
                            <iframe id="3rdPartUI-page" ref="3rdPartUI-dom" frameborder="0" scrolling="no"
                                :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', marginLeft: 0 + '%', marginTop: '-18px', marginRight: 10 + '%', visibility: '' }"
                                    src="./3rdPartAI">
                                </iframe>
                            </div> -->
                        </div>

                        <!-- <div id="layout"
                            :style="{ position: 'absolute', backgroundColor: contentColor, height: fixHeight * 1 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                            align='center'>
                            <iframe class="scale" id="frames-layout" ref="ref-layout" frameborder="0" scrolling="no"
                                :style="{ width: 100 + 'vw', height: 100 + '%', visibility: '', }" src="./layout">
                            </iframe>
                        </div>

                        <div id="webcam"
                            :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 14 + 'px', overflow: 'hidden' }"
                            align='center'>
                            <iframe class="scale-cam" id="frames-webcam" frameborder="0" scrolling="no"
                                :style="{ width: moduleWidth + 300 + 'px', height: 100 + '%', visibility: '', }"
                                src="">
                            </iframe>
                        </div>

                        <div id="reaction-system"
                            :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                            align='center'>
                            <iframe id="lib" ref="ic-library" frameborder="0" scrolling="no"
                                :style="{ width: moduleWidth + 300 + 'px', marginLeft: -13 + '%', height: 100 + '%', visibility: '', }"
                                src="./library">
                            </iframe>
                        </div>
                        <div id="explore"
                            :style="{ position: 'absolute', height: fixHeight * 0.955 + 'px', marginTop: 20 + 'px', overflow: 'hidden' }"
                            align='center'>
                            <iframe id="module" ref="ic-module" frameborder="0" scrolling="no"
                                :style="{ width: moduleWidth + 300 + 'px', marginLeft: -13 + '%', height: 100 + '%', visibility: '', }"
                                src="./module">
                            </iframe>
                        </div> -->
                    </div>
                </el-col>
                <div>
                    <div id="Drag" class="main">
                        <div @mousedown="mousedown($event)" class=" by-menu" v-bind:title="'Toolkit'">
                            <div class="iconfont icon-fenzi menu-icon" style="margin-top:25px"></div>
                        </div>
                        <div class="menu" >
                            <input type="checkbox" href="#" class="menu-open" name="menu-open" id="menu-open">
                            <label class="menu-open-button" for="menu-open">
                                <span class="lines line-1"></span>
                                <span class="lines line-2"></span>
                                <span class="lines line-3"></span>
                            </label>
                            <a @click="dialogBaichuanVisible = true" href="#" class="menu-item blue"> <i
                                    class="iconfont icon-biaoqianlan_quanyi icon1"></i> </a>
                            <a href="#" class="menu-item green"> <i class="fa fa-coffee"></i> </a>
                            <a href="#" class="menu-item red"> <i class="fa fa-heart"></i> </a>
                            <a href="#" class="menu-item purple"> <i class="fa fa-microphone"></i> </a>
                        </div>
                    </div>
                </div>
                <el-dialog title="Baichuan" :visible.sync="dialogBaichuanVisible" v-draggable style="margin-top: -100px;"
                    :custom-class="'baichuan'">
                    <!-- <iframe src="http://10.99.150.211:8501/" style="width: 1000px; height: 700px;">

                    </iframe> -->
                </el-dialog>
            </el-row>
        </div>
    </div>
</template>

<script>
import draggable from '../../utils/draggable';
// import * as XLSX from 'xlsx';
import axios from 'axios';
import conf from '../../config'
import DevicePixelRatio from '../../utils/devicePixelRatio'
import Vue from 'vue';
import openwebui from '../3rdPartAI/3rdPartAI.vue';
Vue.component('openwebui', openwebui);
export default {
    directives: {
        draggable,
    },
    name: "index",
    data() {
        return {
            DragEl: null,
            totalHeight: null,
            totalWidth: null,
            disX: 0,
            disY: 0,
            dialogBaichuanVisible: false,

            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            fixWidth: window.screen.width,
            fixHeight: window.screen.height,
            menuHeight: window.screen.height * 0.955,
            moduleWidth: window.screen.width * 0.83,
            moduleHeight: window.screen.width * 0.83,
            footerHeight: window.screen.width * 0.1,
            dialogSettingsVisible: false,
            dialogHelpVisible: false,
            dialogProfileVisible: false,
            dialogCreateVisible: false,
            avatarVisible: false,
            dialogOptimizationDetail: false,
            url: conf.backend_url,
            iconScreen: 23,
            iconKinetics: 30, 
            profileForm: {
                name: localStorage.getItem('username') ? localStorage.getItem('username') : 'Engineer',
                group: '',
            },
            userAvatar: require('@/assets/img/img/GitHub.png'),
            // userAvatar: "./img/img/GitHub.png",
            avatarSrc: require('@/assets/img/img/GitHub.png'),
            // avatarSrc: "./img/img/GitHub.png",
            routerJumper: '',
            currentDom: '',
            aiDom: this.$refs["optimization-dom"],
            displayDom: this.$refs["opt-display-dom"],
            valueLights: true,
            activeName: 'first',
            loadingProject: false,
            value_: '',
            tableData: [],
            filterTableData: [],
            total: 0,
            pagesize: Math.ceil(window.screen.height / 90),
            currentPage: 1,
            // src1: './img/img/111.png',
            // src2: './img/img/222.png',
            // src3: './img/img/333.png',
            // src4: './img/img/444.png',
            // src5: './img/img/555.png',
            // src6: './img/img/666.png',
            // src7: './img/img/777.png',
            // src8: './img/img/111.png',
            srcBLK: './img/img/blk.png',
            sideBarColor: '#ffffff',
            sideBarFontColor: '',
            logoColor: '#444546',
            contentColor: '#f4f5f6',
            moduleColor: '#ffffff',
            shadowColor: '#c4ced4',
            textColor: '#000000',
            projectTableColor: '#ffffff',
            username: this.$route.params.username,
            formLabelWidth: '120px',
            coverTopRatio: 0.24,
            languageVal: "En",
            iconTitle: '',
            sideTitle: [
                { 'name': '', 'sub': [] },
                { 'name': '', 'sub': [] },
                {
                    'name': '',
                    'sub': [
                        { 'name': '' },
                        { 'name': '' },
                        { 'name': '' },
                        { 'name': '' },
                        { 'name': '' },
                        { 'name': '' },
                    ]
                },
                { 'name': '', 'sub': [] },
                { 'name': '', 'sub': [] },
                { 'name': '', 'sub': [] },
                { 'name': '', 'sub': [] },
            ],
            headerTool: [
                { 'name': '' },
                {
                    'name': '',
                    'sub': [
                        { 'name': '' },
                        { 'name': '' },
                    ]
                },
                { 'name': '' },
                { 'name': '' },
            ],
            functionsList: [
                { 'title': '', 'description': '', 'btn': '' },
                { 'title': '', 'description': '', 'btn': '' },
                { 'title': '', 'description': '', 'btn': '' },
                { 'title': '', 'description': '', 'btn': '' },
                { 'title': '', 'description': '', 'btn': '' },
                { 'title': '', 'description': '', 'btn': '' },
            ],
            loadProjBtn: "",
            projectTableTitle: ['', '', '', '', '', '',],
            tableEmptySpan: '',
            loadingComplete: null
        }
    },
    methods: {
        
        refreshPage() {
        location.reload();
        },
  
        mousedown(event) {
            this.disX = event.clientX - this.DragEl.offsetLeft;
            this.disY = event.clientY - this.DragEl.offsetTop;
            let dragHeight = this.DragEl.offsetHeight;
            let dragWidth = this.DragEl.offsetWidth;

            document.onmousemove = (el) => {
                let moveX = el.clientX - this.disX;
                let moveY = el.clientY - this.disY;
                console.log(moveX, moveY)
                if (moveX <= 210) {
                    // moveX = 210;
                }
                if (moveX >= this.totalWidth - 50) {
                    moveX = this.totalWidth - 50;
                }
                if (moveY <= 0) {
                    moveY = 0;
                }
                if (moveY >= this.totalHeight - 50) {
                    moveY = this.totalHeight - 50;
                }
                this.DragEl.style.left = moveX + "px";
                this.DragEl.style.top = moveY + "px";
            };
            document.onmouseup = () => {
                document.onmousemove = null;
            };
        },

        searchFocus(){
            this.$refs.autoRef.activated = false
        },
        querySearch(queryString, cb) {
            this.currentPage = 1
            this.filterTableData = []
            this.tableData.forEach(libEle => {
                console.log(libEle.order_name.indexOf(queryString))
                if (libEle.order_name.indexOf(queryString) != -1) {
                    this.filterTableData.push(libEle)
                }
            });
            this.total = this.filterTableData.length
            // cb(this.filterTableData)
        },

        funClick() {
            let root = document.querySelector(":root");
            if (document.getElementById("arrow").className == "el-icon-arrow-down") {
                document.getElementById("arrow").className = "el-icon-arrow-up"
                document.getElementById("item").style.visibility = ""
                document.getElementById("item").style.position = "relative"
                root.style.setProperty("--cover-top", "0px")
            }
            else {
                document.getElementById("arrow").className = "el-icon-arrow-down"
                root.style.setProperty("--cover-top", -390 + (1920 - this.fixWidth) * 0.02 + 'px')
                // root.style.setProperty("--cover-top", -260 + (1920 - this.fixWidth) * 0.02 + 'px')
            }
        },
        // funClick() {
        //     let root = document.querySelector(":root");
        //     if (document.getElementById("arrow").className == "el-icon-arrow-down") {
        //         document.getElementById("arrow").className = "el-icon-arrow-up"
        //         document.getElementById("item").style.visibility = ""
        //         document.getElementById("item").style.position = "relative"
        //         root.style.setProperty("--cover-top", "0px")
        //     }
        //     else {
        //         document.getElementById("arrow").className = "el-icon-arrow-down"
        //         root.style.setProperty("--cover-top", -390 + (1920 - this.fixWidth) * 0.02 + 'px')
        //         // root.style.setProperty("--cover-top", -260 + (1920 - this.fixWidth) * 0.02 + 'px')
        //     }
        // },

        sendColorSig(_dom) {
            let _window = ''
            if (_dom == 'ai') {

                let iframedom = this.$refs["optimization-dom"];
                _window = iframedom.contentWindow;
            }
            if (_dom == 'display') {

                let iframedom = this.$refs["opt-display-dom"];
                _window = iframedom.contentWindow;
            }
            if (_dom == 'display-s') {

                let iframedom = this.$refs["opt-display-dom-s"];
                _window = iframedom.contentWindow;
            }
            if (_dom == 'layout') {

                let iframedom = this.$refs["ref-layout"];
                _window = iframedom.contentWindow;
            }
            if (_dom == 'library') {

                let iframedom = this.$refs["ic-library"];
                _window = iframedom.contentWindow;
            }
            if (_dom == 'screener') {

                let iframedom = this.$refs["screener-dom"];
                _window = iframedom.contentWindow;
            }
            if (_dom == 'explore') {

                let iframedom = this.$refs["ic-module"];
                _window = iframedom.contentWindow;
            }
            _window.postMessage(
                {
                    type: "background-color",
                    message: {
                        bool: this.valueLights
                    },
                },
                "*"
            );
        },

        sendProjectSig(_dom, _val, _running=0) {
            let iframedom = this.$refs[_dom];
            let _window = iframedom.contentWindow;
            _window.postMessage(
                {
                    type: "project-sig",
                    message: {
                        id: _val.id,
                        msg: _val,
                        running: _running
                    },
                },
                "*"
            );
        },

        sendTypeSig(_dom, _type){
            let iframedom = this.$refs[_dom];
            let _window = iframedom.contentWindow;
            _window.postMessage(
                {
                    type: "type-sig",
                    message: {
                        type: _type,
                    },
                },
                "*"
            );
        },

        changeAtatar(_src) {
            this.avatarSrc = _src
        },

        updateUserprofile(){
            this.userAvatar = this.avatarSrc
        },

        turnOff() {
            let root = document.querySelector(":root");
            this.sideBarColor = '#000000'
            this.sideBarFontColor = '#c7c7c7'
            root.style.setProperty("--sideColor", '#c7c7c7')
            this.logoColor = '#ffffff'
            this.contentColor = '#313131'
            this.moduleColor = '#202020'
            this.shadowColor = '#808080'
            this.textColor = '#ffffff'
            this.projectTableColor = '#131313'
            root.style.setProperty("--side-text-color", "#ffffff")
            root.style.setProperty("--side-bg", "#2f2f2f")
            root.style.setProperty("--hide-clr", '#000000')
            root.style.setProperty("--sub-tool-clr", '#ffffff')
            root.style.setProperty("--el-dialog-bg-clr", '#303030')
            root.style.setProperty("--el-dialog-title-clr", '#ffffff')
            root.style.setProperty("--cover-bg-clr", '#000000')
            root.style.setProperty("--card-h2-clr", '#ffffff')
            root.style.setProperty("--card-p-clr", '#ffffff')
            root.style.setProperty("--arrow-clr", '#ffffff')
            root.style.setProperty("--sub-tool-bg-clr", '#000000')
        },

        turnOn() {
            let root = document.querySelector(":root");
            this.sideBarColor = '#ffffff'
            this.sideBarFontColor = '#000000'
            root.style.setProperty("--sideColor", '#000000')
            this.logoColor = '#444546'
            this.contentColor = '#f4f5f6'
            this.moduleColor = '#ffffff'
            this.shadowColor = '#c4ced4'
            this.textColor = '#000000'
            this.projectTableColor = '#ffffff'
            root.style.setProperty("--side-text-color", "#000000")
            root.style.setProperty("--side-bg", "#c4e3ff")
            root.style.setProperty("--hide-clr", '#ffffff')
            root.style.setProperty("--sub-tool-clr", '#000000')
            root.style.setProperty("--el-dialog-bg-clr", '#ffffff')
            root.style.setProperty("--el-dialog-title-clr", '#000000')
            root.style.setProperty("--cover-bg-clr", '#ffffff')
            root.style.setProperty("--card-h2-clr", '#000000')
            root.style.setProperty("--card-p-clr", '#2c2b2b')
            root.style.setProperty("--arrow-clr", '#000000')
            root.style.setProperty("--sub-tool-bg-clr", '#ffffff')
        },

        changeColor() {
            if (this.valueLights == false) {
                this.turnOff()
            }
            else {
                this.turnOn()
            }
            this.sendColorSig('ai')
            this.sendColorSig('display')
            this.sendColorSig('layout')
            this.sendColorSig('library')
            this.sendColorSig('screener')
            this.sendColorSig('display-s')
            this.sendColorSig('explore')
        },

        openDetail() {
            const h = this.$createElement;
            this.$msgbox({
                title: '',
                confirmButtonText: 'OK',
                message: h('p', null, [
                    h('span', null, 'This is Optimization detail'),
                    // h('i', { style: 'color: teal' }, 'VNode')
                ]),
                showConfirmlButton: false,
            })
        },

        retCamScale() {
            let root = document.querySelector(":root");
            root.style.setProperty("--ratio", this.ratioWidth / 1920)
        },

        isShowSwitchText() {
            if (this.valueLights == false) {
                return 'Lights On';
            } else {
                return 'Lights Off';
            }
        },

        isOverFlowY() {
            if (this.fixHeight < 1080) {
                return "auto"
            }
            else {
                return "hidden"
            }
        },

        hideDiv() {
            document.getElementById("home").style.display = "none"
            document.getElementById("project").style.display = "none"
            document.getElementById("frames-cc").style.visibility = "hidden"
            document.getElementById("frames").style.visibility = "hidden"
            document.getElementById("frames-layout").style.visibility = "hidden"
            document.getElementById("lib").style.visibility = "hidden"
            document.getElementById("frames-webcam").style.visibility = "hidden"
            document.getElementById("module").style.visibility = "hidden"
            document.getElementById("screener-page").style.visibility = "hidden"
            document.getElementById("3rdPartUI-page").style.visibility = "hidden"
            document.getElementById("opt-display-s").style.visibility = "hidden"
            document.getElementById("gen-display").style.visibility = "hidden"
        },

        initRatio() {
            if (window.devicePixelRatio < 1) {
                this.ratioHeight = this.ratioHeight / window.devicePixelRatio
                this.ratioWidth = this.ratioWidth / window.devicePixelRatio
            }
        },

        handleRatio() {
            let t = this
            let de = new DevicePixelRatio()
            de._addHandler(window, 'resize', function () {
                if (window.devicePixelRatio < 1) {
                    t.ratioHeight = t.ratioHeight / window.devicePixelRatio
                    t.ratioWidth = t.ratioWidth / window.devicePixelRatio
                }
            })
        },

        logOut() {
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            console.log("/////", this.valueLights)
            if (this.valueLights == false) {
                this.turnOn()
            }
            this.$router.push('/login')
        },

        hideTabs() {
            this.$refs.tabs.$children[0].$el.style.display = 'none';
        },

        homeClick() {
            this.refreshPage()
            // this.activeName = "first"
            // this.hideDiv()
            // document.getElementById("home").style.display = ""
        },
        // homeClick() {
        //     this.hideDiv()
        //     document.getElementById("home").style.display = ""
        // },

        projectClick() {
            this.activeName = "fourth"
            this.loadingProject = true
            console.log('***', localStorage.getItem('username'))
            // open ⬇
            axios.post(this.url + "/main-page/get-projects").then((res) => {
                if ('NO DATA' != res['data']['msg']) {
                    this.tableData = res['data'];
                    this.total = res['data'].length;
                }
                else {
                    this.total = 0
                }
                this.loadingProject = false
            }).catch((err) => {
                this.loadingProject = false
            });

            // simulation data
            // this.tableData = [{"id": 1,"order_name": "test","create_time": "2023-10-10","type": "opt","name": "test",}];
            // console.log(this.tableData)
            // this.total = [].length;
            // console.log(this.total)
            // this.hideDiv()
            // this.putBottom()
            // document.getElementById("project").style.display = ""
            // document.getElementById("project").style.zIndex = 991
            // this.loadingProject = false

            // General project data
            // axios.post(this.url + "/main-page/get-projects", {"owner": localStorage.getItem('username')})
            // .then((res) => {
            //     console.log(res)
            //     this.tableData = res['data']['data'];
            //     this.filterTableData = res['data']['data'];
            //     this.total = this.tableData.length;
            //     this.hideDiv()
            //     this.putBottom()
            //     document.getElementById("project").style.display = ""
            //     document.getElementById("project").style.zIndex = 991
            //     this.loadingProject = false
            // })
        },
        // projectClick() {
        //     this.loadingProject = true
        //     console.log('***', localStorage.getItem('username'))
        //     // open ⬇
        //     axios.post(this.url + "/main-page/get-projects").then((res) => {
        //         if ('NO DATA' != res['data']['msg']) {
        //             this.tableData = res['data'];
        //             console.log(this.tableData)
        //             this.total = res['data'].length;
        //             console.log(this.total)
        //         }
        //         else {
        //             this.total = 0
        //         }
        //         this.hideDiv()
        //         this.putBottom()
        //         document.getElementById("project").style.display = ""
        //         document.getElementById("project").style.zIndex = 991
        //         this.loadingProject = false
        //     });

        //     // simulation data
        //     // this.tableData = [{"id": 1,"order_name": "test","create_time": "2023-10-10","type": "opt","name": "test",}];
        //     // console.log(this.tableData)
        //     // this.total = [].length;
        //     // console.log(this.total)
        //     // this.hideDiv()
        //     // this.putBottom()
        //     // document.getElementById("project").style.display = ""
        //     // document.getElementById("project").style.zIndex = 991
        //     // this.loadingProject = false

        //     // General project data
        //     // axios.post(this.url + "/main-page/get-projects", {"owner": localStorage.getItem('username')})
        //     // .then((res) => {
        //     //     console.log(res)
        //     //     this.tableData = res['data']['data'];
        //     //     this.filterTableData = res['data']['data'];
        //     //     this.total = this.tableData.length;
        //     //     this.hideDiv()
        //     //     this.putBottom()
        //     //     document.getElementById("project").style.display = ""
        //     //     document.getElementById("project").style.zIndex = 991
        //     //     this.loadingProject = false
        //     // })
        // },

        handleCount() {
            return Math.ceil(this.total / this.pagesize)
        },

        current_change: function (currentPage) {
            this.currentPage = currentPage;
        },

        handleCurrentChange(val) {
            this.currentRow = val;
            this.nowRow = val;
        },

        toCC() {
            this.routerJumper = './#/cc'
            this.hideDiv()
            this.putBottom()
            document.getElementById("frames-cc").style.visibility = ""
            document.getElementById("center-control").style.zIndex = 993
        },

        toCommon() {
            this.routerJumper = './#/common'
            this.hideDiv()
            this.putBottom()
            document.getElementById("frames-common").style.visibility = ""
            document.getElementById("common-control").style.zIndex = 993
        },

        toOptimization() {
            this.activeName = "third"
            this.routerJumper = '/ai'
            // this.hideDiv()
            // this.putBottom()
            // document.getElementById("frames").style.visibility = ""
            // document.getElementById("optimization").style.zIndex = 993
            // this.changeColor()
        },

        toScreener() {
            this.activeName = "fifth"
            this.routerJumper = '/screener'
            // this.hideDiv()
            // this.putBottom()
            // document.getElementById("screener-page").style.visibility = ""
            // document.getElementById("screener").style.zIndex = 993
            // this.changeColor()
        },

        toOpenWebUI(_type) {
            this.activeName = "second"
            this.routerJumper = '/3rdPartAI'
            this.sendTypeSig("3rdPartUI-dom", _type)
        },
        // toOpenWebUI(_type) {
        //     this.hideDiv()
        //     this.putBottom()
        //     document.getElementById("3rdPartUI-page").style.visibility = ""
        //     document.getElementById("3rdPartUI").style.zIndex = 994
        //     this.changeColor()
        //     this.sendTypeSig("3rdPartUI-dom", _type)
        //     if (this.loadingComplete == 1) {
        //     }
        // },

        toReactionSystem() {
            this.hideDiv()
            this.putBottom()
            document.getElementById("lib").style.visibility = ""
            document.getElementById("reaction-system").style.zIndex = 992
        },

        toLayout() {
            this.hideDiv()
            this.putBottom()
            document.getElementById("frames-layout").style.visibility = ""
            document.getElementById("layout").style.zIndex = 993
        },

        toWebcam() {
            this.hideDiv()
            this.putBottom()
            document.getElementById("frames-webcam").style.visibility = ""
            document.getElementById("webcam").style.zIndex = 992
        },

        toExplore() {
            this.hideDiv()
            this.putBottom()
            document.getElementById("module").style.visibility = ""
            document.getElementById("explore").style.zIndex = 992
        },

        putBottom() {
            document.getElementById("frames-cc").style.visibility = "hidden"
            document.getElementById("center-control").style.zIndex = 990
            document.getElementById("frames-common").style.visibility = "hidden"
            document.getElementById("common-control").style.zIndex = 990
            document.getElementById("gen-display").style.visibility = "hidden"
            document.getElementById("display-general").style.zIndex = 990
            document.getElementById("common-display").style.visibility = "hidden"
            document.getElementById("display-common").style.zIndex = 990
            document.getElementById("frames").style.visibility = "hidden"
            document.getElementById("frames").style.zIndex = 990
            document.getElementById("opt-display").style.visibility = "hidden"
            document.getElementById("opt-display").style.zIndex = "hidden"
            document.getElementById("opt-display-s").style.visibility = "hidden"
            // document.getElementById("opt-display-s").style.zIndex = "hidden"
            document.getElementById("project").style.visibility = 990
            document.getElementById("project").style.zIndex = 990
            // document.getElementById("reaction-system").style.visibility = "hidden"
            document.getElementById("reaction-system").style.zIndex = 990
            document.getElementById("module").style.visibility = "hidden"
            document.getElementById("module").style.zIndex = 990
            document.getElementById("webcam").style.visibility = "hidden"
            document.getElementById("webcam").style.zIndex = 990
            document.getElementById("module").style.visibility = "hidden"
            document.getElementById("explore").style.zIndex = 990
            document.getElementById("layout").style.zIndex = 990
            document.getElementById("optimization").style.zIndex = 990
            document.getElementById("display").style.zIndex = 990
            // document.getElementById("screener").style.visibility = "hidden"
            document.getElementById("screener").style.zIndex = 990
            document.getElementById("3rdPartUI-page").style.visibility = "hidden"
            document.getElementById("3rdPartUI").style.zIndex = 990
        },

        loadProject(_val) {
            this.nowRow = _val
            console.log("sadasd", _val)
            let _type = this.nowRow.type
            if (_type == "Optimization") {
                this.routerJumper = './#/display'
                this.hideDiv()
                this.putBottom()
                document.getElementById("opt-display").style.visibility = ""
                document.getElementById("display").style.zIndex = 993
                this.sendColorSig('display')
                // load project api, transfer paramter
                this.sendProjectSig("opt-display-dom", this.nowRow)
            }
            if (_type == "Screen") {
                this.routerJumper = './#/display-screener'
                this.hideDiv()
                this.putBottom()
                document.getElementById("opt-display-s").style.visibility = ""
                document.getElementById("display-s").style.zIndex = 992
                this.sendColorSig('display-s')
                this.sendProjectSig("opt-display-dom-s", this.nowRow)
            }
            if (_type == "General") {
                this.routerJumper = './#/general-display'
                this.hideDiv()
                this.putBottom()
                document.getElementById("gen-display").style.visibility = ""
                document.getElementById("display-general").style.zIndex = 992

                // axios.post("http://192.168.1.33:5001/api/get-project-status",)
                axios.post("http://192.168.1.33:83/srv/GET-PROJECT-STATUS",)
                .then((res) => {
                    var targetElement = { id: this.nowRow.id };
                    if (res.data.data.some(item => Object.keys(targetElement).every(key => item[key] === targetElement[key]))) {

                        this.sendProjectSig("gen-display-dom", this.nowRow, 1)
                    }
                    else {
                        this.sendProjectSig("gen-display-dom", this.nowRow, 0)
                    }

                })
            }
            if (_type == "Common"){
                this.routerJumper = './#/display-common'
                this.hideDiv()
                this.putBottom()
                document.getElementById("common-display").style.visibility = ""
                document.getElementById("display-common").style.zIndex = 992
                this.sendProjectSig("common-display-dom", this.nowRow)
            }
        },

        handleDetail(){
            let _type = this.nowRow.type
            if (_type == "Optimization") {
                this.routerJumper = './#/display'
                this.hideDiv()
                this.putBottom()
                document.getElementById("opt-display").style.visibility = ""
                document.getElementById("display").style.zIndex = 993
                this.sendColorSig('display')
                // load project api, transfer paramter
                this.sendProjectSig("opt-display-dom", this.nowRow)
            }
            if (_type == "Screen") {
                this.routerJumper = './#/display-screener'
                this.hideDiv()
                this.putBottom()
                document.getElementById("opt-display-s").style.visibility = ""
                document.getElementById("display-s").style.zIndex = 992
                this.sendColorSig('display-s')
                this.sendProjectSig("opt-display-dom-s", this.nowRow)
            }
        },

        sleep(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },

        setEn() {
            this.headerTool[0].name = "Profile"
            this.headerTool[1].name = "Help"
            this.headerTool[1].sub[0].name = "Lights Mode"
            this.headerTool[1].sub[1].name = "Language"
            this.headerTool[2].name = "Settings"
            // this.headerTool[2].name = "Sets"
            this.headerTool[3].name = "Logout"
            let root = document.querySelector(":root");
            root.style.setProperty("--icon-title-weight", "200")
            this.iconTitle = "LLM-RDF"
            // this.iconTitle = "IChemFoundry"
            this.sideTitle[0].name = "Home"
            this.sideTitle[1].name = "Projects"
            this.sideTitle[2].name = "Functions"
            this.sideTitle[2].sub[0].name = "Optimization"
            this.sideTitle[2].sub[1].name = "Screener"
            this.sideTitle[2].sub[2].name = "Scale-up"
            this.sideTitle[2].sub[3].name = "Kinetics"
            this.sideTitle[2].sub[4].name = "Liter Search"
            this.sideTitle[2].sub[5].name = "Purification"
            this.sideTitle[3].name = "Library"
            this.sideTitle[4].name = "Layout"
            this.sideTitle[5].name = "Explore"
            this.sideTitle[6].name = "WebCam"
            this.functionsList[0].title = "Optimization"
            // this.functionsList[0].title = "&nbsp;&nbsp;&nbsp;Reaction&nbsp;&nbsp;&nbsp; self-optimization"
            this.functionsList[0].description = "Obtain optimal conditions of chemical reactions by utilizing AROPS optimization framework."
            this.functionsList[0].btn = "Read More"
            this.functionsList[1].title = "Screening"
            this.functionsList[1].description = "Realistic glass card hover effect, realistic glass card hover effect, realistic glass card hover effect."
            this.functionsList[1].btn = "Read More"
            this.functionsList[2].title = "Scale-up"
            this.functionsList[2].description = "Realistic glass card hover effect, realistic glass card hover effect, realistic glass card hover effect."
            this.functionsList[2].btn = "Read More"
            this.functionsList[3].title = "Kinetics"
            this.functionsList[3].description = "Realistic glass card hover effect, realistic glass card hover effect, realistic glass card hover effect."
            this.functionsList[3].btn = "Read More"
            this.functionsList[4].title = "Literature Search"
            this.functionsList[4].description = "Realistic glass card hover effect, realistic glass card hover effect, realistic glass card hover effect."
            this.functionsList[4].btn = "Read More"
            this.functionsList[5].title = "Purification"
            this.functionsList[5].description = "Realistic glass card hover effect, realistic glass card hover effect, realistic glass card hover effect."
            this.functionsList[5].btn = "Read More"
            this.loadProjBtn = "OK"
            this.projectTableTitle[0] = 'ID'
            this.projectTableTitle[1] = 'Project Name'
            this.projectTableTitle[2] = 'Create Time'
            this.projectTableTitle[3] = 'Type'
            this.projectTableTitle[4] = 'Owner'
            this.projectTableTitle[5] = 'View'
            this.tableEmptySpan = 'No More Data'
        },

        setCn() {
            this.headerTool[0].name = "用户"
            this.headerTool[1].name = "帮助"
            this.headerTool[1].sub[0].name = "灯光模式"
            this.headerTool[1].sub[1].name = "语言"
            this.headerTool[2].name = "设置"
            this.headerTool[3].name = "登出"
            let root = document.querySelector(":root");
            root.style.setProperty("--icon-title-size", "28px")
            root.style.setProperty("--icon-title-weight", "900")
            this.iconTitle = "智能化学系统"
            // this.iconTitle = "分子智造平台"
            this.sideTitle[0].name = "主页"
            this.sideTitle[1].name = "项目"
            this.sideTitle[2].name = "功能包"
            this.sideTitle[2].sub[0].name = "反应自优化"
            this.sideTitle[2].sub[1].name = "自动筛选"
            this.sideTitle[2].sub[2].name = "放大"
            this.sideTitle[2].sub[3].name = "动力学"
            this.sideTitle[3].name = "平台库"
            this.sideTitle[4].name = "布局  "
            this.sideTitle[5].name = "探索  "
            this.sideTitle[6].name = "平台画面"
            this.functionsList[0].title = "反应自优化"
            this.functionsList[0].description = "使用AROPS优化框架获取化学反应的最佳条件。"
            this.functionsList[0].btn = "详细信息"
            this.functionsList[1].title = "自动筛选"
            this.functionsList[1].description = "更多信息, 更多信息,更多信息,更多信息,更多信息,更多信息,更多信息,"
            this.functionsList[1].btn = "详细信息"
            this.functionsList[2].title = "放大"
            this.functionsList[2].description = "更多信息, 更多信息,更多信息,更多信息,更多信息,更多信息,更多信息,"
            this.functionsList[2].btn = "详细信息"
            this.functionsList[3].title = "动力学"
            this.functionsList[3].description = "更多信息, 更多信息,更多信息,更多信息,更多信息,更多信息,更多信息,"
            this.functionsList[3].btn = "详细信息"
            this.functionsList[4].title = "方法搜索"
            this.functionsList[4].description = "更多信息, 更多信息,更多信息,更多信息,更多信息,更多信息,更多信息,"
            this.functionsList[4].btn = "详细信息"
            this.functionsList[5].title = "纯化"
            this.functionsList[5].description = "更多信息, 更多信息,更多信息,更多信息,更多信息,更多信息,更多信息,"
            this.functionsList[5].btn = "详细信息"
            this.loadProjBtn = "确认"
            this.projectTableTitle[0] = '序号'
            this.projectTableTitle[1] = '项目名称'
            this.projectTableTitle[2] = '创建时间'
            this.projectTableTitle[3] = '类别'
            this.projectTableTitle[4] = '所有者'
            this.projectTableTitle[5] = '查看'
            this.tableEmptySpan = '无数据'
        },

        handleLan() {
            if (this.languageVal == 'En') {
                this.setEn()
            }
            else if (this.languageVal == 'Cn') {
                this.setCn()
            }
            // this.sendLanSig(this.languageVal)
        },

        sendLanSig(_val) {
            let iframedom = this.$refs["ic-library"];
            let _window = iframedom.contentWindow;
            this.sendLanWinSig(_window, _val)
            iframedom = this.$refs["optimization-dom"];
            _window = iframedom.contentWindow;
            this.sendLanWinSig(_window, _val)
            iframedom = this.$refs["opt-display-dom"];
            _window = iframedom.contentWindow;
            this.sendLanWinSig(_window, _val)
            iframedom = this.$refs["screener-dom"];
            _window = iframedom.contentWindow;
            this.sendLanWinSig(_window, _val)
            iframedom = this.$refs["opt-display-dom-s"];
            _window = iframedom.contentWindow;
            this.sendLanWinSig(_window, _val)
            // _window.postMessage(
            //     {
            //         type: "language-sig",
            //         message: {
            //             language: _val
            //         },
            //     },
            //     "*"
            // );
        },

        sendLanWinSig(_win, _val) {
            _win.postMessage(
                {
                    type: "language-sig",
                    message: {
                        language: _val
                    },
                },
                "*"
            );
        },
    },
    mounted() {
        this.$refs.tabs.$children[0].$el.style.display = "none";
        window.addEventListener('message', event => {
            if(event.data.signal == "optimization"){
                this.toOptimization()
            }
            if(event.data.signal == "screening"){
                this.toScreener()
            }
            if (event.data.signal == "complete") {
                this.loadingComplete = 1
            }
        });


        this.DragEl = document.getElementById("Drag");
        this.totalHeight = window.innerHeight;
        this.totalWidth = window.innerWidth;
        console.log(this.totalHeight, this.totalWidth)

        this.handleLan()
        this.turnOn()
        // if (this.fixHeight == 1440) {
        //     this.coverTopRatio = 0.19
        // }
        // if (this.fixHeight == 960) {
        //     this.coverTopRatio = 0.25
        // }
        let root = document.querySelector(":root");
        if (this.fixWidth < 1920) {
            root.style.setProperty("--side-title-font", "13px")
            root.style.setProperty("--side-iconfont-size", "19px")
            root.style.setProperty("--sub-tool-fontsize", "small")
            root.style.setProperty("--card-width", "226px")
            root.style.setProperty("--card-height", "360px")
            // root.style.setProperty("--card-height", "400px")
            root.style.setProperty("--card-gap", "-38px")
            root.style.setProperty("--card-p-size", "10px")
            root.style.setProperty("--card-h2-size", "22px")
            this.iconScreen = 12
            this.iconKinetics = 16
        }
        if (this.fixWidth < 1280) {
            root.style.setProperty("--card-width", "170px")
            root.style.setProperty("--side-title-font", "8px")
            root.style.setProperty("--side-iconfont-size", "14px")
            root.style.setProperty("--card-p-size", "4px")
            root.style.setProperty("--card-content-gap", "1")
        }

        if (this.fixWidth >= 1920) {
            root.style.setProperty("--main-left", "2290px")
        }

        root.style.setProperty("--detail-width", this.fixWidth / 2 + 'px')
        // root.style.setProperty("--cover-top", -260 + (1920 - this.fixWidth) * 0.02 + 'px')
        root.style.setProperty("--cover-top", -390 + (1920 - this.fixWidth) * 0.02 + 'px')


        root.style.setProperty("--header-tool-cover-height", this.ratioHeight * 0.05 + 'px')

        root.style.setProperty("--side-check-dup-left", this.fixWidth * 0.076 + 'px')
        root.style.setProperty("--side-check-left", this.fixWidth * 0.076 + 'px')
        root.style.setProperty("--block-height", this.fixHeight * 0.02 + 'px')

        root.style.setProperty("--sub-page-height", this.fixHeight * 0.955 + 'px')

        
        document.querySelector(":root").style.setProperty("--width-w", this.ratioWidth * 0.235 + "px")
        this.$nextTick(() => {
            document.getElementById('user').addEventListener('mouseover', () => {
                document.querySelector(":root").style.setProperty("--width-w", "0")
            }),
                document.getElementById('user').addEventListener('mouseleave', () => {
                    document.querySelector(":root").style.setProperty("--width-w", this.fixWidth * 0.235 + "px")
                }),
                document.getElementById('title-list').addEventListener('mouseover', () => {
                    document.querySelector(":root").style.setProperty("--width-w", "0")
                }),
                document.getElementById('title-list').addEventListener('mouseleave', () => {
                    document.querySelector(":root").style.setProperty("--width-w", this.fixWidth * 0.235 + "px")
                });
            });


        // this.hideDiv()

        document.getElementById("home").style.display = ""
        
        this.initRatio()
        this.handleRatio()
        this.retCamScale()
        // console.log('$$$', localStorage.getItem('username'))
        this.username = localStorage.getItem('username')
        if (typeof (this.$route.params.username) != 'undefined') {
            localStorage.setItem('username', this.$route.params.username)
        }
        
        window.onload=function(){ 
            window.parent.postMessage({ signal: "complete" }, location.origin);
            // alert("页面加载完成！"); 
            // document.getElementById("home").style.display = ""
        } 

    }
}
</script>

<style lang="scss">
@import url(../../assets/font_viut27d3a7/iconfont.css);
// @import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

.iconfont {
    color: var(--side-text-color);
    font-size: var(--side-iconfont-size);
}

.toggle {
    z-index: 990;
    position: relative;
    visibility: 'hidden';
}

.header-tool-cover {
    margin-left: 70%;
    position: absolute;
    width: var(--width-w);
    height: 63px;
    background: var(--hide-clr);
    transition: width 0.75s;
    z-index: 991;
}

.sub-tool {
    color: var(--sub-tool-clr);
    position: absolute;
    margin-top: 0.85%;
    font-size: var(--sub-tool-fontsize);
}

.sub-tool:hover {
    .sub-tool-bg {
        opacity: 1;
        background-color: #acdeff;
    }
}

.sub-tool-bg {
    background-color: var(--sub-tool-bg-clr);
    width: 98px;
    margin-left: -20px;
    border-radius: 10px;
    text-align: center;
    transition: background-color 0.5s;
}

.arrow-class {
    margin-left: 89%;
    margin-top: -5%;
    color: var(--arrow-clr);
}

.title {
    position: absolute;
    font-size: 20px;
    font-weight: 600;
    margin-top: -8%;
    margin-left: 12%;
}

.discription {
    position: absolute;
    margin-top: 0%;
    margin-left: 12%;
    float: left;
}

.info {
    text-decoration: underline;
    position: absolute;
    margin-top: 10%;
    margin-left: 12%;
    float: left;
}

.grid-content {
    position: relative;
}

.scale {
    transform-origin: top left;
    transform: scale(0.875, 0.875)
}

.el-autocomplete .el-input .el-input__inner{
  border-radius: 14px !important; 
}

:root {
    --ratio: 1;
    --sideColor: '#000000';
    --shadow-color: '#ffffff';
    --side-text-color: #000000;
    --side-bg: #c4e3ff;
    --arrow-clr: #000000;
    --width-w: 0;
    --hide-clr: #ffffff;
    --sub-tool-clr: #000000;
    --el-dialog-bg-clr: #ffffff;
    --el-dialog-title-clr: #000000;
    --cover-top: 0;
    --cover-bg-clr: #ffffff;
    --cover-border-top: #dddddd;
    --header-tool-cover-height: 0;
    --side-check-dup-left: 250%;
    --side-check-left: 320%;
    --block-height: 0;

    --top-val: 10vh;
    --opi-val: 0;
    --top-img-val: 100vh;
    --opi-img-val: 1;
    --card-h2-clr: #000000;
    --card-p-clr: #2c2b2b;

    --side-title-font: 20px;
    --side-iconfont-size: 34px;
    --sub-tool-fontsize: large;
    --card-width: 342px;
    --card-height: 400px;
    --card-p-size: 16px;
    --card-h2-size: 28px;
    --card-content-gap: 2;
    --detail-width: 0;
    --card-gap: -65px;

    --icon-title-size: 30px;
    --icon-title-weight: 300;

    --sub-page-height: 0;
    --sub-tool-bg-clr: #ffffff;

    --main-left: 1600px;
}

.scale-cam {
    transform-origin: top left;
    transform: scale(var(--ratio), var(--ratio))
}

.content-gap {
    margin-top: 15px;
    position: relative;
}

.shadow {
    border-radius: 45px;
    margin: 6%;
}

.img {
    scale: 0.8;
}

.logo {
    position: absolute;
    margin-left: 1.5%;
    margin-top: 0.4%;
    font-size: var(--icon-title-size);
    font-weight: var(--icon-title-weight);
    font-family: "Copperplate", Fantasy;
}

.help-dialog {
    width: 1200px !important;
    height: 760px !important;
}

.help-title{
    margin-top: 20px; text-align: center;
}

.button {
    border: 2px solid #2b9be0;
    font-weight: 600;
    color: #2b9be0;
    float: right;
    margin: 6%;
    margin-right: 15px;
    height: 38px;
    border-radius: 8px;
    padding: 0x 2px;
    line-height: 0px;
}

.head-btn{
    position: relative;
    display: flex;
    // font-size: 26px;
    height: 40px;
    width:  120px;
    padding: 8px;
    margin-right: 20px;
    /* margin-top: 15px; */
    background-color: #f7f7f7;
    color: #000;
    text-decoration: none;
    justify-content: center; /* Horizontal centering */
    align-items: center; 
    border-radius: 20px;
    font-weight: 500;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
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
  width: 95%;
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

.el-dialog {
    border-radius: 10px;
    width: 580px;
    background-color: var(--el-dialog-bg-clr);
}

.el-dialog__title {
    color: var(--el-dialog-title-clr);
}


.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.table>>>.el-table th {
    background-color: transparent !important;
}

.table>>>.el-table tr {
    background-color: transparent !important;
}

.table>>>.el-table--enable-row-transition .el-table__body td,
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

.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(0, 0, 0, 0) !important;
}

.el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
}

.down-drop {
    font-size: 24px;
    width: 4vw;
}

.margin-block {
    height: 0.1vh;
    background-color: var(--cover-bg-clr);
}

.cover-block {
    height: var(--block-height);
    background-color: var(--cover-bg-clr);
    border-bottom: solid var(--cover-border-top) 1px;
}

.cover-menu-item {
    position: absolute;
    margin-top: var(--cover-top);
    height: 100vh;
    background-color:
        var(--cover-bg-clr);
    opacity: 1;
    z-index: 991;
    width: 100%;
    transition: margin-top 0.75s;
}

.disp {
    width: 100%;
    position: relative;
    z-index: 990;
}

.disp-dup {
    width: 100%;
    position: absolute;
    z-index: 990;
}

.side-title {
    position: absolute;
    margin-left: 25%;
    width: 30%;
    float: left;
    font-size: var(--side-title-font);
    color: var(--side-text-color);
}

.side-title-dup {
    position: absolute;
    margin-left: 20%;
    width: 30%;
    float: left;
    font-size: var(--side-title-font);
    color: var(--side-text-color);
}

.disp:hover {
    .check-lable-iconfont {
        opacity: 1;
    }
}

.disp-dup:hover {
    .check-lable-iconfont-dup {
        opacity: 1;
    }
}

.disp:active {
    .check-lable-iconfont {
        opacity: 1;
    }
}

.check-lable-iconfont {
    width: 6px;
    height: 80%;
    background: #2b9be0;
    position: absolute;
    float: right;
    left: var(--side-check-left);
    top: 10%;
    transition: 0.5s;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    opacity: 0;
}

.check-lable-iconfont-dup {
    width: 6px;
    height: 80%;
    background: #2b9be0;
    position: absolute;
    float: right;
    left: var(--side-check-dup-left);
    top: 10%;
    transition: 0.5s;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    opacity: 0;
}

.menu-top-gap {
    margin-top: 200px;
    // background-color: #ffffff;
}

.el-menu-item {
    margin-top: 4%;
    border-radius: 15px !important;
    position: relative;
    width: 82%;
    margin-left: -5%;
    font-size: 18px;
}

.el-menu-item:hover {
    background-color: var(--side-bg);
}

.el-menu-item:focus {
    background-color: var(--side-bg);
}

.hover-class {
    transition: all 0.3s ease-in-out;
}

.hover-class:hover {
    transform: scale(1.035);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins";
}

.container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
}

.container .card {
    position: relative;
    width: var(--card-width);
    height: var(--card-height);
    background-color: rgba(255, 255, 255, 0.1);
    margin: 4%;
    margin-top: 1%;
    border-radius: 30px;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(5px);
}

.container .card .content {
    position: absolute;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 15px;
    padding: 20px;
    transform: translateY(200px);
    opacity: 0;
    transition: 0.5s;
}

.container .card:hover .content {
    transform: translateY(100px);
    opacity: 1;
    z-index: 991;
}

.container .card .img {
    position: absolute;
    transform: translateY(0px);
    padding: -2%;
    margin-top: -14%;
    transition: 0.5s;
    z-index: 991;
    transform: scale(0.6);
}

.container .card:hover .img {
    transform: translateY(-95px) scale(0.6);
    padding: 0px;
}

.container .card .h2 {
    text-align: center;
    line-height: 40px;
    font-weight: 700;
    transform: translateY(120px);
    position: absolute;
    font-size: var(--card-h2-size);
    color: var(--card-h2-clr);
    transition: 0.5s;
    z-index: 991;
}

.container .card:hover .h2 {
    transform: translateY(-0px);
}

.container .card .content p {
    font-size: var(--card-p-size);
    color: var(--card-p-clr);
    line-height: var(--card-content-gap);
    font-weight: 300;
    margin: 10px 0 15px 0;
}

.container .card .content a {
    position: relative;
    display: inline-block;
    padding: 8px 20px;
    margin-top: 15px;
    background-color: #fff;
    color: #000;
    text-decoration: none;
    border-radius: 20px;
    font-weight: 500;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.card-gap{
    margin-top: var(--card-gap)
}

.detail-class {
    width: var(--detail-width);
    margin-left: 25%;
}

.sub-page {
    position: 'absolute';
    height: var(--sub-page-height);
    margin-top: 20px;
    overflow: 'hidden';
}


// ⬇ ⬇ ⬇ ⬇ ⬇ tollkit
.main {
    position: relative;
    // border-radius: 40px;
    left: var(--main-left);
    top: 120px;
    z-index: 999;
}

.menu-icon {
    font-size: 40px;
    font-weight: 600;
    margin-left: 34px;
    margin-top: 6px;
}

.by-menu {
    position: absolute;
    border-radius: 40px;
    width: 180px;
    height: 80px;
    border-radius: 48px;
    background: #eeeeee;
    box-shadow: 5px 5px 10px #a8a8a8,
        -5px -5px 10px #ffffff;
    text-align: center;
    // background-color: rgb(100, 170, 250);
    opacity: 0.92;
    z-index: 1001;
}

.menu-item,
.menu-open-button {
    position: absolute;
    background: #dbdbdb;
    border-radius: 100%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: 40px;
    position: absolute;
    color: #FFFFFF;
    text-align: center;
    line-height: 80px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform ease-out 200ms;
    transition: -webkit-transform ease-out 200ms;
    transition: transform ease-out 200ms;
}

.menu-open {
    display: none;
}

.lines {
    width: 25px;
    height: 3px;
    background: #242930;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -12.5px;
    margin-top: -1.5px;
    -webkit-transition: -webkit-transform 200ms;
    transition: -webkit-transform 200ms;
    transition: transform 200ms;
}

.line-1 {
    -webkit-transform: translate3d(0, -8px, 0);
    transform: translate3d(0, -8px, 0);
}

.line-2 {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

.line-3 {
    -webkit-transform: translate3d(0, 8px, 0);
    transform: translate3d(0, 8px, 0);
}

.menu-open:checked+.menu-open-button .line-1 {
    -webkit-transform: translate3d(0, 0, 0) rotate(45deg);
    transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu-open:checked+.menu-open-button .line-2 {
    -webkit-transform: translate3d(0, 0, 0) scale(0.1, 1);
    transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu-open:checked+.menu-open-button .line-3 {
    -webkit-transform: translate3d(0, 0, 0) rotate(-45deg);
    transform: translate3d(0, 0, 0) rotate(-45deg);
}

.menu {
    margin: auto;
    margin-left: 100px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 80px;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    font-size: 26px;
    opacity: 1;
    z-index: 1002;
}

.menu-item:hover {
    margin-left: 30%;
    background: #EEEEEE;
    color: #3290B1;
}

.menu-item:nth-child(3) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-item:nth-child(4) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-item:nth-child(5) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-item:nth-child(6) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-item:nth-child(7) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-item:nth-child(8) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-item:nth-child(9) {
    -webkit-transition-duration: 180ms;
    transition-duration: 180ms;
}

.menu-open-button {
    z-index: 2;
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    -webkit-transition-duration: 400ms;
    transition-duration: 400ms;
    -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
    transform: scale(1.1, 1.1) translate3d(0, 0, 0);
    cursor: pointer;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    opacity: 1 !important;
}

.menu-open-button:hover {
    -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
    transform: scale(1.2, 1.2) translate3d(0, 0, 0);
}

.menu-open:checked+.menu-open-button {
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
    -webkit-transition-duration: 200ms;
    transition-duration: 200ms;
    -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
    transform: scale(0.8, 0.8) translate3d(0, 0, 0);
}

.menu-open:checked~.menu-item {
    -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
    transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.menu-open:checked~.menu-item:nth-child(3) {
    transition-duration: 180ms;
    -webkit-transition-duration: 180ms;
    -webkit-transform: translate3d(0.08361px, -104.99197px, 0);
    transform: translate3d(0.08361px, -104.99197px, 0);
}

.menu-open:checked~.menu-item:nth-child(4) {
    transition-duration: 280ms;
    -webkit-transition-duration: 280ms;
    -webkit-transform: translate3d(90.9466px, -52.47586px, 0);
    transform: translate3d(90.9466px, -52.47586px, 0);
}

.menu-open:checked~.menu-item:nth-child(5) {
    transition-duration: 380ms;
    -webkit-transition-duration: 380ms;
    -webkit-transform: translate3d(90.9466px, 52.47586px, 0);
    transform: translate3d(90.9466px, 52.47586px, 0);
}

.menu-open:checked~.menu-item:nth-child(6) {
    transition-duration: 480ms;
    -webkit-transition-duration: 480ms;
    -webkit-transform: translate3d(0.08361px, 104.99197px, 0);
    transform: translate3d(0.08361px, 104.99197px, 0);
}

.menu-open:checked~.menu-item:nth-child(7) {
    transition-duration: 580ms;
    -webkit-transition-duration: 580ms;
    -webkit-transform: translate3d(-90.86291px, 52.62064px, 0);
    transform: translate3d(-90.86291px, 52.62064px, 0);
}

.menu-open:checked~.menu-item:nth-child(8) {
    transition-duration: 680ms;
    -webkit-transition-duration: 680ms;
    -webkit-transform: translate3d(-91.03006px, -52.33095px, 0);
    transform: translate3d(-91.03006px, -52.33095px, 0);
}

.menu-open:checked~.menu-item:nth-child(9) {
    transition-duration: 780ms;
    -webkit-transition-duration: 780ms;
    -webkit-transform: translate3d(-0.25084px, -104.9917px, 0);
    transform: translate3d(-0.25084px, -104.9917px, 0);
}

.blue {
    background-color: #e7e7e7;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.blue:hover {
    color: #669AE1;
    text-shadow: none;
}

.green {
    background-color: #cdcfcd;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.green:hover {
    color: #70CC72;
    text-shadow: none;
}

.red {
    background-color: #c5c5c5;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.red:hover {
    color: #FE4365;
    text-shadow: none;
}

.purple {
    background-color: #b4b4b4;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.purple:hover {
    color: #C49CDE;
    text-shadow: none;
}

.orange {
    background-color: #FC913A;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.orange:hover {
    color: #FC913A;
    text-shadow: none;
}

.lightblue {
    background-color: #62C2E4;
    box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.lightblue:hover {
    color: #62C2E4;
    text-shadow: none;
}

.credit {
    margin: 24px 20px 120px 0;
    text-align: right;
    color: #EEEEEE;
}

.credit a {
    padding: 8px 0;
    color: #C49CDE;
    text-decoration: none;
    transition: all 0.3s ease 0s;
}

.credit a:hover {
    text-decoration: underline;
}

// ⬆ ⬆ ⬆ ⬆ ⬆ toolkit
.icon1{
    margin-left: -15px;
}

.baichuan {
    width: 1040px;
    height: 850px;
    margin-top: -200px;
}
</style>
