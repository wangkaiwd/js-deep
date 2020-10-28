// 写成类方便扩展
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
}

module.exports = Layer;
