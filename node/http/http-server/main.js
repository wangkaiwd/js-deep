const http = require('http');
const merge = function (config) {
  // process.cwd: 当前工作目录
  return {
    port: 3000,
    directory: process.cwd(),
    ...config
  };
};

class Server {
  constructor (config) {
    this.config = merge(config);
  }

  handleRequest (req, res) {

  }

  start () {
    // 回调在调用时,this指向不确定
    const server = http.createServer(this.handleRequest.bind(this));
    server.on(this.config.port, () => {
      console.log(`server is listening on ${this.config.port}`);
    });
  }
}

module.exports = Server;
