const http = require('http');
// key,value
// domain
// path
// expires/max-age
// httpOnly
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
