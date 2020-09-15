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
* util.inherit(make use of `uitl` built-in module)

