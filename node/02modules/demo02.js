const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module (id) {
  this.id = id; // 文件绝对路径
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
Module._cache = {};

Module._extensions = {
  '.js' (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    const dirname = path.dirname(module.id);
    content = Module.wrapper[0] + content + Module.wrapper[1];
    // vm.runInThisContext node中执行`js`代码
    const fn = vm.runInThisContext(content);
    fn.call(exports, exports, myRequire, module, module.id, dirname);
  },
  '.json' (module) {
    let content = fs.readFileSync(module.id, 'utf8');
    module.exports = JSON.parse(content);
  }
};
const myRequire = function (filename) {
  //将路径解析为绝对路径 ，如果没有文件后缀会按照`.js`,`.json`的顺序进行添加
  filename = Module._resolveFilename(filename);
  // 模块引用过一次之后进行缓存，如果再次引用，不会再加载，而是直接将结果返回
  const cacheModule = Module._cache[filename];
  if (cacheModule) {
    return cacheModule.exports;
  }
  const module = new Module(filename);
  Module._cache[filename] = module;
  // 获取到文件后缀，然后加载对应后缀的文件
  module.load();
  // load方法会更改module.exports
  return module.exports;
};

const a = myRequire('./a');

const b = myRequire('./b');
console.log(b);

// 1. 复习现有代码
// 2. 实现多次加载缓存
// 3. 解析json
