// 数组方法重写，使其可以在调用时通知视图更新

// arrayProto.__proto__ = Array.prototype
// function Fn() {} Fn.prototype = Array.prototype  return new Fn()
// creates a new object, using an existing object as the prototype of newly created object
const oldArrayProto = Array.prototype;
export const arrayProto = Object.create(oldArrayProto);

const methods = ['unshift', 'push', 'shift', 'pop', 'splice', 'reverse', 'sort'];

methods.forEach(method => {
  arrayProto[method] = function (...args) {
    oldArrayProto[methods].apply(this, args);
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
      // 每个被监测过的属性都会添加__ob__属性
      this.__ob__.observeArray(inserted);
    }
    // 新加的内容也要继续进行监测
  };
});
