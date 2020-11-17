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
  // 通过vm._data.xxx来访问比较麻烦，可以通过将_data的属性直接代理到vm上
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      proxy(vm, data, key);
    }
  }
}

function initComputed (vm) {}

function initWatch (vm) {}

export default initState;

function proxy (target, source, key) {
  Object.defineProperty(target, key, {
    get () {
      return source[key]; // 会调用data中属性的取值操作
    },
    set (newValue) {
      source[key] = newValue; // 会调用data中属性的设置值操作
    }
  });
}
