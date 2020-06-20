<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
  export default {
    provide () {
      return {
        form: this
      };
    },
    name: 'ElForm',
    props: {
      model: { type: Object },
      rules: { type: Object }
    },
    data () {
      return {};
    },
    methods: {
      ruleForm () {

      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
