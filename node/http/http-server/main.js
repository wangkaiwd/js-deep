const http = require('http');
const mime = require('mime');
const path = require('path');
const url = require('url');
const { promisify } = require('util');
const crypto = require('crypto');
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
          console.log('pathname', pathname);
          return this.readFile(req, res, absPath, stat);
        }
        return this.readDir(req, res, absPath, pathname);
      })
      .catch(e => this.errHandle(req, res, e));
  }

  // 1. 强制缓存：服务端设置，当前请求发送完毕后，如果再发送请求，可以设置在某段时间之内不会再向服务端发起请求，而是在浏览器缓存中查找
  //    expires: 过期时间
  //    cache-control
  // 2. 协商缓存：缓存期间，文件内容发生了变化
  cache (req, res, absPath, stat) {
    // 设置10s的缓存，为了保险起见，Expires和cache-control都会被设置
    // 同时设置cache-control max-age与Expires时会忽略Expires
    // res.setHeader('Expires', new Date(Date.now() + 15 * 1000));
    // res.setHeader('cache-control', 'max-age=15');
    // 每次都会请求服务器，询问文件是否发生了变化
    // 根据文件更改时间来判断文件是否发生更改
    // res.setHeader('cache-control', 'no-cache');
    // 协商缓存和强制缓存一起设置，10s内从缓存中查找，10s后服务端进行修改时间比对
    // 之后继续重复缓存步骤
    // res.setHeader('cache-control', 'max-age=10');
    return fs.readFile(absPath).then((data) => {
      res.setHeader('Expires', new Date(Date.now() + 15 * 1000));
      res.setHeader('cache-control', 'max-age=10');
      const etag = crypto.createHash('md5').update(data).digest('base64');
      const ifNoneMatch = req.headers['if-none-match'];
      res.setHeader('ETag', etag);
      return etag === ifNoneMatch;
    }).then((cacheable) => {
      if (cacheable) {return cacheable;}
      const ctime = stat.ctime.toString(); // 文件最后一次修改时间
      const ifModifiedSince = req.headers['if-modified-since'];
      res.setHeader('Last-Modified', ctime);
      return Promise.resolve(ctime === ifModifiedSince);
    });
    // Last-Modified
    // 要注意这里的事件要统一格式
    // const ctime = stat.ctime.toString(); // 文件最后一次修改时间
    // 上一次的修改时间
    // headers中 key是为小写
    // const ifModifiedSince = req.headers['if-modified-since'];
    // res.setHeader('Last-Modified', ctime);
    // 最后一次时间相同，说明使用缓存，否则要重新请求资源
    // return ctime === ifModifiedSince;
  }

  readFile (req, res, absPath, stat) {
    return new Promise((resolve, reject) => {
      const fileType = mime.getType(absPath);
      res.setHeader('Content-Type', `${fileType};charset=utf-8`);
      return this.cache(req, res, absPath, stat).then((cacheable) => {
        if (cacheable) {
          res.statusCode = 304;
          res.end();
          return resolve();
        }
        res.statusCode = 200;
        // 注意，这个过程是异步的,通过Promise处理成同步逻辑
        createReadStream(absPath).pipe(res)
          .on('finish', resolve)
          .on('error', (e) => reject(e));
      });
    });
  }

  readDir (req, res, absPath, pathname) {
    return fs.readdir(absPath).then((dirs) => {
      dirs = dirs.map(dir => ({ name: dir, href: path.join(pathname, dir) }));
      return renderFile(path.join(__dirname, 'template.ejs'), { dirs });
    }).then((str) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html;charset=utf8');
      res.end(str);
    });
  }

  errHandle (req, res, e) {
    console.log('err', e);
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
