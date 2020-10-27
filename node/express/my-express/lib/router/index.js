const url = require('url');

function Router () {
  this.stack = [];
}

Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    method: 'get',
    handler
  });
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
