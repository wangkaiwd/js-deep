<template>
  <div id="app">
    <my-upload></my-upload>
  </div>
</template>

<script>
import MyUpload from './components/my-upload/my-upload';

export default {
  name: 'App',
  components: { MyUpload },
};
</script>

<style lang="scss">
#app {
}
</style>
