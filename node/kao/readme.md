## 手写`koa`

### 目录结构
req/res为原生Node.js中的属性

* application
* request
* response
* context

### 处理 res/req, response/request, ctx 的关系

### 中间件组合
* compose
  * 处理用户多次调用`next`函数
  * reduce -> compose
* 错误处理(EventEmitter)
* body
  * buffer,stream
  * number
  * stream 
* koa-views
  * ejs theory
    * string join
    * regular expression match
    * with read object property
    * new Function
### 第三方中间键
* bodyparser
* koa-static
* koa-view: ejs, nunjucks

中间的用途，有哪些用法(明白一些常用第三方中间键的实现原理)
