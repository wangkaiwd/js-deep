const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
// fs.Stats: 对象，提供一个文件的信息

// Range: 表示服务端应该返回的一个文件的部分
// response status code: 206 Partial Content
const stat = fs.statSync(path.resolve(__dirname, '1.txt'));
const server = http.createServer((req, res) => {

});

server.listen(3000, () => {
  console.log('server is listening on 3000');
});

// request: rang:bytes=4-7
// server: Content-Range: 4-7/2318
