## Vuex

* 为什么要在`beforeCreated`钩子函数中混入
* 为什么在`_data`和`$data`属性中没有`$store`属性?
* `Vuex`内部的`Vue`实例是如何知道更新哪个地方的视图的？

小技巧：
* 在不知道如何调用`Vuex`的`api`时，可以通过打印`this.$store`或者`store`实例来进行查看，因为有些用法在文档上也没有详细说明。

### 实现`Vuex`的`state`响应式

### `Vuex`如何优雅的处理对象组成的树结构

* 模块收集(ModuleCollection)
* 安装模块(installModule)
* 动态注册(registerModule)

处理递归的数组思路：
```javascript
const tree = [
  { title: '1',
    key: '1',
    children: [
      { title: '1-1', key: '1-1', children: [{ title: '1-1-1', key: '1-1-1' }] }],
  },
  {
    title: '2',
    key: '2',
    children: [
      { title: '2-1', key: '2-1', children: [{ title: '2-1-1', key: '2-1-1' }] },
    ],
  },
]
```
遍历的为当前索引
path[0,0]  查找 tree[0].children[0].children  => 当前遍历的children, 通过当前遍历时的索引可以找到对应的元素

#### `reduce`方法在源码中的应用
> * 尝试手写`reduce`
> * 用其它方法实现对应的逻辑
> * 理解`reduce`的思想

应用：
* `redux`中实现`compose`函数
* `Vue`获取`a.b.c`属性
* `Vuex`中通过数组`[a,b,c]`来方便的获取当前遍历的元素在整个`tree`结构中的位置

### `Vuex`中的插件机制
* `plugin`选项: 传入函数组成的数组，数组中的函数第一个参数是`store`
* `store.subscribe`
* `store.replaceState`
  * 涉及到闭包、作用域、作用域链、对象引用问题
* 简单实现插件
  * `vuex-logger`
  * `vuex-persist`
  
### `strict`模式检测`mutation`中异步更新`state`

  



