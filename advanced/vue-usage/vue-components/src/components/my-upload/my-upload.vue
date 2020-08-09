<template>
  <div class="my-upload">
    <input
      class="file-input"
      ref="fileInput"
      type="file"
      @change="onInputChange"
      :name="name"
      :multiple="multiple"
    >
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
    // A string specifying a name for the input control
    name: { type: String, default: 'file' },
    action: { type: String, required: true },
    multiple: { type: Boolean, default: false }
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
      const files = e.target.files;
      // How to upload multiple files ?
      console.log('files', files);
    },
    uploadFiles () {

    }
  }
};
</script>

<style lang="scss" scoped>
.my-upload {
  .file-input {
    display: none;
  }
  .my-upload-button {
    display: inline-block;
  }
}
</style>
