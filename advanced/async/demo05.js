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
      // 如果result还是一个Promise的话，需要再次进行处理对Promise进行处理
      // if (result !== null && typeof result === 'object' || typeof result === 'function') {
      //   return result.then((value) => { // 'hello'
      //     this.resolve.call(result, value);
      //   }, (reason) => this.reject.call(result, reason));
      // }
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
    // 2.2.1
    // 当.then中传入的参数不是函数时，需要忽略参数，返回一个和原来一样的新Promise
    // why: throw reason can't as a return value
    // 类似于 promise.then(result => result, reason => {throw reason})
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 如果onFulfilled没有传的话，继续抛出一个错误
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason;};
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) { // executor中直接执行了resolve
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
          } catch (e) {reject(e);}
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
            try {
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
      let called = false;
      try {
        // let then be x.then
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

  catch (rejectFn) {
    return this.then(null, rejectFn);
  }

  // 由于无法知道promise的最终状态，所以finally的回调函数中不接受任何参数，它仅用于无论最终结果如何都要执行的情况
  // 相比于.then(onFulfilled,onRejected)，finally并不会更改promise的value和status,
  // 会在下一次.then的时候继续处理.finally之前promise的value和status
  finally (fn) {
    return new Promise((resolve, reject) => {
      this.then((result) => {
        resolve(result);
        fn();
      }, (reason) => {
        fn();
        reject(reason);
      });
    });
  }

  race () {

  }

  static all (promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        const item = promises[i];
        // 传入的内容可能不是Promise
      }
    });
  }

  static resolve (value) {
    // return new Promise((resolve, reject) => {
    //   if (value !== null && typeof value === 'object' || typeof value === 'function') {
    //     return value.then((result) => {
    //       resolve(result);
    //     }, (reason) => {
    //       reject(reason);
    //     });
    //   }
    //   resolve(value);
    // });
  }

  static reject (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

module.exports = Promise;

// 从源码角度分析Promise的异步过程
// 1. 自执行函数中同步执行resolve/reject
//    1. 此时会执行执行executor中传入的resolve和reject，并且更改promise的状态和值
//    2. 在调用.then的时候，会判断promise的状态来确定是执行onFulfilled函数，还是执行onRejected函数
//    3. 通过setTimeout(() => {},0)来执行对应状态的回调，实现异步
// 2. 自执行函数中异步执行resolve/reject
//    1. 此时，如果.then是立即调用的话，promise的状态为pending，需要将对应状态的函数到全局的数组中
//       1. 将函数(进行setTimeout(() => {},0)异步处理)放到数组中，然后在resolve/reject调用的时候，执行数组中的函数
//    2. 此时，如果.then是异步调用，并且异步的时间大于resolve/reject的时间，那么会走1.2.，否则走2.1.
