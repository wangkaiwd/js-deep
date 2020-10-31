const Layer = require('./layer');
const methods = require('methods');

function Route () {
  this.stack = [];
  // 将所有的请求方法放到这里，如果请求的方法没有包括在这里，那么就没有必要再遍历Route中的stack
  this.methods = {};
}

methods.forEach(method => {
  // 当单独使用路由时，会直接调用Route.prototype.get方法，而不是通过Application.prototype.get来调用，
  // 而参数处理，我们是在Application.prototype.get中做的
  Route.prototype[method] = function (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      const layer = new Layer(null, handler);
      layer.method = method;
      this.methods[method] = true;
      this.stack.push(layer);
    }
  };
});
Route.prototype.hasMethod = function (method) {
  return this.methods[method.toLowerCase()];
};
Route.prototype.dispatch = function (req, res, done) {
  let index = 0;
  const next = (err) => {
    if (err) {
      return done(err);
    }
    if (index === this.stack.length) {
      return done();
    }
    const layer = this.stack[index++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handleRequest(req, res, next);
    } else {
      next(err);
    }
  };
  next();
};

module.exports = Route;
