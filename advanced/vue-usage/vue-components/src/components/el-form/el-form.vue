<template>
  <form @submit.prevent>
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
      validate (cb) {
        const children = this.$children;
        const formItems = [];

        function findFormItems (children) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.$options.name === 'ElFormItem') {
              formItems.push(child);
            }
            if (Array.isArray(child.$children)) {
              findFormItems(child.$children);
            }
          }
        }

        findFormItems(children);
        return Promise.all(formItems.map(item => item.validate()))
          .then(() => cb(true), () => cb(false));
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
