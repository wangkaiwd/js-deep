const { getOptions, interpolateName } = require('loader-utils');

// 把文件复制一份生成新的文件名，放到打包目录中
function loader (content) {
  const options = getOptions(this) || {};
  const name = interpolateName(this, options.name, { content });
  return `module.exports = ${JSON.stringify(name)}`;
}

module.exports = loader;
