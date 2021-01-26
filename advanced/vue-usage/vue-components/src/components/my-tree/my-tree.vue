<template>
  <div class="my-tree">
    <!--  这里使用render函数来进行递归会简单很多
         限制条件：由于Vue中template只能有一个根组件，所以递归的时候要让tree-node组件接收一个对象，而不是数组
      -->
    <tree-node
      :child="child"
      :expand-keys="expandKeys"
      :selected-keys="selectedKeys"
      :key="child.key"
      :requests="reqs"
      v-for="child in data"
      @expand="onExpand"
      @check="onCheck"
      @dragstart="onDragstart"
      @dragover="onDragover"
      @dragend="onDragend"
    >
    </tree-node>
    <div class="indicator" ref="indicator" v-show="indicatorVisible"></div>
  </div>
</template>

<script>
// 类比Menu组件：SubMenu不能选中，只是具有展开和闭合功能
// 为什么要设计SubMenu组件？SubMenu组件会有一些自己单独的事件和操作

// 树组件只需要渲染子节点即可，每个子节点都相同
import TreeNode from '@/components/my-tree/tree-node';
import { check, flatTree, toggle, uncheck } from '@/components/my-tree/utils';

const simpleDeepClone = (data) => JSON.parse(JSON.stringify(data));
export default {
  name: 'MyTree',
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      treeMap: {},
      expandKeys: [],
      dragNode: null,
      dragData: {},
      dragState: '',
      indicatorVisible: false,
      reqs: {}
    };
  },
  mounted () {
    this.treeMap = flatTree(this.data);
  },
  methods: {
    onExpand (item) {
      const { key } = item;
      if (this.load && !(key in this.reqs)) {
        this.$set(this.reqs, key, true);
        this.load(item, (newData) => {
          this.reqs[key] = false;
          if (!newData) {return;}
          const treeData = this.addChildren(this.data, item.key, newData);
          this.$emit('change', treeData);
          const checked = this.selectedKeys.includes(item.key);
          if (checked) {
            const copySelectedKeys = [...this.selectedKeys];
            this.updateTreeDown(newData, !checked, copySelectedKeys);
            this.$emit('check', copySelectedKeys, item);
          }
        });
      }
      if (this.expandKeys.includes(key)) {
        const index = this.expandKeys.indexOf(key);
        this.expandKeys.splice(index, 1);
      } else {
        this.expandKeys.push(key);
      }
    },
    addChildren (data, key, newChildren) {
      return data.map(child => {
        if (child.key === key) {
          return { ...child, children: newChildren };
        } else if (child.children) {
          // 处理data后生成的的一个新data
          return { ...child, children: this.addChildren(child.children, key, newChildren) };
        } else {
          return child;
        }
      });
    },
    onCheck (item) {
      const copySelectedKeys = [...this.selectedKeys];
      // current status
      const checked = copySelectedKeys.includes(item.key);
      toggle(copySelectedKeys, item.key, checked);
      this.updateTreeDown(item.children, checked, copySelectedKeys);
      this.updateTreeUp(item, checked, copySelectedKeys);
      this.$emit('check', copySelectedKeys, item);
    },
    updateTreeDown (children, checked, copySelectedKeys) {
      if (!Array.isArray(children)) {return;}
      children.forEach(child => {
        const { key } = child;
        if (checked) {
          uncheck(copySelectedKeys, key);
        } else {
          check(copySelectedKeys, key);
        }
        if (child.children) {
          this.updateTreeDown(child.children, checked, copySelectedKeys);
        }
      });
    },
    updateTreeUp (item, checked, copySelectedKeys) {
      const parent = this.treeMap[item.key].parent;
      if (parent) {
        if (checked) {
          uncheck(copySelectedKeys, parent.key);
        } else {
          const checkAll = parent.children?.every(child => copySelectedKeys.includes(child.key));
          if (checkAll) {
            check(copySelectedKeys, parent.key);
          } else {
            uncheck(copySelectedKeys, parent.key);
          }
        }
        this.updateTreeUp(parent, checked, copySelectedKeys);
      }
    },
    onDragstart (e, nodeVm, data) { // 确定拖拽元素的信息
      this.dragNode = nodeVm;
      this.dragData = data;
    },
    onDragover (e, nodeVm, data) { // 当前经过元素的信息
      const dragElm = this.dragNode.$el;
      const overElm = nodeVm.$el;
      if (dragElm.contains(overElm)) {
        return;
      }
      const overRect = overElm.getBoundingClientRect();
      const indicatorElm = this.$refs.indicator;
      const clientY = e.clientY;
      const treeRect = this.$el.getBoundingClientRect();
      const distance = clientY - overRect.top;
      if (distance < overRect.height * 0.2) {
        this.dragState = 'top';
      } else if (distance > overRect.height * 0.8) {
        this.dragState = 'bottom';
      } else {
        this.dragState = 'inner';
      }
      let indicatorTop = -9999;
      if (this.dragState === 'top') {
        this.indicatorVisible = true;
        indicatorTop = overRect.top - treeRect.top;
      } else if (this.dragState === 'bottom') {
        this.indicatorVisible = true;
        indicatorTop = overRect.bottom - treeRect.top;
      } else {
        this.indicatorVisible = false;
      }
      indicatorElm.style.top = indicatorTop + 'px';
      indicatorElm.style.left = overRect.left - treeRect.left + 'px';
    },
    onDragend (e, nodeVm, data) {
      this.dragNode = null;
      this.dragData = {};
      this.dragState = '';
      this.indicatorVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-tree {
  position: relative;
  .indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background-color: red;
  }
}
</style>
