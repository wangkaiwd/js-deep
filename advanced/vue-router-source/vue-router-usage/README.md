## `Vue Router`
* `Vue.use`源码
* (在同一个或不同文件)`import`同一个文件俩次，文件中的代码会执行俩次吗？
* 组件加载过程为什么是先加载父组件，然后再加载子组件？过程具体是怎样的？

### `window history api`
`Vue.use(plugin)`: 安装一个`Vue.js`插件，如果插件是一个对象，它必须暴露一个`install`方法。如果插件是一个函数，它将被作为`install`方法对待。`install`方法将用`Vue`作为参数被调用。

这个方法必须在`new Vue()`之前被调用

当这个方法在同一个插件上调用多次时，插件只会被安装一次

[源码如下](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js) ：
```javascript
import { toArray } from '../util/index'

export function initUse (Vue) {
  Vue.use = function (plugin) {
    // 插件数组
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 插件是否执行过use方法，执行过的话便不再执行
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    // 将调用Vue.use时的实参转换为真实数组
    // additional parameters
    const args = toArray(arguments, 1)
    // 将Vue做为第一个参数
    args.unshift(this)
    // plugin是一个拥有install方法的对象
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') { // plugin是一个函数
      plugin.apply(null, args)
    }
    // 将新使用的插件放入数组中
    installedPlugins.push(plugin)
    return this
  }
}
```

### 整体实现思路
* 根据用法，推到`VueRouter`的书写结构
* 在`Vue.mixin`中为所有组件混入内容
* 扁平化传入的`routes`配置项，处理为`{'/about': {path:'/about',component: About}}`的格式
* 通过传入的地址匹配地址对应的所有组件信息
* 监听`hashChange`事件，保证之后地址更新时，根据地址重新匹配对应的组件
* 为`Vue.prototype`原型挂载`$route`和`$router`属性（感觉也可以通过`Vue.mixin`进行混入）
* `router-view`组件(复杂)
* `router-link`组件
* 路由钩子

### 树形结构处理
* 对比`Vuex`的处理方法
* 简述`vue-router`中处理`route`的过程

### `Vue`中的函数式组件
* `router-view`：实现思路
* `router-link`

### 路由钩子实现
* 让用户自己控制函数的执行(`next`)
* 类似于`express`的`api`

### 路由权限处理
* 将路由`routes`进行分开配置，根据权限动态添加的内容以及固定的数组内容
* 通过接口动态获取菜单和权限列表
  * 接口的`auth`可以和路由的`name`进行匹配
* 通过接口过滤权限`routes`
  * 如何实现递归`filter`
* `addRoutes`存在的问题：
  * [feature request](https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465)
  * [rest routes](https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465)
  * 具体实例尝试
* 解决`addRoutes`的问题：
  * 使用层面，不使用`addRoutes`
  * 源码层面
  * 如果能解决，写文章进行分析
