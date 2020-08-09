<template>
  <div class="my-upload">
    <input class="file-input" ref="fileInput" type="file" @change="onInputChange">
    <div class="my-upload-button" @click="onClick">
      <slot></slot>
    </div>
    <div class="upload-tip">
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyUpload',
  props: {
    name: { type: String, default: 'file' }
  },
  data () {
    return {};
  },
  methods: {
    onClick () {
      const { fileInput } = this.$refs;
      fileInput.click();
    },
    onInputChange (e) {
      console.log('e', e);
    }
  }
};
</script>

<style lang="scss" scoped>
.my-upload {
  .file-input {
    display: none;
  }
}
</style>
