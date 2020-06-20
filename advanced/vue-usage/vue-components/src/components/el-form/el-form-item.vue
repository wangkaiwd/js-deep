<template>
  <div class="el-form-item">
    <label>{{label}}</label>
    <slot></slot>
    <div>
      {{errorMessage}}
    </div>
  </div>
</template>

<script>
  import schema from 'async-validator';

  export default {
    inject: ['form'],
    name: 'ElFormItem',
    props: {
      label: {
        type: String,
      },
      prop: { type: String }
    },
    data () {
      return {
        errorMessage: ''
      };
    },
    // 父子组件的生命周期过程：
    mounted () {
      // 由于slot的原因，没法通过v-on监听子组件的$emit方法
      // form-item 一挂载好以后就开始监听子组件的form-item的validate事件
      this.$on('validate', () => {
        this.validate();
      });
    },
    methods: {
      validate () {
        this.errorMessage = '';
        const { rules, model } = this.form;
        const { prop } = this;
        const validator = new schema({ [prop]: rules[prop] });
        validator.validate({ [prop]: model[prop] }, (error, fields) => {
          if (error) {
            this.errorMessage = error[0].message;
          }
        });
      }
    }
  };
</script>

<style scoped>
  .el-form-item {

  }
</style>
