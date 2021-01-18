<template>
  <div class="my-tree">
    <!--  这里使用render函数来进行递归会简单很多
         限制条件：由于Vue中template只能有一个根组件，所以递归的时候要让tree-node组件接收一个对象，而不是数组
      -->
    <tree-node
      :child="child"
      :key="child.key"
      v-for="child in data"
    >
    </tree-node>
  </div>
</template>

<script>
// 类比Menu组件：SubMenu不能选中，只是具有展开和闭合功能
// 为什么要设计SubMenu组件？SubMenu组件会有一些自己单独的事件和操作

// 树组件只需要渲染子节点即可，每个子节点都相同
import TreeNode from '@/components/my-tree/tree-node';

export default {
  name: 'MyTree',
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {};
  },
  mounted () {
    console.log(this.data);
  }
};
</script>

<style lang="scss" scoped>
.my-tree {

}
</style>
