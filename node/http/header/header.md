## 头部
* expires cache-control 200,不会向服务端发请求

### 304
cache: 
* server: Last-Modified ETag
* client: If-Modified-Since If-None-Match

gzip:
* server: content-encoding
* client: accept-encoding 

### referer referrer

正确的拼写 referrer: n.推荐人，上线；介绍人  

referrer: 资源的来源
* 包含页面发起请求的地址。当跟随一个链接时，这是包含链接的页面的url。当向另一个域名发起`AJAX`请求时，这将会是你的页面的url。
* `Referer`头允许服务器识别人们正在从哪里访问它们，并且可以使用那些数据进行分析、日志，或者优化缓存。

Host:
* 指定请求被发送到的服务器的主机和端口号

* 安全判断
* 防盗链(referer 和 host进行对比，如果不一致，说明资源被其它网站所引用)
* host: /private/etc/hosts

首先回去查找本机的hosts文件

### 多语言
前端多语言：
* Accept-Language: 通知客户端能够理解那个语言，并且优先使用哪个语言环境变体。使用内容协商(content negotiation), 服务端会从建议的选项中选择一个，并且用`Content-Language`响应头通过客户端它的选择
* 前端实现多语言
* 通过路径实现
* 通过请求来实现多语言(request header: accept language)

### 断点续传
* 206 实现断点上传 上传可以暂停
* 前端需要记录一个上传的位置(需要维护上传的位置)
* client: range: bytes=0-3 (记录bytes的值并累加), server: Content-Range: bytes 4-7/2481 (当前读取范围为/总大小)

### 正向代理和反向代理
反向代理： 
* nginx(缓存)
* webpack proxy
* cdn
* 虚拟主机

正向代理 可以在请求的时候增加一些属性 权限认证
* vpn

### 302
* 301: 永久重定向
* 302(常用)：临时重定向
* Location: 响应头
* User-Agent

