<template>
  <div id="app">
    <my-upload>
      <button>click to upload</button>
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
