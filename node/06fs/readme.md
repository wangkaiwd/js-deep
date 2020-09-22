## fs
可以操作文件和文件夹

### 任务
操作文件：  
* readFile: if no encoding is specified, then the raw buffer is returned.
* writeFile: replacing the file if it already exists. `data` can be a string or buffer.
  * 文件写入为什么会默认有换行？
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
  * 异步并行执行，多个子节点同时开始遍历(参考Promise.all的实现)
* `Promise + async/await` 删除目录
 
### 关于递归的一些常见场景
* 递归遍历树，修改其内部的一些字段，并返回新的树结构(而不是修改引用)
  * `Tree`组件中替换服务端返回的字段
* 递归过滤树
  * 递归过滤出所有路由菜单中拥有权限的路由菜单

异步递归？
