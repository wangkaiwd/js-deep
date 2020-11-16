## Vue
* Vue 是一个 MVVM 框架(文档？)？
  * 数据变化会视图更新
  * 视图变化也会更新数据(`v-model`)
  * `MVVM`不能跳过数据直接更新视图，而`Vue`可以通过`$ref`来进行`DOM`操作，直接更新视图

* 当前目录结构的意图？

* html渲染过程：vue 官网生命周期执行流程图
  * 通过正则解析为`ast`语法树
  * 将语法树生成字符串
  * 将字符串通过`new Function`和`with`组合执行，生成一个函数
  
* 使用`Vue.mixins`和直接在公共文件内定义变量并引入有什么不同？
  * 公共变量会由于变量引用而导致发生变化(小心！)
  
* 合并配置项: vm.$options = mergeOptions(Vue.options,options),不同的配置项采用不同的合并策略
  * different push with concat
