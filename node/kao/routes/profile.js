const Router = require('@koa/router');
const router = new Router();
router.prefix('/profile');

router.get('/add', (ctx) => {
  ctx.body = '添加';
});

module.exports = router;
