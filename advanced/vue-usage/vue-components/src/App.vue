<template>
  <div id="app">
    <my-tree></my-tree>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {};
  },
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
