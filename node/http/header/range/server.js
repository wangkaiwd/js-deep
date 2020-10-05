const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
// fs.Stats: 对象，提供一个文件的信息

// Range: 表示服务端应该返回的一个文件的部分
// response status code: 206 Partial Content
// response header: Content-Range
const { size } = fs.statSync(path.resolve(__dirname, '1.txt'));
const server = http.createServer((req, res) => {
  const range = req.headers['range'];
  const { pathname } = url.parse(req.url);
  if (range) {
    // (...) Capture everything enclosed
    // \d: Any digit
    // a*: Zero or more of a
    // range.match 返回一个数组，0：第一次完整匹配的字符串， 1: 捕获分组1， 2. 捕获分组2, 3. group, 4. 被匹配字符串在源字符串中被发现的索引位置 5. input: 源字符串
    const [, start, end] = range.match(/(\d*)-(\d*)/);
    console.log('start', start, end);
    res.setHeader('Content-Range', `${start}-${end}/${size}`);
    // Partial Content
    res.statusCode = 206;
    fs.createReadStream(path.join(__dirname, pathname), { start: Number(start), end: Number(end) }).pipe(res);
    return;
  }
  res.end('not found!');
});

server.listen(3000, () => {
  console.log('server is listening on 3000');
});

// request: rang:bytes=4-7
// server: Content-Range: 4-7/2318
