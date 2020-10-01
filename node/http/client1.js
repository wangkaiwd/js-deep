const http = require('http');

const options = {
  port: 3000,
  method: 'POST',
  path: '/?a=1',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json'
  }
};

const ws = http.request(options, (res) => {
  // 在充当客户端发起http请求时，res是可读流
  const arr = [];
  res.on('data', (data) => {
    arr.push(data);
  });
  res.on('end', () => {
    console.log(JSON.parse(Buffer.concat(arr).toString()));
  });
});

// ws.end('a=1&b=2&c=3');
ws.end('{"name": "zs"}');
