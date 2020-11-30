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
  * $refs
  * props/@event/$emit 原理
