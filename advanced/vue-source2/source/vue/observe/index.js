function initData (vm) {
  const data = vm.$options.data; // 将data中的所有数据通过Object.defineProperty重新定义

}

function initComputed () {

}

function initWatch () {

}

export function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(opts);
  }
  if (opts.watch) {
    initWatch(opts);
  }
}
