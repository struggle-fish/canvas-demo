<template lang="html">
  <div class="wrap">
    <!-- 玻璃窗格 -->
    <div id='glasspane' class="glasspane">
      <h2 class='title'>Bouncing Balls</h2>
      <p>One hundred balls bouncing</p>
      <a id='startButton' class="startButton" @click.stop.prevent="startFn()" v-text="btnName"></a>
    </div>
    <!-- 玻璃窗格 -->
    <canvas id="canvas" class="canvas" width="750" height="500">
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
        btnName: 'Start',
        circles: [], // 随机生成圆
        paused: true // 开关
      };
    },
    mounted () {
      let that = this;
      that.canvas = document.querySelector('#canvas');
      that.ctx = that.canvas.getContext('2d'); // 开启绘画环境
      // 随机生成圆数据
      for (let i = 0; i < 100; i++) {
        that.circles[i] = {
          x: 100, // 初始化位置x
          y: 100, // 初始化位置y
          velocityX: 3 * Math.random(), // x 轴速度
          velocityY: 3 * Math.random(), // y 轴速度
          radius: 50 * Math.random(), // 半径
          color: `rgba(${(Math.random() * 255).toFixed(0)}, ${(Math.random() * 255).toFixed(0)}, ${(Math.random() * 255).toFixed(0)}, 1.0)`
        };
      }
      // console.log(that.circles);
      // 绘制网格
      that.drawGrid({
        color: 'lightgray',
        stepx: 10,
        stepy: 10
      });
      // 绘制圆
      that.drawCircle();
    },
    methods: {
      startFn () {
        let that = this;
        that.paused = !that.paused;
        that.btnName = that.paused ? 'Start' : 'Stop';
      },
      // 画圆
      drawCircle () {
        let that = this;
        setInterval(() => {
          if (!that.paused) {
            that.ctx.clearRect(0, 0, that.ctx.canvas.width, that.ctx.canvas.height); // 在给定矩形内清空一个矩形
            // 绘制网格
            that.drawGrid({
              color: 'lightgray',
              stepx: 10,
              stepy: 10
            });
            // 绘制圆
            that.circles.forEach((circle) => {
              that.ctx.beginPath();
              that.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
              that.ctx.fillStyle = circle.color;
              that.ctx.fill();
              // 生成位置
              that.adjustPosition(circle);
            });
          }
        }, 1000 / 60);
      },
      // 生成位置
      adjustPosition (circle) {
        let that = this;
        // 撞到边界反向运动
        if (circle.x + circle.velocityX + circle.radius > that.ctx.canvas.width || circle.x + circle.velocityX - circle.radius < 0) {
          circle.velocityX = -circle.velocityX;
        }
        if (circle.y + circle.velocityY + circle.radius > that.ctx.canvas.height || circle.y + circle.velocityY - circle.radius < 0) {
          circle.velocityY = -circle.velocityY;
        }
        circle.x += circle.velocityX;
        circle.y += circle.velocityY;
      },
      // 绘制网格
      drawGrid (params = {}) {
        let that = this;
        let { color = 'red', stepx = 10, stepy = 10 } = params;
        that.ctx.strokeStyle = color;
        that.ctx.lineWidth = 0.5;
        // 绘制 竖线
        for (let i = stepx + 0.5; i < that.ctx.canvas.width; i += stepx) {
          that.ctx.beginPath();
          that.ctx.moveTo(i, 0);
          that.ctx.lineTo(i, that.ctx.canvas.height);
          that.ctx.stroke();
        }
        // 绘制 横线
        for (let i = stepy + 0.5; i < that.ctx.canvas.height; i += stepy) {
          that.ctx.beginPath();
          that.ctx.moveTo(0, i);
          that.ctx.lineTo(that.ctx.canvas.width, i);
          that.ctx.stroke();
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .canvas {
    margin-left: 10px;
    margin-right: 10px;
    background: #fff;
    border: 1px solid #aaa;
  }
  .glasspane {
    position: absolute;
    left: 50px;
    top: 50px;
    padding: 0 20px 20px 20px;
    background: rgba(0, 0, 0, 0.3);
    border: thin solid rgba(0, 0, 0, 0.6);
    color: #eee;
    font-size: 12px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 20px;
    .title {
      font-size: 24px;
      color: rgba(255, 255, 0, 0.8);
    }
    a:hover {
      color: yellow;
    }
    a {
      text-decoration: none;
      color: #ccc;
      font-size: 40px;
    }
    p {
      margin: 10px;
      color: rgba(65, 65, 220, 1.0);
      font-size: 14px;
    }
  }
</style>
