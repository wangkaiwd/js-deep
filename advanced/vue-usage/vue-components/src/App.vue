<template>
  <div id="app">
    <my-tree :data="data"></my-tree>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      data: [
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
              ],
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
              ],
            },
            {
              title: '0-0-2',
              key: '0-0-2',
            },
          ],
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
          ],
        },
        {
          title: '0-2',
          key: '0-2',
        },
      ],
    };
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
