## Vuex

* 为什么要在`beforeCreated`钩子函数中混入
* 为什么在`_data`和`$data`属性中没有`$store`属性?
* `Vuex`内部的`Vue`实例是如何知道更新哪个地方的视图的？

### 实现`Vuex`的`state`响应式

### `Vuex`如何优雅的处理对象组成的树结构

#### `reduce`方法在源码中的应用
> * 尝试手写`reduce`
> * 用其它方法实现对应的逻辑
> * 理解`reduce`的思想

应用：
* `redux`中实现`compose`函数
* `Vue`获取`a.b.c`属性
* `Vuex`中通过数组`[a,b,c]`来方便的获取当前遍历的元素在整个`tree`结构中的位置



