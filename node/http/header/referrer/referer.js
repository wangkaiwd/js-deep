const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  if (/\.jpg|\.png/.test(pathname)) {
    const host = req.headers['host'];
    const referrer = req.headers['referer'];
    const referrerHost = url.parse(referrer).host;
    console.log('req.headers', req.headers, host, referrerHost);
    if (host === referrerHost) {
      fs.readFile(path.join(__dirname, pathname), (err, data) => {
        res.end(data);
      });
    } else {
      // 不是相同域名下的来源地址访问时，返回特定的错误图片
      fs.readFile(path.join(__dirname, '1.png'), (err, data) => {
        res.end(data);
      });
    }
  } else {
    fs.readFile(path.join(__dirname, pathname), (err, data) => {
      res.end(data);
    });
  }
});

server.listen(3000, () => {
  console.log('server is listening on 3000');
});
