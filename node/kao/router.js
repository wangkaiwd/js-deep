const Koa = require('koa');
const views = require('koa-views');
const Router = require('@koa/router');
const path = require('path');
const user = require('./routes/user');
const profile = require('./routes/profile');
const app = new Koa();
const router = new Router();
// 模块拆分/路由前缀
app.use(views(path.resolve(__dirname, 'upload/views'), { map: { html: 'ejs' } }));

// 返回路由中间件，该中间件可以派发一个路由匹配请求
app.use(router.routes());
// 返回单独的中间件用于响应options请求，该options请求有一个包含允许请求方法的`Allow`请求头，
// 也会视情况而定响应`405Method Not Allowed` 和 `501 Not Implement`
app.use(router.allowedMethods());
// 副路由挂载子路由
router.use(profile.routes());
router.use('/user', user.routes());
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
