import Observer from 'vue/observe/observer';
import Watcher from './watcher';
import Dep from './dep';

export function observe (data) {
  // JavaScript data types and data structures:
  //  String,Number,Boolean,Undefined,Symbol
  //  Null,Object
  // native objects and prototype properties are ignored
  if (typeof data !== 'object' || data === null) { // typeof null === 'object'
    return;
  }
  if (data.__ob__) {
    return;
  }
  // 复杂数据类型将会被观测
  return new Observer(data);
}

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key];
    },
    set (newValue) {
      vm[source][key] = newValue;
    }
  });
}

function initData (vm) {
  let { data } = vm.$options;
  // data: 函数；对象(根组件)；不传
  // operator precedence: conditional 5 , logic OR 6
  //  vm._data: 方便之后直接通过vm来访问到数据
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  observe(data);
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // 在实例vm上代理_data中的属性，
      // 这里不用递归，之后会从vm._data进行查找对应的属性，其对应的set/get方法已经被设置了
      proxy(vm, '_data', key);
    }
  }
}

function createWatcher (vm, expr, cb, opts) {
  vm.$watch(expr, cb, opts);
}

function initWatch (vm) {
  const { watch } = vm.$options;
  for (const key in watch) {
    if (watch.hasOwnProperty(key)) {
      const userDefine = watch[key];
      if (userDefine.handler) {
        const { handler, ...opts } = userDefine;
        createWatcher(vm, key, handler, opts);
      } else {
        createWatcher(vm, key, userDefine);
      }
    }
  }
}

// 计算属性的get方法收集计算属性对应的watcher：计算属性watcher以及渲染watcher
function createComputedGetter (vm, watcher) {
  // 获取到计算属性的watcher
  return function () {
    if (watcher) {
      if (watcher.dirty) {
        // 渲染watcher出栈
        watcher.evaluate();
      }
      if (Dep.target) {
        // 在计算属性watcher中，收集firstName和lastName的dep
        watcher.depend();
      }
      return watcher.value;
    }
  };
}

function initComputed (vm) {
  const computed = vm.$options.computed;
  // const watcher = vm._watchersComputed = Object.create(null);
  for (const key in computed) {
    if (computed.hasOwnProperty(key)) {
      // 计算属性callback什么都不传
      // computed[key]: fullName() => this.firstName + this.lastName
      const watcher = new Watcher(vm, computed[key], () => {}, { lazy: true });
      Object.defineProperty(vm, key, {
        get: createComputedGetter(vm, watcher)
      });
    }
  }
}

export default function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}
