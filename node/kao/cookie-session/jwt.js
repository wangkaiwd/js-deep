// JWT: json web token, 是目前最流行的跨域身份人认证解决方案
const Koa = require('koa');
const body = require('koa-bodyparser');
const path = require('path');
const Router = require('@koa/router');
const jwt = require('jwt-simple');
const crypto = require('crypto');
const app = new Koa();
const router = new Router();
const secret = 'koa';
app.use(body());
app.use(router.routes());
// const jwt = {
//   toBase64 (value) {
//     value = JSON.stringify(value);
//     return this.base64URLEscape(Buffer.from(value).toString('base64'));
//   },
//   encode (payload, secret) {
//     const head = this.toBase64({ typ: 'JWT', alg: 'HS256' });
//     console.log('payload1', payload);
//     payload = this.toBase64(payload);
//     console.log('payload2', payload);
//     const sign = this.sign([head, payload].join('.'), secret);
//     return [head, payload, sign].join('.');
//   },
//   base64URLEscape (value) {
//     console.log('beforeEscape', value);
//     return value.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
//   },
//   sign (content, secret) {
//     const hash = crypto.createHmac('sha256', secret).update(content).digest('base64');
//     return this.base64URLEscape(hash);
//   }
// };
// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImFkbWluIg.3QhFGYM6iH5M-cbatPaxmVwrHtSKdK9t8H4ngabSx_4
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  if (username === 'admin' && password === 'admin') {
    // head.payload.signature
    const token = jwt.encode(username, secret);
    ctx.body = {
      code: 200,
      username,
      token
    };
  }
});
router.get('/isLogin', async (ctx) => {
  const token = ctx.get('authorization');
  if (token) {
    try {
      const decoded = jwt.decode(token, secret);
      ctx.body = { code: 200, data: decoded };
    } catch (e) {
      console.log('error', e);
      ctx.body = {
        code: 2,
        data: 'token解析失败'
      };
    }
  } else {
    ctx.body = {
      code: 1,
      data: '没有登录'
    };
  }
});
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
