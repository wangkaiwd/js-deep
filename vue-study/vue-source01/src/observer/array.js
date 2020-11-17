// 数组方法重写，使其可以在调用时通知视图更新

// arrayProto.__proto__ = Array.prototype
// function Fn() {} Fn.prototype = Array.prototype  return new Fn()
// creates a new object, using an existing object as the prototype of newly created object
const oldArrayProto = Array.prototype;
export const arrayProto = Object.create(oldArrayProto);

const methods = ['unshift', 'push', 'shift', 'pop', 'splice', 'reverse', 'sort'];

methods.forEach(method => {
  arrayProto[method] = function (...args) {
    // 每个被监测过的属性都会添加__ob__属性
    const ob = this.__ob__;
    const result = oldArrayProto[method].apply(this, args);
    let inserted = null;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    if (inserted) {
      ob.observeArray(inserted);
    }
    ob.dep.notify();
    // 新加的内容也要继续进行监测
    return result;
  };
});

export function dependArray (value) {
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      item?.__ob__?.dep.depend();
      dependArray(item);
    }
  }
}
