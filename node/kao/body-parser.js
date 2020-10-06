const Koa = require('koa');
const bodyParser = require('./koa-bodyparser');
const app = new Koa();
app.use(bodyParser());
app.use(async (ctx, next) => {
  if (ctx.path === '/form' && ctx.method === 'GET') {
    ctx.body = `
      <form action="/form" method="post">
        用户名: <input type="text" name="username"><br>
        密码: <input type="text" name="password"><br>
        <button>提交</button>
      </form>
    `;
  } else {
    // next 最终也会返回Promise
    // 一定要在next前加await
    ctx.body = ctx.request.body;
  }
});
// const bodyParser = (ctx) => {
//   return new Promise((resolve) => {
//     const arr = [];
//     ctx.req.on('data', (chunk) => {
//       arr.push(chunk);
//     });
//     ctx.req.on('end', () => {
//       ctx.body = Buffer.concat(arr).toString();
//       resolve();
//     });
//   });
// };
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
