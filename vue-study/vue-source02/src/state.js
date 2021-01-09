import { noop, proxy } from './shared/utils';
import { observe } from './observer';
import nextTick from './shared/next-tick';
import Watcher from './observer/watcher';

export function stateMixin (Vue) {
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb);
  };
  Vue.prototype.$watch = function (exprOrFn, cb, options) {
    const vm = this;
    new Watcher(vm, exprOrFn, cb, { ...options, user: true });
  };
}

function initProps (vm) {

}

function initMethods (vm) {

}

function initData (vm) {
  let { data } = vm.$options;
  vm._data = data = typeof data === 'function' ? data.call(vm) : data;
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      proxy(vm, key, data);
    }
  }
  observe(data);
}

function createWatcher (vm, exprOrFn, value) {
  let handler;
  let options = {};
  switch (typeof value) {
    case 'string':
      handler = vm[value];
      break;
    case 'function':
      handler = value;
      delete value.handler;
      options = value;
      break;
    case 'object':
      handler = value.handler;
      break;
  }
  vm.$watch(exprOrFn, handler, options);
}

function initWatch (vm) {
  const { watch } = vm.$options;
  for (const key in watch) {
    if (watch.hasOwnProperty(key)) {
      const value = watch[key];
      createWatcher(vm, key, value);
    }
  }
}

const sharedPropertyDefinition = {
  get: noop,
  set: noop,
  enumerable: true,
  configurable: true
};

function createComputedGetter (key) {
  return function () {
    const watcher = this[key];
    // if (watcher.dirty) {}
  };
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'object') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = userDef.set;
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key);
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

/**
 * computed 其实是也是创建了一个watcher
 * @param vm
 */
function initComputed (vm) {
  const { computed } = vm.$options;
  const watchers = vm._computedWatchers = {};
  for (const key in computed) {
    if (computed.hasOwnProperty(key)) {
      const userDef = computed[key];
      // 可能会传入一个配置项，配置项中传入get/set方法
      const getter = typeof userDef === 'function' ? userDef : userDef.get;
      // 每个计算属性都映射一个watcher
      watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true });
      defineComputed(vm, key, userDef);
    }
  }
}

function initState (vm) {
  const options = vm.$options;
  if (options.props) {
    initProps(vm);
  }
  if (options.methods) {
    initMethods(vm);
  }
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) { // 在watch里不能使用computed
    initWatch(vm);
  }
}

export default initState;
