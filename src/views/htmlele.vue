<template lang="html">
  <div class="coordinate">
    <div id='readout'></div>
    <canvas id="canvas" width="500" height="250">
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
    that.canvas = document.querySelector('#canvas');
    that.ctx = that.canvas.getContext('2d'); // 开启绘画环境
  },
  methods: {

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
</style>
