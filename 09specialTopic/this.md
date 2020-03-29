## `this`指向
* 事件绑定
* 普通函数执行，`this`取决于方法执行前面是否有“点”，有“点”的话，“点”前面是谁`this`就是谁，如果没有点的话，`this`指向`window`
* 构造函数(`new Fn`)执行，函数中的`this`是当前类的实例
* 箭头函数中没有自身的`this`，所用到的`this`都是其最近父级上下文中的`this`
* call/apply/bind

### `call/apply/bind`源码实现

