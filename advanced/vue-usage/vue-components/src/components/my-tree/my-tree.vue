<template>
  <div class="my-tree">
    <!--  这里使用render函数来进行递归会简单很多
         限制条件：由于Vue中template只能有一个根组件，所以递归的时候要让tree-node组件接收一个对象，而不是数组
      -->
    <tree-node
      :child="child"
      :key="child.key"
      v-for="child in copyData"
      :load="load"
      @expand="onExpand"
      @check="onCheck"
    >
    </tree-node>
  </div>
</template>

<script>
// 类比Menu组件：SubMenu不能选中，只是具有展开和闭合功能
// 为什么要设计SubMenu组件？SubMenu组件会有一些自己单独的事件和操作

// 树组件只需要渲染子节点即可，每个子节点都相同
import TreeNode from '@/components/my-tree/tree-node';
import { flatTree } from '@/components/my-tree/flatTree';

const simpleDeepClone = (data) => JSON.parse(JSON.stringify(data));
export default {
  name: 'MyTree',
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    }
  },
  watch: {
    // data: {
    //   handler (val) {
    //     this.copyData = simpleDeepClone(val);
    //     this.treeMap = flatTree(this.copyData);
    //   },
    //   deep: true
    // }
  },
  data () {
    return {
      copyData: simpleDeepClone(this.data),
      treeMap: {},
    };
  },
  mounted () {
    // flatTree的几种实现方式
    this.treeMap = flatTree(this.copyData);
  },
  methods: {
    onExpand (item) {
      const { key, expanded } = item;
      this.$set(item, 'expanded', !expanded);
      if (this.load) { // 异步加载
        this.$set(item, 'pending', true);
        this.load(item, (children) => { // 数据加载完毕后展开
          this.$set(item, 'pending', false);
        });
      }
    },
    onCheck (item) {
      const { key, checked } = item;
      this.$set(item, 'checked', !checked);
      this.updateTreeDown(item, !checked);
      this.updateTreeUp(item);
    },
    // 更新所有的子节点
    updateTreeDown (item, checked) {
      const children = item.children || [];
      children.forEach(child => {
        this.$set(child, 'checked', checked);
        if (child.children) {
          this.updateTreeDown(child, checked);
        }
      });
    },
    // 更新所有的父节点
    updateTreeUp (item) {
      const { key } = item;
      const parent = this.treeMap[key].parent;
      if (parent) {
        // 父节点的所有子节点的孩子节点都选中时才会选中
        const _checked = parent.children.every(child => child.checked);
        this.$set(parent, 'checked', _checked);
        // 继续更新父级
        this.updateTreeUp(parent, _checked);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.my-tree {

}
</style>
