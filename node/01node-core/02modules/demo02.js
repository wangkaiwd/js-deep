const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module (id) {
  this.id = id; // 文件相对路径
  this.exports = {}; // 表示模块返回的结果
}

Module.prototype.load = function () {
  const extname = path.extname(this.id);
  Module._extensions[extname](this);
};

Module._resolveFilename = function (filename) {
  const absolutePath = path.resolve(filename);
  const exist = fs.existsSync(filename);
  if (exist) {
    return absolutePath;
  } else {
    const keys = Object.keys(Module._extensions);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const fullPath = absolutePath + key;
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
  }
};
Module._load = function () {

};
Module.wrapper = ['(function (exports,require,module,__filename,__dirname) {', '})'];
Module._extensions = {
  '.js' (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    const dirname = path.dirname(module.id);
    content = Module.wrapper[0] + content + Module.wrapper[1];
    const fn = vm.runInThisContext(content);
    fn.call(exports, exports, myRequire, module, module.id, dirname);
  },
  '.json' () {
    let content = fs.readFileSync(module.id, 'utf8');
    const dirname = path.dirname(module.id);
  }
};
const myRequire = function (filename) {
  // 解析文件名，没有文件缀要添加
  filename = Module._resolveFilename(filename);
  const module = new Module(filename);
  module.load();
  return module.exports;
};

const a = myRequire('./a');

console.log('a', a);

// 1. 复习现有代码
// 2. 实现多次加载缓存
// 3. 解析json
