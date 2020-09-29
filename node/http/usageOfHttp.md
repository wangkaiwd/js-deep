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
 
