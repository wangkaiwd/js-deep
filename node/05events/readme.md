## events
### `require`查找策略
* 核心模块查找策略
* 第三方模块查找策略
  * module.paths
* 文件查找策略
  * `require('./a')`,如果当前目录下没有`a.js`，也会去`node_modules`中进行查找(?)
  * 尽量不要文件和文件夹的名字一样(?)  

### 继承
* Girl.prototype.__proto = EventEmitter.prototype
* Girl.prototype = Object.create(EventEmitter.prototype)
* Object.setPrototypeOf(Girl.prototype,EventEmitter.prototype)
* class extends
* util.inherit(make use of `util` built-in module)
* implement EventEmitter:
  * on
  * emit
  * **once**
    * how to implement
  * **off**
    * how to remove once bound listeners
  * newListener
    * 事件一监听就被触发


### 问题
#### EventEmitter
* forEach 为什么在改变原数组后索引不会乱？(用`for`循环会乱)
* off 取消 once 监听的事件： off取消的函数在once内部定义
  * 将内部的函数返回，才能在外部使用(使用起来不够优雅)
  * 在内部的函数添加一个自定义属性，可以通过它找到外部添加的函数
