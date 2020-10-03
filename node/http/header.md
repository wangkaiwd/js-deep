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
* 安全判断
* 防盗链(referer 和 host进行对比，如果不一致，说明资源被其它网站所引用)
* host: usr/hosts

### 多语言
前端多语言：  
* 前端实现多语言
* 通过路径实现
* 通过请求来实现多语言(request header: accept language)

### 断点续传
* 206 实现断点上传 上传可以暂停
* 前端需要记录一个上传的位置(需要维护上传的位置)
* client: range: bytes=0-3 (记录bytes的值并累加), server: Content-Range: bytes 4-7/2481 (当前读取范围为/总大小)
