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
// 这里还可以怎样做？
const arrayMethods = Object.create(Array.prototype);

export function observeArray (inserted) {
  for (let i = 0; i < inserted.length; i++) {
    // 继续监测数组的每一项，如果数组中的对应项为数组，会继续在Observer中进行监测
    observe(inserted[i]);
  }
}

methods.forEach((method) => {
  // 需要注意：这里是为arrayMethods自身添加属性，而不再使用原型上的属性
  const oldArrayMethod = arrayMethods[method];
  arrayMethods[method] = function () {
    const args = [...arguments];
    const result = oldArrayMethod.apply(this, args);
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

