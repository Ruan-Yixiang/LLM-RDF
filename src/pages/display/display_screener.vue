<template>
    <div class="p-main" v-loading="projectLoading">
        <el-row style=" margin-bottom: 10px;">
            <el-col :span="5">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="16">
                <div :style="{width: fixWidth * 0.58 + 'px', marginTop: 30 + 'px', marginBottom: -20 + 'px'}">
                    <el-row>
                        <div style="font-size: 34px; margin-top: 30px; position: relative;" class="grid-content">
                            {{ project_info }}
                            <a>
                                <div class="head-btn el-icon-download" @click="downloadPyFile"></div>
                            </a>
                            <a>
                                <div class="head-btn el-icon-s-grid" @click="downloadMatrixFile"></div>
                            </a>
                            <a>
                                <div class="head-btn el-icon-upload" @click="uploadMatrixFile"></div>
                            </a>
                        </div>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content"></div>
            </el-col>
        </el-row>

        <el-row style="margin-top: -10px;">
            <el-col :span="5">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="16" align="left" style=" border-radius: 15px; height:680px; position: relative; ">
                <div :style="{width: fixWidth * 0.58 + 'px', marginTop: 30 + 'px', marginBottom: -20 + 'px'}">
                    <el-row>
                        <div style=" margin-top: 95px; margin-left: 56px;  position: absolute; ">
                            <canvas id="canvas_1" width="100" height="68" ></canvas>
                        </div>
                    </el-row>
                    <el-row>
                        <div style=" margin-top: 180px; margin-left: 56px; position: absolute; ">
                            <canvas id="canvas_2" width="100" height="68" ></canvas>
                        </div>
                    </el-row>
                    <el-row>
                        <div style=" margin-top: 265px; margin-left: 56px; position: absolute; ">
                            <canvas id="canvas_3" width="100" height="68" ></canvas>
                        </div>
                    </el-row>
                    <el-row>
                        <div style=" margin-top: 350px; margin-left: 56px; position: absolute; ">
                            <canvas id="canvas_4" width="100" height="68" ></canvas>
                        </div>
                    </el-row>
                    <el-row>
                        <div style=" margin-top: 435px; margin-left: 56px; position: absolute; ">
                            <canvas id="canvas_5" width="100" height="68" ></canvas>
                        </div>
                    </el-row>
                    <el-row>
                        <div style=" margin-top: 520px; margin-left: 56px; position: absolute; ">
                            <canvas id="canvas_6" width="100" height="68" ></canvas>
                        </div>
                    </el-row>
                <div align="center" class="grid-content " id="myChart"
                    :style="{ width: fixWidth * 0.6 + 'px', height: '680px', marginTop: 20 + 'px', }"></div>
                </div>
            </el-col>
            <el-col :span="3"></el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import conf from "../../config";
import * as echarts from "echarts";

export default {
    data() {
        return {
            ratioWidth: 1920,
            ratioHeight: 1080,
            fixWidth: 1920,
            fixHeight: 1080,
            projectLoading: false,
            url: conf.backend_url,
            currentID: 0,
            project_info: "",
            code: "",
            csv: "",
            myChart: null,
            valueLights : true,
            yAxis: [],
            xAxis: [],
            gridData: [],
        }
    },
    
    methods: {
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

        downloadPyFile() {
            const blob = new Blob([this.code], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'screen.py';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        downloadMatrixFile() {
            const blob = new Blob([this.csv], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'screen.csv';
            link.click();
            URL.revokeObjectURL(link.href);
        },

        uploadMatrixFile() {
            const input = document.createElement('input');
            input.type = 'file';
            input.addEventListener('change', this.handleFileSelect);
            input.click();
        },

        handleFileSelect(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const content = event.target.result;
                const rows = content.split('\n');
                const matrix = rows.map(row => row.split(','));
                this.handleYaxis(matrix.slice(1, -1))
                this.handleXaxis(matrix.slice(1, -1))
                this.handleGrid(matrix.slice(1, -1))
                this.handleHeatMap()
            };
            reader.readAsText(file);
        },

        uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            // axios.post(this.url + "/display-screen/upload", {
            //     data: formData
            // }).then(res => {
            //     console.log(res)
            // })

            this.handleHeatMap()
        },

        handleData(_val) {
            this.project_info = "No." + _val + " Project of Screener"

            axios
                .post(this.url + "/display-screen/load", {
                    id: _val,
                })
                .then((res) => {
                    this.code = res["data"]["code"];
                    this.csv = res["data"]["csv"];
                })
        },

        handleYaxis(_matrix) {
            const firstElements = _matrix.map(subArr => subArr[0]);
            const uniqueList = Array.from(new Set(firstElements));
            this.yAxis = uniqueList
        },
        
        handleXaxis(_matrix) {   
            const firstElements = _matrix.map(subArr => subArr[1] + '/' + subArr[2]);
            const uniqueList = Array.from(new Set(firstElements));
            this.xAxis = uniqueList
        },

        handleGrid(_matrix){
            this.gridData = []
            for (let i = 0; i < _matrix.length; i++) {
                const r = []
                for (let j = 0; j < this.xAxis.length; j++) {
                    if ((_matrix[i][1] + '/' + _matrix[i][2] == this.xAxis[j])) {
                        r.push([this.yAxis.indexOf(_matrix[i][0]), j, parseFloat(_matrix[i][3].trim())])
                    }
                }
                this.gridData.push(r)
            }
        },

        handleHeatMap() {
            {
                this.drawCanvas('canvas_1', this.yAxis[0])
                this.drawCanvas('canvas_2', this.yAxis[1])
                this.drawCanvas('canvas_3', this.yAxis[2])
                this.drawCanvas('canvas_4', this.yAxis[3])
                this.drawCanvas('canvas_5', this.yAxis[4])
                this.drawCanvas('canvas_6', this.yAxis[5])

                // var yPic = {
                //     first: './img/img/1.png',
                //     second: './img/img/1.png',
                //     third: './img/img/1.png',
                //     fourth: './img/img/1.png',
                //     fifth: './img/img/1.png',
                //     sixth: './img/img/1.png',
                // }

                var data1 = [
                    {
                        id: 1,
                        rank: 1,
                    },
                    {
                        id: 2,
                        rank: 2,
                    },
                    {
                        id: 3,
                        rank: 3,
                    },
                    {
                        id: 4,
                        rank: 4,
                    },
                    {
                        id: 5,
                        rank: 5,
                    },
                    {
                        id: 6,
                        rank: 6,
                    }
                ]


                var chartDom = document.getElementById("myChart");
                if (this.myChart == null) {
                    this.myChart = echarts.init(chartDom);
                }

                const data = this.gridData.flat()
                // const data = [
                //         [0, 0, 50], [0, 1, 10], [0, 2, 80], [0, 3, 20], [0, 4, 0], [0, 5, 55], [0, 6, 40], [0, 7, 10],
                //         [1, 0, 70], [1, 1, 0], [1, 2, 60], [1, 3, 20], [1, 4, 0], [1, 5, 45.5], [1, 6, 99.9], [1, 7, 30],
                //         [2, 0, 10], [2, 1, 10], [2, 2, 0], [2, 3, 20], [2, 4, 22], [2, 5, 15], [2, 6, 28], [2, 7, 20],
                //         [3, 0, 70], [3, 1, 30], [3, 2, 60], [3, 3, 30], [3, 4, 0], [3, 5, 45], [3, 6, 38], [3, 7, 0],
                //         [4, 0, 10], [4, 1, 30], [4, 2, 20], [4, 3, 25], [4, 4, 75], [4, 5, 15], [4, 6, 68], [4, 7, 90],
                //         [5, 0, 20], [5, 1, 10], [5, 2, 0], [5, 3, 35], [5, 4, 0], [5, 5, 0], [5, 6, 98], [5, 7, 40],
                //         // [6, 0, 10], [6, 1, 50], [6, 2, 0], [6, 3, 15], [6, 4, 35], [6, 5, 25], [6, 6, 88], [6, 7, 30],
                //     ]
                    .map(function (item) {
                        return [item[1], item[0], item[2] ];
                    });
                var option;
                option = {
                    tooltip: {
                        position: 'top'
                    },
                    grid: {
                        height: '75%',
                        top: '10%',
                        bottom: '10%',
                        left: '15%',
                    },
                    xAxis: {
                        type: 'category',
                        data: this.xAxis,
                        splitArea: {
                            show: true
                        },
                        name: "Reaction Conditions",
                        nameLocation: "middle",
                        nameTextStyle:{
                            fontWeight: 'bold',
                            fontSize: 20,
                            padding:[30,0,0,0]
                        }
                    },

                    yAxis: {
                        type: 'category',
                        inverse: true,
                        name: "Alcohols",
                        nameLocation: "middle",
                        nameTextStyle:{
                            fontWeight: 'bold',
                            fontSize: 20,
                            padding:[15,15,120,50]
                        },
                        axisLabel: {
                            textStyle: {
                                align: 'right',
                            },
                            formatter: function (value) {
                                return '{' + value + '|} {s|}'
                            },
                            rich: {
                                1: {
                                    height: 46,
                                    align: 'center',
                                    // backgroundColor: {
                                    //     image: yPic.first
                                    // }
                                },
                                2: {
                                    height: 46,
                                    align: 'center',
                                    // backgroundColor: {
                                    //     image: yPic.second
                                    // }
                                },
                                3: {
                                    height: 46,
                                    align: 'center',
                                    // backgroundColor: {
                                    //     image: yPic.third
                                    // }
                                },
                                4: {
                                    height: 46,
                                    align: 'center',
                                    // backgroundColor: {
                                    //     image: yPic.fourth
                                    // }
                                },
                                5: {
                                    height:46,
                                    align: 'center',
                                    // backgroundColor: {
                                    //     image: yPic.fifth
                                    // }
                                },
                                6: {
                                    height: 46,
                                    align: 'center',
                                    // backgroundColor: {
                                    //     image: yPic.sixth
                                    // }
                                },
                            
                            }
                        },
                        data: data1.map(item => item.rank),
                    },

                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        inRange: {
                            color: [
                                '#feffd8',
                                '#f1fabb',
                                '#d7efb3',
                                '#acdeb7',
                                '#75c9bd',
                                '#44b7c4',
                                '#2498c1',
                                '#2073b2',
                                '#234c9f',
                                '#1e2e85',
                                '#091e59'
                            ]
                        }
                    },
                    series: [
                        {
                            name: 'Product Yield',
                            type: 'heatmap',
                            data: data,
                            label: {
                                show: true
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                option && this.myChart.setOption(option);
            }
        },

        drawCanvas(_name, _smiles) {
            window
                .initRDKitModule()
                .then(function (RDKitModule) {
                    // var smiles = "CC(=O)Oc1ccccc1C(=O)O";
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
    },

    mounted() {
        // import RDKit
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js';
        document.body.appendChild(script);

        let root = document.querySelector(":root")
        root.style.setProperty("--main-height", window.screen.height + 'px')


        if (this.$route.params.createdID != null) {
            this.handleData(this.$route.params.createdID)
        }
        window.addEventListener(
            "message",
            (event) => {
                if (event.data.type == "project-sig") {
                    this.currentID = event.data.message.id;
                    this.handleData(this.currentID);
                    console.log("get id : ", this.currentID)
                }
                if (event.data.type == "background-color") {
                    this.valueLights = event.data.message.bool
                    let root = document.querySelector(":root")

                    if (this.valueLights == false) {
                        root.style.setProperty("--main-color", "#313131")
                        root.style.setProperty("--main-font-color", "#ffffff")
                    }
                    else{
                        root.style.setProperty("--main-color", "#f4f5f6")
                        root.style.setProperty("--main-font-color", "#000000")
                    }
                    this.isLightsOff()
                    this.isColorWhite()
                }
            },
            false
        );
    }
}
</script>

<style scoped>
:root{
  --main-color: #f4f5f6;
  --main-font-color: #000000;
  --main-height: 0;
}
.p-main{
  background-color: var(--main-color) ;
  color: var(--main-font-color) ;
  position: 'relative';
  height: var(--main-height);
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    /* background: #1890FF; */
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
    border-radius: 35px;
    margin-top: 20px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 18px;
    float: right;
}

.head-btn {
    position: relative;
    display: flex;
    font-size: 26px;
    height: 40px;
    width: 90px;
    padding: 8px;
    margin-right: 20px;
    /* margin-top: 15px; */
    background-color: #f7f7f7;
    color: #000;
    text-decoration: none;
    justify-content: center;
    /* Horizontal centering */
    align-items: center;
    border-radius: 20px;
    font-weight: 500;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    float: right;
}
</style>
