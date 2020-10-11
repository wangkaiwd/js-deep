// 封装原生cookie设置方法，方便使用
// res.setCookie(key,value,options)
// res.getCookie(key): querystring(自定义key,value pair and keys,values分隔符) 用来解析cookie
// 防止篡改cookie:
//  * 尽管设置了httpOnly,但是还是可以通过调试工具Application直接修改cookie
//  * crypto sha256
//  * base64 字符串在传输过程中会把 /+= 变成 ' '
//  * cookie 都用签名
const camelToKebabCase = (string) => {
  // $1,$2: a number of special replacement patterns are supported
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

const http = require('http');
const server = http.createServer((req, res) => {
  // 封装设置cookie的方法
  const array = [];
  res.setCookie = function (key, value, options = {}) {
    const settings = Object.keys(options).reduce((accumulator, current) => {
      const val = options[current];
      if (current === 'httpOnly') {
        accumulator.push(`httpOnly=${val}`);
      } else if (current === 'expires') {
        accumulator.push(`expires=${val.toUTCString()}`);
      } else {
        accumulator.push(`${camelToKebabCase(current)}=${val}`);
      }
      return accumulator;
    }, [`${key}=${value}`]);
    array.push(settings.join('; '));
    res.setHeader('Set-Cookie', array);
  };
  res.getCookie = function (key) {

  };
  if (req.url === '/write') {
    res.setCookie('name', 'zs', {
      domain: '.b.cn',
      path: '/',
      maxAge: 10
    });
    res.setCookie('age', 18, { httpOnly: true, expires: new Date(Date.now() + 10 * 1000) });
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
