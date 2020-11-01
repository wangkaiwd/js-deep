const pathToRegexp = require('path-to-regexp');
const keys = [];
const regexp = pathToRegexp('/foo/:bar', keys);
console.log('reg', regexp, keys);
// /name/1/2  /name/:id/:age  => {id:3, age: 2}
const configUrl = '/name/:id/:age';
const requestUrl = '/name/1/2';
const arr = [];
const str = configUrl.replace(/\/:([^\/]+)/g, function () {
  arr.push(arguments[1]);
  return '\/([^\/]+)';
});
const reg = new RegExp('^' + str + '$');
const obj = {};

const matches = requestUrl.match(reg);
arr.forEach((item, i) => {
  obj[item] = matches[i + 1];
});

// 思路： 通过正则匹配到:后的字符串，然后再通过正则从路径中将参数匹配出来，最后将这俩部分组合成对象

// 路由的地址可以在拿到冒号后的字符串后替换为正则，然后再通过正则去匹配真正的地址
// 正则： (?:...) is similar to (...), but won't create a capture group
