const http = require('http');

const options = {
  port: 3000,
};

const ws = http.request(options, (res) => {
  // 在充当客户端发起http请求时，res是可读流
  const arr = [];
  res.on('data', (data) => {
    arr.push(data);
  });
  res.on('end', () => {
    console.log(Buffer.concat(arr).toString());
  });
});

ws.end('a=1&b=2&c=3');
