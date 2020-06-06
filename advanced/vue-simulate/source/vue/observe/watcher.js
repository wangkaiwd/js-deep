import { popTarget, pushTarget } from './dep';

let id = 0; // 没产生一个watcher都要有一个唯一标识
// 渲染 计算属性 vm.watch 都会用到watcher
class Watcher {
  /**
   * @param vm 当前组件实例 new Vue
   * @param exprOrFn 用户可能传入的是一个表达式，也可能是一个函数
   * @param cb 用户传入的回调函数 vm.$watch('msg', cb)
   * @param opts 一些其他参数
   */
  constructor (vm, exprOrFn, cb = () => {}, opts) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn;
    }
    this.cb = cb;
    this.deps = [];
    // 存储任何类型的唯一值，即使添加了重复值，也不会生效
    this.depsId = new Set();
    this.opts = opts;
    this.id = id++;
    this.get();
  }

  get () {
    pushTarget(this); // 记录当前的渲染用的watcher
    this.getter(); // 文本编译，然后重新渲染
    popTarget();
  }

  update () {
    this.get();
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
      dep.addSubscribe(this);
    }
  }
}

export default Watcher;
