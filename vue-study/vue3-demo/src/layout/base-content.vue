<template>
  <a-layout class="base-content">
    <base-header></base-header>
    <a-spin :spinning="loading" size="large" tip="数据加载中...">
      <a-layout-content class="page-route-item">
        <router-view></router-view>
      </a-layout-content>
    </a-spin>
  </a-layout>
</template>

<script>
import { computed, reactive, toRefs } from 'vue';
import BaseHeader from '@/layout/base-header';
import { useStore } from 'vuex';

export default {
  name: 'BaseContent',
  components: { BaseHeader },
  setup () {
    const state = reactive({});
    const store = useStore();
    return {
      ...toRefs(state),
      loading: computed(() => store.state.loading)
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
    overflow: auto;
  }
}
</style>
