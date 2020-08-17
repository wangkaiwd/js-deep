<template>
  <div id="app">
    <!--    <date-picker v-model="date"></date-picker>-->
    <!--    <date-pickermy-upload-->
    <!--      style="margin-top: 20px;"-->
    <!--      :file-list="fileList"-->
    <!--      action="http://localhost:3000/upload"-->
    <!--    >-->
    <!--      <button>click to upload</button>-->
    <!--    </date-pickermy-upload>-->
    <!--    <button @click="date = new Date(2019,2,2)">change date</button>-->

    <!--  将指令的参数作为元素的自定义属性传入  -->
    <ul
      v-infinite-scroll="load"
      class="list"
      style="overflow-y: auto"
      infinite-scroll-disabled="disabled"
      infinite-scroll-delay="delay"
      infinite-scroll-distance="distance"
      infinite-scroll-immediate="immediate"
    >
      <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
    </ul>
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
      date: new Date(),
      count: 0,
      disabled: false,
      delay: 300,
      distance: 40,
      immediate: false,
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
    load () {

    },
    onError (err) {
      console.log('err', err);
    }
  }
};
</script>

<style lang="scss">
#app {
  padding: 100px;
  .list {
    width: 400px;
    height: 400px;
    border: 1px solid gray;
  }
  .list-item {
    padding: 6px 2px;
    text-align: center;
    color: red;
    background-color: pink;
  }
  .list-item + .list-item {
    margin-top: 8px;
  }
}
</style>
