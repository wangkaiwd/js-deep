<template>
  <div class="test-child">
    <test-grandson @drink="onDrink" @change="$emit('change', $event)" :money="money"></test-grandson>
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
      // 包含了父作用域没有被识别为props的绑定属性。可以通过v-bind="$attrs"向下传入一个内部组件
      console.log('attrs', this.$attrs);
      // 包含了父作用域中没有.native的v-on事件监听器。可以通过v-on="$listeners"向下传递到一个内部组件
      console.log('listeners', this.$listeners);
    },
    methods: {
      onDrink () {
        console.log('drink');
      }
    },
  };
</script>

<style scoped>
  .test-child {

  }
</style>
