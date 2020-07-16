### 编码问题
* ASCII: 最大范围127
* 一个字节最多能存256个字符
* 俩个字节表示中文


* utf8: 是`unicode`的一种存储方式， 可变字符长度 字母1个字节 汉字3个字节
* utf16: `js`内部使用，俩个字节表示一个字符

`node`中支持`utf8`格式
### 进制转换问题
* 1011 二进制 -> 10进制

### [Buffer](https://nodejs.org/dist/latest-v12.x/docs/api/buffer.html#buffer_buffer)
* 用来表示二进制类型数据
* `fs.readFile`(默认操作文件)都是二进制类型
* `buffer`是16进制的

### 前端
* 前端下载`html`功能
  * blob
  * arrayBuffer：浏览器中的二进制
  * FileReader
* 预览文件功能
* 下载上传
