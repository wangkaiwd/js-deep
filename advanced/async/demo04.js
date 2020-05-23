// https://promisesaplus.com/

// Promise的状态
// 2.1. A promise must be in one of three states: pending, fulfilled, rejected
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
    // 2.1.2. and 2.1.2.
    // When not pending, a promise: must not transition to any other state
    if (this.status !== PENDING) return;
    this.value = result;
    this.status = RESOLVED;
    this.resolveFnList.forEach(resolveFn => {
      resolveFn.call(undefined, this.value);
    });
  }

  reject (reason) {
    // 2.1.3. and 2.1.2.
    // Promise的state和value一旦确定将不能再次修改
    if (this.status !== PENDING) return;
    this.value = reason;
    this.status = REJECTED;
    //
    this.rejectFnList.forEach(rejectFn => {
      rejectFn.call(undefined, this.value);
    });
  }

  // 为什么不能将状态被更改后的异步写到resolve和reject函数中？
  // 1. 当Promise的状态不处于PENDING的时候，说明resolve/reject函数已经调用，此时如果将异步写在resolve/reject中的话，会导致在异步调用.then的时候，无法通过resolve/reject执行.then中传入函数
  // 2. 当Promise的状态处于PENDING的时候，说明resolve/reject未执行，此时.then方法会先执行，需要将then方法中传入的参数进行缓存，然后通过resolve或者reject进行调用。感觉这里也可以不用处理异步。
  // 总结：Promise中传入的方法要永远保证后执行
  then (onFulfilled, onRejected) {
    // 2.2.1
    // 当.then中传入的参数不是函数时，需要忽略参数，返回一个和原来一样的新Promise
    // why: throw reason can't as a return value
    // 类似于 promise.then(result => result, reason => {throw reason})
    // 2.2.1.
    // 2.2.1.1.
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 如果onFulfilled没有传的话，继续抛出一个错误
    // 2.2.1.2.
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason;};
    //
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) { // executor中直接执行了resolve
        //
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        // executor中直接执行了reject,.then中执行的方法要放入微任务队列中
        // 这里用setTimeout(() => {},0)来模拟微任务
        setTimeout(() => {
          try {
            const x = onRejected(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // .then返回的Promise的value和status已经确定了
            reject(e);
          }
        }, 0);
      } else {
        // 创建函数，用来做一些事情(根据情况处理返回值)
        // PENDING状态，说明Promise还没有执行resolve或reject
        this.resolveFnList.push((result) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(result);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {reject(e);}
          });
        });
        this.rejectFnList.push((reason) => {
          setTimeout(() => {
            try { // 执行resolvePromise方法之前，会先判断onFulfilled和onRejected方法在执行之后是否会报错
              // 如果报错的话就会直接将错误reject
              const x = onRejected(reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {reject(e);}
          });
        });
      }
    });
    return promise2;
  }

  // 根据x的状态来判断新返回的promise的状态
  // resolvePromise方法
  //  1. 返回的promise与.then中函数的返回值相同
  //  2. 返回普通值，直接resolve
  //  3. 如果返回Promise, 则执行x.then方法
  //      如果x.then方法中onFulfilled的参数还是Promise的话，需要进行递归处理，直到最终为普通值，进行resolve
  resolvePromise (promise2, x, resolve, reject) {
    // 简单的可以直接判断x是否是promise
    // 此方法法为了兼容所有的promise库，库的执行流程是一样的
    // 尽可能详细，不出错
    // 1.引用同一个对象,可能会造成死循环
    if (promise2 === x) {
      // todo: 这行代码感觉没有生效
      return reject(new TypeError('Chaining cycle'));
    }
    // 2. 判断x的类型
    if (x !== null && typeof x === 'object' || typeof x === 'function') {
      // 可能是promise
      // promise 有 then方法
      // 当直接通过含有.then方法的对象来作为promise的时候，可能会多次调用onFulfilled或onRejected
      // 只有最先调用的会生效
      // https://github.com/promises-aplus/promises-tests/blob/4786505fcb0cafabc5f5ce087e1df86358de2da6/lib/tests/2.3.3.js#L360-L368
      let called = false;
      try {
        // let then be x.then
        // 2.3.3.1.
        const then = x.then;
        if (typeof then === 'function') {
          // 这里不使用x.then,有可能第二次取值会出错，见nativeTest
          then.call(x, (y) => {
            // 这里y有可能还是一个promise
            // resolve(y);
            // 继续对resolve中的promise进行promise.then,直到resolve中传入的是一个普通值
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            // 如果在失败
            if (called) return;
            called = true;
            reject(r);
          });
        } else { // 对象
          if (called) return;
          called = true;
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        called = true;
        reject(e);
      }
    } else { // 不是promise,说明返回了一个普通值
      resolve(x);
    }
  }
}

// 为了测试
const deferred = function () {
  let resolve, reject;
  return {
    promise: new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    }),
    resolve,
    reject
  };
};
module.exports = { deferred };
// module.exports = Promise;
