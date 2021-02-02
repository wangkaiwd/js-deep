const babel = require('@babel/core');
const path = require('path');

// loader take three parameters: https://webpack.js.org/api/loaders/#thiscallback
function loader (content, inputSourceMap) {
  const options = {
    presets: ['@babel/preset-env'],
    inputSourceMap,
    sourceMaps: true,
    filename: path.basename(this.resourcePath)
  };
  const { code, map, ast } = babel.transformSync(content, options);
  // this.callback: 一个函数为了返回多个参数被同步或异步的调用
  // 如果你想要在loader之间共享公共的ASTs, 传入一个抽象语法树作为第四个参数来加速构建的时间是有用的
  return this.callback(null, code, map, ast);
}

module.exports = loader;
