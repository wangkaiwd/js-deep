<template>
  <div class="my-form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ElForm from '@/components/el-form/el-form';
  import ElFormItem from '@/components/el-form/el-form-item';
  import ElInput from '@/components/el-form/el-input';

  export default {
    name: 'MyForm',
    components: { ElForm, ElFormItem, ElInput },
    data () {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名' },
            { min: 4, message: '最少输入4个字' }
          ],
          password: [{ required: true, message: '请输入密码' },]
        }
      };
    },
    methods: {
      submitForm () {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }

  };
</script>
