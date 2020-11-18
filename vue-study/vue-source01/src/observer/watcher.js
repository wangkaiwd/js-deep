import { popTarget, pushTarget } from './dep';
import { nextTick } from '../util';

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
    queueWatcher(this);
  }

  run () {
    this.get();
  }
}

export default Watcher;

// 不添加重复值的实现方法：
//  1. set: 将id存到set中，在添加之前通过set.has来判断是否有值
//  2. object: 每次添加之后，将id作为对象的key，并将value设置为true。再次添加时判断obj[key]是否为true
//  3. 在为数组添加元素之前，先遍历元素，看能否找到要添加的项，找到说明重复
let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue () {
  queue.forEach(item => item.run());
  queue = [];
  has = {};
  pending = false;
}

function queueWatcher (watcher) {
  const { id } = watcher;
  if (!has[id]) {
    has[id] = true;
    queue.push(watcher);
    if (!pending) {
      pending = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
