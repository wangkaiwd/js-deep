const http = require('http');
const mime = require('mime');
const path = require('path');
const url = require('url');
const fs = require('fs').promises;
const { createReadStream } = require('fs');
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
    const { pathname } = url.parse(req.url);
    // pathname可能为: /xxx,所以这里必须要使用path.join,
    // 使用path.resolve会返回/xxx，而不会返回拼接后的完整路径
    const absPath = path.join(__dirname, pathname);
    fs.stat(absPath)
      .then((stat) => {
        if (stat.isFile()) {
          return this.readFile(req, res, absPath);
        }
      })
      .catch(e => this.errHandle(req, res, e));
  }

  readFile (req, res, absPath) {
    return new Promise((resolve, reject) => {
      const fileType = mime.getType(absPath);
      res.setHeader('Content-Type', `${fileType};charset=urf8`);
      res.statusCode = 200;
      // 注意，这个过程是异步的,通过Promise处理成同步逻辑
      createReadStream(absPath).pipe(res).on('finish', resolve);
    });
  }

  errHandle (req, res, r) {
    console.log(r);
    res.statusCode = 404;
    res.end('Not Found!');
  }

  start () {
    // 回调在调用时,this指向不确定
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.config.port, () => {
      console.log(`server is listening on ${this.config.port}`);
    });
  }
}

module.exports = Server;
