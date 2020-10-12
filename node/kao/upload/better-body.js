const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const betterBody = require('./koa-body');
app.use(betterBody({ dest: './uploads' }));
app.use(views(path.resolve(__dirname, 'views'), { map: { html: 'ejs' } }));
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    ctx.body = 'icon';
    return;
  }
  if (ctx.path === '/upload' && ctx.method === 'GET') {
    // ctx.render不会调用next，只是提供了一个读取文件，并进行字符串替换的方法而已，而读取文件的操作是异步的
    // 如果不写await, 会提前将中间键走完，返回一个状态为resolved值为undefined的promise,然后在.then中的成功回调中处理ctx.body
    // 此时body 为赋值，会返回404 Not Found
    await ctx.render('index');
  } else {
    next();
  }
});

app.use(async (ctx) => {
  console.log('ctx', ctx.path);
  if (ctx.path === '/upload' && ctx.method === 'POST') {
    ctx.body = ctx.request.file;
  } else {
    ctx.body = 'Not Found!';
  }
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
