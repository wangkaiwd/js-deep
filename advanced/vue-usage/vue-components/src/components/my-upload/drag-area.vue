<template>
  <div
    :class="['drag-area',{draggable}]"
    @drop.stop.prevent="onDrop"
    @dragenter.stop.prevent="onDragEnter"
    @dragover.stop.prevent="onDragOver"
    @dragleave.stop.prevent="onDragLeave"
  >
    将文件拖到此处上传
  </div>
</template>

<script>
export default {
  name: 'DragArea',
  data () {
    return {
      draggable: false
    };
  },
  methods: {
    onDrop (e) {
      const dataTransfer = e.dataTransfer;
      const files = dataTransfer.files;
      this.$emit('on-drop', files);
      this.draggable = false;
    },
    onDragEnter (e) {
      console.log('enter', e);
      this.draggable = true;
    },
    onDragOver (e) { // 节流
    },
    onDragLeave (e) {
      console.log('leave', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.drag-area {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border: 1px dashed blue;
  &.draggable {
    background-color: pink;
  }
}
</style>
