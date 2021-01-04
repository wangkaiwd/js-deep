import { proxy } from './shared/utils';
import { observe } from './observer';
import nextTick from './shared/next-tick';

export function stateMixin (Vue) {
  Vue.prototype.$nextTick = function (cb) {
    nextTick(cb);
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

function initWatch (vm) {

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
