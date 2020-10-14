## cookie session

请求和响应`cookie`格式：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20201011223431.png)

### cookie
一个`HTTP cookie`(web cookie, browser cookie)是一小片服务器发送到用户网络浏览器的数据。浏览器可以存储它，并且将它与之后的请求发送回同一个服务器。通常地，它被用户告诉是否俩个请求来自于同一个浏览器-比如：保持用户登录。它为无状态的`HTTP`协议记住了状态信息。

cookie的三个用途
* 会话管理： 登录，购物车，游戏分数，或者其它任何服务器应该牢记的东西
* 个性化：用户首选项，主题，以及其它设置
* 追踪：记录和分析用户行为

尽管当`cookie`是在客户端上存储数据的唯一一种方式时，使用`cookie`是合法的，但是现在推荐使用现代存储`API`。`cookie`和每次请求一起被发送，因此它们拥有糟糕性能(尤其对于移动数据连接)

* 后端设置
* 前端设置

`Node.js`封装`cookie`: 
* setCookie
  * res.setHeader设置多个相同`name`的请求头
* getCookie
  * querystring 支持传入键值对之间(`&`)以及键和值之间(`=`)的分隔符


### JWT
* 支持跨域
* 不需要服务端存储任何信息
* Base64中三个字符: `+`、`/`和`=`在`URL`中有特殊含义，所以要被替换掉: `=`被省略、`+`替换成`-`，`/`替换成`_`
* jwt.encode
* jwt.decode

JWT: json web token, 是目前最流行的跨域身份人认证解决方案

不需要在服务器存储任何信息，服务器无状态，更容易扩展。

#### `JWT`使用`.`分隔的三部分
`Header`头部：  
```text
{
  "alg": "HS256",
  "type": "JWT"
}
```

`Payload` 负载、载荷

`Signature` 签名：  
* 对前俩部分进行签名，防止数据篡改  
* 有些场合会将`token`放到`url`中(如：api.example.com/?token=xxx)。`Base64` 有三个字符`+`,`/`和`=`，在`URL`里有特殊含义，要被替换：`=`被省略、`+`替换成`-`,`/`替换成`_`。**所以尽量不要把`token`放到`url`中**

疑问：如何设置`token`过期时间？
