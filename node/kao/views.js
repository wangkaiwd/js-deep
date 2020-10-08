const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const app = new Koa();
// 中间件能解决那些问题：
// 1. 封装属性和方法 koa-bodyparser ctx.request.body
// 2. 提前处理请求 koa-static
// 3. 权限校验
app.use(views(path.join(__dirname, 'template'), { extension: 'ejs' }));
// 会增加一个ctx.render方法，调用来渲染页面
app.use(async (ctx) => {
  await ctx.render('index', { name: 'zs' });
});
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
