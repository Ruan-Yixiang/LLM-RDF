<template>
    <div
        :style="{ backgroundColor: isLightsOff(), color: isColorWhite(), position: 'relative', width: ratioWidth + 'px', height: ratioHeight + 'px', }">
        <div :style="{ backgroundColor: isLightsOff(), color: isColorWhite(), position: 'absolute', width: fixWidth + 'px', height: fixHeight + 'px', }"
            >
            <div>
                <div style="position:relative; height:60vh">

                    <div class="module-class-1">Coming Soon...</div>
                    <!-- <div class="module-class"></div> -->
                </div>

                <div style="position: relative" align="center">
                    <!-- <div style=" width:60%; margin:auto">
                <el-carousel :autoplay=false  type="card" :height="ratioHeight * 0.12 + 'px'">
                    <el-carousel-item v-for="item in 6" :key="item">
                            <img :src="src1"/>
                    </el-carousel-item>
                </el-carousel>
            </div> -->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ratioHeight: window.screen.height,
            ratioWidth: window.screen.width,
            fixWidth: window.screen.width,
            fixHeight : window.screen.height,
            src1: './img/img/111.png',
            valueLights: true

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
        isColorWhite() {
            if (this.valueLights == false) {
                return "#ffffff";
            } else {
                return "#000000";
            }
        },
    },
    mounted() {
        window.addEventListener(
            "message",
            (event) => {
                if (event.data.type == "background-color") {
                    this.valueLights = event.data.message.bool
                    console.log("valueLights", this.valueLights)
                }
            })
    }
}
</script>

<style>
.module-class {
    margin: auto;
    margin-top: 20px;
    width: 50vw;
    height: 50vh;
    border-radius: 20px;
    border: 2px solid #4c9fe2;
}

.module-class-1 {
    margin: auto;
    margin-top: 20px;
    width: 50vw;
    height: 50vh;
    border-radius: 20px;
    font-size: 20px;
}

.el-carousel__item {
    color: #fefeff;
    border-radius: 20px;
    border: 2px solid #4c9fe2;
}

.el-carousel__item:nth-child(2n) {
    background-color: #ffffff;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #ffffff;
}
</style>