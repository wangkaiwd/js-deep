<template>
  <div class="tree-node">
    <div class="node-content">
      <div :class="['arrow',{show:child.children}]" @click="onExpand(child)"> ></div>
      <input type="checkbox"/>
      <div class="title">{{ child.title }}</div>
    </div>
    <div
      class="children"
      v-if="child.children && child.expanded"
      style="border:1px solid red;"
    >
      <tree-node
        :key="subChild.key"
        :child="subChild"
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
    }
  },
  data () {
    return {};
  },
  methods: {
    onExpand (item) {
      this.$emit('expand', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-node {
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
