// 封装原生cookie设置方法，方便使用
// res.setCookie(key,value,options)
// res.getCookie(key): querystring(自定义key,value pair and keys,values分隔符) 用来解析cookie
// 防止篡改cookie:
//  * 尽管设置了httpOnly,但是还是可以通过调试工具Application直接修改cookie
//  * crypto sha256
//  * base64 字符串在传输过程中会把 /+= 变成 ' '
//  * cookie 都用签名
