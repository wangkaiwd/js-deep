## tree

* 如何递归渲染样式？
  * 类比自己之前实现的`Menu`组件，为什么子节点的偏移需要自己单独加`style`来设置？
  * 是因为加了`SubMenu`组件的原因吗？
* 如何为`.scss`文件添加命名空间，防止样式冲突？
* 将树拍平，便于之后的操作？
  * 通过`reduce`进行拍平操作
  * 可以尝试其他方法
* 多选：选中当前，判断所有子节点以及其父节点的选中状态
* 异步加载逻辑
* 拖拽节点
  * 拖拽`CSS`
* 如何将节点之间进行连线

### 知识点

* [visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility): hidden; 使元素隐藏，但是还会占据位置。
* 如何通过用户来控制展开功能？
  * 根据用户传入的`expand-keys`，为`data`动态添加`expanded`属性
  * 如果当前节点为子节点，要将其父节点也展开
  * 由于之前将树扁平化了，所以可以很方便的找到对应节点的所有父级，为其数据添加`expanded`属性
* 控制`selected-keys`
* 目前`Tree`与`Menu`组件的区别：`Tree`组件是通过传入数据遍历出来的，而`Menu`组件是遍历组件标签，并没有将数组传入
* `element ui`和`ant design`分别的设计方式
