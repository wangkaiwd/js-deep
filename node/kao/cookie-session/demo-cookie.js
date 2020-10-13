// koa 实现登录，并对登录权限进行校验
// session: 前后端不分离
// usage of koa cookie
// 需求：
//  1. login.html,list.html
//  2. 登录后跳转到list.html,之后都可以访问
//  3. 直接访问list.html会调转到login.html
const Koa = require('koa');
const views = require('koa-views');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const path = require('path');
const app = new Koa();
const router = new Router();
// 设置已签名的cookie秘钥
app.keys = ['koa'];

app.use(bodyParser());
app.use(session(app));
app.use(views(path.join(__dirname, 'views'), { map: { html: 'ejs' } }));
app.use(router.routes());

router.get('/', async (ctx) => {
  await ctx.render('login');
});
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username === 'admin' && password === 'admin') {
    ctx.cookies.set('username', username, { signed: true });
    // session就是一个对象，每次cookie请求会携带sessionId
    // session内部会通过请求携带的cookie来找对session中存储的内容
    // 设置session的时候，会重新设置cookie
    ctx.session.user = { username, password };
    ctx.redirect('/list');
  } else {
    ctx.redirect('/');
  }
});
router.get('/list', async (ctx) => {
  const { user } = ctx.session;
  if (user) {
    const username = ctx.cookies.get('username', { signed: true });
    console.log('username', username);
    await ctx.render('list', { ...user });
  } else {
    ctx.redirect('/');
  }
});
app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
