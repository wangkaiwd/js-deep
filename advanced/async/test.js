const Promise = require('./demo05');

// Promise.then
// 该例中resolve异步执行
console.log('script start');
const p1 = new Promise((resolve, reject) => {
  console.log('before resolve');
  setTimeout(() => {
    resolve('hello');
  }, 1000);
  console.log('after resolve');
});
// console.log('script start');
// const p1 = new Promise((resolve, reject) => {
//   // 没有异步的情况下，直接将状态和值进行改变，此时resolveFnList为[]
//   console.log('before resolve');
//   resolve(100);
//   console.log('after resolve');
// });

// .then 传入onFulfilled, onRejected
// return Promise
// 在该例子中，resolve已经执行完成Promise的状态变为fulfilled，值为100
// .then中的onFulfilled方法会执行，并且执行结果会被.then返回的Promise中传入的立即函数中的resolve执行
// resolve: 改变值和状态
// 即返回一个新的Promise,值为onFulfilled执行的返回值undefined,状态为fulfilled
// 如果继续.then的话，.then中的方法会通过setTimeout进行异步执行
p1.then((result) => {
  console.log('result', result);
}).catch(reason => {
  console.log(reason);
}).then((result) => {
  console.log('result2', result);
});
console.log('script end!');
// resolve异步执行
// 此时.then中的status为pending, value为undefined
// 所以当Promise的状态仍然处于pending时，并不可以立即执行onFulfilled，而是需要将值放到数组中，等到resolve被调用时，再执行onFulfilled
// 而onFulfilled执行后的结果，会继续被.then返回的Promise进行resolve

// Promise.finally
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100);
//   }, 1000);
// });
// const p2 = Promise.resolve(3).finally(() => {}).then(result => {console.log(result);});
// const p3 = Promise.resolve(3).then(() => {}, () => {}).then(result => {console.log(result);});

// Promise.all
// const p3 = Promise.resolve(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100);
//   }, 1000);
// }));
// Promise.all([1, Promise.resolve(2), p3, 4])
//   .then(
//     (values) => {
//       console.log('values', values);
//     },
//     (errors) => {
//       console.log(errors);
//     }
//   );

// Promise resolve another Promise
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve another promise
//     resolve(new Promise((resolve, reject) => {
//       resolve('hello');
//     }));
//   }, 1000);
// });
// p1.then((result) => {
//   console.log('result', result);
// });

// Promise.resolve another Promise, if use Promise.reject, will not wait 1000ms
// 如果使用Promise.reject将不会等待1s后执行，而是直接将Promise进行reject
// Promise.resolve(new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(3);
//   }, 1000);
// })).then((result) => {
//   console.log('result', result);
// });

// Promise.race
// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1000);
//   }, 1000);
// });
//
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(500);
//   }, 500);
// });
// Promise.allSettled([1, Promise.reject('error'), p, p2]).then((result) => {
//   console.log('result', result);
// }, (error) => {
//   console.log('error', error);
// });

