<template>
  <div id="app">
    <date-picker v-model="date"></date-picker>
    <my-upload
      style="margin-top: 20px;"
      :file-list="fileList"
      action="http://localhost:3000/upload"
    >
      <button>click to upload</button>
    </my-upload>
  </div>
</template>

<script>
import DatePicker from './components/date-picker/date-picker';
import DateRangePicker from './components/date-picker/date-range-picker';
import MyUpload from './components/my-upload/my-upload';

export default {
  name: 'App',
  components: { DatePicker, DateRangePicker, MyUpload },
  data () {
    return {
      fileList: [
        { url: 'temp1', name: 'test1' },
        { url: 'temp2', name: 'test2' },
      ],
      date: new Date()
    };
  },
  methods: {
    onExceed (files) {
      console.log('files', files);
      console.log('exceed max number of uploaded files');
    },
    onBeforeUpload (file, fileList) {
      // if (file.size / 1024 > 500) {
      //   alert('上传的文件超过了500kb！');
      //   return;
      // }
      return true;
    },
    onError (err) {
      console.log('err', err);
    }
  }
};
</script>

<style lang="scss">
#app {
  margin: 100px;
}
</style>
