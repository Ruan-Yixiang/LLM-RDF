<template>
  <div id="itemPanel" ref="itemPanel" :class="{ 'hidden': itemVisible }" style="width:200px">
    <i class="iconfont icon-h-drag" />
    <div class="icon-tool" >

      <div class="btn-list-group">
        <i data-label="111" data-shape="circle-node" class=" node iconfont icon-circle " />
        <a class="tit" style="top: 10px">Group_1</a>
        <span class="btn-list-area">
          <div>
            <a class="tit" style="top: 10px">Input</a>
            <a class="node iconfont icon-circle" draggable="true" data-label="Input" data-shape="circle-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 60px">BBB</a>
            <a class="node iconfont icon-circle" draggable="true" data-label="BBB" data-shape="circle-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 110px">CCC</a>
            <a class="node iconfont icon-circle" draggable="true" data-label="CCC" data-shape="circle-node"></a>
          </div>
        </span>
      </div>

      <div class="btn-list-group">
        <i class="split" />
        <i data-label="333" data-shape="ellipse-node" class="node iconfont icon-ellipse" />
        <a class="tit" style="top: 16px">Group_2</a>
        <span class="btn-list-area">
          <div>
            <a class="tit" style="top: 10px">DDD</a>
            <a class="node iconfont icon-ellipse" draggable="true" data-label="DDD" data-shape="ellipse-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 60px">EEE</a>
            <a class="node iconfont icon-ellipse" draggable="true" data-label="EEE" data-shape="ellipse-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 110px">FFF</a>
            <a class="node iconfont icon-ellipse" draggable="true" data-label="FFF" data-shape="ellipse-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 160px">Unchained</a>
            <a class="node iconfont icon-ellipse" draggable="true" data-label="Unchained" data-shape="ellipse-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 210px">Discover</a>
            <a class="node iconfont icon-ellipse" draggable="true" data-label="Discover" data-shape="ellipse-node"></a>
          </div>
        </span>
      </div>

      <div class="btn-list-group">
        <i class="split" />
        <i data-label="222" data-shape="rect-node" class="node iconfont icon-rect" />
        <a class="tit" style="top: 16px">Group_3</a>
        <span class="btn-list-area">
          <div>
            <a class="tit" style="top: 10px">Script</a>
            <a class="node iconfont icon-rect" draggable="true" data-label="Script" data-shape="rect-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 60px">Run</a>
            <a class="node iconfont icon-rect" draggable="true" data-label="Run" data-shape="rect-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 110px">Report</a>
            <a class="node iconfont icon-rect" draggable="true" data-label="Report" data-shape="rect-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 160px">Thermo</a>
            <a class="node iconfont icon-rect" draggable="true" data-label="Thermo" data-shape="rect-node"></a>
          </div>
        </span>
      </div>

      <div class="btn-list-group">
        <i class="split" />
        <i data-label="444" data-shape="diamond-node" class="node iconfont icon-diamond" />
        <a class="tit" style="top: 16px">Group_4</a>
        <span class="btn-list-area">
          <div>
            <a class="tit" style="top: 10px">Condition</a>
            <a class="node iconfont icon-diamond" draggable="true" data-label="Condition" data-shape="diamond-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 60px">KKK</a>
            <a class="node iconfont icon-diamond" draggable="true" data-label="KKK" data-shape="diamond-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 110px">Robot1</a>
            <a class="node iconfont icon-diamond" draggable="true" data-label="Robot1" data-shape="diamond-node"></a>
          </div>
        </span>
      </div>
      
      <div class="btn-list-group">
        <i class="split" />
        <i data-label="555" data-shape="triangle-node" class="node iconfont icon-triangle" />
        <a class="tit" style="top: 16px">AI</a>
        <span class="btn-list-area">
          <div>
            <a class="tit" style="top: 10px">LLL</a>
            <a class="node iconfont icon-triangle" draggable="true" data-label="LLL" data-shape="triangle-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 60px">AROPS</a>
            <a class="node iconfont icon-triangle" draggable="true" data-label="AROPS" data-shape="triangle-node"></a>
          </div>
          <div>
            <a class="tit" style="top: 110px">SIMAI</a>
            <a class="node iconfont icon-triangle" draggable="true" data-label="SIMAI" data-shape="triangle-node"></a>
          </div>
        </span>
      </div>

      <i class="split" />
      <i draggable="true" class="gb-toggle-btn" @click="itemVisible = !itemVisible" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
// import {Popover} from 'vant'
// Vue.use(Popover)

// var dx,dy
// var screenWidth = window.screen.width
// var screenHeight = window.screen.height


export default {
  // components: {
  //   draggable
  // },
  name: 'ItemPanel',
  data() {
    return {
      itemVisible: false,
      randomNum: 0,

      flags: false,
      position: {
        x: 320,
        y: 60
      },

    };
  },
  mounted() {
    const icons = [...this.$refs.itemPanel.querySelector('.icon-tool').querySelectorAll('.node')];

    icons.forEach(icon => {
      icon.addEventListener('dragstart', event => {
        const shape = icon.getAttribute('data-shape');
        const label = icon.getAttribute('data-label');
        const fill = icon.getAttribute('fill');

        /* 设置拖拽传输数据 */
        event.dataTransfer.setData('dragComponent',
          JSON.stringify({
            label,
            shape,
            fill,
          }),
        );
      });
    });

    // 阻止默认动作
    document.addEventListener('drop', e => {
      e.preventDefault();
    }, false);
    // loaddata();
  },
  methods: {
    down(event) {
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      console.log('鼠标点所在位置', touch.clientX, touch.clientY)
      console.log('div左上角位置', event.target.offsetTop, event.target.offsetLeft)
      dx = touch.clientX - event.target.offsetLeft
      dy = touch.clientY - event.target.offsetTop
    },
    move() {
      if (this.flags) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        // 定位滑块的位置
        this.position.x = touch.clientX - dx;
        this.position.y = touch.clientY - dy;
        // 限制滑块超出页面
        // console.log('屏幕大小', screenWidth, screenHeight )
        if (this.position.x < 0) {
          this.position.x = 0
        } else if (this.position.x > screenWidth - touch.target.clientWidth) {
          this.position.x = screenWidth - touch.target.clientWidth
        }
        if (this.position.y < 0) {
          this.position.y = 0
        } else if (this.position.y > screenHeight - touch.target.clientHeight) {
          this.position.y = screenHeight - touch.target.clientHeight
        }
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove", function () {
          event.preventDefault();
        }, false);
      }
    },
    //鼠标释放时候的函数
    end() {
      console.log('end')
      this.flags = false;
    },
  }
};


</script>

<style lang="scss">
#itemPanel {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  width: 145px;
  background: rgb(242, 244, 248);
  padding-top: 65px;
  transition: transform .3s ease-in-out;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .1);

  &.hidden {
    transform: translate(-100%, 0);
  }

  .floatball {
    color: white;
    height: 50px;
    width: 50px;
    padding: 5px;
    z-index: 990;
    position: fixed;
    cursor: move;
    top: 60px;
    right: 320px;
    border-radius: 50%;
    background-color: rgba(29, 157, 237, 0.8);
  }

  .icon-h-drag {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 18px;
    background: rgb(223, 227, 238);
    text-align: center;
    cursor: move;

    &:hover {
      background: #f1f1f1;
    }
  }

  .gb-toggle-btn {
    width: 10px;
    height: 20px;
    top: 50%;
    left: 100%;
    border-radius: 0 10px 10px 0;
    box-shadow: 2px 0 2px 0 rgba(0, 0, 0, .1);
    transform: translate(0, -50%);
  }

  .split {
    height: 1px;
    display: block;
    background: #e0e0e0;
    margin: 5px 0;
  }

  .space {
    // height    : 1px;
    display: block;
    background: #e0e0e0;
    margin: 5px 0;
  }

  .icon-tool {
    padding: 10px;
    text-align: center;
    // width: 120px;
    .iconfont {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 30px;
      cursor: move;
      border: 1px solid transparent;
      margin: 0 auto;
      position: relative;

      &:hover {
        border-color: #ccc;
      }
    }

    .node {
      display: block;
      margin-bottom: 10px;
      cursor: move;
      width: 40px;
      left: -30px;
      // padding-top: 50%;
    }

    .circle {
      height: 80px;
      line-height: 80px;
      border-radius: 50%;
      border: 1px solid #ccc;
      background: #eef5fe;

    }

    .warning {
      height: 40px;
      line-height: 40px;
      border-left: 4px solid #E6A23C;
      background: #f8ecda;
    }

    .end {
      height: 40px;
      line-height: 40px;
      border-radius: 10px;
      background: #f9e3e2;
    }
  }

  .btn-list-group {
    position: relative;
    // position: right;
    text-align: center;
  }

  .btn-list-area {
    display: none;
    position: relative;
    // position: right;
    left: 0;
    right: 50%;
    text-align: center;
  }

  .btn-list-group:hover .btn-list-area {
    display: block;
    position: relative;
    text-align: center;
  }

  .btn {
    display: inline-block;
    padding: .4em .7em;
    font-size: 14px;
    font-weight: 400;
    color: #6c757d;
    text-align: center;
    line-height: 1.5;
    background-color: #fff;
    border: 1px solid #e9ecef;
    cursor: pointer;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .tit {
    display: inline-block;
    position: absolute;
    left: 90px;
    top: 10px;
    font-size: 1px;
  }

  button {
    width: 80px;
    line-height: 24px;
    display: inline-block;
    padding: 5px 10px;
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

}
</style>
