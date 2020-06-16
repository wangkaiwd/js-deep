## Vue使用
### 响应式


### 实例常见属性
* vm.$mount
* vm.$el
* vm.$options
* vm.$$data
* vm.$watch
* vm.$nextTick
* vm.$set
* vm.$delete

### 指令
* v-once
* v-html
* v-text
* v-if(阻止后续逻辑的生成)
* v-show(不能再template上使用)
* v-bind(:)
* v-on(@) 事件绑定直接绑定给当前元素
* v-model(.lazy,.number,.trim)
* custom directive
  * v-focus
  * v-click-outside

v-for和v-if 不要使用在同一个元素上，可能会导致性能浪费

可以先通过计算属性将值计算好，然后再进行遍历

### watch + computed
* computed set 方法(结合v-model)
  * 例子：全选，反选
  * 计算属性取值的时候才会执行
* watch: 属性值为字符串表示method中的方法
  * 首次渲染时一定会执行，用来来计算老值。之后再赋值时获取新值
