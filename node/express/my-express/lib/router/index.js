const url = require('url');
const Route = require('./route');
const Layer = require('./layer');

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
Router.prototype.get = function (path, handlers) {
  // this.stack.push({
  //   path,
  //   method: 'get',
  //   handler
  // });
  const route = this.route();
  route.get(handlers)
};

Router.prototype.handle = function (req, res, done) {
  const { pathname } = url.parse(req.url);
  const reqMethod = req.method.toLowerCase();
  for (let i = 0; i < this.stack.length; i++) {
    const { method, path, handler } = this.stack[i];
    if (method === reqMethod && path === pathname) {
      return handler(req, res);
    }
  }
  done();
};
module.exports = Router;
