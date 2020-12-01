<template>
  <a-layout-header class="base-header">
  </a-layout-header>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  name: 'BaseHeader',
  setup () {
    const state = reactive({
      collapsed: false
    });
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style lang="less" scoped>
.base-header {
  background-color: #fff;
  padding: 0;
}
</style>
