class Watcher {
  constructor (vm, exprOrFn, cb, opts) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof this.exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.get();
  }

  get () {
    this.getter();
  }
}

export default Watcher;
