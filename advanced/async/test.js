const Promise = require('./demo04');
console.log(1);
const p1 = new Promise((resolve, reject) => {
  console.log(2);
  // setTimeout(() => {
  // reject('hh');
  // 这里的报错捕获不到
  // throw new Error('exception');
  // }, 1000);
  resolve('hello');
  // throw new Error('exception!');
});
p1.then(
  (result) => {
    console.log('result', result);
  },
  (err) => {
    console.log('err', err);
  }
);
console.log(4);

