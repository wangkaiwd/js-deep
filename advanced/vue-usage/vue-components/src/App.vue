<template>
  <div id="app">
    <!--    <communicate></communicate>-->
    <!--    <my-form></my-form>-->
    <my-menu></my-menu>
  </div>
</template>

<script>
  import communicate from '@/view/communicate';
  import MyMenu from '@/view/my-menu';
  import MyForm from '@/view/my-form';

  export default {
    name: 'App',
    components: {
      communicate,
      MyMenu,
      MyForm
    },
  };
</script>

<style lang="scss">
  #app {
  }
</style>
