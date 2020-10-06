const Koa = require('koa');
const app = new Koa();
const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('sleep');
      resolve();
    }, 1000);
  });
};
app.use(async (ctx, next) => {
  console.log(1);
  next();
  // 如果用户多次调用next
  // next();
  console.log(2);
});

app.use(async (ctx, next) => {
  console.log(3);
  await sleep();
  next();
  console.log(4);
});

app.use((ctx, next) => {
  console.log(5);
  next();
  console.log(6);
});

app.on('error', (e) => {
  console.log('e', e);
});
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
