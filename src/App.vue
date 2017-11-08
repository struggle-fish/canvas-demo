<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>

<style lang="scss">
@import './assets/scss/core/setting.scss';
@import './assets/scss/core/reset.scss';
@import './assets/scss/core/common.scss';
</style>
