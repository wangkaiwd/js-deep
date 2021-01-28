<template>
  <div
    class="tree-node"
    @dragstart="onDragstart"
    @dragover="onDragover"
    @dragend="onDragend"
  >
    <div class="node-content">
      <div :class="['arrow',{show:child.children}]" @click="onExpand(child)">
        {{ this.pending ? 'loading...' : '>' }}
      </div>
      <input type="checkbox" :checked="selected" @click.stop="onCheck(child)"/>
      <div class="title">{{ child.title }}</div>
    </div>
    <!--  animation: https://stackoverflow.com/a/55137929/12819402  -->
    <!-- 动画：JavaScript combine with CSS    -->
    <transition
      enter-active-class="enter-active"
      leave-active-class="leave-active"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
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
          :requests="requests"
          @expand="onExpand"
          @check="onCheck"
          @dragstart="onChildDragstart"
          @dragover="onChildDragover"
          @dragend="onChildDragend"
        >
        </tree-node>
      </div>
    </transition>
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
    requests: {
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
    },
    pending () {
      return this.requests[this.child.key];
    }
  },
  methods: {
    beforeEnter (element) { // 进入先将高度设置为0
      element.style.height = '0px';
    },
    enter (element) { // 结合css过渡不用使用done属性
      element.style.height = `${element.scrollHeight}px`;
    },
    afterEnter (element) {
      // 动画完成之后，还要将height恢复为auto，这要在之后高度变化后还会自动撑开
      // 设置为空相当与从style上移除该属性
      // Setting styles: https://developer.mozilla.org/en-US/docs/Web/API/ElementCSSInlineStyle/style#setting_styles
      element.style.height = '';
    },
    beforeLeave (element) {
      element.style.height = `${element.offsetHeight}px`;
    },
    leave (element) {
      // force repaint
      element.offsetHeight;
      // otherwise transition not work
      element.style.height = '0px';
    },
    afterLeave (element) {
      element.style.height = '';
    },
    onExpand (item) {
      this.$emit('expand', item);
    },
    onCheck (item) {
      this.$emit('check', item);
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
    overflow: hidden;
  }
  .enter-active, .leave-active {
    transition: height 0.2s linear;
  }
}

</style>
