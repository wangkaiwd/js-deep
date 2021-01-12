## `Vu2`和`Vue3`对比

* 对`TypeScript`支持不友好(所有属性都放在了`this`对象上，难以推导组件的数据类型)
* 大量的`API`挂载到`Vue`原型上，难以实现`TreeShaking`
* Composition API
* 对虚拟`DOM`进行了重写、对模板的编译进行了优化操作

### `Vue3`源码知识点回顾

挂载组件：

* 组件的虚拟节点的`tag`属性为组件的定义
* `setup`的返回值为`render`函数，用来渲染组件中的节点
* `render`函数执行后的返回值为组件中模板(`jsx`)对应的虚拟节点
* 创建组件`instance`实例，render:render, subTree: render()
* 继续渲染subTree对应的虚拟节点，其`container`为它的父节点

组件挂载到`document`中的整体思路：

* 不同于`Vue2`每次将子节点对应虚拟节点创建的真实节点返回，然后将其`append`到父节点中
* `Vue3`每次会将父节点传入，然后在子节点中通过`appendChild`方法将其插入到父节点中

最长递增子序列：

* 要知道索引对应的原值

源码概述：

* yarn workspace
* lerna

Vite:
* 
