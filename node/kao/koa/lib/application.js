const http = require('http');

class Application {
  constructor () {
    this.callback = undefined;
  }

  use (cb) {
    this.callback = cb;
  }

  handleRequest (req, res) {
    this.callback(req, res);
  }

  listen (...args) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
