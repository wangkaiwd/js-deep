// 通过package.json中的main字段指定入口文件
const Koa = require('./koa');

const app = new Koa();

app.use((req, res) => {
  res.end('hello');
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
