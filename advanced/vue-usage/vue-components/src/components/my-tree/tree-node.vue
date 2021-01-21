<template>
  <div
    class="tree-node"
    @dragstart="onDragstart"
    @dragover="onDragover"
    @dragend="onDragend"
    ref="node"
  >
    <div class="node-content">
      <div :class="['arrow',{show:child.children}]" @click="onExpand(child)">
        {{ child.pending ? 'loading...' : '>' }}
      </div>
      <input type="checkbox" :checked="child.checked" @click.stop="onCheck(child)"/>
      <div class="title">{{ child.title }}</div>
    </div>
    <div
      class="children"
      v-if="child.children && child.expanded"
    >
      <tree-node
        :key="subChild.key"
        :child="subChild"
        @expand="onExpand"
        @check="onCheck"
        v-for="subChild in child.children"
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
  },
  data () {
    return {
      node: null
    };
  },
  methods: {
    onExpand (item) {
      this.$emit('expand', item);
    },
    onCheck (item) {
      this.$emit('check', item);
    },
    onDragstart (e) {
      e.stopPropagation();
      this.node = this.$refs.node;
    },
    onDragover (e) {
      if (this.node) {
        if (this.node.contains(e.target)) {return;}
      }
      e.stopPropagation();
      console.log('over');
    },
    onDragend (e) {
      e.stopPropagation();
      this.node = null;
    }
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
