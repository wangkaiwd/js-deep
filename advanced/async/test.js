const Promise = require('./demo05');
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

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
});

const p2 = Promise.resolve(3).finally(() => {}).then(result => {console.log(result);});
const p3 = Promise.resolve(3).then(() => {}, () => {}).then(result => {console.log(result);});

