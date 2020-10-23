const router = require('koa-router')();
// 设置路由前缀
router.prefix('/users');

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!';
});

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response';
});

module.exports = router;
