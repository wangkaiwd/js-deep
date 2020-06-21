<template>
  <div class="render-jsx">
    <level level="1">
      1
    </level>
    <level level="2">
      2
    </level>
  </div>
</template>

<script>
  import Level from '@/components/level/level';

  export default {
    name: 'RenderJsx',
    components: { Level },
    data () {
      return {};
    },
  };
</script>

<style scoped>
  .render-jsx {

  }
</style>
