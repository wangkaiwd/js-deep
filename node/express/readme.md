## express
* usage of express
* start to write express
* separate application with createApplication
* separate router with application
* relation of route and layer
* handle request callback
* optimize express
  * lazy route load
  * support all methods
  * rough filter methods in route
* middleware: have not route property
  * usage of middleware
  * app.use(path) vs app.get(path)
* err handle middleware
* multiple level route
  * express.Router() is a complete middleware and routing system 
  * will delete certain part of req.url when handle multiple route
  * restore req.url when back app.use
* params in path: /user/:id/:age -> /user/1/2 -> {id: 1, age: 2}
  * how to implement
  * package: pathToRegExp
* app.param: 
  * 
  
### express 中依赖的模块
* methods
* path-to-regex

### 逻辑梳理
* 创建`Application`类来存放应用，对应使用的实例`app`
* 在`express`中通过`createApplication`来`new Application`，用户使用时可以直接执行函数
* `app.get`会调用`router.get`,会为路由添加一个`layer`，`layer`中会记录`path`,`handler`: `Route.dispatch`，并将`layer`放入`router`的`stack`中
* `router.get`还会执行`route.get`方法，将对应的`app.get`中传入的所有回调放入`route`的`stack`中
* 当接收到请求时，会调用`router.handle`方法
* `router.handle`接受`req,res,done`，`done`为在没有匹配到对应路由时的默认返回
* `router.handle`会将内部`path`和`req.path`相同的`stack`中存储的`layer`依次执行
* `router.stack`中的`layer`会通过`next`递归执行，并且内部会再执行`layer.hander`进而执行`route.dispatch`
* `route.dispatch`会将`route.stack`中的`method`和`req.method`相同的`layer`继续通过递归进行执行
* 如果不满足条件就自动执行下一个(索引加1继续调用`next`)，如果满足条件，就将`next`传给用户，用户调用后再继续执行下一个
* 当`route.dispatch`执行完内部所有的`layer.handler`后，会执行`done`，此时会继续处理`router.stack`中的下一个`layer`
