const Koa = require('koa');
const app = new Koa();
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
    await next();
  }
});
const bodyParser = (ctx) => {
  return new Promise((resolve) => {
    const arr = [];
    ctx.req.on('data', (chunk) => {
      arr.push(chunk);
    });
    ctx.req.on('end', () => {
      ctx.body = Buffer.concat(arr).toString();
      resolve();
    });
  });
};
app.use(async (ctx) => {
  if (ctx.path === '/form' && ctx.method === 'POST') {
    // 读取内容是异步的，异步内容是不会进行等待的，只有Promise才会等待
    // 内容是会将该回调函数作为参数传入Promise.resolve(cb)中,
    // Promise.resolve中如果传入Promise会直接将Promise返回，而该Promise的状态取决于其内部的实现，调用reject即返回一个rejected状态的promise
    // 如果调用resolve,resolve中还有Promise的话，会等到resolve中传入的所有Promise全部解析完毕后，在最终的promise中调用最外部Promise的resolve方法
    // 如果resolve中的某个promise执行了reject,那么最终就会调用最外部promise内容的reject方法
    // const arr = [];
    // ctx.req.on('data', (data) => {
    //   arr.push(data);
    // });
    // ctx.req.on('end', () => {
    //   console.log('string', Buffer.concat(arr).toString());
    //   ctx.body = Buffer.concat(arr).toString();
    // });
    // next();
    await bodyParser(ctx);
  }
});
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
