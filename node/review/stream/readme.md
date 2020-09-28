## Stream
> 注意：网站内部可能不支持搜索，在`Google`搜索出关键字所在的页面后，还需要自己在进入页面后通过浏览器的搜索功能(`command + f`)来进行二次搜索。

* [file descriptors](https://nodejs.org/api/fs.html#fs_file_descriptors)

### copy file one by one
* write length = number of bytes to read

### usage of readable stream
* Buffer.concat()

### backpressure
* [如何形象的描述反应式编程中的背压(Backpressure)机制？ - 扔物线的回答 - 知乎](https://www.zhihu.com/question/49618581/answer/237078934)
* backpressure: 在数据流从上游生产者向下游消费者传输的过程中，上游生产速度大于下游消费速度，导致下游的`Buffer`溢出，这种现象就叫做`Backpressure`出现。
