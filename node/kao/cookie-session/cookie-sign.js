// 防止篡改cookie:
//  * 尽管设置了httpOnly,但是还是可以通过调试工具Application直接修改cookie
//  * crypto sha256
//  * base64 字符串在传输过程中会把 /+= 变成 ' '
//  * cookie 都用签名
// cookie 无法删除，可以设置过期时间为过去的某个时间，来实现与删除相同的功能
// https://stackoverflow.com/a/27981898/11720536
const querystring = require('querystring');
const crypto = require('crypto');
const camelToKebabCase = (string) => {
  // $1,$2: a number of special replacement patterns are supported
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

const secret = 'cookie';

// 进行签名
const sign = (value) => {
  // base64 字符串在传输过程中会把 /+= 变成 ''(空字符串)
  return crypto.createHmac('sha1', secret)
    .update(String(value))
    .digest('base64')
    .replace(/[\/+=]/g, '');
};

const http = require('http');
const server = http.createServer((req, res) => {
  function myCookie () {
    // 封装设置cookie的方法
    const array = [];
    return function (key, value, options = {}) {
      if (options.signed) {
        value = value + '.' + sign(value);
      }
      delete options.signed;
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
  }

  res.setCookie = myCookie();
  res.getCookie = function (key, options = {}) {
    const cookie = req.headers['cookie'];
    const obj = querystring.parse(cookie, '; ');
    const value = obj[key];
    if (options.signed) {
      const [val, hash] = value.split('.');
      // 如何客户端对内容进行修改，重新对值进行签名，获取到的结果将会发生变化
      if (sign(val) === hash) {return val;} else {return undefined;}
    }
    return value;
  };
  if (req.url === '/write') {
    res.setCookie('name', 'zs', {
      domain: '.b.cn',
      path: '/',
      maxAge: 10
    });
    res.setCookie('age', 18, {
      httpOnly: true,
      signed: true, // 增加签名，加盐算法
    });
    res.end('write ok');
  } else if (req.url === '/read') {
    res.end(res.getCookie('age', { signed: true }) || 'empty');
  } else {
    res.end('Not Found');
  }
});
server.listen(3000, () => {
  console.log('server is listening on port 3000');
});
