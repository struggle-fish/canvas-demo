<template lang="html">
  <div class="wrap">
    <div id='controls' @click="resetCanvas()">
      <input type='button' id='resetButton' value='Reset'/>
    </div>
    <div id='rubberbandDiv' v-show="showRubberbandDiv"></div>
    <canvas id='canvas' width='800' height='520' @mousedown.stop.prevent="canvasMouseDown($event)">
      Canvas not supported
    </canvas>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        canvas: '', // canvas
        ctx: '', // 绘画环境
        mousedown: {}, // 按下鼠标存储数据
        rubberbandRectangle: {}, // 绘制橡皮筋数据
        showRubberbandDiv: false, // 是否显示 橡皮筋div
        dragging: false, // 是否在拖拽
        img: '' // 图片
      };
    },
    mounted () {
      let that = this;
      that.canvas = document.querySelector('#canvas');
      that.ctx = that.canvas.getContext('2d'); // 开启绘画环境
      // 引入图片
      let image = new Image();
      that.img = image;
      image.src = require('../assets/images/arch.png');
      image.onload = function () {
        that.ctx.drawImage(image, 0, 0, that.canvas.width, that.canvas.height);
      };
      // 移动过程中绘制橡皮筋
      window.onmousemove = function (event) {
        let x = event.x || event.clientX;
        let y = event.y || event.clientY;
        event.preventDefault();
        if (that.dragging) {
          that.rubberbandStretch(x, y);
        }
      };
      // 抬起鼠标
      window.onmouseup = function (event) {
        event.preventDefault();
        that.rubberbandEnd();
      };
    },
    methods: {
      canvasMouseDown (event) {
        let that = this;
        // 获取事件对象
        let x = event.x || event.clientX;
        let y = event.y || event.clientY;
        that.rubberbandStart(x, y);
        // console.log(event);
      },
      // 橡皮筋
      rubberbandStart (x, y) {
        let that = this;
        // 存储当前坐标
        that.mousedown.x = x;
        that.mousedown.y = y;
        // 存储橡皮筋数据
        that.rubberbandRectangle.left = that.mousedown.x;
        that.rubberbandRectangle.top = that.mousedown.y;
        // 移动橡皮筋div
        that.moveRubberbandDiv();
        // 显示橡皮筋div
        that.showRubberbandDiv = true;
        that.dragging = true;
      },
      // 橡皮筋坐标,宽高
      moveRubberbandDiv () {
        let that = this;
        let rubberbandDiv = document.querySelector('#rubberbandDiv');
        rubberbandDiv.style.top = that.rubberbandRectangle.top + 'px';
        rubberbandDiv.style.left = that.rubberbandRectangle.left + 'px';
        rubberbandDiv.style.width = that.rubberbandRectangle.width + 'px';
        rubberbandDiv.style.height = that.rubberbandRectangle.height + 'px';
      },
      // 拉伸橡皮筋
      rubberbandStretch (x, y) {
        let that = this;
        // 橡皮筋初始位置
        that.rubberbandRectangle.left = x < that.mousedown.x ? x : that.mousedown.x;
        that.rubberbandRectangle.top = y < that.mousedown.y ? y : that.mousedown.y;
        // 橡皮筋宽高
        that.rubberbandRectangle.width = Math.abs(x - that.mousedown.x);
        that.rubberbandRectangle.height = Math.abs(y - that.mousedown.y);
        that.moveRubberbandDiv();
      },
      // 橡皮筋结束
      rubberbandEnd () {
        let that = this;
        let bbox = that.canvas.getBoundingClientRect(); // 清除画布
        // 裁剪
        // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        // img 规定要使用的图像、画布或视频。
        // sx  可选。开始剪切的 x 坐标位置。
        // sy  可选。开始剪切的 y 坐标位置。
        // swidth  可选。被剪切图像的宽度。
        // sheight 可选。被剪切图像的高度。
        // x 在画布上放置图像的 x 坐标位置。
        // y 在画布上放置图像的 y 坐标位置。
        // width 可选。要使用的图像的宽度。（伸展或缩小图像）
        // height  可选。要使用的图像的高度。（伸展或缩小图像）
        try {
          that.ctx.drawImage(
            that.canvas,
            that.rubberbandRectangle.left - bbox.left,
            that.rubberbandRectangle.top - bbox.top,
            that.rubberbandRectangle.width,
            that.rubberbandRectangle.height,
            0,
            0,
            that.canvas.width,
            that.canvas.height
          );
        } catch (e) {
          console.log('line 117', e);
        }

        // 恢复初始化数据
        let rubberbandDiv = document.querySelector('#rubberbandDiv');
        that.resetRubberbandRectangle();
        rubberbandDiv.style.width = 0;
        rubberbandDiv.style.height = 0;
        that.showRubberbandDiv = false;
        that.dragging = false;
      },
      // 重置橡皮筋数据
      resetRubberbandRectangle () {
        let that = this;
        that.rubberbandRectangle = {
          top: 0,
          left: 0,
          width: 0,
          height: 0
        };
      },
      // 点击 reset 按钮
      resetCanvas () {
        let that = this;
        that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
        that.ctx.drawImage(that.img, 0, 0, that.ctx.canvas.width, that.ctx.canvas.height);
      }
    }
  };
</script>
<style lang="scss" scoped>
  #canvas {
    margin-left: 20px;
    margin-right: 0;
    margin-bottom: 20px;
    border: thin solid #aaaaaa;
    cursor: crosshair;
    padding: 0;
  }

  #controls {
    margin: 20px 0px 20px 20px;
  }

  #rubberbandDiv {
    position: absolute;
    border: 3px solid yellow;
    cursor: crosshair;
  }
</style>
