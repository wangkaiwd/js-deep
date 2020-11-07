### 常用`http`状态码和响应头
#### Gzip
压缩文件
* client: Accept-Encoding: gzip, deflate, br
* server: Content-Encoding: gzip

Node.js zlib 提供createGzip()方法来创建gzip,用于压缩文件

gzip压缩对重复性较高的内容压缩效果比较明显

#### referrer
资源的来源

请求头: Host, referer

Host: 指定请求正在发送的服务器的主机和端口号

防盗链，和Host进行比较

#### 文件下载
server: Content-Disposition

#### 多语言
* client: Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
  格式： ,分隔不同语言以及它的权重；通过;来分隔每个语言以及它的权重
* server: Content-Language

#### Cookie
* client: Cookie: _octo=GH1.1.1531045525.1591755890; _ga=GA1.2.2561739.1591755906; 
* server: set-cookie: __cfduid=db7479c5252f0905b90bdea1f20e4c42e1604392813; expires=Thu, 03-Dec-20 08:40:13 GMT; path=/; domain=.randomuser.me; HttpOnly; SameSite=Lax

首先会在服务端通过`set-cookie`来设置`http`响应头，之后客户端在每次请求时都会携带`cookie`请求头，将所有设置的`cookie`传递给服务端，方便服务端获取`cookie`。

`cookie`设置和获取的逻辑较为复杂，可以利用`koa`的中间件对其进行封装：`res.setCookie(name,value,options)/ res.getCookie(name,options)`

注意: `Node.js`中设置多个相同响应头时，需要为数组。`res.setHeader('set-cookie',["name=1; path='/'","age=2; domain=.github.com"])`

获取值时需要将`cookie`请求头中的字符串拆分成对象，然后将其通过`name`取出返回

cookie的属性：
Name 
Value 
Domain: 可以访问cookie的域名
Path: 以路径开头的地址可以访问cookie
Expires: cookie过期时间 -> 绝对时间
Max-Age: cookie过期时间 -> 相对时间
HttpOnly: 是否只能通过服务端进行修改

尽管设置了`httpOnly`属性，还是可以在控制台中直接修改，为了避免这种情况，还需要对`cookie`的内容进行签名 
 

#### 分段上传
客户端记录当前读取的字节数并进行累加
* client: Range: bytes=0-3
* server: Content-Range: bytes 0-3/2443
可以尝试用curl请求百度试一下

#### 缓存
1. 强制缓存：服务端设置，当前请求发送完毕后，如果再发送请求，可以设置在某段时间之内不会再向服务端发起请求，而是在浏览器缓存中查找
   * Expires: 过期时间
   * cache-control: max-age=10
2. 协商缓存：缓存期间，文件内容发生了变化
   利用文件更改时间：
   * cache-control: no-cache, 每次请求服务器都会询问文件是否发生了变化
   * 服务端可以判断文件修改时间，可以设置响应头Last-Modify:ctime,值为文件的修改时间，但是只能精确到秒
   * 客户端会在请求时通过If-Modify-Since将文件修改时间再传递给服务端
   * 服务端会再次获取最新的文件修改时间，判断其与客户端传递的是否相同，如果不相同说明文件发生了修改
   * server: cache-control: no-cache, Last-Modify:ctime  client: If-Modify-Since
   
   利用摘要算法：
   * 服务端设置etag请求头，值为请求文件的固定长度的`base64`字符串
   * 之后客户端在请求时会携带请求头`If-None-Match`,将其与当前请求文件的`etag`再进行对比，如果不一样说明文件发生了修改
   * server: etag: hash  client: If-None-Match:etag    

#### 响应码
