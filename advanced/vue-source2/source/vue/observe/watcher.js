import { popTarget, pushTarget } from 'vue/observe/dep';

let id = 0;

class Watcher {
  constructor (vm, exprOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof this.exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.opts = opts;
    this.id = id++;
    this.deps = [];
    this.get();
  }

  addDep (dep) {
    // 去重可以使用Set
    const target = this.deps.find(item => item.id === dep.id);
    if (target) return;
    this.deps.push(dep);
    dep.addSub(this);
  }

  get () {
    pushTarget(this);
    this.getter();
    popTarget();
  }

  update () {
    this.get();
  }
}

export default Watcher;
