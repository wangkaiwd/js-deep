// js数据类型
// 基本数据类型（值类型）： 1. string 2. number 3. boolean 4. null 5. undefined 7. Symbol(es6新增) 8. Bigint(新增)
// 复杂数据类型（引用类型）： 6. object: Array Function Regexp Date Math

let a = { x: 100 };
let fn = () => {
  console.log('object key is a function');
};
let array = [1, 2, 3];
let obj = {
  0: 100,
  true: 'wk',
};
obj[a] = 'another obj';
obj[fn] = 'function';
obj[array] = 'array';
// {
//   '0': 100,
//   true: 'wk',
//   '[object Object]': 'another obj',
//   "() => {\n  console.log('object key is a function');\n}": 'function',
//   '1,2,3': 'array'
// }
console.log(obj);

// 对象的key会转换为字符串(调用toString方法)
// ({0:100,true: 'wk'}).toString() => [object Object]
// [1,2,3].toString() => 1,2,3
// (() => {console.log('object key is a function')}).toString() => '() => {\n  console.log('object key is a function');\n}'

// 一道面试题
// const a = {
//   x: 100,
// };
// const b = {
//   y: 200,
// };
// const obj = {};
// obj[a] = 'aaa';
// obj[b] = 'bbb';
//
// console.log('obj', obj);
