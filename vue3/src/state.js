import { observe } from './observer';

function initState (vm) {
  const { props, methods, data, computed, watch } = vm.$options;
  if (props) {
    initProps(vm);
  }
  if (methods) {
    initMethods(vm);
  }
  if (data) {
    initData(vm);
  }
  if (computed) {
    initComputed(vm);
  }
  if (watch) {
    initWatch(vm);
  }
}

function initProps (vm) {}

function initMethods (vm) {}

function initData (vm) {
  let data = vm.$options.data;
  vm._data = data = typeof data === 'function' ? data.call(vm) : data;
  // 放在了vm._data上，方便之后直接调用
  observe(data);
}

function initComputed (vm) {}

function initWatch (vm) {}

export default initState;
