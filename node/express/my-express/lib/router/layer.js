const pathToRegexp = require('path-to-regexp');

// 写成类方便扩展
function Layer (path, handler) {
  this.path = path;
  this.handler = handler;
  this.keys = [];
  this.regexp = null;
  this.getKeys();
}

Layer.prototype.getKeys = function () {
  // 匹配的逻辑：也可以通过正则匹配
  if (this.path) { // Route的layer不会存path, Router的layer会处理path
    const keys = [];
    this.regexp = pathToRegexp(this.path, keys);
    this.keys = keys.map(key => key.name);
  }
};
Layer.prototype.match = function (path) {
  if (path === this.path) {
    return true;
  }
  if (!this.route) {
    if (this.path === '/') {
      return true;
    }
    return path.startsWith(this.path + '/');
  } else {
    // 路由也可以使用路径参数来进行匹配
    const matches = path.match(this.regexp);
    if (matches) { // 匹配到了，需要根据keys以及分组组成req.params对象
      const values = matches.slice(1);
      this.params = this.keys.reduce((memo, current, i) => {
        memo[current] = values[i];
        return memo;
      }, {});
      return true;
    }
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
