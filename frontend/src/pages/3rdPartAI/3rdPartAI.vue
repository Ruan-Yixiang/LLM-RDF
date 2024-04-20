<template>
    <div class="p-main">
        <el-row>  
            <el-tabs v-model="activeName"  ref="tabs">
                <el-tab-pane label="1" name="first" >
                    <el-row style="margin-top: 10%;">
                        <el-row :gutter="12">
                            <el-col :span="6">&nbsp;
                            </el-col>
                            <el-col :span="4">
                                <a @click="activeName='second'">
                                    <el-card shadow="hover" style=" height: 400px; border-radius: 10px; font-size: x-large;">
                                        <div>
                                            <el-col :span="20">
                                                ChatGPT
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="el-icon-right"></div>
                                            </el-col>
                                        </div>
                                        <div style="font-size: medium; margin-left: 2%;">ChatGPT  ChatGPT  ChatGPT...</div>
                                    </el-card>
                                </a>
                            </el-col>
                            <el-col :span="4">
                                <a @click="activeName='third'">
                                    <el-card shadow="hover" style=" height: 400px; border-radius: 10px; font-size: x-large;">
                                        <div>
                                            <el-col :span="20">
                                                Ollama
                                            </el-col>
                                            <el-col :span="2">
                                                <div class="el-icon-right"></div>
                                            </el-col>
                                        </div>
                                        <div style="font-size: medium; margin-left: 2%;">Ollama  Ollama  Ollama...</div>
                                    </el-card>
                                </a>
                            </el-col>
                        </el-row>
                    </el-row>

                </el-tab-pane>
                <el-tab-pane label="2" name="second" align="center" >
                    <el-col :span=" 5">&nbsp;</el-col>
                    <el-col :span="12">
                        <div align="left" style="margin-left: -3%;margin-top: 5%; ">
                            <el-button circle @click="activeName='first'" class="el-icon-back"></el-button>
                        </div>

                        <a href="https://chat.openai.com/g/g-bo0FiWLY7-consensus" id="Literature Scouter" target="_blank" style="display: '' ;">
                            <el-card  shadow="hover" class="card" >
                                <div style="position: relative;">
                                    <el-image :src="'./img/img/Literature Scouter.png'" class="aiicon"></el-image>
                                    <div style="position: absolute; margin-left: 44%; font-size: x-large;">Literature Scouter&nbsp;</div>
                                </div>
                            </el-card>
                        </a>
                        <a href="https://chat.openai.com/g/g-OUHuCwRyT-experiment-designer" id="Experiment Designer" target="_blank" style="display:'';" @click="choice()">
                            <el-card shadow="hover" class="card" >
                                <div v-if="!disp" style="position: relative;">
                                    <el-image :src="'./img/img/Experiment Designer.png'" class="aiicon"></el-image>
                                    <div style="position: absolute; margin-left: 44%; font-size: x-large;">Experiment Designer&nbsp;</div>
                                </div>
                                <div v-if="disp" style="position: relative;">
                                    <el-image :src="'./img/img/Experiment Designer.png'" class="aiicon" style="margin-left: -40%"></el-image>
                                    <div style="position: absolute; margin-left: 24%; font-size: x-large;">Experiment Designer&nbsp; </div>
                                    <el-image :src="'./img/img/Hardware Executor.png'" class="aiicon" style="margin-left: 4%"></el-image>
                                    <div style="position: absolute; margin-left: 68%; font-size: x-large;">Hardware Executor&nbsp;</div>
                                </div>
                            </el-card>
                        </a>
                        <a href="https://chat.openai.com/g/g-OMRkTl59T-hardware-executor" id="Hardware Executor" target="_blank" style="display:'';">
                            <el-card shadow="hover" class="card" >
                                <div style="position: relative;">
                                    <el-image :src="'./img/img/Hardware Executor.png'" class="aiicon"></el-image>
                                    <div style="position: absolute; margin-left: 44%; font-size: x-large;">Hardware Executor&nbsp;</div>
                                </div>
                            </el-card>
                        </a>
                        <a href="https://chat.openai.com/g/g-2csRbBPhx-spectrum-analyzer" id="Spectrum Analyzer" target="_blank" style="display:'';">
                            <el-card shadow="hover" class="card" >
                                <div style="position: relative;">
                                    <el-image :src="'./img/img/Spectrum Analyzer.png'" class="aiicon"></el-image>
                                    <div style="position: absolute; margin-left: 44%; font-size: x-large;">Spectrum Analyzer&nbsp;</div>
                                </div>
                            </el-card>
                        </a>
                        <a href="https://chat.openai.com/g/g-6CFis5e6M-separation-instructor" id="Separation Instructor" target="_blank" style="display:'';">
                            <el-card shadow="hover" class="card" >
                                <div style="position: relative;">
                                    <el-image :src="'./img/img/Separation Instructor.png'" class="aiicon"></el-image>
                                    <div style="position: absolute; margin-left: 44%; font-size: x-large;">Separation Instructor&nbsp;</div>
                                </div>
                            </el-card>
                        </a>
                        <a href="https://chat.openai.com/g/g-MZZcJU43f-result-interpreter" id="Result Interpreter" target="_blank" style="display:'';">
                            <el-card shadow="hover" class="card" >
                                <div style="position: relative;">
                                    <el-image :src="'./img/img/Result Interpreter.png'" class="aiicon"></el-image>
                                    <div style="position: absolute; margin-left: 44%; font-size: x-large;">Result Interpreter&nbsp;</div>
                                </div>
                            </el-card>
                        </a>
                    </el-col>
                    <el-col :span=" 4" align="left">&nbsp;
                    </el-col>

                </el-tab-pane>
                <el-tab-pane label="3" name="third">
                    <div style="position: relative;">
                        <div style="position: absolute; margin-top: 1%; margin-left: 15%;"><el-button circle @click="activeName='first'" class="el-icon-back" ></el-button></div>
                    </div>
                    <iframe id="kinetics-page" ref="kinetics-dom" frameborder="0" scrolling="no"
                        :style="{   width: fixWidth + 'px', height: fixHeight *0.95  + 'px', marginLeft: 0 + '%',marginTop: '-10px', marginRight: 10 + '%', visibility: '' }"
                        src="http://10.97.22.36:8080/">
                    
                    </iframe>
                </el-tab-pane>
            </el-tabs>
        </el-row>
        
    </div>
</template>


<script>
export default {
    name: "openwebui",
    data() {
        return {
            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            fixWidth: window.screen.width,
            fixHeight: window.screen.height,
            activeName: 'first',
            localMem: "",
            disp: null
        }
    },
    methods:{
        hide(){
            document.getElementById("Literature Scouter").style.display = "none"
            document.getElementById("Experiment Designer").style.display = "none"
            document.getElementById("Hardware Executor").style.display = "none"
            document.getElementById("Spectrum Analyzer").style.display = "none"
            document.getElementById("Separation Instructor").style.display = "none"
            document.getElementById("Result Interpreter").style.display = "none"

            document.getElementById("Experiment Designer").target= '_blank'
            document.getElementById("Experiment Designer").href = 'https://chat.openai.com/g/g-OUHuCwRyT-experiment-designer'

            this.localMem = ""
        },

        choice(){
            if (this.localMem == "optimization") {
                window.parent.postMessage({ signal: this.localMem }, location.origin);
            }
            if (this.localMem == "screening") {
                window.parent.postMessage({ signal: this.localMem }, location.origin);
            }
        }
    },
    mounted(){
        this.$refs.tabs.$children[0].$el.style.display = "none";

        window.addEventListener(
            "message",
            (event) => {
                if(event.data.type == "type-sig"){
                    this.hide()
                    console.log(">>>>>>>>>", event.data.message.type)
                    if (event.data.message.type == "literature search") {
                        document.getElementById("Literature Scouter").style.display = ""
                        this.disp = false
                    }
                    if (event.data.message.type == "screening" ) {
                        document.getElementById("Experiment Designer").style.display = ""
                        document.getElementById("Experiment Designer").target= ''
                        document.getElementById("Experiment Designer").href = ''
                        this.localMem = "screening"
                        // document.getElementById("Hardware Executor").style.display = ""
                        document.getElementById("Spectrum Analyzer").style.display = ""
                        document.getElementById("Result Interpreter").style.display = ""
                        this.disp = true
                    }
                    if (event.data.message.type == "kinetics") {
                        document.getElementById("Experiment Designer").style.display = ""
                        document.getElementById("Hardware Executor").style.display = ""
                        document.getElementById("Spectrum Analyzer").style.display = ""
                        document.getElementById("Result Interpreter").style.display = ""
                        this.disp = false
                    }
                    if (event.data.message.type == "optimization") {
                        document.getElementById("Experiment Designer").style.display = ""
                        document.getElementById("Experiment Designer").target= ''
                        document.getElementById("Experiment Designer").href = ''
                        this.localMem = "optimization"
                        // document.getElementById("Hardware Executor").style.display = ""
                        document.getElementById("Result Interpreter").style.display = ""
                        this.disp = true
                    }
                    if (event.data.message.type == "scale-up") {
                        document.getElementById("Experiment Designer").style.display = ""
                        this.disp = false
                    }
                    if (event.data.message.type == "purification") {
                        document.getElementById("Separation Instructor").style.display = ""
                        this.disp = false
                    }
                }
            }
        )

    }
}
</script>

<style>
:root {
    --indicate-gap: 0;
    --main-color: #f4f5f6;
    --main-font-color: #000000;
    --header-btn-con-width: 0;
    --header-btn-sub-con-width: 0;
}

.p-main {
    background-color: var(--main-color);
    color: var(--main-font-color);
    position: 'relative';
    /* width: 1920; */
    height: var(--main-height);
}
.card{
    height: 80px;width:100%; border-radius: 10px; font-size: x-large; margin: 2%;
    margin-left: -5%;
}

.aiicon{
    transform: scale(0.5); width:100px; height:100px; 
    /* border: solid 1px;  */
    position: absolute; margin-top: -3.5%; margin-left: -20%;
}
</style>