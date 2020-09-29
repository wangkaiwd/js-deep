const http = require('http');

// 单线程：这里会发生阻塞
const blockClient = (req, res) => {
  if (req.url === '/sum') {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) {
      sum += i;
    }
    res.end(sum + '');
  } else {
    res.end('ok');
  }
};

// http.createServer([options][,requestListener])
// requestListener 是一个被自动添加到`request`事件的事件

// 下面的俩个请求监听函数都会触发

const server = http.createServer((req, res) => {
  console.log('create server');
});

// server.on('request', (req, res) => {
//   console.log('on request');
// });

// 80,443
// 端口尽量不要低于3000,容易被系统占用
let port = 3000;
server.listen(port, () => {
  console.log(`server start on port ${port}`);
});
server.on('error', (err) => {
  // console.log('err', err);
  if (err.code === 'EADDRINUSE') {
    // 这里不用再次监听回调，当触发listen事件的时候会触发第一次监听时传入的函数
    console.log('err emit');
    server.listen(++port);
  }
});
