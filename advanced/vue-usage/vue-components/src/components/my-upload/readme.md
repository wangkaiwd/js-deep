## `API`
* file-list
* name
* action
* limit
* on-exceed
* on-change
* on-success
* on-error
* on-progress

reference material：
* [Using files from web applications](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)
  * Using hidden file input element using the click() method
  * handling the upload process for a file
  * asynchronously handling the file upload process
* [JavaScript: Upload file](https://stackoverflow.com/a/51109645/12819402)

supply api: 
* headers
* data

question: 
* [XHR progress event not firing until upload completes?](https://stackoverflow.com/a/39220072/12819402)
* [how to generate unique id ?](https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13)
### read the official documentation of slot
* [Why introduce new `v-slot` syntax ?](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md) 
  * old syntax not immediately clear which component is providing which variable in this template
  
### drag and drop
> following text can't jump to destination, you should use search in article

how to use `-moz-drag-over` class for drag zone

* [Selecting files using drag and drop](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)
* [Drag Operations](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)
* [DragEvent.dataTransfer](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer)

### key step record
* upload the same file for input
* use component self `files` instead `fileList` that passed from parent to process upload file list

### task
* consult `ant-design-vue` and `element-ui` custom method of upload file http request
* ant design [customRequest](https://github.com/react-component/upload#customrequest)
* what is FormData
* how to find most used koa middleware? (Why not built-in?)

### server
* [the best choice of koa middleware](https://github.com/koajs/koa/issues/952#issuecomment-290406035)
* how to preview has uploaded files?

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200811110944.png)
### step on later
* handle file status
* implement progress component
* delete file list item

### did not achieve function
* preview thumbnail of images

### How to use custom http request
> resolve problem by read source code
* [element ui](https://github.com/ElemeFE/element/blob/04b5f0d2c042fb1efabaebe40749287761c14a21/packages/upload/src/upload.vue#L156)
* [ant design vue](https://github.com/vueComponent/ant-design-vue/blob/648b026166f1c5c8be806a009953bea4796b7d3a/components/vc-upload/src/AjaxUploader.jsx#L146)

benefit of use custom upload request:
* unify request config option with axios, such as request header, timeout time and so on
* unify response schema
* unify error handle

If not do so, you will set the same http config option with axios. Once http config option change, you will update http request/response relevant code in upload component and axios. If you forget update someone, bug will appear. We can only update axios config if use custom request so that can reduce bug.

如果为上传组件使用自定义请求的话，可以使用同一封装好的`axios`，这样可以统一请求配置，而不用再修改某些`http`相关内容时需要更改多个位置，导致遗漏更改而引发bug。
