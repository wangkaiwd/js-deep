// 错误处理： 1. 文档 2. 实现 3. app.param实现

// 1. 通过错误代码会自动处理
// 2. 异步错误必须传递给next()函数
const express = require('express');

const app = express();

app.use(function (req, res, next) {
  if (req.url === '/a') {
    // skip remain middlewares an route handlers to error handle middleware
    next('error path is a');
  } else {
    next();
  }
});
app.get('/a/b', (req, res, next) => {
  next('error fail');
}, (req, res, next) => {
  res.end('/a/b');
});
app.get('*', (req, res, next) => {
  res.end(' * asterisk is all');
});

app.use(function (err, req, res, next) {
  res.send(err);
});

app.listen(3000, function () {
  console.log('server is listening port 3000');
});
