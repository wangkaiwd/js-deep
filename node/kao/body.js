const Koa = require('./koa');
const app = new Koa();
const fs = require('fs');
const path = require('path');
const rs = fs.createReadStream(path.join(__dirname, 'server.js'));
app.use((ctx) => {
  // ctx.body = { name: 'zs' };
  // ctx.body = 404;
  // 原生的res.write/res.end在非对象模式下只能是string , Buffer 或 Uint8Array
  // ctx.body = 'hello';
  // stream: 流，会直接下载文件
  ctx.body = rs;
});

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
