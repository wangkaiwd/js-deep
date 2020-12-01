<template>
  <a-layout id="layout">
    <base-sider></base-sider>
    <base-content></base-content>
  </a-layout>
</template>
<script>
import BaseSider from '@/layout/base-sider';
import BaseContent from '@/layout/base-content';

export default {
  components: { BaseContent, BaseSider },
  setup () {
  },
  data () {
    return {};
  },
};
</script>
<style>
#app {
  height: 100vh;
}
</style>
<style scoped lang="less">
#layout {
  height: 100%;
}
</style>
