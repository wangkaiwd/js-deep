// 如何实现模板引擎
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const content = fs.readFileSync(path.join(__dirname, 'test.html'), 'utf8');
console.log(content);

const render = (str, data) => {
  // .+:一个或多个任意字符
  // (...): 捕获parenthesis内的内容
  str = str.replace(/<%=(.+)%>/g, (...args) => {
    // 匹配到的字符串
    return args[1];
  });
};
render(content);
// const html = ejs.render(content, { name: '张三', age: 18 });
// console.log('html', html);
