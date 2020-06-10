import Observer from './observer';
import Watcher from './watcher';
import Dep from './dep';

export function observe (data) {
  // note: null == undefined
  // 必须是普通对象：The object must be plain
  // 比如浏览器`API`的原生对象和原型属性将会被忽略。data应该只是数据，不推荐观察拥有自己状态行为的对象。
  // @see: https://vuejs.org/v2/api/index.html?#data
  if (typeof data !== 'object' || data == null) { // 用 == 也会将undefined排除，不过这里没有用到
    return;
  }
  if (data.__ob__) { // 已经被观测过了，不会进行重新观测了
    return data.__ob__;
  }
  return new Observer(data);
}

function proxy (vm, source, key) {
  // 这里不用递归代理的原因：
  // 对象引用
  // 例：vm._data.person为一个对象
  // vm.person: 会返回vm._data.person
  // 设置值vm.person.name = 'ls', 由于vm.person 和 vm._data.person指向同一块堆内存，所以vm._data.person也会一起更新
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key];
    },
    set (newVal) {
      vm[source][key] = newVal;
    }
  });
}

// 将用户传入的数据用Object.defineProperty重新定义
// @see: https://vuejs.org/v2/api/#data
function initData (vm) {
  // 配置项中的data是一个函数，也可能是一个对象，或者用户没有传
  let { data = {} } = vm.$options;
  // vm.$data: Vue实例观察的数据对象。Vue实例代理了它的数据对象上可以访问的属性
  // 当定义一个组件时，data必须被定义为一个返回初始数据对象的函数，因为可能会有许多实例使用同一个定义的组件来创建。
  // 如果我们为data使用了一个普通(纯粹的、简单的)对象，同一对象将会通过引用分享到所有被创建的实例中！
  // 通过提供一个data函数，每次一个新实例被创建的时候，我们可以调用data函数返回一个新的初始对象的拷贝。
  // 如果需要，原始对象的深拷贝可以通过JSON.parse(JSON.stringify(vm.$data))获得
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;
  // 在观察vm._data之前，先将对vm上的取值操作和赋值操作代理给vm._data中的属性

  // 在实例被创建之后，原始的data对象可以作为vm.$data访问
  // Vue实例也代理了所有data对象上发现的属性，因此vm.a将等价于vm.$data.a

  // vue实例上的以_或$开头的属性不会被代理，因为它们可能和Vue的内部属性以及API方法发生冲突。你必须以vm.$data._property的方式来访问它们(没有实现)
  for (const key in data) {
    proxy(vm, '_data', key);
  }
  // 一旦观察过，你将不再可以为根data对象添加响应属性。在创建实例之前，推荐提前声明所有根级别的响应式属性。
  // 即data函数返回的对象中的属性最好都要提前定义好，而不是之后赋值，因为之后赋值的属性都不会被观察
  observe(vm._data);
}

function createComputedGetter (vm, key) {
  const watcher = vm._watchersComputed[key];
  // 用户获取计算属性的值时调用
  return function () {
    // 计算属性默认不执行，当用户取值的时候才会执行，会缓存取值的结果。如果依赖的值变化了，会更新dirty属性，这样在再次取值时才会重新计算最新的值
    if (watcher.dirty) {
      watcher.evaluate();
      // 此时渲染watcher还在执行vm._update方法中，所以Dep.target = [渲染watcher]
      if (Dep.target) {
        watcher.depend();
      }
    }
    return watcher.value;
  };
}

function initComputed (vm) {
  const { computed } = vm.$options;
  // 将计算属性的配置放到vm上
  const watchers = vm._watchersComputed = Object.create(null);
  for (const key in computed) {
    if (!computed.hasOwnProperty(key)) return;
    watchers[key] = new Watcher(vm, computed[key], () => {}, { lazy: true });
    // 要设置计算属性key对应的set,get方法
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key)
    });
  }
}

function createWatcher (vm, key, handler, options) {
  return vm.$watch(key, handler, options);
}

function initWatch (vm) {
  const { watch } = vm.$options;
  for (const key in watch) {
    if (!watch.hasOwnProperty(key)) return;
    // watch[key]可能是对象
    let value = watch[key];
    let handler, userOpts = {};
    if (typeof value === 'function') {
      handler = value;
    } else {
      handler = value.handler;
      userOpts = value;
    }
    // watch对象中的每一项都创建一个watcher实例
    // key: 监听的Vue实例中的属性，也可以是对象的属性vm.person.name
    // handler: watch每个key对应的回调函数，在监听的属性发生变化时，handler执行
    createWatcher(vm, key, handler, userOpts);
  }
}

function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
  if (opts.computed) {
    // watcher: 渲染watcher, 用户watcher， 计算属性watcher
    initComputed(vm);
  }
}

export { initState };
