## 组件
### `el-form`
* [`provide/inject`](https://github.com/wangkaiwd/js-deep/blob/0a9e95e86a5df126807af8f219db541de9f63b1f/advanced/vue-usage/vue-components/src/components/el-form/el-form.vue#L9-L13)
* [`$emit/$on`](https://github.com/wangkaiwd/js-deep/blob/master/advanced/vue-usage/vue-components/src/components/el-form/el-form-item.vue#L30-L34)
* [`$dispatch`](https://github.com/wangkaiwd/js-deep/blob/0a9e95e86a5df126807af8f219db541de9f63b1f/advanced/vue-usage/vue-components/src/components/el-form/el-input.vue#L29-L39)
* [`Promise.all` async validate](https://github.com/wangkaiwd/js-deep/blob/0a9e95e86a5df126807af8f219db541de9f63b1f/advanced/vue-usage/vue-components/src/components/el-form/el-form.vue#L23-L42)

### `el-menu`
* `recursive component`

### `message`
* `create mutilple ways of invoke`
* `manually mount component to page`
  * way 1(has complete)
  * way 2(new Vue, need to study)

### `lazy-load`
* `Vue.use`
* `Vue.directive`(custom directive)
* `window.getComputedStyle`
* [Get the size of the screen, current web page and browser window](https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window)
* core idea: 
  * recursive find has overflow property parent node
  * check every img who added v-lazy directive whether in viewport multiply preload
  * simulate error and loading image async load progress and tip according to image load type
