// 2.1.
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined; // 1.3. 任何合法的JavaScript值
    this.reason = undefined; // 1.5. 表示为什么promise被拒绝的一个值
    this.resolveFnList = [];
    this.rejectFnList = [];
    const resolve = (result) => {
      if (this.state !== PENDING) return;
      this.state = RESOLVED;
      this.value = result;
      this.resolveFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onFulfilled时this指向为undefined
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      this.rejectFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onRejected时this指向为undefined
    };
    executor(resolve, reject);
  }

  then (onFulfilled, onRejected) {
    // 2.2.7. then必须返回一个Promise
    // 这里能访问到Promise吗？
    // 可以。then方法在执行的时候已经完成了Promise的定义，方法在定义的时候并不会执行，而是会在堆内存中存储代码字符串
    // 之后在函数真正执行的时候，才会从作用域中查找变量

    // 新的Promise的状态和值是有.then中传入的回调函数的返回值来确定的
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            // 2.2.7.1.
            const x = onFulfilled(this.value);
            // 2.2.7.1.
            this.resolvePromise(promise2, x);
          } catch (e) {
            // 2.2.7.2
            reject(e);
          }
        }, 0);
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            // 2.2.7.1.
            const x = onRejected(this.reason);
          } catch (e) {
            // 2.2.7.2.
            reject(e);
          }
        }, 0);
      } else { // pending
        this.resolveFnList.push(() => {
          setTimeout(() => {
            try {
              // 2.2.7.1.
              const x = onFulfilled(this.value);
            } catch (e) {
              // 2.2.7.2
              reject(e);
            }
          }, 0);
        });
        this.rejectFnList.push(() => {
          setTimeout(() => {
            try {
              // 2.2.7.1.
              const x = onRejected(this.reason);
            } catch (e) {
              // 2.2.7.2.
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  resolvePromise (promise2, x) {

  }
}

module.exports = Promise;
