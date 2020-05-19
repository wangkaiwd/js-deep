const Promise = require('./demo05');

// Promise.then
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('hello');
//   }, 1000);
// });
//
// p1.then((result) => {
//   console.log('result', result);
// }).catch(reason => {
//   console.log(reason);
// });

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
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1000);
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(500);
  }, 500);
});
Promise.race([1, Promise.reject('error'), p, p2]).then((result) => {
  console.log('result', result);
}, (error) => {
  console.log('error', error);
});

