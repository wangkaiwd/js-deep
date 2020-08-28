import { observe } from 'vue/observe/index';

const methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
];

// Object.create: method create a new object, using an exiting object as prototype of newly create object.
// Object.create将会创建一个新对象，新对象的原型为Array.prototype
// arrayMethods.__proto__ = Array.prototype
const oldArrayMethods = Array.prototype;
const arrayMethods = Object.create(oldArrayMethods);

export function observeArray (inserted) {
  for (let i = 0; i < inserted.length; i++) {
    // 继续监测数组的每一项，如果数组中的对应项为数组，会继续在Observer中进行监测
    observe(inserted[i]);
  }
}

methods.forEach((method) => {
  // clone a function, avoid reference modify
  arrayMethods[method] = function () {
    const args = [...arguments];
    // 这里不使用oldArrayMethods来保存arrayMethods[method]并在执行更新它
    const result = oldArrayMethods[method].apply(this, args);
    switch (method) {
      case 'push':
      case 'unshift':
        observeArray(args);
        break;
      case 'splice':
        observeArray(args.slice(2));
        break;
    }
    return result;
  };
});
export default arrayMethods;

