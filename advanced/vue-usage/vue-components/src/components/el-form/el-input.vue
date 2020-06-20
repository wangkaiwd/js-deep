<template>
  <input
    :value="value"
    class="el-input"
    @input="onInput"
  >
  </input>
</template>

<script>
  // $event:行内语句处理器中的原始DOM event 对象
  export default {
    name: 'ElInput',
    props: {
      value: {
        type: String,
      }
    },
    data () {
      return {};
    },
    computed: {},
    mounted () {
    },
    methods: {
      onInput (e) {
        this.$emit('input', e.target.value);
        // 对新改的数据进行校验
        let parent = this.$parent;
        // 递归进行查找，因为el-form-item的直接子元素可能不是el-input
        while (parent) {
          const { name } = parent.$options;
          if (name === 'ElFormItem') {
            parent.$emit('validate');
            break;
          } else {
            parent = parent.$parent;
          }
        }
      }
    },
  };
</script>

<style scoped>
  .el-input {

  }
</style>
