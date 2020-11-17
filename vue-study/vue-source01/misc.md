## Vue渲染流程
* 是否有`render`？会优先通过`render`来渲染`dom`
* 是否有`el`选项？如果有，执行下一步。如果没有，手动执行`Vue.$mount`方法进行组件挂载
* 是否有`template`选项？如果有，将`template`转换为`render`函数
* 如果没有`template`选项，将`el.outerHTML`转换为`render`函数


### 如何将`template`转化为`render`函数
* 通过正则匹配：开始标签、结束标签、文本内容
* 匹配过的内容会从`dom`中删除
* 在匹配过程中，生成`ast`抽象语法树
* 将`ast`抽象语法树转换为代码字符串

### review
* new Vue(options)
* initMixin(Vue)
  * Vue.prototype._init
  * initState(vm) -> 初始化状态
    * initProps/initMethods/initData/initMethods/initComputed/initWatch
    * initDate(vm)
      * 对象：递归遍历每个属性，为其添加set/get方法
      * 数组: 重写数组的原型，如果数组中的元素为复杂数据类型，继续对元素进行观测。不会对数组的索引进行观测。由于`push,unshift,splice`会为数组添加新元素，继续观测新增元素
    * 挂载组件
      * 如果有render，优先执行render
      * 如果没有render, 是否有el?没有el需要手动执行$mount方法进行挂载
      * 如果有el, 是否有template? 有template直接使用template
      * 如果没有template,将el.outerHTML作为template
      * 将template通过正则处理成ast抽象语法树
      * 将ast抽象语法树生成代码字符串
      * 通过new Function + with生成render函数
      * 通过Vue.prototype._render执行vm.$options.render，并实现在render中定义的函数，最终通过render函数返回虚拟dom
      * 通过Vue.prototype._update将虚拟节点通过patch方法，转换为真实dom，渲染到页面中
