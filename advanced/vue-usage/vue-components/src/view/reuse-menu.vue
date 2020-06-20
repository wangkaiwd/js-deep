<template>
  <el-submenu
    v-if="data.children"
    :title="data.title"
    :key="data.key"
  >
    <reuse-menu
      v-for="child in data.children"
      :data="child"
      :key="child.key"
    >
    </reuse-menu>
  </el-submenu>
  <el-menu-item v-else :key="data.key">{{data.title}}</el-menu-item>
</template>

<script>
  import ElMenu from '@/components/el-menu/el-menu';
  import ElMenuItem from '@/components/el-menu/el-menu-item';
  import ElSubmenu from '@/components/el-menu/el-submenu';

  export default {
    // https://vuejs.org/v2/api/#name
    // 1. Allow the component to recursively invoke itself in its template
    // 2. Easier to debugging
    // 3. Identify every component by vm.$options.name
    name: 'ReuseMenu',
    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      ElMenu,
      ElMenuItem,
      ElSubmenu
    },
    data () {
      return {};
    },
  };
</script>

<style scoped>
  .reuse-menu {

  }
</style>
