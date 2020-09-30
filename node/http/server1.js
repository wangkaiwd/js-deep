const http = require('http');
const port = 3000;
// 在充当服务端的时候，req:可读流，res:可写流
const server = http.createServer((req, res) => {
  const arr = [];
  req.on('data', (data) => {
    arr.push(data);
  });
  req.on('end', () => {
    console.log(Buffer.concat(arr).toString());
  });
  res.end('hello');
});

server.listen(port, () => {
  console.log(`server start on ${port}`);
});
