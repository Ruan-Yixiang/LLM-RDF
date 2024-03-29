<template>
    <div
        :style="{ position: 'relative', width: ratioWidth + 'px', height: ratioHeight + 'px', backgroundColor: isLightsOff(), overflow: 'hidden' }">
        <div
            :style="{ position: 'absolute', width: ratioWidth + 'px', height: fixHeight + 'px', backgroundColor: isLightsOff(), overflow: 'hidden' }">
            <div id="maxname"
                :style="{ width: '96%', height: '80%', marginTop: '1%', marginLeft: '2%', marginRight: '2%' }">
                <div id="hname" :style="{ backgroundColor: isLightsOff() }">
                    <!-- <h1 style="margin-bottom: 0; text-align: center">
                        IChemfoundry Platform
                    </h1> -->
                </div>

                <div class="box_container">
                    <div class="box_blk" style="z-index: -1;">
                    </div>
                    <div style="position: absolute;margin-left: 2%;margin-top: 2%;">
                        <!-- <el-button @click="cnt()">display random</el-button> -->
                        <!-- <el-button @click="realLoc()">Loc</el-button>
                        <el-input-number v-model="Robot1Status.Pos"></el-input-number>
                        <el-input v-model="Robot1Status.Dest" style="width: 50%;"></el-input> -->
                    </div>
                    <div class="box_idle" id="GC">
                        <a @click="simLoc('GC')">
                            <i class="el-icon-place"></i>
                        </a>
                        GC
                    </div>
                    <div class="box_idle" id="Hamilton">
                        <a @click="simLoc('Hamilton')">
                            <i class="el-icon-place"></i>
                        </a>
                        Hamilton
                    </div>
                    <div class="box_idle" id="Cytation1">
                        <a @click="simLoc('Cytation1')">
                            <i class="el-icon-place"></i>
                        </a>
                        Cytation1
                    </div>
                    <div class="box_idle" id="LC">
                        <a @click="simLoc('LC')">
                            <i class="el-icon-place"></i>
                        </a>
                        LC
                    </div>
                </div>

                <div class="rail">
                    <div id="Robot1" class="robot1">Robot1
                        <a @click="isShowRemote('http://' + ip.Robot1 + port)">
                            <i class="el-icon-s-platform"></i>
                        </a>
                    </div>
                </div>

                <div class="box_container">
                    <div class="box_idle" id="Unchained">
                        <a @click="simLoc('Unchained')">
                            <i class="el-icon-place"></i>
                        </a>
                        Unchained
                        <a @click="isShowRemote('http://' + ip.Unchained + port)">
                            <i class="el-icon-s-platform"></i>
                        </a>
                    </div>
                    <div class="box_idle" id="Discover">
                        <a @click="simLoc('Discover')">
                            <i class="el-icon-place"></i>
                        </a>
                        Discover
                        <a @click="isShowRemote('http://' + ip.Discover + port)">
                            <i class="el-icon-s-platform"></i>
                        </a>
                    </div>
                    <div class="box_idle" id="PT">
                        <a @click="simLoc('PT')">
                            <i class="el-icon-place"></i>
                        </a>
                        PT
                    </div>
                    <div class="box_idle" id="EC">
                        <a @click="simLoc('EC')">
                            <i class="el-icon-place"></i>
                        </a>
                        EC
                    </div>
                    <div class="box_idle" id="Purifier">
                        <a @click="simLoc('Purifier')">
                            <i class="el-icon-place"></i>
                        </a>
                        Purifier
                    </div>
                    <div class="box_idle" id="NMR">
                        <a @click="simLoc('NMR')">
                            <i class="el-icon-place"></i>
                        </a>
                        NMR
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import conf from "../../../vue.config";
import axios from "axios";

export default {
    data() {
        return {
            url: conf.labview_url,
            ip: conf.ip,
            port: ':8000',
            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            fixWidth: window.screen.width,
            fixHeight: window.screen.height,
            // width: 1890,
            valueLights: true,
            loc: conf.loc,
            Robot1Status: { Dest: "Unchained", Pos: -17920 },

            map: {
                "Unchained": 151,
                "Discover": 475,
                "PT": 800,
                "EC": 1125,
                "Purifier": 1450,
                "NMR": 1775,
                "GC": 525,
                "Hamilton": 945,
                "Cytation1": 1360,
                "Thermo": 1775,
            },
            motorMap: {
                "Unchained": -1792000,
                "Hamilton": -1518000,
                "Discover": -1442000,
                "GC": -1325000,
                "PT": -1122000,
                "EC": -792000,
                "Purifier": -422000,
                "Cytation1": -342000,
                "NMR": -80000,
                "Thermo": -80000,
            }
        };
    },
    methods: {
        isLightsOff() {
            if (this.valueLights == false) {
                return "#313131";

            } else {
                return "#f4f5f6";
            }
        },
        isShowRemote(url) {
            const newWindow = window.open(url, "_blank", "width=1920, height=1080");
            newWindow.focus();
        },
        cnt() {
            let tmp = Math.random() * this.width;
            console.log(tmp)
            let root = document.querySelector(":root");
            if (tmp < 150) {
                root.style.setProperty("--position", (150 + tmp).toString() + "px");
            } else {
                root.style.setProperty(
                    "--position",
                    (Math.random() * this.width).toString() + "px"
                );
            }
        },
        simLoc(_Instr) {
            console.log("---", _Instr)

            let real_name = _Instr
            if (_Instr == "LC") {
                real_name = "Thermo"
            }
            axios
                .post("http://192.168.1.33:5000/api/cmd", {
                    "user": "dell",
                    "Instrument": "Robot1",
                    "CMD": "START",
                    "RemotePath": "",
                    "LocalPath": "",
                    "Para": real_name,
                    "TimeAllowed": 800,
                    "Parallel": false,
                    "Release": false
                })
                .then((res) => {
                })

            // let root = document.querySelector(":root");
            // switch (_Instr) {
            //     case "LC":
            //         root.style.setProperty("--position", (this.map.Thermo).toString() + "px");
            //         break;
            //     case "Unchained":
            //         root.style.setProperty("--position", (this.map.Unchained).toString() + "px");
            //         break;
            //     case "Discover":
            //         root.style.setProperty("--position", (this.map.Discover).toString() + "px");
            //         break;
            //     case "PT":
            //         root.style.setProperty("--position", (this.map.PT).toString() + "px");
            //         break;
            //     case "EC":
            //         root.style.setProperty("--position", (this.map.EC).toString() + "px");
            //         break;
            //     case "Purifier":
            //         root.style.setProperty("--position", (this.map.Purifier).toString() + "px");
            //         break;
            //     case "NMR":
            //         root.style.setProperty("--position", (this.map.NMR).toString() + "px");
            //         break;
            //     case "GC":
            //         root.style.setProperty("--position", (this.map.GC).toString() + "px");
            //         break;
            //     case "Hamilton":
            //         root.style.setProperty("--position", (this.map.Hamilton).toString() + "px");
            //         break;
            //     case "Cytation1":
            //         root.style.setProperty("--position", (this.map.Cytation1).toString() + "px");
            //         break;
            //     default:
            //         break;
            // }

        },

        realLoc() {
            let root = document.querySelector(":root");
            let map_current = parseInt(getComputedStyle(root).getPropertyValue("--position").slice(0, -2))
            let map_destination = this.map[this.Robot1Status.Dest]
            console.log(map_current, map_destination)
            let realDest = this.loc[this.Robot1Status.Dest]
            let realCurrent = this.Robot1Status.Pos
            console.log("realDest:", realDest, "    realCurrent: ", realCurrent)
            // map_destination - (realDest - realCurrent) * 0.095 = 
            root.style.setProperty("--position", (map_destination - (realDest - realCurrent) * 0.095).toString() + "px");
            // let src = this.loc[this.Robot1Status.Dest];
            // let cur_pos = this.Robot1Status.Pos
            // console.log((map_destination - (realDest - realCurrent) * 0.18))
        },

        chooseBackgroundClass(_instr) {
            let real_name = _instr
            if (_instr == "LC") {
                real_name = "Thermo"
            }

                axios.post("http://192.168.1.33:5000/api/sta", {
                    "Instrument": real_name
                })
                .then((res) => {
                    console.log(res.data)
                    if (_instr == "Robot1") {
                        if (res.data.sta == "Ready") {
                            document.getElementById(_instr).className = "robot1_ready";
                        }
                        if (res.data.sta == "Running") {
                            document.getElementById(_instr).className = "robot1_running";
                        }
                        if (res.data.sta == "Error") {
                            document.getElementById(_instr).className = "robot1_error";
                        }
                        if (res.data.msg == "Timeout" || res.data.sta == "" || res.data.sta == "Timeout" || res.data.sta == "Offline") {
                            document.getElementById(_instr).className = "robot1";
                        }

                    }
                    else {
                        console.log("000", res.data.sta)
                        // document.getElementById(_instr).className = "box_idle";
                        if (res.data.sta == "Ready") {
                            document.getElementById(_instr).className = "box_ready";
                        }
                        if (res.data.sta == "Running") {
                            document.getElementById(_instr).className = "box_running";
                        }
                        if (res.data.sta == "Error") {
                            document.getElementById(_instr).className = "box_error";
                        }
                        if (res.data.msg == "Timeout" || res.data.sta == "" || res.data.sta == "Timeout" || res.data.sta == "Offline") {
                            document.getElementById(_instr).className = "box_idle";
                        }
                    }
                })
        },

        getInstrDetailInfo() {
            let root = document.querySelector(":root");
            let cur = 151
            let mapArr = []
            let motorArr = []
            axios.post("http://192.168.1.33:5000/api/det", {
                "Instrument": "Robot1"
            }).then((res) => {
                console.log(res.data)
                if (this.motorMap.Unchained <= res.data.Position && res.data.Position < this.motorMap.Discover) {
                    mapArr = [this.map.Unchained, this.map.Discover]
                    motorArr = [this.motorMap.Unchained, this.motorMap.Discover]
                }
                if (this.motorMap.Discover <= res.data.Position && res.data.Position < this.motorMap.GC) {
                    mapArr = [this.map.Discover, this.map.GC]
                    motorArr = [this.motorMap.Discover, this.motorMap.GC]
                }
                if (this.motorMap.GC <= res.data.Position && res.data.Position < this.motorMap.PT) {
                    mapArr = [this.map.GC, this.map.PT]
                    motorArr = [this.motorMap.GC, this.motorMap.PT]
                }
                if (this.motorMap.PT <= res.data.Position && res.data.Position < this.motorMap.EC) {
                    mapArr = [this.map.PT, this.map.EC]
                    motorArr = [this.motorMap.PT, this.motorMap.EC]
                }
                if (this.motorMap.EC <= res.data.Position && res.data.Position < this.motorMap.Purifier) {
                    mapArr = [this.map.EC, this.map.Purifier]
                    motorArr = [this.motorMap.EC, this.motorMap.Purifier]
                }
                if (this.motorMap.Purifier <= res.data.Position && res.data.Position < this.motorMap.Cytation1) {
                    mapArr = [this.map.Purifier, this.map.Cytation1]
                    motorArr = [this.motorMap.Purifier, this.motorMap.Cytation1]
                }
                if (this.motorMap.Cytation1 <= res.data.Position && res.data.Position <= this.motorMap.Thermo) {
                    mapArr = [this.map.Cytation1, this.map.Thermo]
                    motorArr = [this.motorMap.Cytation1, this.motorMap.Thermo]
                }
                cur = (res.data.Position - motorArr[0]) / (motorArr[1] - motorArr[0]) * (mapArr[1] - mapArr[0]) + mapArr[0]
                root.style.setProperty("--position", (cur).toString() + "px");
                console.log("...", cur, "...", mapArr, motorArr)
            })
        },

    },
    mounted() {
        console.log("this. screen width: ", window.screen.width)
        if (window.screen.width == 2560) {
            this.map = {
                "Unchained": 151,
                "Discover": 592,
                "PT": 1035,
                "EC": 1480,
                "Purifier": 1925,
                "NMR": 2380,
                "GC": 675,
                "Hamilton": 1245,
                "Cytation1": 1815,
                "Thermo": 2380,
            }
        }

        setInterval(() => {
            this.chooseBackgroundClass("Robot1")
            this.chooseBackgroundClass("Unchained")
            this.chooseBackgroundClass("LC")
            this.getInstrDetailInfo()
        }, 3000);

        window.addEventListener(
            "message",
            (event) => {
                if (event.data.type == "background-color") {
                    this.valueLights = event.data.message.bool
                    if (this.valueLights == false) {
                        let root = document.querySelector(":root");
                        root.style.setProperty("--bg-color", "#313131");
                    }
                    else {
                        let root = document.querySelector(":root");
                        root.style.setProperty("--bg-color", "#f4f5f6");
                    }
                }
            },
            false
        );
    }
};
</script>

<style>
:root {
    --position: 151px;
    /* --position: 151px; */
}

.robot1 {
    left: var(--position);
    border-radius: 15px 15px;
    background: rgb(212, 214, 216);
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 130px;
    font-size: 20px;
    margin: 20px;
    margin-top: -30px;
    margin-left: -150px;
    border: 15px solid rgb(74, 82, 88);
    position: absolute;
    transition: left 5s;
}

.robot1_ready {
    /* animation: colorChange 1s infinite; */
    left: var(--position);
    border-radius: 15px 15px;
    background: rgb(85, 207, 115);
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 130px;
    font-size: 20px;
    margin: 20px;
    margin-top: -30px;
    margin-left: -150px;
    border: 15px solid rgb(74, 82, 88);
    position: absolute;
    transition: left 5s;
}

.robot1_running {
    animation: colorChange 1s infinite;
    left: var(--position);
    border-radius: 15px 15px;
    background: rgb(85, 207, 115);
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 130px;
    font-size: 20px;
    margin: 20px;
    margin-top: -30px;
    margin-left: -150px;
    border: 15px solid rgb(74, 82, 88);
    position: absolute;
    transition: left 5s;
}

.robot1_error {
    /* animation: colorChange 1s infinite; */
    left: var(--position);
    border-radius: 15px 15px;
    background: rgb(216, 58, 58);
    width: 150px;
    height: 150px;
    text-align: center;
    line-height: 130px;
    font-size: 20px;
    margin: 20px;
    margin-top: -30px;
    margin-left: -150px;
    border: 15px solid rgb(74, 82, 88);
    position: absolute;
    transition: left 5s;
}

.box {
    border-radius: 5px 5px 0 0;
    border: 1px solid #000;
    width: 215px;
    height: 80px;
    margin: 10 auto;
}

.box_blk {
    border-radius: 15px 15px;
    background: #f4f5f6;
    width: 180px;
    height: 300px;
    text-align: center;
    line-height: 300px;
    margin: 0px;
    border: 0px solid rgb(255, 255, 255);
}

.box_ready {
    border-radius: 15px 15px;
    background: rgb(85, 207, 115);
    width: 180px;
    height: 260px;
    text-align: center;
    line-height: 260px;
    font-size: 20px;
    margin: 20px;
    border: 15px solid rgb(74, 82, 88);
}

.box_idle {
    border-radius: 15px 15px;
    background: rgb(203, 204, 203);
    width: 180px;
    height: 260px;
    text-align: center;
    line-height: 260px;
    font-size: 20px;
    margin: 20px;
    border: 15px solid rgb(74, 82, 88);
}

@keyframes colorChange {
    0% {
        background-color: rgb(192, 209, 196);
    }

    50% {
        background-color: rgb(85, 207, 115);
    }

    100% {
        background-color: rgb(192, 209, 196);
    }
}

.box_running {
    animation: colorChange 1s infinite;
    border-radius: 15px 15px;
    background: rgb(85, 207, 115);
    width: 180px;
    height: 260px;
    text-align: center;
    line-height: 260px;
    font-size: 20px;
    margin: 20px;
    border: 15px solid rgb(74, 82, 88);
}

.box_error {
    border-radius: 15px 15px;
    background: rgb(236, 84, 64);
    width: 180px;
    height: 260px;
    text-align: center;
    line-height: 260px;
    font-size: 20px;
    margin: 20px;
    border: 15px solid rgb(74, 82, 88);
}

:root {
    --bg-color: #f4f5f6
}

.box_container {
    background-color: var(--bg-color);
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin: 0px;
    padding: 0px;
    /* width: 1900px; */
    border: 0px solid #ccc;
    text-align: center;
    position: relative;
}

.rail {
    border: 15px solid rgb(74, 82, 88);
    border-radius: 10px 10px;
    background-color: #6db7f8;
    clear: both;
    text-align: center;
    height: 120px;
    line-height: 120px;
    position: relative;
    margin-left: 1%;
    margin-right: 1%;
    margin-top: 20px;
    margin-bottom: 20px;
}</style>