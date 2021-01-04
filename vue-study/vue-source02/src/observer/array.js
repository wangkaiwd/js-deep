const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methodsToPatch = ['shift', 'unshift', 'push', 'pop', 'splice', 'sort', 'revert'];

export function dependArray (value) {
  for (let i = 0; i < value.length; i++) {
    const item = value[i];
    // 对有__ob__属性的值进行依赖收集
    item?.__ob__?.dep.depend();
    if (Array.isArray(item)) {
      dependArray(item);
    }
  }
}

methodsToPatch.forEach(method => {
  // 会在自身属性上定义修改数组的方法，数组的其它方法会通过原型去查找
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this, args);
    // 此时data中的数组已经更新了
    // 最终都是指向同一片内存空间
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        inserted = args.slice(2);
        break;
    }
    console.log('change array');
    // 为数组新加的每一项进行监控
    if (ob) {
      if (inserted) {
        ob.observeArray(inserted);
      }
      ob.dep.notify();
    }
    return result;
  };
});
