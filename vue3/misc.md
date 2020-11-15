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
