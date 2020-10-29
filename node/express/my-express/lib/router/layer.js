// 写成类方便扩展
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
}

Layer.prototype.match = function (path) {
  return path === this.path;
};
Layer.prototype.handleRequest = function (req, res, done) {
  this.handler(req, res, done);
};
module.exports = Layer;
