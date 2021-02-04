const { getOptions } = require('loader-utils');
const mimeType = require('mime-types');

// 处理的是一个图片模块，模块最终要导出内容：导出base64字符串
// 或者交给file loader处理，最后在dist目录根据特定的文件名复制一个图片，并将图片路径作为模块的module.exports返回值
function loader (content, map, meta) {
  const { limit = 6 * 1024, fallback = 'file-loader' } = getOptions(this);
  const fileType = mimeType.lookup(this.resourcePath);
  console.log('length', content.length < limit);
  if (content.length < limit) { // 小文件使用base64
    // 这里content是Buffer
    // Node.js get image from web and encode with base64: https://stackoverflow.com/a/17133012
    const base64Str = `data:${fileType};base64,${content.toString('base64')}`;
    return `module.exports = ${JSON.stringify(base64Str)}`;
  } else { // 大文件使用file-loader
    const fallbackLoader = require(fallback);
    return fallbackLoader.call(this, content, map, meta);
  }
}

loader.raw = true;
module.exports = loader;
