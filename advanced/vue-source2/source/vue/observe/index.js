import Observer from 'vue/observe/observer';

function observe (data) {
  // JavaScript data types and data structures:
  //  String,Number,Boolean,Undefined,Symbol
  //  Null,Object
  if (typeof data !== 'object' || data === null) { // typeof null === 'object'
    return;
  }
  // 复杂数据类型将会被观测
  new Observer(data);
}

function initData (vm) {
  let { data } = vm.$options;
  // data: 函数；对象(根组件)；不传
  // operator precedence: conditional 5 , logic OR 6
  // 定义vm._data的意义何在？
  //  1. 方便之后直接通过vm来访问到数据
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
  observe(data);
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
