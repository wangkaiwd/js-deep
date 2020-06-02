import Observer from './observer';

export function observe (data) {
  // note: null == undefined
  if (typeof data !== 'object' || data == null) { // 用 == 也会将undefined排除，不过这里没有用到
    return;
  }
  return new Observer(data);
}

// 将用户传入的数据用Object.defineProperty重新定义
function initData (vm) {
  // data是一个函数，也可能是一个对象，或者用户没有传
  let { data = {} } = vm.$options;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data;
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
