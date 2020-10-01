const url = require('url');
const fs = require('fs');
const path = require('path');
const http = require('http');
const mime = require('mime');
const port = 3000;
// mime: 媒体类型: media type, content type
// 和文件一起发送的字符串，表示文件的类型
// utilities: 公用设施；通用工具
// path.resolve vs path.join:
// 1. path.resolve resolve a sequence of paths or path segment into an absolute path
// 2. path.join only to join all given path together using the platform-specific separator as delimiter.
// 3. path.join: given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed
//     For instance: path.resolve('/foo','/bar','baz') => '/bar/baz'
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  // 这里不能使用path.resolve, 因为pathname是包含/的，path.resolve会从右向左查找绝对路径，找到就返回
  fs.readFile(path.join(__dirname, pathname), (err, data) => {
    if (err) {
      res.end('Not Found');
    } else {
      // 需要为特定的文件设置请求头浏览器以对应的方式解析
      res.setHeader('Content-Type', 'application/javascript;charset=utf8');
      res.end(data);
    }
  });
});
// listen事件底层将会发射listening事件，最后一个参数callback是listening事件的监听器
server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});

// ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                              href                                              │
// ├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
// │ protocol │  │        auth         │          host          │           path            │ hash  │
// │          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
// │          │  │                     │    hostname     │ port │ pathname │     search     │       │
// │          │  │                     │                 │      │          ├─┬──────────────┤       │
// │          │  │                     │                 │      │          │ │    query     │       │
// "  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │    hostname     │ port │          │                │       │
// │          │  │          │          ├─────────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │          host          │          │                │       │
// ├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
// │   origin    │                     │         origin         │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
// │                                              href                                              │
// └────────────────────────────────────────────────────────────────────────────────────────────────┘
