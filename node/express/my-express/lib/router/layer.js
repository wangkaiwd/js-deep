// 写成类方便扩展
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
}

Layer.prototype.match = function (path) {
  if (path === this.path) {
    return true;
  }
  if (!this.route) {
    if (this.path === '/') {
      return true;
    }
    return path.startsWith(this.path + '/');
  }
};
Layer.prototype.handleRequest = function (req, res, done) {
  this.handler(req, res, done);
};
Layer.prototype.handleError = function (err, req, res, next) {
  if (this.handler.length === 4) {
    this.handler(err, req, res, next);
  } else {
    next(err);
  }
};
module.exports = Layer;
