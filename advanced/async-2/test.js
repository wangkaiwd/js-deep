const Promise = require('./promise');

// 基础使用
function test1 () {
  const p = new Promise((resolve, reject) => {
    resolve(100);
  });
  p.then((result) => {
    console.log('result', result);
  });
}

function test2 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
  p.then((result) => {
    console.log('result', result);
  });
}

function test3 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  }).then((result) => {
    console.log('result2', result);
  }, (reason) => {
    console.log('reason2', reason);
  });
}

// test1();
// test2();
