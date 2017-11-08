<template>
  <div class="index">
    <canvas id="canvas">
      您的浏览器居然不支持Canvas ^_^
    </canvas>
  </div>
</template>
<script>
export default {
  mounted () {
    let str = 'http://t.yczj.m.autohome.com.cn';
    console.log(str.startsWith('http://t.yczj.'));
    let canvas = document.getElementById('canvas');
    // 获取绘图环境 d 必须小写
    let context = canvas.getContext('2d');
    // 设置字体属性
    context.font = '60px Arial';
    // 文本样式
    context.fillStyle = 'red';
    // 字符轮廓线样式
    context.strokeStyle = 'blue';
    // 填充文本;
    context.fillText('Hello world', canvas.width / 2 - 150,
                                     canvas.height / 2 + 15);
    // 描绘字符轮廓线
    context.strokeText('Hello world', canvas.width / 2 - 150,
                                       canvas.height / 2 + 15);
  }
};
</script>
<style  lang="sass" scoped>
  @import '../assets/scss/index';
</style>
