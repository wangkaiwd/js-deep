const Promise = require('./demo04');
const promise = new Promise((resolve, reject) => {
  resolve('hello');
});

// 引用同一个对象：2.3.1
const promise2 = promise.then(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 可能resolve的结果还是一个promise
      resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(100 );
        });
      }));
      // resolve(100);
    }, 1000);
  });
});

promise2.then((result) => {
  console.log('result', result);
}, reason => {
  console.log('reason', reason);
});



