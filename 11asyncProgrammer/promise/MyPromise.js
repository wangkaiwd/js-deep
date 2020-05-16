class MyPromise {
  state = 'pending';
  value = undefined;
  caches = [{}]; // 这里其实可以不用数组，直接对象就可以

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
      // 新的Promise的状态根据前一个Promise的状态确定
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
    return new MyPromise((resolve, reject) => reject(reason));
  }

  static resolve (result) {
    return new MyPromise((resolve) => resolve(result));
  }

  static all (array) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let index = 0;
      for (let i = 0; i < array.length; i++) { // 这里要注意i的值，以及判断什么时候进行resolve
        const item = array[i];
        if (item instanceof MyPromise) {
          item.then(
            (result) => {
              results[i] = result;
              index++;
              // 这里是微任务，执行的时候，可能index已经变了
              if (array.length === index) {
                // Promise的状态一旦确定就不会改变,继续循环也不会在执行下边的代码
                resolve(results);
              }
            },
            reason => { // 如果有一个rejected状态的Promise，就执行reject函数
              // Promise的状态一旦确定就不会改变,继续循环也不会在执行下边的代码
              reject(reason);
            }
          );
        } else { // 非Promise的其它值，原样返回
          results[i] = item;
          index++;
        }
      }
      // 如果全是非Promise的值的话，放到数组中返回
      if (results.length === array.length) {
        resolve(results);
      }
    });
  }
}

// 支持链式调用
// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100);
//   }, 1000);
// })
//   .then(result => MyPromise.reject(result * 2), reason => console.log(reason))
//   .then(null, null)
//   .then((result) => {
//     console.log('result', result);
//   }, (reason) => {
//     console.log('reason', reason);
//   });

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('all');
  }, 1000);
});
const arr = [1, MyPromise.resolve(2), p, 3, MyPromise.resolve(1)];

MyPromise.all(arr).then(
  (results) => {
    console.log('results', results);
  },
  (reject) => {
    console.log('reject', reject);
  }
);
// Promise.all(arr).then((results) => {
//   console.log(results);
// }); // [1,2,'all']
