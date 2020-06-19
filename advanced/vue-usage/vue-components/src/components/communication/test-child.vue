<template>
  <div class="test-child">
    <test-grandson @change="$emit('change', $event)" :money="money"></test-grandson>
    {{money}}
    <button @click="$emit('change',money+10)">update money</button>
    <button @click="resetMoney">reset money</button>
  </div>
</template>

<script>
  import TestGrandson from '@/components/communication/test-grandson';

  export default {
    name: 'TestChild',
    props: ['money', 'resetMoney'],
    data () {
      return {};
    },
    components: {
      TestGrandson
    },
    mounted () {
    }
  };
</script>

<style scoped>
  .test-child {

  }
</style>
