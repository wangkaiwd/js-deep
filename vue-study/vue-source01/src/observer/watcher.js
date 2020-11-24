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
    this.user = options?.user;
    this.lazy = options?.lazy;
    this.dirty = this.lazy;
    if (typeof this.exprOrFn === 'function') {
      this.getter = exprOrFn;
    } else {
      if (this.user) {
        this.getter = function () { // 初始化状态中包括初始化watcher,所以初始化watcher会在页面首次渲染之前
          const expressions = exprOrFn.split('.');
          return expressions.reduce((memo, current) => {
            return memo[current];
          }, vm);
        };
      }
    }
    // 注意：Vue的首次渲染是同步的，在首次渲染之后的渲染会执行update方法，存到队列中在微任务中执行
    // 计算属性首次初始化时不会执行
    this.value = this.lazy ? undefined : this.get();
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

  depend () {
    // 为watcher中的所有dep收集当前的watcher
    this.deps.forEach(dep => dep.depend());
  }

  evaluate () {
    // this.getter此时为计算属性所对应的函数，即通过依赖属性返回计算属性所对应的值
    this.value = this.get();
    // 执行过后变为false
    this.dirty = false;
  }

  get () {
    pushTarget(this);
    const value = this.getter.call(this.vm);
    popTarget();
    return value;
  }

  update () {
    if (this.lazy) {
      this.dirty = true;
    } else {
      // 此时watch中的值进行更新，
      queueWatcher(this);
    }
  }

  run () {
    const newValue = this.get();
    if (this.options?.user) { // 用户定义的watch会异步执行
      this.cb.call(this.vm, newValue, this.value);
      this.value = newValue;
    }
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
