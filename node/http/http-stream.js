const http = require('http');

const server = http.createServer((req, res) => {
  // req是可读流
  let arr = [];
  // 请求
  // data只在传入数据时才触发
  req.on('data', (chunk) => {
    arr.push(chunk);
  });
  // 可读流如果读取不到数据，内部会push null
  // end事件一定会触发
  req.on('end', () => {
    console.log('end', Buffer.concat(arr).toString());
  });

  res.statusCode = 200;
  // 文本类型要指定字符编码，utf8 -> utf-8,为了兼容ie
  res.setHeader('Content-Type', 'text/plain;charset=utf-8');
  // 设置自定义响应头
  res.setHeader('a', '1');
  res.end('hello');
});

let port = 3000;
server.listen(port, () => {
  console.log(`server start on port ${port}`);
});
