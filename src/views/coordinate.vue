<template lang="html">
  <div class="coordinate">
    <div id='readout'></div>
    <canvas id="canvas" width="500" height="250" v-on:mousemove="moveFn($event)">
      您的浏览器居然不支持Canvas ^_^
    </canvas>
  </div>
</template>
<script>

export default {
  data () {
    return {
      canvas: '',
      ctx: '',
      spritesheet: ''
    };
  },
  mounted () {
    let that = this;
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d'); // 开启绘画环境
    // 初始化
    this.drawBackgroundLine();
    this.spritesheet = new Image();
    this.spritesheet.src = require('../assets/images/running-sprite-sheet.png');
    this.spritesheet.onload = function () {
      that.drawSpritesheet(); // 设置背景图
    };
  },
  methods: {
    // 绘制背景横线
    drawBackgroundLine () {
      const LINE_SPACING = 12; // 距离
      let h = this.ctx.canvas.height; // 获取canvas高度
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.strokeStyle = 'lightgray';
      this.ctx.lineWidth = 1;
      // 绘制横线
      while (h > LINE_SPACING * 5) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, h); // 起始位置
        this.ctx.lineTo(this.ctx.canvas.width, h); // 结束位置
        this.ctx.stroke();
        h -= LINE_SPACING;
      }
    },
    // 设置精灵图
    drawSpritesheet () {
      this.ctx.drawImage(this.spritesheet, 0, 0);
    },
    // 鼠标移动
    moveFn (event) {
      let loc = this.windowToCanvas(this.canvas, event.clientX, event.clientY);
      this.drawBackgroundLine(); // 绘制背景
      this.drawSpritesheet(); // 绘制精灵图
      this.drawGuidelines(loc.x, loc.y); // 绘制 x y方向辅助线
      this.updateReadout(loc.x, loc.y); // 输出坐标
    },
    // x y 轴线
    drawGuidelines (x, y) {
      this.ctx.strokeStyle = 'rgba(0,0,230,0.8)';
      this.ctx.lineWidth = 0.5;
      this.drawHorizontalLine(x);
      this.drawVerticalLine(y);
    },
    // 绘制 x 方向辅助线
    drawVerticalLine (y) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y + 0.5);
      this.ctx.lineTo(this.ctx.canvas.width, y + 0.5);
      this.ctx.stroke();
    },
    // 绘制 y 方向辅助线
    drawHorizontalLine (x) {
      this.ctx.beginPath();
      this.ctx.moveTo(x + 0.5, 0);
      this.ctx.lineTo(x + 0.5, this.ctx.canvas.height);
      this.ctx.stroke();
    },
    // 输出当前坐标
    updateReadout (x, y) {
      let readout = document.querySelector('#readout');
      readout.innerHTML = `(${x.toFixed(0)}, ${y.toFixed(0)})`;
    },
    // 坐标转换
    windowToCanvas (canvas, x, y) {
      let bbox = this.canvas.getBoundingClientRect();
      // 当 canvas 元素大小和绘图表面大小不符合时，对坐标进行缩放。
      return {
        x: x - bbox.left * (this.canvas.width / bbox.width),
        y: y - bbox.top * (this.canvas.height / bbox.height)
      };
    }
  }
};
</script>
<style lang="scss">
  body {
    background: #dddddd;
  }
  * {
    margin:  0;
    padding:  0;
  }
  #canvas {
    position: absolute;
    left: 0px;
    top: 20px;
    margin: 20px;
    background: #ffffff;
    border: thin inset rgba(100,150,230,0.5);
    cursor: pointer;
  }

  #readout {
    margin-top: 10px;
    margin-left: 15px;
    color: blue;
  }
</style>
