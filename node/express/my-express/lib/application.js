const http = require('http');
const Router = require('./router');
const methods = require('methods');

function Application () {
  this._router = null;
}

// 用到路由的时候再进行加载
Application.prototype.lazyRoute = function () {
  if (!this._router) {
    this._router = new Router();
  }
};

Application.prototype.param = function (name, handler) {
  this.lazyRoute();
  this._router.param(name, handler);
};

Application.prototype.use = function (path, handler) {
  this.lazyRoute();
  this._router.use(path, handler);
};

methods.forEach(method => {
  Application.prototype[method] = function (path, ...handlers) {
    this.lazyRoute();
    this._router[method](path, handlers);
  };
});

Application.prototype.listen = function () {
  this.lazyRoute();
  const server = http.createServer((req, res) => {
    function done () {
      res.end(`Can not ${req.method} ${req.url} my`);
    }

    this._router.handle(req, res, done);
  });
  server.listen(...arguments);
};

module.exports = Application;
