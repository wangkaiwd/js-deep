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
    <div class="file-list">
      <div class="file-item" v-for="file in files" :key="file.uid">
        {{ file.name }}
      </div>
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
    multiple: { type: Boolean, default: false },
    limit: { type: Number },
    onExceed: { type: Function },
    fileList: { type: Array, default: () => [] },
    beforeUpload: { type: Function }
  },
  data () {
    return {
      uid: 1,
      files: []
    };
  },
  methods: {
    onClick () {
      const { fileInput } = this.$refs;
      // https://stackoverflow.com/a/12102992
      // resolve problem what
      // upload the same file with previous file not trigger onchange event
      fileInput.value = null;
      fileInput.click();
    },
    onInputChange (e) {
      const files = e.target.files;
      // How to upload multiple files ?
      // 通过循环一个一个上传
      console.log('files', files);
      this.uploadFiles(files);
    },
    uploadStart (rawFile) {
      // generate unique id:https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#:~:text=Using%20Math.&text=random%20is%20a%20JavaScript%20built,a%20unique%20combination%20of%20numbers.&text=random()%20*%20100)-,Math.,rounding%20off%20that%20number%20first.
      // rawFile.uid = Math.random() + this.uid++;
      rawFile.uid = Date.now() + this.uid++;
      const file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        uid: rawFile.uid,
        type: rawFile.type,
        percentage: 0,
        raw: rawFile
      };
      this.files.push(file);
    },
    uploadFiles (files) {
      const filesLen = files.length + this.fileList.length;
      if (this.limit && filesLen > this.limit) {
        return this.onExceed && this.onExceed(files);
      }
      // need to convert actual array because files is a pseudo array
      [...files].forEach(rawFile => {
        this.uploadStart(rawFile);
        this.upload(rawFile);
      });
    },
    upload (rawFile) {
      if (!this.beforeUpload) {} else {
        const go = this.beforeUpload(rawFile, this.files);
        if (go) {

        }
      }
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
