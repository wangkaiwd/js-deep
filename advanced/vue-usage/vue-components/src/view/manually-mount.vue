<template>
  <div class="manually-mount">
    <button @click="onClick">show</button>
  </div>
</template>

<script>
  import { Message } from '@/components/message';

  export default {
    name: 'ManuallyMount',
    data () {
      return {};
    },
    methods: {
      onClick () {
        Message({
          type: 'success',
          message: 'hello',
          duration: 1000
        });
      }
    }
  };
</script>

<style scoped>
  .manually-mount {

  }
</style>
