// https://promisesaplus.com/
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = undefined;
    this.rejectFnList = [];
    this.resolveFnList = [];

    const resolve = this.resolve.bind(this);
    const reject = this.reject.bind(this);
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e.message);
    }
  }

  resolve (result) {
    if (this.status !== PENDING) return;
    this.value = result;
    this.status = RESOLVED;
    setTimeout(() => {
      this.resolveFnList.forEach(resolveFn => {
        resolveFn.call(undefined, this.value);
      });
    });
  }

  reject (reason) {
    // Promise的state和value一旦确定将不能再次修改
    if (this.status !== PENDING) return;
    this.value = reason;
    this.status = REJECTED;
    setTimeout(() => {
      this.rejectFnList.forEach(rejectFn => {
        rejectFn.call(undefined, this.value);
      });
    });
  }

  then (onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      // 创建函数，用来做一些事情(根据情况处理返回值)
      this.resolveFnList.push((result) => {
        try {
          const x = onFulfilled(result);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (e) {reject(e.message);}
      });
      this.rejectFnList.push((reason) => {
        try {
          const x = onRejected(reason);
          x instanceof Promise ? x.then(resolve, reject) : resolve(x);
        } catch (e) {reject(e.message);}
      });
    });
    return promise2;
  }
}

module.exports = Promise;
