<template>
  <a-layout-sider class="base-sider" :trigger="null">
    <div class="logo"/>
    <base-menu></base-menu>
  </a-layout-sider>
</template>

<script>
import { reactive, toRefs } from 'vue';
import BaseMenu from './base-menu';

export default {
  name: 'BaseSider',
  components: { BaseMenu },
  setup () {
    const state = reactive({
      selectedKeys: ['1']
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="less" scoped>
.base-sider {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
