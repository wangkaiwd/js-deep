function Vue (options) {
  const vm = this;
  vm.$options = options;
  initData(vm);
}

function defineProperty (target, key, value) {
  Object.defineProperty(target, key, {
    get: () => {
      return value;
    },
    set: (val) => {
      target[key] = val;
    }
  });
}

function initData (vm) {
  let data = vm.$options.data;
  data = typeof data === 'function' ? data() : data;
  vm._data = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      defineProperty(vm._data, key, data[key]);
    }
  }
}

export default Vue;

