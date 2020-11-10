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
  data = typeof data === 'function' ? data.call(vm) : data;
  observe(data);
}

function initComputed (vm) {}

function initWatch (vm) {}

export default initState;
