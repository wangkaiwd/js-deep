<template>
  <div id="app">
    <!--    <communicate></communicate>-->
    <!--    <my-form></my-form>-->
    <!--    <my-menu></my-menu>-->
    <!--    <render-jsx></render-jsx>-->
    <manually-mount></manually-mount>
  </div>
</template>

<script>
  import communicate from '@/view/communicate';
  import MyMenu from '@/view/my-menu';
  import MyForm from '@/view/my-form';
  import RenderJsx from '@/view/render-jsx';
  import ManuallyMount from '@/view/manually-mount';

  export default {
    name: 'App',
    components: {
      communicate,
      MyMenu,
      MyForm,
      RenderJsx,
      ManuallyMount
    },
  };
</script>

<style lang="scss">
  #app {
  }
</style>
