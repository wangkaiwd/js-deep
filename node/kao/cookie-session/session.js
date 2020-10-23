// session: 映射，保存请求信息。要尽量把信息保存在服务端
// session 借助 cookie, 它是没有大小限制的。session存在服务器中，服务器重启会丢失信息, 需要持久化存储(如存到redis数据库中)
// 例子： 理发卡消费
// 需求整理：
//  1. 第一次请求时，会获取到请求的对应name的cookie的value -> nameId(id对应的信息要存储到服务端)
//  2. 如果value存在，并且session中有对应的记录，将money减去
//  3. 如果value不存在，为该name创建一个新值(uuid)，默认money为100
const querystring = require('querystring');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const camelToKebabCase = (string) => {
  // $1,$2: a number of special replacement patterns are supported
  return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};
const secret = 'cookie';
const key = 'cut';
const session = {};
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
  if (req.url === '/cut') {
    const keyId = res.getCookie(key, { signed: true });
    if (keyId && session[keyId]) {
      const info = session[keyId];
      info.money = info.money - 10;
      res.end(`Rest money is ${info.money}!`);
    } else {
      const keyId = uuidv4();
      const money = 100;
      session[keyId] = { money };
      res.setCookie(key, keyId, { signed: true });
      res.end(`Rest money is ${money}, first come is free!`);
    }
  }
});
server.listen(3000, () => {
  console.log('server is listening on port 3000');
});
