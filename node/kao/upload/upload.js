const Koa = require('koa');
const views = require('koa-views');
const multer = require('@koa/multer');
const Router = require('@koa/router');
const path = require('path');
const app = new Koa();
const router = new Router();
app.use(views(path.resolve(__dirname, 'views'), { map: { html: 'ejs' } }));

// 需求：
//  1. get 请求 /upload: 返回form表单页面
//  2. post 表单上传 /upload，返回上传后的信息
const upload = multer({
  dest: 'uploads/'
}); // note you can pass `multer` options here

router.get('/upload', async (ctx) => {
  console.log('path', ctx.path);
  await ctx.render('index');
});
router.post('/upload', upload.single('avatar'), async (ctx) => {
  console.log(ctx.request.file);
  console.log(ctx.request.body);
  ctx.body = ctx.request.file;
});
app.use(router.routes());
app.use(router.allowedMethods());
// start the server
app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
