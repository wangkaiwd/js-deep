id = 0; // 没产生一个watcher都要有一个唯一标识
// 渲染 计算属性 vm.watch 都会用到watcher
class Watcher {
  /**
   * @param vm 当前组件实例 new Vue
   * @param exprOrFn 用户可能传入的是一个表达式，也可能是一个函数
   * @param cb 用户传入的回调函数 vm.$watch('msg', cb)
   * @param opts 一些其他参数
   */
  constructor (vm, exprOrFn, cb = () => {}, opts) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.opts = opts;
    this.id = ++id;
    this.get();
  }

  get () {
    this.getter();
  }
}
