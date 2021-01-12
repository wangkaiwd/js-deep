import { popTarget, pushTarget } from './dep';
import nextTick from '../shared/next-tick';

let id = 0;

class Watcher {
  constructor (vm, exprOrFn, cb, options = {}) {
    this.id = id++;
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.render = options.render;
    this.user = options.user;
    this.lazy = options.lazy;
    this.dirty = this.lazy;
    this.deps = [];
    this.depsId = new Set();
    // 渲染视图时，exprOrFn为函数：vm._update(vm._render()), 会通过最新的数据来重新生成虚拟节点
    // 首次渲染：通过虚拟节点生成的真实节点替换老节点
    // 后续更新：用新生成的虚拟节点和老的虚拟节点进行比对。在首次渲染时，老的虚拟节点执行了createElement,拥有了el属性，通过el更新dom即可
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    } else {
      this.getter = function () { // 从vm上取对应的watch对象中key对应的值
        const keys = this.exprOrFn.split('.');
        return keys.reduce((memo, key) => memo[key], vm);
      };
    }
    // 首次渲染是同步的，而之后的更新都会走update方法，放到异步队列中
    // 获取到key对应的最初的值
    this.value = this.lazy ? undefined : this.get(); // 计算属性初始化时不会执行求值操作
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

  evaluate () {
    this.value = this.get();
    // 依赖没有发生变化，下次就不会再进行求值
    this.dirty = false;
  }

  depend () {
    // 将每个dep的watcher再进行去重收集
    this.deps.forEach(dep => dep.depend());
  }

  get () {
    pushTarget(this);
    const result = this.getter.call(this.vm);
    popTarget();
    return result;
  }

  run () {
    const newValue = this.get();
    if (this.user) {
      this.cb.call(this.vm, newValue, this.value);
      this.value = newValue;
    }
  }

  // 更新的时候并不会直接更新：
  //  1. 要将需要更新的watcher进行去重，然后放到队列中
  //  2. 等到主线程所有的更新操作执行完毕后再统一进行更新
  update () {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }
}

export default Watcher;

let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue () {
  queue.forEach(w => w.run());
  queue = [];
  has = {};
  pending = false;
}

// queue: v. 使...排队
function queueWatcher (watcher) {
  const { id } = watcher;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;
    if (!pending) {
      pending = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
