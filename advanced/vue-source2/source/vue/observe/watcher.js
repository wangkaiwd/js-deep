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
    console.log('dep', dep);
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
    watcherQueue(this);
  }

  run () {
    console.log('run');
    this.get();
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
