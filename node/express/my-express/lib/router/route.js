const Layer = require('./layer');

function Route () {
  this.stack = [];
}

Route.prototype.get = function (handlers) {
  for (let i = 0; i < handlers.length; i++) {
    const handler = handlers[i];
    const layer = new Layer(null, handler);
    layer.method = 'get';
    this.stack.push(layer);
  }
};
Route.prototype.dispatch = function (req, res, done) {
  let index = 0;
  const next = () => {
    if (index === this.stack.length) {
      return done();
    }
    const layer = this.stack[index++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next(0);
};

module.exports = Route;
