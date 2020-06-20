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
        const { prop } = this;
        // 当传入的内容formItem中没有prop，
        // 如<el-form-item><button>提交</button></el-form-item>，
        // 或表单不需要校验时不传入prop
        if (!prop) return;
        this.errorMessage = '';
        const { rules, model } = this.form;
        const validator = new schema({ [prop]: rules[prop] });
        return validator.validate({ [prop]: model[prop] }).catch(({ error, fields }) => {
          this.errorMessage = fields[prop][0].message;
          return Promise.reject(fields);
        });
      }
    }
  };
</script>

<style scoped>
  .el-form-item {

  }
</style>
