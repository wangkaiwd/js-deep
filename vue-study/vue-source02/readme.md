## 手写简易版Vue

实现功能如下：

- [x] 创建rollup开发环境
- [x] 数据劫持
- [x] 模板编译： template -> ast -> code -> virtual dom -> real dom
- [x] 生命周期合并: global api -> Vue.mixin -> merge options
- [x] 依赖收集

为什么组件的`data`选项要是一个函数？

* 组件的用法：
  1. import AA from './AA'
  2. export default { components: {AA}}
  3. <template><aa></aa><aa></aa></template>
  4. 将模板解析为ast语法树
  5. 将ast生成代码字符串
  6. 将代码字符串通过`new Function` + `with`处理为`render`函数
  7. 实现`render`函数中的方法，执行`render`函数
  8. `render`函数执行会生成虚拟节点，虚拟节点在生成过程中会判断是否为原生标签。如果不是原生标签，从组件中通过`$options.components[tag]`来获取到组件定义
  9. 组件定义中有`data`,同一个组件都是通过`$options.components[tag]`来获取同一个定义对象，也会使用同一个`data`
  10. 局部组件: 对象，全局组件：`Vue`子类的构造函数
  11. 为组件虚拟节点添加钩子函数
  12. 组件虚拟节点会添加组件相关的选项
  13. 生成真实节点时，会判断处理的虚拟节点是否有钩子函数，有的话执行初始化钩子
  14. 此时会在`init`钩子函数中进行子组件的初始化和挂载
  15. 子组件挂载完毕后，会将子组件的根节点作为`vm.$el`
  16. 将其挂载到父节点中即可
* 在逻辑9中，`data`如果使用同一个对象，如果在组件内部进行了修改，那么之后在用的时候，会修改同一片内存空间，更改一个组件，其它组件也发生更改
