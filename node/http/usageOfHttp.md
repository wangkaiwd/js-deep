### HTTP
* server = [http.createServer](https://devdocs.io/node~10_lts/http#http_http_createserver_options_requestlistener)
  * 传入的`requestListener`会自动添加到`request`事件
  * server.on('request',(req,res) => {})(前一条相当于自动监听request方法)
  * req.headers
  * res.statusCode
  * res.setHeader
* js 是单线程的， node.js也是单线程
  * request监听方法尽量使用异步，否则会阻塞响应
* listen
* 端口被占用，重开端口再次监听
* url
  * url.parse
* 服务端：req是可读流,res是可写流
* 中间层: http.request,充当客户端
* 根据`header`来处理请求和响应的格式 

querystring:  
* querystring.parse(可以传入额外的参数，指定分隔符)


静态服务:  
* difference between path.join and path.resolve


实现一个`http-server`库：  
* try catch 可以处理try代码块中所有的错误，即如果try中有多个`await`，会捕获其中最先出现错误的那一个
* 强制缓存
  * expire
  * 文件更新可能不是最新的
  * cache-control
    * no-cache
    * no-store
* 协商缓存
  * 根据更改时间来判断是否要缓存
  * 同一个文件，服务端进行修改时间比对
  * res.tatusCode = 304
  * stat.ctime
  * Last-Modify：不精准，值精确到秒
  * If-Modify-Since
  * etag: 不会直接取完整的文件
    * 直接比对文件内容
    * 摘要算法来实现计算一个唯一的hash戳
    * 摘要算法不是加密算法，只能通过输入推断出输出
    * 雪崩： 如果内容一旦发生变化，输出的结果是翻天覆地的变化
  * If-None-Match

crypto(包含各种算法 包含`md5，sha1，sha256`):  
* 暴力比对来反解


gzip:  
* 浏览器支持(Accept-Encoding)
* zlib
* 文件重复性越高，压缩越多
* 视频,图片重复性不高，不需要gzip压缩

发布到`npm`：
* `.npmignore`
