<template>
  <div class="test-grandson">
    {{money}}
    <!--
      这样需要父组件v-on属性监听该事件，并且通过$emit('change', argument)向上emit事件
      会造成许多多余的父组件事件监听。这里我们只想要特定的父组件能够收到更改通知。
    -->
    <!--    <button @click="$emit('change',money+1)">update money</button>-->
    <!--  封装$dispatch方法，递归查找想要触发事件的父级  -->
    <button @click="$dispatch('change','TestChild',money + 1)">update money</button>
    grand-son
  </div>
</template>

<script>
  export default {
    name: 'TestGrandson',
    props: ['money'],
    data () {
      return {};
    },
  };
</script>

<style scoped>
  .test-grandson {

  }
</style>
