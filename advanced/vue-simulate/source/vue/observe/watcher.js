import { popTarget, pushTarget } from './dep';
import { observe } from './index';
import { getValue } from '../utils';

let id = 0; // 没产生一个watcher都要有一个唯一标识
// 渲染 计算属性 vm.watch 都会用到watcher
class Watcher {
  /**
   * @param vm 当前组件实例 new Vue
   * @param exprOrFn 用户可能传入的是一个表达式，也可能是一个函数
   * @param cb 用户传入的回调函数 vm.$watch('msg', cb)
   * @param opts 一些其他参数
   */
  constructor (vm, exprOrFn, cb = () => {}, opts = {}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.lazy = opts.lazy;
    if (typeof this.exprOrFn === 'function') {
      this.getter = this.exprOrFn;
    } else {
      this.getter = function () {// 通过watch的key直接获取旧的值，然后之后在key设置值的时候会更新视图
        // 用户watcher在获取值时会被收集到dep中
        return getValue(vm, exprOrFn);
      };
    }
    if (opts.user) {
      this.user = true;
    }
    if (this.lazy) {
      this.dirty = this.lazy;
    }
    this.cb = cb;
    // 每个watcher都有自己单独的依赖
    this.deps = [];
    // 存储任何类型的唯一值，即使添加了重复值，也不会生效
    this.depsId = new Set();
    this.opts = opts;
    this.id = id++;
    // 计算属性不会立即执行，只有在属性在页面中使用的时候才会执行
    // 初始化watch的时候，执行this.get方法，获取到当前watch中keypath对应的值，然后记录到this.value中，现在这个值是添加watch后就从vm实例中获取的，属于旧值
    // 而在获取值的时候，会调用key对应的get方法，key对应的dep会收集当前的用户定义的watcher，在之后调用run方法时调用该watcher的update方法
    this.value = this.lazy ? undefined : this.get();
    if (this.opts.immediate) {
      this.cb.call(vm, this.value);
    }
  }

  get () {
    console.log('update');
    // 当添加watch属性后，会为每一个属性都创建一个watcher,该watcher为用户watcher
    pushTarget(this); // 记录当前的渲染用的watcher
    const value = this.getter.call(this.vm); // 文本编译，然后重新渲染
    popTarget();
    return value;
  }

  evaluate () {
    // 执行计算属性方法，获得他的返回值，赋值到this.value上
    this.value = this.get();
    this.dirty = false;
  }

  update () {
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }

  depend () {
    // fullName中的deps有2个，分别为firstName dep, lastName dep。在求值的时候会执行defineReactive中的get方法
    let i = this.deps.length;
    while (i--) {
      // 订阅渲染watcher
      this.deps[i].depend();
    }
  }

  run () { // 用户watcher调用run方法并不会更新视图，只是去获取值而已
    const value = this.get();
    if (this.value !== value) {
      this.cb.call(this.vm, this.value, value);
    }
  }

  addDep (dep) { // 同一个watcher 不应该重复记录多个dep
    // 通过Set来存dep的id，可以通过Set的has方法来直接判断是否重复
    const { id } = dep;
    if (!this.depsId.has(id)) {
      // 每一个属性都会调用defineReactive,即每个属性都有一个dep,
      // 当第二次获取值时，会执行当前defineReactive执行上下文中的get方法，此时的dep还是旧的，已经在第一个执行defineReactive时添加过一次了
      // 所以这样保证了watcher中的dep不会重复，即使dom中有俩个相同的属性
      // 将watcher添加到第一次出现的属性的dep中，方便在之后notify的时候执行
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this);
    }
  }
}

let queue = [];

let has = {};

function flushQueue () {
  queue.forEach(watcher => watcher.run());
  queue = [];
  has = {};
}

let callbacks = [];

function flushCallbacks () {
  callbacks.forEach(cb => cb());
}

// @see: https://vuejs.org/v2/guide/reactivity.html#Async-Update-Queue
function queueWatcher (watcher) {
  const { id } = watcher;
  if (has[id] == null) { // 去重
    has[id] = true;
    queue.push(watcher);
    // nextTick()
    // setTimeout(() => {
    //   flushQueue(); // 只有在所有主线程代码完成后才会清空队列和has,而只有has和queue在清空后才会执行watcher的更新方法
    // }, 0);
    nextTick(flushQueue);
  }
}

function nextTick (cb) {
  callbacks.push(cb);
  // 异步执行: Promise.then MutationObserver setImmediate setTimeout
  if (Promise) {
    return Promise.resolve().then(() => {
      flushCallbacks();
    });
  }
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
  setTimeout(flushCallbacks, 0);
}

export default Watcher;
