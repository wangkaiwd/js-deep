<template>
  <div id="app">
    <my-tree :data="data" :load="onLoad"></my-tree>
  </div>
</template>

<script>
const children = [
  { title: '0-1-0-0', key: '0-1-0-0' },
  { title: '0-1-0-1', key: '0-1-0-1' },
  { title: '0-1-0-2', key: '0-1-0-2' },
];
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
          children: []
        },
        {
          title: '0-2',
          key: '0-2',
        },
      ]
    };
  },
  methods: {
    onLoad (data, cb) { // data要加载children的数据，也就是当前点击的内容
      // 获取点击节点的数据
      // 根据点击节点数组中的id发起ajax请求，获取到它的children
      // 将children赋值给data
      // 加载完数据后，执行回调cb()
      // todo: 这里不应该直接更改data中的数据
      if (data.children?.length === 0) {
        setTimeout(() => {
          // 这里不能直接修改
          data.children = children;
          cb();
        }, 1000);
      } else { // 不用异步加载
        cb();
      }
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
