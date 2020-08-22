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
    <!--<div class="scroll-wrapper" style="overflow-y: auto">
      <ul
        v-infinite-scroll="load"
        class="list"
        infinite-scroll-disabled="disabled"
        infinite-scroll-delay="delay"
        infinite-scroll-distance="distance"
        infinite-scroll-immediate="immediate"
      >
        <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
      </ul>
      <p v-if="loading">Loading</p>
      <p v-if="noMore">No more</p>
    </div>-->
    <!--    <my-pagination :current="5" :total="1000"></my-pagination>-->
    <my-table @select="onSelect" :columns="columns" :data-source="dataSource"></my-table>
  </div>
</template>

<script>
import DatePicker from './components/date-picker/date-picker';
import DateRangePicker from './components/date-picker/date-range-picker';
import MyUpload from './components/my-upload/my-upload';
import MyPagination from './components/my-pagination/my-pagination';
import MyTable from './components/my-table/my-table';

export default {
  name: 'App',
  components: { DatePicker, DateRangePicker, MyUpload, MyPagination, MyTable },
  data () {
    return {
      fileList: [
        { url: 'temp1', name: 'test1' },
        { url: 'temp2', name: 'test2' },
      ],
      date: new Date(),
      count: 2,
      delay: 40,
      distance: 40,
      immediate: true,
      loading: false,
      columns: [
        { title: '姓名', key: 'name', type: 'selection' },
        { title: '年龄', key: 'age' }
      ],
      dataSource: [
        { name: 'zs', age: 11, key: 1 },
        { name: 'ls', age: 12, key: 2 },
        { name: 'ww', age: 13, key: 3 },
      ]
    };
  },
  computed: {
    noMore () {
      return this.count >= 20;
    },
    disabled () {
      return this.loading || this.noMore;
    }
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
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    onError (err) {
      console.log('err', err);
    },
    onSelect () {

    }
  }
};
</script>

<style lang="scss">
#app {
  padding: 100px;
  .scroll-wrapper {
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
