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