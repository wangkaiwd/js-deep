const Koa = require('koa');
const multer = require('@koa/multer');
const app = new Koa();
// 需求：
//  1. get 请求 /upload: 返回form表单页面
//  2. post 表单上传 /upload，返回上传后的信息
const upload = multer({
  dest: 'uploads/'
}); // note you can pass `multer` options here

app.use(async () => {

});
// start the server
app.listen(3000, () => {
  console.log(`server is listening on port 3000`);
});
