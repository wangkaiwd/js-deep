// 在文件执行的过程中，默认文件会被加一层函数
// console.log(this); // {}

//
// exports require module __filename __dirname
// console.log('arguments', arguments);

// __filename: 当前文件 绝对路径
// __dirname: 当前文件运行的文件夹

// 将文件内容放到自执行函数中，然后通过module.exports返回
// const a = (function (exports, require, module, __filename, __dirname) {
//   const a = 1;
//   module.exports = 'hello';
//   return module.exports;
// })(exports, require, module, __filename, __dirname);
const a = require('./a');
console.log(a);

// 1. 执行require方法
// 2. mod.require
// 3. Module._load
// 4. Module._resolveFilename
// 5.
