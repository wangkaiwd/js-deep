import { popTarget, pushTarget } from './dep';

let id = 0;

class Watcher {
  constructor (vm, exprOrFn, cb, options) {
    this.id = id++;
    this.deps = [];
    this.depIds = new Set();
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.options = options;
    if (typeof this.exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.get();
  }

  addDep (dep) {
    // 同一个dep只能收集一次这个watcher，避免在一个属性在模板中重复使用而进行多次收集的情况
    // 在该watcher中，也不会收集重复的dep
    // 这样双向记忆后是为了之后实现计算属性：为计算属性watcher中的deps再收集渲染watcher
    if (!this.depIds.has(dep.id)) {
      this.depIds.add(dep.id);
      this.deps.push(dep);
      dep.addSub(this);
    }
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
