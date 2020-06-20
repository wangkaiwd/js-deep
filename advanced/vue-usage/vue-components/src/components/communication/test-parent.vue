<template>
  <div class="test-parent">
    <test-child
      a="xxx"
      b="yyy"
      :reset-money="onResetMoney"
      @change="onChange"
      :money="money"
    >
    </test-child>
    <button @click="$broadcast('drink','TestGrandson')">触发grandson中的drink方法</button>
  </div>
</template>

<script>
  import TestChild from '@/components/communication/test-child';

  export default {
    provide () { // 当该值为一个函数时，才会获取到this。对象会立即执行this为undefined
      return {
        parent: this
      };
    },
    name: 'TestParent',
    data () {
      return {
        money: 1000
      };
    },
    components: {
      TestChild
    },
    mounted () {
      this.$bus.$emit('xxx', 'hh');
    },
    methods: {
      onChange (money) {
        this.money = money;
      },
      onResetMoney () {
        this.money = 0;
      }
    }
  };
</script>

<style scoped>
  .test-parent {

  }
</style>
