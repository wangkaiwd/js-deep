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

### select all parent and select all children logic

> Caveat: tree node component both parent and children

idea1 :

1. click checkbox, select current
2. select all children
3. trigger $emit('check')
4. parent listen check event
5. check whether select parent
6. parent trigger $emit('check')
7. parent's parent listen check event
8. recursive...

idea2:

1. flatten tree data(note object reference)
2. click tree node checkbox
3. update all children and update all parent
4. trigger check event

### animation

> reference: element ui [collapse-transition](https://github.com/ElemeFE/element/blob/493e18877add7be49ce2c02683a3a4ec7e7d2c3b/src/transitions/collapse-transition.js) component

只有固定高度才能做动画

* scrollHeight: calculate all children height, height not include border

get element dimension:

* offset/client/scroll serials
* getBoundingClientRect
* getComputedStyle

### 功能

* 渲染树节点
* 展开和收起子节点
* 选中节点
* 通过插槽自定义节点内容
* 异步加载数据
* 节点拖拽位置

### 问题

* 数据该如何处理？
  * 可以修改用户传入的`treeData`吗？
  * `treeData`是环型数据，该如何进行深拷贝，性能消耗如何？
  * 感觉目前的思路是错的，应该通过`selected-keys`和`expanded-keys`来控制组件的选中项和展开项，并且之后也可以通过该属性来进行设置
  * 展开项数组是不是不提供也可以？

### 拖拽思路

* 要有一个拖拽的状态：`top,bottom,inner`
* 鼠标的位置和所`over`的节点的位置进行比较
