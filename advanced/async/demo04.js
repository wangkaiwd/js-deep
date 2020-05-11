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
    this.resolveFnList.forEach(resolveFn => {
      resolveFn.call(undefined, this.value);
    });
  }

  reject (reason) {
    // Promise的state和value一旦确定将不能再次修改
    if (this.status !== PENDING) return;
    this.value = reason;
    this.status = REJECTED;
    this.rejectFnList.forEach(rejectFn => {
      rejectFn.call(undefined, this.value);
    });
  }

  // 为什么不能将状态被更改后的异步写到resolve和reject函数中？
  // 1. 当Promise的状态不处于PENDING的时候，说明resolve/reject函数已经调用，此时如果将异步写在resovle/reject中的话，会导致在异步调用.then的时候，无法通过resolve/reject执行.then中传入函数
  // 2. 当Promise的状态处于PENDING的时候，说明resolve/reject未执行，此时.then方法会先执行，需要将then方法中传入的参数进行缓存，然后通过resolve或者reject进行调用。感觉这里也可以不用处理异步。
  // 总结：Promise中传入的方法要永远保证后执行
  then (onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) { // executor中直接执行了resolve
        setTimeout(() => {
          onFulfilled(this.value);
        }, 0);
      } else if (this.status === REJECTED) { // executor中直接执行了reject
        setTimeout(() => {
          onSelectStart(this.value);
        }, 0);
      } else {
        // 创建函数，用来做一些事情(根据情况处理返回值)
        // PENDING状态，说明Promise还没有执行resolve或reject
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
      }
    });
    return promise2;
  }
}

module.exports = Promise;
