const Promise = require('./demo04');
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello');
  }, 1000);
});

p1.then((result) => {
  console.log('result', result);
});


