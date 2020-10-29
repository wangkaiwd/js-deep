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
    if (layer.path === pathname) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next(0);
};
module.exports = Router;
