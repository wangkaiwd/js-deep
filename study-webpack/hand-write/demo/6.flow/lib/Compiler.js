const fs = require('fs');
const path = require('path');
const { SyncHook } = require('tapable');

class Compiler { // 进行编译
  constructor (options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    };
  }

  run () {
    this.hooks.run.call('RunPlugin');
    // 编译
    this.buildModule();
    this.hooks.done.call('DonePlugin');
  }

  buildModule () {
    const { entry, context, module } = this.options;
    const absEntry = path.join(context, entry);
    let originSource = fs.readFileSync(absEntry, 'utf-8');
    const { rules } = module;
    // 对匹配test正则的源代码执行对应的loader
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      const { test, use } = rule;
      // 如果正则匹配了正在处理的文件，那么用loader对其源代码进行处理
      if (test.test(absEntry)) {
        originSource = this.exeLoaders(use, originSource);
      }
    }
  }

  exeLoaders (loaders, source) {
    // 倒着执行loader
    for (let i = loaders.length - 1; i >= 0; i--) {
      // 这里拿到的loaders是路径名，需要通过require将对应的代码导入
      const loader = require(loaders[i]);
      source = loader(source);
    }
    return source;
  }
}

module.exports = Compiler;
