<template>
  <div id="app">
    <date-picker></date-picker>
  </div>
</template>

<script>
import DatePicker from './components/date-picker/date-picker';
import DateRangePicker from './components/date-picker/date-range-picker';

export default {
  name: 'App',
  components: { DatePicker, DateRangePicker },
  data () {
    return {
      fileList: [
        { url: 'temp1', name: 'test1' },
        { url: 'temp2', name: 'test2' },
      ]
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
