const Router = require('@koa/router');
const multer = require('@koa/multer');
const upload = multer({ dest: './uploads' });
const router = new Router();
router.get('/upload', async (ctx) => {
  await ctx.render('index');
});
router.post('/upload', upload.single('avatar'), async (ctx) => {
  ctx.body = ctx.request.file;
});

module.exports = router;
