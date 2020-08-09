<template>
  <div id="app">
    <my-upload
      action="localhost:3000/upload"
      multiple
    >
      <template v-slot:default>
        <button>click to upload</button>
      </template>
      <template v-slot:tip>
        jpg/png files with a size less than 500kb
      </template>
    </my-upload>
  </div>
</template>

<script>
import MyUpload from './components/my-upload/my-upload';

export default {
  name: 'App',
  components: { MyUpload },
  data () {
    return {
      fileList: [
        { url: 'temp1', name: 'test1' },
        { url: 'temp2', name: 'test2' },
      ]
    };
  }
};
</script>

<style lang="scss">
#app {
}
</style>
