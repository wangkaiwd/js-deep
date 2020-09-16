## fs

### 任务
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
