import Observer from 'vue/observe/observer';

export function observe (data) {
  // JavaScript data types and data structures:
  //  String,Number,Boolean,Undefined,Symbol
  //  Null,Object
  // native objects and prototype properties are ignored
  if (typeof data !== 'object' || data === null) { // typeof null === 'object'
    return;
  }
  // 复杂数据类型将会被观测
  new Observer(data);
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

function initWatch (vm) {

}

function initComputed (vm) {

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
