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

实现可读流：
* 核心：newListener事件 + once监听事件
