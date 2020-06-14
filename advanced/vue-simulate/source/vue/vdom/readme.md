## 虚拟`DOM`
* [Render Function & JSX](https://vuejs.org/v2/guide/render-function.html)

* 有效的更新所有的`DOM`节点是很困难的，但是你只需在一个模板或者一个渲染函数中告诉`Vue`你在页面上想要的`HTML`是什么
* `createElement`并不会创建一个真实的`DOM`元素，更准确地说它会创建一个节点的描述。它包含`Vue`应该在页面中渲染节点的类型，包括任何子节点的描述信息。我们把这个节点的描述信息叫做一个 "虚拟节点"，通常简写为`VNode`。"虚拟DOM"是通过`Vue`组件树构建的整个`VNode`树。

* `createElement`的参数： 1. HTML Tag 2. 在模板中使用属性的相对应的数据对象 3. 子虚拟节点

### `diff`比较
* 乱序对比
  * 构建`id`和`index`的`map`，这样在顺序发生变化时可能会有问题
  * 为了解决索引发生变化的问题，在删除某个元素时，需要补null或undefined，防止数组塌陷
