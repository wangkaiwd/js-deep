const Promise = require('./demo05');
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('hello');
  }, 1000);
});

p1.then((result) => {
  console.log('result', result);
}).catch(reason => {
  console.log(reason);
});


