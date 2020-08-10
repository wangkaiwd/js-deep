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

### read the official documentation of slot
* [Why introduce new `v-slot` syntax ?](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md) 
  * old syntax not immediately clear which component is providing which variable in this template

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

### step on later
* handle file status
* implement progress component
* delete file list item

