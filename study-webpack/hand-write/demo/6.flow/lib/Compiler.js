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
    this.hooks.done.call('DonePlugin');
  }
}

module.exports = Compiler;
