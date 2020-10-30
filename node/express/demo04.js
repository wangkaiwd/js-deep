const express = require('./my-express');
const app = express();
app.use(function (req, res, next) {
  console.log('empty');
  req.a = 1;
  next();
});

// 中间件的路径匹配规则是判断是否以路径+/开头以及路径是否是其本身
// A route will match any path that follow its path immediately with '/'
// 默认为'/'，会匹配所有路径
app.use('/', (req, res, next) => {
  console.log('/');
  req.a++;
  next();
});

app.use('/a', (req, res, next) => {
  console.log('/a');
  req.a++;
  next();
});

app.get('/a', (req, res, next) => {
  console.log(req.a);
  res.end('get /a');
});
// 中间件将会匹配任何以'/'紧跟着中间件中传入的path的路径对应的路由
app.get('/a/b', (req, res) => {
  console.log(req.a);
  res.end('get /a/b');
});
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
