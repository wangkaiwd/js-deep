const Promise = require('./promiseSource');
console.log(1);
const p1 = new Promise((resolve, reject) => {
  // setTimeout(() => {
  // reject('hh');
  // 这里的报错捕获不到
  // throw new Error('exception');
  // }, 1000);
  resolve('hello');
  // throw new Error('exception!');
});
// setTimeout(() => {
p1.then(
  (result) => {
    console.log('result', result);
    return result + 'hh';
  },
  (err) => {
    console.log('err', err);
  }
);
// }, 1000);

console.log(2);

