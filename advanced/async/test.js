// const Promise = require('./demo05');

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
// Promise.all([1, Promise.resolve(2), Promise.resolve(3), 4])
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

// Promise.resolve another Promise
Promise.resolve(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 1000);
})).then((result) => {
  console.log('result', result);
});
