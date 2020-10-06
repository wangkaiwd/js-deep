// 通过package.json中的main字段指定入口文件
const Koa = require('./koa');

const app = new Koa();

// ctx 包含了原生的相应和请求： req/res
//     也包含了自己封装的请求和响应： request/response
app.use((ctx) => {
  // 当前自己封装的request上有原生的req
  // console.log(ctx.request.req.path);
  // console.log(ctx.req.path); // 原生
  //
  // console.log(ctx.request.path); // 自己封装
  // // 简写
  // console.log(ctx.path);
  // res.end('hello');
  ctx.body = 'hello world'
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
