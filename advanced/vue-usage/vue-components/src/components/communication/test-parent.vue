<template>
  <div class="test-parent">
    <test-child :reset-money="onResetMoney" @change="onChange" :money="money"></test-child>
  </div>
</template>

<script>
  import TestChild from '@/components/communication/test-child';

  export default {
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
