<template>
  <div id="app">
    <!--    <communicate></communicate>-->
    <!--    <my-form></my-form>-->
    <my-menu></my-menu>
    <!--    <render-jsx></render-jsx>-->
  </div>
</template>

<script>
  import communicate from '@/view/communicate';
  import MyMenu from '@/view/my-menu';
  import MyForm from '@/view/my-form';
  import RenderJsx from '@/view/render-jsx';

  export default {
    name: 'App',
    components: {
      communicate,
      MyMenu,
      MyForm,
      RenderJsx
    },
  };
</script>

<style lang="scss">
  #app {
  }
</style>
