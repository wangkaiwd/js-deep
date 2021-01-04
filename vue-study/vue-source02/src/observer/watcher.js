import { popTarget, pushTarget } from './dep';

let id = 0;

class Watcher {
  constructor (vm, exprOrFn, cb, options = {}) {
    this.id = id++;
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.render = options.render;
    this.deps = [];
    this.depsId = new Set();
    // 渲染视图时，exprOrFn为函数：vm._update(vm._render()), 会通过最新的数据来重新生成虚拟节点
    // 首次渲染：通过虚拟节点生成的真实节点替换老节点
    // 后续更新：用新生成的虚拟节点和老的虚拟节点进行比对。在首次渲染时，老的虚拟节点执行了createElement,拥有了el属性，通过el更新dom即可
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.get();
  }

  addDep (dep) { // 通过watcher来收集dep,并让dep也同时收集watcher
    // 会过滤重复的dep，所以同一个dep也只能收集当前watcher一次。保证一个watcher，以及一个dep不会同时收集重复的dep和watcher
    const { id } = dep;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
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
