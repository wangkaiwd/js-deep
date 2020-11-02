const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');

// Router will return function
// function.__proto__ = Router.prototype
// equivalently implement functionality of new keyword
function Router () {
  // return value is a middleware
  const router = function (req, res, next) {
    router.handle(req, res, next);
  };
  // Object.setPrototypeOf(router, Router.prototype);
  router.__proto__ = Router.prototype;
  router.stack = [];
  return router;
}

Router.prototype.route = function (path) {
  const route = new Route();
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};
Router.prototype.use = function (path, handler) {
  if (typeof handler !== 'function') {
    handler = path;
    path = '/';
  }
  const layer = new Layer(path, handler);
  // 相较于路由，中间件的layer没有route属性
  this.stack.push(layer);
};
methods.forEach(method => {
  Router.prototype[method] = function (path, handlers) {
    if (!Array.isArray(handlers)) {
      handlers = Array.from(arguments).slice(1);
    }
    const route = this.route(path);
    route[method](handlers);
  };
});

Router.prototype.handle = function (req, res, done) {
  const { pathname } = url.parse(req.url);
  let index = 0;
  let removed = '';
  const next = (err) => {
    if (removed) {
      removed = '';
    }
    if (index === this.stack.length) {
      return done();
    }
    const layer = this.stack[index++];
    if (layer.match(pathname)) { // 路径匹配
      if (!layer.route) { // 中间件
        if (err) { // 执行错误处理中间件
          layer.handleError(err, req, res, next);
        } else {
          // 中间在实例化时，handler就是中间件里传入的回调
          if (layer.handler.length !== 4) {
            // 如果是二级路由的话，需要删掉app.use中的路径
            if (req.url !== '/') {
              removed = layer.path;
              req.url = req.url.slice(removed.length);
            }
            layer.handleRequest(req, res, next);
          } else {
            next();
          }
        }
      } else { // 路由
        if (layer.route.hasMethod(req.method)) {
          // 路由在实例化layer时，handler为route.dispatch
          // 如果是二级路由的话，需要删掉app.use中的路径
          if (req.url !== '/') {
            removed = layer.path;
            req.url = req.url.slice(removed.length);
          }
          req.params = layer.params || {};
          layer.handleRequest(req, res, next);
        } else {
          next(err);
        }
      }
    } else { // 路径不匹配调用下一个中间件或路由处理函数
      next(err);
    }
  };
  next();
};
module.exports = Router;
