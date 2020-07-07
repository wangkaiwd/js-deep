const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const Vue = require('vue');
const vueServerRender = require('vue-server-renderer');

const template = fs.readFileSync('./index.template.html', 'utf8');
const renderer = vueServerRender.createRenderer({ template });
const context = {
  title: 'vue ssr',
};
const vm = new Vue({
  data: {
    msg: 'hhh'
  },
  template: `
    <div>这是一段初始文字：{{msg}}</div>`
});
app
  .use(router.routes())
  .use(router.allowedMethods());

// response
router.get('/', async (ctx) => {
  renderer.renderToString(vm, context).then((response) => {
    ctx.body = response;
  });
});

app.listen(3000);
