<template>
  <div
    class="tree-node"
    @dragstart="onDragstart"
    @dragover="onDragover"
    @dragend="onDragend"
  >
    <div class="node-content">
      <div :class="['arrow',{show:child.children}]" @click="onExpand(child)">
        {{ child.pending ? 'loading...' : '>' }}
      </div>
      <input type="checkbox" :checked="selected" @click.stop="onCheck(child)"/>
      <div class="title">{{ child.title }}</div>
    </div>
    <div
      class="children"
      v-if="child.children && expanded"
    >
      <tree-node
        :key="subChild.key"
        v-for="subChild in child.children"
        :child="subChild"
        :expand-keys="expandKeys"
        :selected-keys="selectedKeys"
        @expand="onExpand"
        @check="onCheck"
        @dragstart="onChildDragstart"
        @dragover="onChildDragover"
        @dragend="onChildDragend"
      >
      </tree-node>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  props: {
    child: {
      type: Object,
      default: () => ({})
    },
    expandKeys: {
      type: Array,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {};
  },
  computed: {
    expanded () {
      return this.expandKeys.includes(this.child.key);
    },
    selected () {
      return this.selectedKeys.includes(this.child.key);
    }
  },
  methods: {
    onExpand (item) {
      this.$emit('expand', item);
    },
    onCheck (item) {
      // 判断所有的孩子是否都选中了
      const checkAll = item.children.every(child => this.selectedKeys.includes(child.key));
      const copySelectedKeys = [...this.selectedKeys];
      if (copySelectedKeys.includes(item.key)) {
        const index = copySelectedKeys.indexOf(item.key);
        copySelectedKeys.splice(index, 1);
      } else {
        copySelectedKeys.push(item.key);
      }
      this.$emit('check', copySelectedKeys);
    },
    onDragstart (e) {
      // 为什么要在父组件中处理事件？
      // 在拖动之后，start中定义的内容就拿不到了，我们就会到了另外的treeNode中，它的this会发生变化
      // 除非能将start时的内容保存到一个地方
      e.stopPropagation();
      this.$emit('dragstart', e, this, this.child);
    },
    onDragover (e) { // 鼠标拖动的位置
      e.stopPropagation();
      this.$emit('dragover', e, this, this.child);
    },
    onDragend (e) {
      e.stopPropagation();
      this.$emit('dragend', e, this, this.child);
    },
    // 需要将子节点的数据再传到父组件
    onChildDragstart (e, nodeVm, data) {
      this.$emit('dragstart', e, nodeVm, data);
    },
    onChildDragover (e, nodeVm, data) { // 鼠标拖动的位置
      this.$emit('dragover', e, nodeVm, data);
    },
    onChildDragend (e, nodeVm, data) {
      this.$emit('dragend', e, nodeVm, data);
    },
  }
};
</script>

<style lang="scss" scoped>
.tree-node {
  -webkit-user-drag: element;
  user-select: none;
  padding: 4px 2px;
  .node-content {
    display: flex;
    align-items: center;
    .arrow {
      padding: 0 4px;
      cursor: pointer;
      // 将元素隐藏，但是占据位置
      visibility: hidden;
      &.show {
        visibility: visible;
      }
    }
    .title {
      padding: 0 2px;
    }
  }
  .children {
    padding-left: 12px;
  }
}

</style>
