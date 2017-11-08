<template lang="html">
  <div class="clock">
    <canvas id="canvas" width="300" height="300">
      您的浏览器居然不支持Canvas ^_^
    </canvas>
  </div>
</template>
<script>
export default {
  data () {
    return {
      canvas: '',
      context: ''
    };
  },
  mounted () {
    let that = this;
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    this.context = context;
    this.canvas = canvas;
    setInterval(function () {
      that.drawClock(
        {
          ox: 150,
          oy: 150,
          or: 100,
          hr: 50,
          mr: 70,
          sr: 90,
          oc: 'pink',
          hc: 'black',
          mc: 'red',
          sc: 'green'
        });
    }, 1000);
  },
  methods: {
    // 画表
    drawClock ({ox, oy, or, hr, mr, sr, oc, hc, mc, sc}) {
      // [ox]圆心X坐标
      // [oy]圆心Y坐标
      // [or]钟表半径
      // [hr]时针半径
      // [mr]分针半径
      // [sr]秒针半径
      // [oc]钟表外环颜色
      // [hc]时针颜色
      // [mc]分针颜色
      // [sc]秒针颜色
      let that = this;
      // 清除画布
      that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
      that.drawCircle({ox, oy, or});
      that.drawNumerals({ox, oy, or});
      that.drawTimeScale({ox, oy, or});
      that.hourMinSecond({ox, oy, or, hr, mr, sr, hc, mc, sc});
    },
    // 计算圆上的坐标点
    coordinateXY ({a, i, ox, oy, or}) {
      // a 角度 i 刻度 ox x坐标  oy y坐标 or 半径
      let hudu = (2 * Math.PI / 360) * a * i;
      let x = ox + Math.sin(hudu) * or;
      let y = oy - Math.cos(hudu) * or;
      return `${x}_${y}`;
    },
    // 画圆
    drawCircle ({ox, oy, or}) {
      let that = this;
      // 开始一条路径，或重置当前的路径
      that.context.beginPath();
      // 创建一个圆 对应参数 x坐标 y坐标 半径 起始 结束 顺逆时针
      that.context.arc(ox, oy, or, 0, Math.PI * 2, true);
      // 线宽
      that.context.lineWidth = 10;
      // 轮廓线样式
      that.context.strokeStyle = '#f60';
      // 绘制已定义的路径
      that.context.stroke();
    },
    // 绘制数字
    drawNumerals ({ox, oy, or}) {
      let that = this;
      that.context.beginPath();
      that.context.strokeStyle = 'black';
      that.context.lineWidth = 5;
      for (let i = 0; i < 12; i++) {
        let txtXY = that.coordinateXY({
          a: 30,
          i: i + 1,
          ox: ox,
          oy: oy,
          or: or - 20
        });
        that.context.font = '15px  KaiTi';
        that.context.lineWidth = 2;
        that.context.strokeText(i + 1, txtXY.split('_')[0], txtXY.split('_')[1]);
        // 水平居中
        that.context.textAlign = 'center';
        // 垂直居中
        that.context.textBaseline = 'middle';
      }
    },
    // 绘制刻度
    drawTimeScale ({ox, oy, or}) {
      let that = this;
      for (let i = 0; i < 60; i++) {
        let oXY = that.coordinateXY({
          a: 6,
          i: i + 1,
          ox: ox,
          oy: oy,
          or: or
        });
        that.context.beginPath();
        that.context.arc(oXY.split('_')[0], oXY.split('_')[1], (i + 1) % 5 === 0 ? 2 : 1, 0, 2 * Math.PI);
        // 填充样式
        that.context.fillStyle = 'blue';
        // 填充当前绘图（路径
        that.context.fill();
        // 创建从当前点回到起始点的路径
        that.context.closePath();
      }
    },
    // 时分秒
    hourMinSecond ({ox, oy, or, hr, mr, sr, hc, mc, sc}) {
      let that = this;
      // 获取当前时间
      let NowTime = new Date();
      let h = NowTime.getHours();
      let m = NowTime.getMinutes();
      let s = NowTime.getSeconds();
      // let y = NowTime.getFullYear()
      // let mo = NowTime.getMonth() + 1
      // let d = NowTime.getDate()
      // that.context.fillText(mo + '月' + d + '日', ox, oy - or / 2, 50) // 显示月日
      h = h + m / 60; // 分钟影响时针偏移量
      let hoursXY = that.coordinateXY({
        a: 30,
        i: h > 12 ? h - 12 : h,
        ox: ox,
        oy: oy,
        or: hr
      });
      that.drasLine({
        ob: that.context,
        color: hc,
        ox: ox,
        oy: oy,
        px: hoursXY.split('_')[0],
        py: hoursXY.split('_')[1]
      });
      m = m + s / 60;
      let minuteXY = that.coordinateXY({
        a: 6,
        i: m,
        ox: ox,
        oy: oy,
        or: mr
      });
      that.drasLine({
        ob: that.context,
        color: mc,
        ox: ox,
        oy: oy,
        px: minuteXY.split('_')[0],
        py: minuteXY.split('_')[1]
      });
      let secondXY = that.coordinateXY({
        a: 6,
        i: s,
        ox: ox,
        oy: oy,
        or: sr
      });
      that.drasLine({
        ob: that.context,
        color: sc,
        ox: ox,
        oy: oy,
        px: secondXY.split('_')[0],
        py: secondXY.split('_')[1]
      });
    },
    // 画直线
    drasLine ({ob, color, ox, oy, px, py}) {
      // [ob]绘画对象
      // [ox]圆心X坐标
      // [oy]圆心Y坐标
      // [px]目标X坐标
      // [py]目标Y坐标
      ob.beginPath();
      ob.strokeStyle = color;
      ob.moveTo(ox, oy);
      ob.lineTo(px, py);
      ob.stroke();
      ob.closePath();
    }
  }
};
</script>
<style lang="scss" scoped>
#canvas {
}
</style>
