import { proxy } from './shared/utils';
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

function initComputed (vm) {

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
  if (options.watch) {
    initWatch(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
}

export default initState;
