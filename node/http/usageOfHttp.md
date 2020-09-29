### HTTP
* server = [http.createServer](https://devdocs.io/node~10_lts/http#http_http_createserver_options_requestlistener)
  * 传入的`requestListener`会自动添加到`request`事件
  * server.on('request',(req,res) => {})(前一条相当于自动监听request方法)
* js 是单线程的， node.js也是单线程
  * 监听方法尽量使用异步，否则会阻塞响应
* 端口被占用，重开端口再次监听
* 中间层


 
