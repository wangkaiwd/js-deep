const http = require('http');
const port = 3000;
// 为解析和格式化URL查询字符串提供了实用工具
const querystring = require('querystring');
// 在充当服务端的时候，req:可读流，res:可写流
const server = http.createServer((req, res) => {
  const arr = [];
  req.on('data', (data) => {
    arr.push(data);
  });
  req.on('end', () => {
    const msg = Buffer.concat(arr).toString();
    console.log('msg', querystring.parse(msg));
  });
  res.end('hello');
});

server.listen(port, () => {
  console.log(`server start on ${port}`);
});
