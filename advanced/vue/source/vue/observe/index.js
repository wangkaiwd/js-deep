import Observer from './observer';

export function observe (data) {
  // note: null == undefined
  // 必须是普通对象：The object must be plain
  // 比如浏览器`API`的原生对象和原型属性将会被忽略。data应该只是数据，不推荐观察拥有自己状态行为的对象。
  // @see: https://vuejs.org/v2/api/index.html?#data
  if (typeof data !== 'object' || data == null) { // 用 == 也会将undefined排除，不过这里没有用到
    return;
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
function initData (vm) {
  // 配置项中的data是一个函数，也可能是一个对象，或者用户没有传
  let { data = {} } = vm.$options;
  // vm.$data: Vue实例观察的数据对象。Vue实例代理了它的数据对象上可以访问的属性
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;
  // 在观察vm._data之前，先将对vm上的取值操作和赋值操作代理给vm._data中的属性
  for (const key in data) {
    proxy(vm, '_data', key);
  }
  observe(vm._data);
}

function initComputed () {

}

function initWatch () {

}

function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed();
  }
  if (opts.watch) {
    initWatch();
  }
}

export { initState };
