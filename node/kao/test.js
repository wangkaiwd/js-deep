// 如何实现模板引擎
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const content = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8');

const render = (str, data) => {
  const head = 'let html = ""\r\nwith(data) {\r\nhtml+=`';
  // .+:一个或多个任意字符
  // (...): 捕获parenthesis内的内容
  str = str.replace(/<%=(.+?)%>/g, (...args) => { // 只会替换匹配到的内容，并且最终返回源字符串被替换后的结果
    return '${' + args[1] + '}';
  });
  const content = str.replace(/<%(.+?)%>/g, (...args) => {
    // 匹配到的字符串
    return '`\r\n' + args[1] + '\r\nhtml+=`';
  });
  const tail = '`}\r\nreturn html';
  return new Function('data', head + content + tail)(data);
};
console.log(render(content, { arr: [1, 2, 3], name: '张三', age: 18 }));
// const html = ejs.render(content, { name: '张三', age: 18 });
// console.log('html', html);
