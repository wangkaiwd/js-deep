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

### nextTick异步更新

### watch实现原理

### virtual dom handle

### computed实现原理
