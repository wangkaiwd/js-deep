const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const languages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  },
  'zh-CN': {
    message: {
      hello: '你好，世界！'
    }
  }
};

// Accept-Language: en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7
const server = http.createServer((req, res) => {
  const acceptLanguage = req.headers['accept-language'];
  const arr = acceptLanguage.split(',').map(item => {
    const [name, value = 'q=1'] = item.split(';');
    const [, q] = value.split('=');
    return {
      name,
      q
    };
  }).sort((a, b) => b.q - a.q);
  // sort: 如果没有传入比较函数，元素会被转换为字符串
  // function compare(a,b) {
  //    if(a < b) { // a 先出现
  //      return -1
  //    }
  //    if(a > b) { // b 先出现
  //      return 1
  //    }
  //    return 0
  // }
  for (let i = 0; i < arr.length; i++) {
    const { name } = arr[i];
    const language = languages[name];
    if (language) {
      res.setHeader('Content-Language', name);
      return res.end(language.message.hello);
    }
  }
  res.end('Have not support language!');
});

server.listen(3000, () => {
  console.log('server is listening on 3000');
});
