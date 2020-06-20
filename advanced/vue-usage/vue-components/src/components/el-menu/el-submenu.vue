<template>
  <li class="el-submenu">
    <span>{{title}}</span>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'ElSubmenu',
    props: {
      title: {
        type: String,
      }
    },
    data () {
      return {};
    },
  };
</script>

<style scoped>
  .el-submenu {

  }
</style>
