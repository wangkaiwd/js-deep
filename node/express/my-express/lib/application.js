const http = require('http');
const url = require('url');

function Application () {
  this.routes = [{
    path: '*',
    method: 'all',
    handler (req, res) {
      res.end('this is my-express default route');
    }
  }];
}

Application.prototype.get = function (path, handler) {
  this.routes.push({
    path,
    method: 'get',
    handler
  });
};

Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    // req.url = pathname + search(?+query) + hash
    // https://devdocs.io/node~10_lts/url
    // https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL
    const { pathname } = url.parse(req.url);
    const reqMethod = req.method.toLowerCase();
    // 请求时执行所有保存的routes
    for (let i = 1; i < this.routes.length; i++) {
      const { path, method, handler } = this.routes[i];
      if (path === pathname && method === reqMethod) {
        return handler(req, res);
      }
    }
    return this.routes[0].handler(req, res);
  });
  server.listen(...arguments);
};
module.exports = Application;
