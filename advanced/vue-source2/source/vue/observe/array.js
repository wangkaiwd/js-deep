import { observe } from './index';

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
// 这里还可以怎样做？深拷贝Array.prototype
const arrayMethods = Object.create(Array.prototype);

export function observeArray (inserted) {
  for (let i = 0; i < inserted.length; i++) {
    // 继续监测数组的每一项，如果数组中的对应项为数组，会继续在Observer中进行监测
    observe(inserted[i]);
  }
}

export function dependArray (array) {
  if (!Array.isArray(array)) {return; }
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    item.__ob__ && item.__ob__.dep.depend();
    dependArray(item);
  }
}

methods.forEach((method) => {
  // 需要注意：这里是为arrayMethods自身添加属性，而不再使用原型上的属性
  const oldArrayMethod = arrayMethods[method];
  // 要为原有的同名方法进行切片编程，可以先缓存旧有方法，然后为旧有方法重新赋值
  // 此时会重新开辟内存空间，不会影响缓存内容，然后在重新赋值的函数逻辑中可以根据情况来执行缓存函数
  // 举例： 这样可以在不改变变量名的情况下重写原有函数
  // function fn () {console.log('1');}
  // const fn1 = fn;
  // fn = function () { // 这里会重新开辟内存空间，不会影响
  //   console.log('before');
  //   const result = fn1();
  //   console.log('after');
  //   return result;
  // };
  // 参考Vue源码：https://github.com/vuejs/vue/blob/635e669f64560f084f6cb97fdd90880e3d33d363/src/platforms/web/entry-runtime-with-compiler.js#L17-L18
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
    this.__ob__.dep.notify();
    return result;
  };
});
export default arrayMethods;

