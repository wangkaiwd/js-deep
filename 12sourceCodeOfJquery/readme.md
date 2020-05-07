## `jQuery`源码
> 看`jQuery`的源码，根据`jQuery`文档中`api`的用法，结合自己的经验分析，实现一些常用方法。

* [] `toType`
* [] `each`
* [] `extend`
### `jQuery`整体思想
`jQuery`可以作为对象访问它自身的私有属性和方法，也可以作为普通函数来执行，并返回一个实例。

该实例的`__proto__`是`jQuery.prototype`，所以该实例也被成为`jQuery`实例。

此时`jQuery`在没有使用`new`的情况，得到了它的实例对象，使得用户的使用过程变得很简洁。
#### 无`new`使用`jQuery`
* `jQuery.fn.init`
* `jQuery.extend`
* `jQuery.fn.ready`
* `jQuery.noConflict`

`$('.box)`执行做了什么事情

理解`jQuery`的多种角色：
* 普通函数
* 构造函数
* 对象

### 原生对象和`jQuery`对象相互转换
> 一个函数传入不同数量和类型的参数实现不同的功能(函数重载)

相互之间灵活转化，分别调用`jQuery`对象的属性和方法和原生`DOM`对象上的属性和方法

### 数据类型检测
* `toType`
### 事件绑定
> 核心思想：发布订阅模式
* `on`
* 快捷绑定: `element.click`
* `bind/delegate/one`

### 常用`api`
* `each`
