## 前后端交互处理

### 面试题：当用户在地址栏中输入网址，到最后看到页面，中间都经历了什么？

#### 1. 解析输入的`URL`地址
* [什么是`URL`](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)

* URI
* URL
* URN

完整的`URL`地址：

* 传输协议：
    * http: 超文本传输协议
    * https：比`http`更加安全的传输协议，一般支付类网站都是https协议
    * ftp: 资源上传协议，一般应用于把本地文件直接上传到服务器
* 域名
* 端口
    * http -> 80
    * https -> 443
    * ftp -> 21
    
* 常用编码方式(尾号传参的内容需要进行编码处理，处理特殊字符和中文)
    * encodeURI/decodeURI
    * encodeURIComponent/decodeURIComponent
    
#### 2. DNS域名解析
通过域名找到服务器的外网`IP`

网站中每发送一个`TCP`请求，都要进行`DNS`解析。一旦当前域名解析过一次，浏览器一般会缓存解析记录，缓存时间在1分钟左右，后期发送的请求如果还是这个域名，则跳过解析步骤。

真实项目中，一个大型网站，他要请求的资源是分散到不同的服务器上的（每一个服务器都有自己的一个域名解析)：
* `Web`服务器(处理静态资源服务器)
* 数据服务器
* 图片服务器
* 音视频服务器
* ...
这样在请求的时候就会导致需要解析的`DNS`会有很多次

**优化技巧：DNS Prefetch**  

可以让页面加载(尤其是后期资源的加载)更顺畅更快一些,看一下京东的例子：
```html
<link rel="dns-prefetch" href="//static.360buyimg.com"/>
<link rel="dns-prefetch" href="//misc.360buyimg.com"/>
<link rel="dns-prefetch" href="//img10.360buyimg.com"/>
<link rel="dns-prefetch" href="//img11.360buyimg.com"/>
<link rel="dns-prefetch" href="//img12.360buyimg.com"/>
<link rel="dns-prefetch" href="//img13.360buyimg.com"/>
<link rel="dns-prefetch" href="//img14.360buyimg.com"/>
<link rel="dns-prefetch" href="//img20.360buyimg.com"/>
<link rel="dns-prefetch" href="//img30.360buyimg.com"/>
<link rel="dns-prefetch" href="//d.3.cn"/>
<link rel="dns-prefetch" href="//d.jd.com"/>
```

#### 3. 建立`TCP`连接通道
`TCP`协议的三次握手

服务器处理请求

把信息返回给客户端(断开连接TCP的4次挥手)

客户端拿到信息进行渲染

一次完整的`HTTP`事务：
1. 建立起`TCP/HTTP`传输通道(客户端和服务端)
2. 客户端正常发送请求
3. 服务器端正常把信息返回
4. 断开TCP/HTTP传输通道

#### 4. 向服务器发起请求
基于`HTTP`等传输协议，客户端把一些信息传递给服务器

`HTTP`请求报文

* 强缓存和协商缓存(性能优化，减少`HTTP`请求的次数)
    * 强缓存(`Cache-Control`、`Expires`)
    * 协商缓存(`Last-Modified`、`Etag`)

#### 5. 服务器得到请求进行处理，并把信息返回给客户端
`HTTP`响应报文

#### 6. 断开`TCP`连接通道
`Connection: Keep-Alive`:保持`TCP`连接不中断(性能优化点，减少每一次请求还需要重新建立连接通道的时间)

#### 7. 客户端渲染返回结果

