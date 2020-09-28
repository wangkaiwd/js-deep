## Stream

* buffer
* fs.copy

* fs.open
* fs.read
* fs.write
* fs.close

实现`fs.copy`:  
* 为什么读取的时候，每次都会多一个空行？
* 读取时候的相关参数并没有弄明白

* fs.createReadStream: parameters
* ReadStream: buffer => BufferList 是一个链表
* ReadStream Events:
  * open
  * data
  * end: 数组拼接要使用`Buffer.concat`方法，不能使用字符串累加，有乱码问题
  * error
  * close
* pause(): 暂停流
* resume(): 恢复流动
* 自己实现的流为什么在`pause`后没有触发`close`事件？
  * **如何判断是否读取完文件的全部内容**？
  * 目前是再多读一次，如果读取到的字节为0，那么说明读取完毕
  * **当设置`start`属性不为0时，如何解决读取出现的问题？**

实现可读流：
* 核心：newListener事件 + once监听事件
* end 与 position 的计算
* `buffer.slice`截取已经写入到`buffer`中的内容

使用可写流：
* ws.write: 异步操作，会在内部进行排对，一次调用(画图)
* ws.end
* ws.on('close')
* event: drain
* highWaterMark + return value of ws.write(), 实现逐个写入

实现可写流：  
> 为什么要用链表，直接用数组感觉操作会更简单 

* 核心：将异步任务放到队列中，等到前一个完成，才会去进行下一个
* 当写入内容的数量超过`highWaterMark`的时候，`write`会返回值为`false`，否则为`true`
* 当队列中的内容清空后，会调用`drain`事件
* 可读流的`drain`事件触发时机？(自己实现的好像是错的)

通过流读取数据：
* 源码断点调试阅读(`fs.createReadableStream()`)
* 父类如何触发子类的方法？`this`指向问题

implement a readable stream
* 源码流程：
  * 创建可读流后，会打开文件，内部会调用`Readable`中的`read`方法
  * 父类的`read`方法会调用子类的`_read`方法
  * 由于`createReadStream`是一个文件流，需要用`fs.read`方法来读取文件内容
  * 读取到的内容需要调用父类的`push`方法，将读取到的数据传入
  * 最终触发`data`事件
* extends Readable
* _read
* _push

writable steam: 
* 源码流程：
  * 默认创建可写流后会打开文件，内部什么都不会做
  * 如果调用了`write`方法，内部会调用`writeStream`里的`_write`方法
  * `_write`方法中调用了`fs.write`方法

自定义流：
* readable stream
* writable stream
* 双工流
* 转换流(Transform)
* [**pipe**(拷贝，异步，看不到读取的过程)](https://devdocs.io/node~10_lts/stream#stream_readable_pipe_destination_options)

