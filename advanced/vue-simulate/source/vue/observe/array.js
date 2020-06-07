// 对数组的方法进行拦截
// push shift unshift pop reverse sort splice

// arrayMethods.__proto__ = Array.prototype
import { observe } from './index';

const ArrayPrototype = Array.prototype;
export const arrayMethods = Object.create(Array.prototype);

const methods = [
  'push',
  'unshift',
  'pop',
  'shift',
  'sort',
  'reverse',
  'splice'
];

export function observeArray (array) {
  if (!Array.isArray(array)) return;
  for (let i = 0; i < array.length; i++) {
    observe(array[i]);
  }
}

// 对数组进行了依赖收集，以及依然是数组的子项继续依赖收集
export function dependArray (value) {
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    item.__ob__ && item.__ob__.dep.depend();
    if (Array.isArray(item)) {
      dependArray(item);
    }
  }
}

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    // 借用数组原型上的方法，用调用arrayMethods[method]方法的数组来调用Array.prototype上的方法
    const result = ArrayPrototype[method].call(this, ...args);
    console.log('调用改变原数组的方法');
    let inserted = undefined;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice': // splice
        inserted = args.slice(2);
        break;
    }
    observeArray(inserted);
    this.__ob__.dep.notify();
    return result;
  };
});

