const url = require('url');
const Route = require('./route');
const Layer = require('./layer');
const methods = require('methods');

function Router () {
  this.stack = [];
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
    const route = this.route(path);
    route[method](handlers);
  };
});

Router.prototype.handle = function (req, res, done) {
  const { pathname } = url.parse(req.url);
  let index = 0;
  const next = () => {
    if (index === this.stack.length) {
      return done();
    }
    const layer = this.stack[index++];
    if (layer.match(pathname)) {
      if (!layer.route) { // 中间件
        // 中间在实例化时，handler就是中间件里传入的回调
        layer.handleRequest(req, res, next);
      } else { // 路由
        if (layer.route.hasMethod(req.method)) {
          // 路由在实例化layer时，handler为route.dispatch
          layer.handleRequest(req, res, next);
        } else {
          next();
        }
      }
    } else {
      next();
    }
  };
  next(0);
};
module.exports = Router;
