const Promise = require('./demo04');
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
p1.then(
  (result) => {
    console.log('result', result);
    return result + 'hh';
  },
  (err) => {
    console.log('err', err);
  }
).then((result) => {
  console.log('result', result);
});

console.log(2);
