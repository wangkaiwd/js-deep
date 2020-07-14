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

// 执行步骤：
// 1. Module._load 加载模块
// 2. Module._resolveFilename 把相对路径转换成绝对路径
// 3. const module = new Module 创建一个模块， 模块的信息： id, exports
// 4. tryModuleLoad 尝试加载模块
// 5. 通过不同的后缀加载 .json/.js
// 6. Module._extensions 定义不同后缀文件的处理方法
// 7. 核心是读取文件
// 8. 外层文件增加一个函数，并且让函数执行(改变了this, export, module, require, __dirname, __filename)
// 9. 用户给module.exports赋值
// 10. 最终返回module.exports
