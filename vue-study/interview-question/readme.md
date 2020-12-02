## `Vue`面试题

> write core theory code

1. 响应式数据的理解？
  * 数组
    * $set
  * 对象
  * 优缺点
    * proxy
    * vue.$set
2. `Vue`模板编译原理
  * vue-loader
  * vue-template-compiler
3. 生命周期是如何实现的？
  * mergeOptions
4. `Vue.mixin`的使用场景和原理？
  * 使用：提供全局数据 (数据不是共享的)
  * mergeOptions
5. `$nextTick`用法和原理
  * Promise
  * 页面中的数据更新后，获取数据更新后的`dom`
6. `Vue`虚拟`dom`
  * 性能: 减少真实`dom`操作
  * 跨平台
7. `diff`原理
  * 平级比较，不考虑跨级
  * 递归比较 -> 双指针(`vue2`)
8. `Vue.$set`原理
9. 组件间传值方式
  * $refs: ref.js
  * props/@event/$emit 原理
  * $parent/$children 原理
  * $attrs/$listeners 响应式
10. Vue的组件渲染流程
  * 父子组件渲染的先后顺序
  * 子组件如何渲染到页面上
11. `data`为什么是一个函数？
  * 通过例子理解
12. v-if 和 v-show 的区别
  * v-if 编译时处理
  * v-show 自定义指令： 会记录之前的`display`的值，然后与`display:none`进行替换
13. Vue.use 的用法和原理
14. v-for 和 v-if 的优先级
  * 先生成`v-for`，然后再生成`v-if`
  * 尽量使用计算属性
15. 组件中写`name`有哪些好处及作用？
  * 递归组件(原理:`Sub.options.components[name] = Sub`)
  * keep-alive: 缓存
  * 跨组件通信时通过`name`寻找对应的组件
16. `Vue`的事件修饰符有哪些？其实现原理是什么？
17. `Vue.directive`的原理？
18. 如何理解自定义指令？
19. `keep-alive`: `LRU`算法
20. `Vue3`和`Vue2`的区别？
  * 对`TypeScript`支持不友好(所有属性都放在了`this`对象上，难以推导组件的数据类型)
  * `TreeShaking`
