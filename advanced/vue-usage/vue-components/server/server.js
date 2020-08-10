const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const app = new Koa();
const router = new Router();
const upload = multer(); // note you can pass `multer` options here
const PORT = 3000;

app.use(cors());
// add a route for uploading multiple files
router.post(
  '/upload',
  upload.fields([
    {
      name: 'file',
      maxCount: 5
    }
  ]),
  ctx => {
    console.log('ctx.request.files', ctx.request.files);
    console.log('ctx.files', ctx.files);
    console.log('ctx.request.body', ctx.request.body);
    ctx.body = 'done';
  }
);

// add the router to our app
app.use(router.routes());
app.use(router.allowedMethods());

// start the server
app.listen(PORT, () => {
  console.log(`Koa started in port ${PORT}`);
});
