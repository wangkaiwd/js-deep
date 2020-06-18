<template>
  <div id="app">
    <el-form></el-form>
    <el-menu></el-menu>
  </div>
</template>

<script>
  import ElForm from 'components/el-form/el-form';
  import ElMenu from 'components/el-menu/el-menu';

  export default {
    name: 'App',
    components: { ElForm, ElMenu }
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
