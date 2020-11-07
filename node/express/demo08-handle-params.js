// app.param([name],callback):
//   定义在app上的param回调只会被定义在app路由上的路由参数触发

// 在参数出现的任何路由处理器之前，所有的param回调将会被调用。并且在请求响应周期中，即使参数在多个路由中匹配，它们也只会被调用一次。
const express = require('express');

const app = express();

// 对参数进行单独处理,在匹配当参数路由之前执行
app.param('name', (req, res, next, value, name) => {
  console.log('key', value, name);
  if (value === 'wk') {
    req.params.name = 'wkwd';
  }
  next();
});
app.param('id', (req, res, next, value, name) => {
  if (value === '1') {
    req.params.id = '10';
  }
  next();
});

app.get('/user', (req, res, next) => {
  res.end('user');
});

app.get('/user/:id/:name', (req, res, next) => {
  console.log('get');
  res.end(JSON.stringify(req.params));
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
