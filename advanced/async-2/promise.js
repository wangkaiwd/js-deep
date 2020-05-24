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
            this.resolvePromise(promise2, x, resolve, reject);
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
            this.resolvePromise(promise2, x, resolve, reject);
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
              this.resolvePromise(promise2, x, resolve, reject);
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
              this.resolvePromise(promise2, x, resolve, reject);
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

  resolvePromise (promise2, x, resolve, reject) {
    // 2.3.1. 如果promise和x引用同一个对象，用TypeError作为原因拒绝promise
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle!'));
    }
    if (x !== null && typeof x === 'object' || typeof x === 'function') { // 2.3.3. 如果x是一个对象或函数
      // 2.3.3.1 让then成为x.then
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(x, (y) => {
            // 2.3.3.3.1
            // 如果y还是一个promise，会递归调用this.resolvePromise,直到y为一个普通值，而resolve,reject方法一直调用的都是.then方法返回的Promise的
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            // 2.3.3.3.2.
            reject(r);
          });
        } else {
          resolve(x);
        }
      } catch (e) {
        // 2.3.3.2. 如果检索x.then属性发生错误，用错误e作为原因拒绝Promise
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
}

module.exports = Promise;
