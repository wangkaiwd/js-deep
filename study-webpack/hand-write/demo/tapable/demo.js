class SyncHook {
  constructor (args) {
    // 通过args来限制参数的个数
    this.args = args || [];
    this.taps = [];
  }

  tap (name, fn) {
    // 调用tap时传入的name没有任何作用
    this.taps.push(fn);
  }

  call () {
    const args = Array.prototype.slice.call(arguments, 0, this.args.length);
    this.taps.forEach(tap => tap(...args));
  }
}
