const http = require('http');
// key,value
// domain: 指定那个主机允许接收cookie。默认为设置cookie的同源域名，不包括子域名
// path: 为了发送Cookie头，path必须在请求URL中存在(以path开头的路径，默认为/，匹配所有请求路径)
// expires/max-age： 生存时间
// httpOnly：一个具有`HttpOnly`属性的`cookie`对于`JavaScript`的`Document.cookie`来说是无法访问的，只能被服务器发送。
const server = http.createServer((req, res) => {
  if (req.url === '/write') {
    // Use an array of string here to send multiple headers with the same name
    // 这里使用字符串数组来发送拥有相同名字的多个响应头
    // 不能使用中文？
    // 设置域名后，只有在指定域名及其子域名可以访问
    res.setHeader('Set-Cookie', ['name=zs; Domain=.b.cn', 'age=10; httpOnly=true', 'test=hhh; path=/write']);
    res.end('write ok');
  } else if (req.url === '/read') {
    res.end(req.headers.cookie || 'empty');
  } else if (req.url === '/write/read') {
    res.end(req.headers.cookie);
  } else {
    res.end('Not Found');
  }
});
server.listen(3000, () => {
  console.log('server is listening on port 3000');
});
