const Koa = require('koa');
const app = new Koa();

// 中间件能解决那些问题：
// 1. 封装属性和方法 koa-bodyparser ctx.request.body
// 2. 提前处理请求 koa-static
// 3. 权限校验
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
