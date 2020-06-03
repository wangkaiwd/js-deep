// 对数组的方法进行拦截
// push shift unshift pop reverse sort splice

// arrayMethods.__proto__ = Array.prototype
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

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    // 借用数组原型上的方法，用调用arrayMethods[method]方法的数组来调用Array.prototype上的方法
    const result = ArrayPrototype[method].call(this, ...args);
    console.log('调用改变原数组的方法');
    return result;
  };
});

