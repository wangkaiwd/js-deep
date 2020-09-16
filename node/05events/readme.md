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

### fs
操作文件：  
* readFile: 读取编码没有都指定都为`buffer`类型
* writeFile: 默认写都会转化成`utf8`格式来进行存储(并且会将文件清空，如果文件没有会创建)
* appendFile
* feature: 实现代码拷贝(大文件操作：Stream)，文件超过64K，使用流；如果文件小于64K，直接read + write

操作文件夹：  
* 递归创建目录: `a/b/c/d/e/f/g`
  * 同步创建
  * 异步创建
* 删除目录：
  * 深度：递归树,先删除儿子，再删除父亲
  * 广度
  * fs.access
  * fs.stat
  * fs.rmdir
  * fs.unlink
* 异步删除目录：
  * 异步串行执行，整个节点串在一起
  * 异步并行执行，多个子节点同时开始遍历 Promise.all
  * 异步广度删除

### 问题
#### EventEmitter
* forEach 为什么在改变原数组后索引不会乱？
