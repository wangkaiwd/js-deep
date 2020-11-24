## Vue2原理解析

### 数据劫持
> 为`data`中的属性设置`get/set`方法，可以在`get/set`方法中进行依赖收集等逻辑

* 对象
* 数组
  * 改写会修改原数组的原型方法
* 为`Vue`实例代理`_data`上的属性，方便使用

### 模板编译
* 没有`el`选项需要手动执行`$mount`方法进行手动挂载
* 是否有`template`，如果没有就用`el.outerHTML`作为`template`
* 将`template`通过正则 + 树 + 栈处理为`ast`抽象语法树
* 将`ast`抽象语法树处理为`code` `JavaScript`代码字符串
* `new Function + with`将字符串转换为`render`函数
* 实现`render`函数中用到的`Vue`原型方法
* 将`render`方法最终会将生成虚拟节点
* `_update`中调用`patch`将虚拟节点生成真实`dom`

### 生命周期合并
* 生命周期函数即为在特定时刻执行的回调函数
* `initGlobalApi`,这里会定义`Vue`的一些静态方法
  * Vue.options中有所有全局配置的一些选项，如: mixin,component,nextTick...
  * 在`Vue.mixins`中会将用户传入的`mixins`根据不同的策略合并到`Vue.options`中，其中相同名字的生命周期函数会将会合并为一个数组，`mixins`的生命周期函数将会在组件之前
  * 在`Vue`执行`_init`方法时，会将组件实例化时传入的选项和`Vue.options`进行合并，这样全局注册的一些指令、组件等都可以直接在组件内进行使用
  * `mergeOptions`函数会根据不同的合并策略来合并`Vue`的选项
  * 之后可以封装`callHook`函数，来通过传入`vm`和钩子函数名字来调用该钩子对应的所有数组中的函数

### 依赖收集
> 只对`plain object`进行依赖收集，复杂类型不进行收集

* 到目前为止，要想更新页面，需要手动调用`vm._render`将`template`转换为虚拟`dom`，然后再调用`vm._update(vNode)`将虚拟节点转换为真实dom，并进行渲染
* 目标：更新实例中的属性，会自动更新页面; 如何实现：收集每个在页面中用到的`data`中的属性的渲染`watcher`，并在值更新的时候通知`watcher`执行`update`方法
* 这里要通过`Dep`来收集每个`template`中用到属性的`render watcher`，然后更新的时候调用`Dep.notify`来通知页面更新
* 在`defineReactive`方法中，为属性创建一个`dep`实例，用来收集和发布`watcher`。
* 需要注意，由于之前数据劫持将数组和对象分别进行劫持，所以`defineReactive`中只能收集对象属性的`watcher`,数组需要单独进行依赖收集
* 每个符合要求的数组和对象都会执行`observe`，最终会返回`Observer`的实例，在实例中为对象和数组又分别单独创建了`dep`实例
* 此时在`defineReactive`，可以通过`observe`为其返回该值的`Observer`实例，实例中的`dep`为数组和对象的`dep`，如果其存在即调用它的`depend`方法，会为当前`dep`再次收集对应的`watcher`
* 收集`watcher`要在`watcher`的`addSub`中进行，会对`dep`进行去重(用到了`set`)，然后在`watcher`中收集`dep`，再为该`dep`收集`watcher`。相互收集，方便之后实现计算属性。
* 数组要继续递归的为其中的子数组继续收集依赖
* 在数组调用其修改方法时，会通知收集的`watcher`进行更新。此时实现了：数据更新，页面同步更新

### nextTick异步更新

### watch实现原理

### virtual dom handle

### computed实现原理

