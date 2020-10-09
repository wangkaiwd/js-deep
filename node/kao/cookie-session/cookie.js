const http = require('http');
// key,value
// domain
// path: 为了发送Cookie头，path必须在请求URL中存在
// expires/max-age： 生存时间
// httpOnly：一个具有`HttpOnly`属性的`cookie`对于`JavaScript`的`Document.cookie`来说是无法访问的，只能被服务器发送。
const server = http.createServer((req, res) => {
  if (req.url === '/write') {
    // Use an array of string here to send multiple headers with the same name
    // 这里使用字符串数组来发送拥有相同名字的多个响应头
    // 不能使用中文？
    res.setHeader('Set-Cookie', ['name=zs', 'age=10']);
    res.end('write ok');
  } else {
    res.end('Not Found');
  }

});
server.listen(3000, () => {
  console.log('server is listening on port 3000');
});
