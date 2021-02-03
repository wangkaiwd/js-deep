const { getOptions, interpolateName } = require('loader-utils');

// 把文件复制一份生成新的文件名，放到打包目录中
function loader (content, map) {
  const options = getOptions(this) || {};
  const esModule = options.esModule;
  // 根据传入的name选项：[hash:8].[ext] 生成真实的图片名称，并将其放到output指定的打包文件目录中
  const name = interpolateName(this, options.name, { content });
  this.emitFile(name, content, map);
  // es6 export: es6的默认导出在导出内容的default属性上
  // export default : module.exports.default = xxx
  // export var a =1 : module.exports.a = 1
  return `${esModule ? 'exports default' : 'module.exports ='} ${JSON.stringify(name)}`;
}

// 加上这行图片才能正确显示
loader.raw = true;

module.exports = loader;
