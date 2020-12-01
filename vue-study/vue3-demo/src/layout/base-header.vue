<template>
  <a-layout-header class="base-header">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="setCollapse(false)"
    />
    <menu-fold-outlined v-else class="trigger" @click="setCollapse(true)"/>
  </a-layout-header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

export default {
  name: 'BaseHeader',
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  setup () {
    const store = useStore();
    const collapsed = computed(() => store.state.collapsed);
    const setCollapse = (status) => {
      store.commit('setCollapse', status);
    };
    return {
      collapsed,
      setCollapse
    };
  }
};
</script>

<style lang="less" scoped>
.base-header {
  background-color: #fff;
  padding: 0;
  .trigger {
    padding-left: 14px;
  }
}
</style>
