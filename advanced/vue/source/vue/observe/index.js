function initData () {

}

function initComputed () {

}

function initWatch () {

}

function initState (vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData();
  }
  if (opts.computed) {
    initComputed();
  }
  if (opts.watch) {
    initWatch();
  }
}

export { initState };
