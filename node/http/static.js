const url = require('url');
const fs = require('fs');
const path = require('path');
const http = require('http');
const port = 3000;
// utilities: 公用设施；通用工具
// path.resolve vs path.join:
// 1. path.resolve resolve a sequence of paths or path segment into an absolute path
// 2. path.join only to join all given path together using the platform-specific separator as delimiter.
// 3. path.join: given sequence of paths is processed from right to left, with each subsequent path prepended until an absolute path is constructed
//     For instance: path.resolve('/foo','/bar','baz') => '/bar/baz'
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

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
