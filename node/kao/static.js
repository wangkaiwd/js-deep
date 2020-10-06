const Koa = require('koa');
const serve = require('./koa-static');
const app = new Koa();
app.use(serve(__dirname));
app.use(serve(require('path').join(__dirname, 'node_modules')));
// app.use(async (ctx, next) => {
// });
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
