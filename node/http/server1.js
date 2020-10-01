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
    // 只能写入字符串或者Buffer的实例
    // 前后端通信一般通过json格式字符串
    // message.headers: https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_message_headers
    // key是小写的
    // 根据不同的请求头来分别进行处理
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      res.end(JSON.stringify(querystring.parse(msg)));
    } else if (req.headers['content-type'] === 'application/json') {
      const obj = JSON.parse(msg);
      obj.age = 18;
      res.end(JSON.stringify(obj));
    }
  });
});

server.listen(port, () => {
  console.log(`server start on ${port}`);
});
