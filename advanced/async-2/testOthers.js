const Promise = require('./promiseOthers');

function test1 () {
  const p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(100);
      }, 1000);
    }));
  });
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test2 () {
  const p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100);
      }, 1000);
    }));
  });
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test3 () {
  const p = new Promise((resolve, reject) => {
    reject(new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(100);
      }, 1000);
    }));
  });
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test4 () {
  const p = new Promise((resolve, reject) => {
    reject(new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(100);
      }, 1000);
    }));
  });
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

// test1();
// test2();
// test3();
// test4();
