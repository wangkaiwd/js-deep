## 问题记录
* 开发时为什么要在本地起一个服务？(`webpack-dev-server`)
* 配置`webpack`开发环境
* 配置`webpack`优先引入`source/vue` 

### 数据劫持
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-4-9-23.png)

### 编译文本
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-7-1-38-text-compiler2.png)

### 依赖收集
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-7-5-19-dependence-collect.png)

`DocumentFragment`不能直接得到其中的`html`内容，需要将其放入一个`DOM`元素中，调用`innerHTML/outerHTML`来获取去它的序列化`HTML`字符串
* [代码段](https://gist.github.com/gleuch/2475825#file-gistfile1-js-L10-L15)

#### [对象](https://vuejs.org/v2/guide/reactivity.html#For-Objects)

#### [数组](https://vuejs.org/v2/guide/reactivity.html#For-Arrays)
* 数组子项依旧为数组的依赖`watcher`收集？

#### knowledge point
* [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

### 异步批量更新

### Watch
* vm.$watch(exprOrFn, callback, [options])
观察`Vue`实例上表达式或计算函数的变化。使用新的`value`和旧的`value`作为回调调用`callback`。
* exprOrFn: 字符串或者函数，用来表示对象的键路径(keypath)
* callback: Vue中观察的表达式或实例发生变化时，调用callback,参数为new value 和 old value
* options:
  * deep: 设置为true时，检测对象内嵌套值的变化，如`var obj = {c: {x:'x'}}`中`obj`中`c`对应的值发生变化。注意，**你不需要这样做来监听数组变化**(为什么？)。
  * immediate: 在选项中传入`immediate: true`将会用当前表达式的值立即出发`callback`
* return Function unwatch: 调用之后，停止出发`callback` 

* watchers
  * 尽管计算属性在大多数情况下是更合适的，但是有些时候一个自定义`wather`是必须的。所以`Vue`通过`watch`选项，提供了一个更通用的方式来响应数据更改。
  * 当你想要执行异步的或昂贵的操作来响应数据的变化，`watch`选项是特别有用的
  * `watch`双向绑定数据的属性，变化时发起`ajax`请求，而不是通过监听`change`事件。这样在手动直接更改该属性时，也会发起请求。

### Computed
[Computed Properties and Watchers](https://vuejs.org/v2/guide/computed.html)

* computed caching vs methods
  * `computed`基于它的响应依赖进行缓存，当它的某个响应依赖发生改变的时候才会重新求值。
  * 只要`message`没有被更改(`dirty: false`)，多次访问`reversedMessage`计算属性将会立即返回之前的计算结果(`wtach.value`不会重新计算)，没有必要再次运行函数。
  * 每次重新渲染，`methods`总是会被调用

* computed vs watched property
  * 书写代码时会引诱我们写`watch`属性
  * 能使用`computed`时尽量使用`computed`
  * computed setter
 
### 虚拟`DOM`
* 什么是虚拟`DOM`？
  * 简单的虚拟`DOM`结构
  * `render api`的用法
* 初始化，将虚拟节点渲染到页面
