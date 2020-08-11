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
    <drag-area v-if="drag" @on-drop="uploadFiles"></drag-area>
    <div v-else class="my-upload-button" @click="onClick">
      <slot></slot>
    </div>
    <div class="upload-tip">
      <slot name="tip"></slot>
    </div>
    <div class="file-list">
      <div class="file-item" v-for="file in files" :key="file.uid">
        {{ file.name }} --- {{ file.status }}
        <template>
          <div>{{ file.percentage }}%</div>
          <my-progress :percentage="file.percentage"></my-progress>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from './ajax';
import MyProgress from '@/components/my-upload/my-progress';
import DragArea from './drag-area';

export default {
  name: 'MyUpload',
  components: { MyProgress, DragArea },
  props: {
    // A string specifying a name for the input control
    name: { type: String, default: 'file' },
    action: { type: String, required: true },
    multiple: { type: Boolean, default: false },
    limit: { type: Number },
    onExceed: { type: Function },
    onProgress: { type: Function },
    fileList: { type: Array, default: () => [] },
    beforeUpload: { type: Function },
    httpRequest: { type: Function, default: ajax },
    onChange: { type: Function },
    onSuccess: { type: Function },
    onError: { type: Function },
    drag: {
      type: Boolean,
      default: false
    }
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
      // click input to trigger file input onchange event
      fileInput.click();
    },
    onInputChange (e) {
      const files = e.target.files;
      // How to upload multiple files ?
      // 通过循环一个一个上传
      // console.log('files', files);
      this.uploadFiles(files);
    },
    uploadStart (rawFile) {
      // generate unique id:https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13#:~:text=Using%20Math.&text=random%20is%20a%20JavaScript%20built,a%20unique%20combination%20of%20numbers.&text=random()%20*%20100)-,Math.,rounding%20off%20that%20number%20first.
      // rawFile.uid = Math.random() + this.uid++;
      rawFile.uid = Date.now() + this.uid++;
      const file = {
        status: 'ready', // ready uploading success fail
        name: rawFile.name,
        size: rawFile.size,
        uid: rawFile.uid,
        type: rawFile.type,
        percentage: 0,
        raw: rawFile
      };
      // 只要开始上传就会在页面中展示
      //    可选的情况：
      //      1. 在上传完成后再展示，成功页面显示，失败进行提示
      //      2. 由于文件的信息可以直接就获取到，可以先放到页面中，然后在上传中为该文件展示Loading
      //         上传失败边框变红并提示失败信息，上传成功边框变蓝
      this.files.push(file);
      this.onChange && this.onChange(file, this.files);
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
      if (!this.beforeUpload) {
        this.doUpload(rawFile);
      } else {
        // do something such as check file type and size
        // before actual upload
        const go = this.beforeUpload(rawFile, this.files);
        if (go) {
          this.doUpload(rawFile);
        }
      }
    },
    getFile (rawFile) {
      return this.files.find(file => file.uid === rawFile.uid);
    },
    handleProgress (e, file) {
      file.status = 'uploading';
      file.percentage = e.percent || 0;
      this.onProgress && this.onProgress(e, file, this.files);
    },
    doUpload (rawFile) {
      // override default xhr behavior, allowing you to implement your own upload files request
      // you can use any way you want to upload, such as axios library
      const file = this.getFile(rawFile);
      const options = {
        file: rawFile,
        name: this.name,
        action: this.action,
        onProgress: (e) => {
          this.handleProgress(e, file);
        },
        onSuccess: (res) => {
          file.status = 'success';
          this.onSuccess && this.onSuccess(res, file, this.files);
        },
        onError: (err) => {
          file.status = 'fail';
          this.onError && this.onError(err, file, this.files);
        }
      };
      this.httpRequest(options);
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
