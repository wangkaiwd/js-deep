const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const referrer = req.headers['referer'];
  const errorHandle = (e) => {
    console.log('err', e);
    res.end('Not Found');
  };
  // referrer存在并且内容为图片时，会进行主机和referrer中的主机比对
  const createReadStream = (dir) => fs.createReadStream(path.join(__dirname, dir));
  const readStream = createReadStream(pathname);
  readStream.on('error', errorHandle);
  if (referrer && /\.jpg|\.png/.test(pathname)) {
    const host = req.headers['host'];
    // 只有在页面中引用图片才有referrer, 如果直接访问的话不会有referrer
    const referrerHost = url.parse(referrer).host;
    if (host === referrerHost) {
      readStream.pipe(res);
    } else {
      // 不是相同域名下的来源地址访问时，返回特定的错误图片
      createReadStream('1.png').pipe(res);
    }
  } else {
    readStream.pipe(res);
  }
});

server.listen(3000, () => {
  console.log('server is listening on 3000');
});
