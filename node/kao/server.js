const Koa = require('Koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'hello world!';
});
app.listen(3000, () => {
  console.log('server is start on port 3000');
});
