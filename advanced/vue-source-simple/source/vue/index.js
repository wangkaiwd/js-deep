function Vue (options) {
  const vm = this;
  vm.$options = options;
  initData(vm);
}

function defineProperty (target, key, origin) {
  Object.defineProperty(target, key, {
    get: () => {
      if (Object.prototype.toString.call(origin[key]) === '[object Object]') {
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey)) {
            defineProperty(value, subKey, value);
          }
        }
      }
      return origin[key];
    },
    set: (val) => {
      origin[key] = val;
    }
  });
}

function initData (vm) {
  let data = vm.$options.data;
  data = typeof data === 'function' ? data() : data;
  vm._data = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      defineProperty(vm._data, key, data);
    }
  }
}

export default Vue;

