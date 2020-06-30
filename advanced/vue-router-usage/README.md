## `Vue Router`
* `Vue.use`源码
* (在同一个或不同文件)`import`同一个文件俩次，文件中的代码会执行俩次吗？
* 组件加载过程为什么是先加载父组件，然后再加载子组件？过程具体是怎样的？

### `window history api`
`Vue.use(plugin)`: 安装一个`Vue.js`插件，如果插件是一个对象，它必须暴露一个`install`方法。如果插件是一个函数，它将被作为`install`方法对待。`install`方法将用`Vue`作为参数被调用。

这个方法必须在`new Vue()`之前被调用

当这个方法在同一个插件上调用多次时，插件只会被安装一次

[源码如下](https://github.com/vuejs/vue/blob/dev/src/core/global-api/use.js)：
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
