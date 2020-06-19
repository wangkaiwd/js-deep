<template>
  <div class="communicate">
    <test-parent></test-parent>
  </div>
</template>

<script>
  import TestParent from '@/components/communication/test-parent';

  export default {
    name: 'Communicate',
    components: {
      TestParent
    },
    data () {
      return {};
    },
  };
</script>

<style scoped>
  .communicate {

  }
</style>
