<template>
  <a-layout class="page-content">
    <base-header></base-header>
    <a-layout-content class="page-route-item">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { reactive, toRefs } from 'vue';
import BaseHeader from '@/layout/base-header';

export default {
  name: 'BaseContent',
  components: { BaseHeader },
  setup () {
    const state = reactive({});
    return {
      ...toRefs(state)
    };
  },
};
</script>

<style lang="less" scoped>
.base-content {
  .page-route-item {
    margin: 24px 16px;
    padding: 24px;
    background-color: #fff;
    min-height: 280px;
  }
}
</style>
