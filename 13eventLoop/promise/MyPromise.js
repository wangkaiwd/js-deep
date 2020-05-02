class MyPromise {
  state = 'pending';
  value = undefined;
  caches = [{}];

  constructor (executor) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(e.message);
    }
  }

  resolve (result) {
    this.change(result, 'resolved');
  }

  reject (reason) {
    this.change(reason, 'rejected');
  }

  change (value, state) {
    // Promise的状态一旦更改就不会再改变
    if (this.state !== 'pending') {return;}
    this.value = value;
    this.state = state;
    setTimeout(() => {
      this.caches.forEach((item) => {
        if (typeof item[state] === 'function') {
          item[state].call(this, this.value);
        }
      });
    }, 0);
  }

  then (resolveFn, rejectFn) {
    // 如果resolveFn和rejectFn传入非函数内容(如null和undefined)
    if (typeof resolveFn !== 'function') {
      // 返回一个新的和原来一样的Promise, value是原来的value,状态也是原来的状态
      resolveFn = result => result;
    }
    if (typeof rejectFn !== 'function') {
      rejectFn = reason => MyPromise.reject(reason);
    }
    return new MyPromise((resolve, reject) => {
      // 新的Promise的状态根据前一个Promise
      // 1. resolve返回一个值
      // 2. resolve返回一个promise
      // 3. resolve报错
      const cache = {
        resolved: () => {
          try {
            const returnValue = resolveFn(this.value);
            returnValue instanceof MyPromise ? returnValue.then(resolve, reject) : resolve(returnValue);
          } catch (e) {
            reject(e.message);
          }
        },
        rejected: () => {
          try {
            const returnValue = rejectFn(this.value);
            returnValue instanceof MyPromise ? returnValue.then(resolve, reject) : resolve(returnValue);
          } catch (e) {
            reject(e.message);
          }
        }
      };
      // 先做一次处理，然后再将对应的函数放到缓存队列中
      this.caches.push(cache);
    });
  }

  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static resolve (result) {
    return new MyPromise((resolve) => {
      resolve(result);
    });
  }
}

// 支持链式调用
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
})
  .then(result => MyPromise.reject(result * 2), reason => console.log(reason))
  .then(null, null)
  .then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
