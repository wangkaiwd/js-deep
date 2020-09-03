import { popTarget, pushTarget } from 'vue/observe/dep';
import utils from '../utils';

let id = 0;
// watch 会单独 new 用户watcher,
// 而渲染时会再次new 一个 watcher
class Watcher {
  constructor (vm, exprOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb;
    this.opts = opts;
    this.id = id++;
    this.deps = [];
    if (typeof this.exprOrFn === 'function') {
      this.getter = exprOrFn;
    } else {
      this.getter = function () {
        return utils.getValue(vm, exprOrFn);
      };
    }
    this.lazy = opts.lazy;
    this.dirty = this.lazy;
    this.value = this.lazy ? undefined : this.get();
    if (opts.immediate) {
      // immediate: 立即执行回调函数
      this.cb.call(vm, this.value);
    }
  }

  addDep (dep) {
    // 去重可以使用Set
    const target = this.deps.find(item => item.id === dep.id);
    if (target) return;
    this.deps.push(dep);
    dep.addSub(this);
  }

  evaluate () {
    this.value = this.get();
    this.dirty = false;
  }

  get () {
    pushTarget(this);
    // 传入内容的初始值
    // 取值时会在get方法收集用户定义的watcher以及之后的渲染watcher
    // computed: 会取fullName的值，进而触发computed中在vm实例中代理的属性
    const value = this.getter.call(this.vm);
    popTarget();
    return value;
  }

  depend () {
    this.deps.forEach(dep => dep.depend());
  }

  update () {
    watcherQueue(this);
  }

  run () {
    if (this.lazy) {
      this.dirty = true;
    } else {
      // 新值
      const value = this.get();
      if (value !== this.value) {
        this.cb.call(this.vm, value, this.value);
      }
    }
  }
}

let has = {};
let queue = [];

function flushQueue () {
  queue.forEach(watcher => {
    watcher.run();
    has = {};
    queue = [];
  });
}

function watcherQueue (watcher) {
  const { id } = watcher;
  if (has[id] === undefined) {
    has[id] = true;
    queue.push(watcher);
    nextTick(flushQueue);
  }
}

const callbacks = [];

function flushCallbacks () {
  callbacks.forEach(cb => cb());
}

function nextTick (cb) {
  callbacks.push(cb);
  if (Promise) {
    return Promise.resolve().then(flushCallbacks);
  }
  // MutationObserver: 提供了观察 DOM 树更改的能力
  if (MutationObserver) {
    const observer = new MutationObserver(() => {
      flushCallbacks();
      observer.disconnect();
    });
    const textNode = document.createTextNode('1');
    observer.observe(textNode, { characterData: true });
    textNode.textContent = '2';
    return;
  }
  if (setImmediate) {
    return setImmediate(flushCallbacks);
  }
  return setTimeout(flushCallbacks);
}

export default Watcher;
