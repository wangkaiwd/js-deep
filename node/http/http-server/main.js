const http = require('http');
const mime = require('mime');
const path = require('path');
const url = require('url');
const { promisify } = require('util');
const fs = require('fs').promises;
const ejs = require('ejs');
const renderFile = promisify(ejs.renderFile);
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
        return this.readDir(req, res, absPath, pathname);
      })
      .catch(e => this.errHandle(req, res, e));
  }

  readFile (req, res, absPath) {
    return new Promise((resolve, reject) => {
      const fileType = mime.getType(absPath);
      res.setHeader('Content-Type', `${fileType};charset=utf-8`);
      res.statusCode = 200;
      // 注意，这个过程是异步的,通过Promise处理成同步逻辑
      createReadStream(absPath).pipe(res).on('finish', resolve);
    });
  }

  readDir (req, res, absPath, pathname) {
    return fs.readdir(absPath).then((dirs) => {
      dirs = dirs.map(dir => ({ name: dir, href: path.join(pathname, dir) }));
      return renderFile(path.join(__dirname, 'template.ejs'), { dirs });
    }).then((str) => {
      res.statusCode = 200;
      res.end(str);
    });
  }

  errHandle (req, res, r) {
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
