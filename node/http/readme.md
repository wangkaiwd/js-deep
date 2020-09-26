### `HTTP`概念
* http: 应用层
* TCP/IP协议族


* 应用层：HTTP, FTP, DNS
  * HTTP vs DNS
  * HTTP -> TCP, DNS -> UDP(没有三次握手和四次挥手)
* 传输层: TCP(可靠), UDP(不可靠)
* 网络层：IP 选择传输路线 
* 链路层：网络连接的硬件部分

HTTP特点：  
* 不保存状态
* 保持连接
* 可以并发请求

HTTP缺点：  
* 采用明文
* 不验证通信方的身份
* 无法验证内容的完整性(内容可能被篡改)

HTTP方法：
* restful 风格
* get/post 简单请求
  * 跨域
  * 发送`delete`请求 -> `options`预检请求
  * get/post + 自定义的 header -> 复杂请求
  * 其它方法都是复杂请求

HTTP状态码：
* 1xx: 信息性状态码 websocket upgrade
* 2xx: 成功状态码 200 204(没有响应体) 206(范围请求 Range header)获取网页的部分请求
* 3xx: 重定向状态码 
  * 301(永久重定向) 
  * 302(临时重定向) 
  * 303 post->get
  * 304 缓存  
  * 307(不会从post转换为get)
* 4xx: 客户端错误
  * 400: 传参出错
  * 401：登录前没权限
  * 403：登录后没权限
  * 404
  * 405: 方法不允许 
* 5xx: 服务端错误

HTTP客户端和服务端通信：

URI: 统一资源标识符 
 
URL：统一资源定位符
* mdn:what is url
* url 模块

