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

function test5 () {
  const p = Promise.resolve(new Promise((resolve, reject) => {
    resolve(100);
  }));
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test6 () {
  const p = Promise.reject(100);
  p.then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test7 () {
  const p1 = Promise.resolve(1);
  const p2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(4);
    }, 1000);
  });
  Promise.all([0, p1, p2, 3]).then((results) => {
    console.log('results', results);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test8 () {
  const p1 = Promise.resolve(1);
  const p2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(4);
    }, 1000);
  });
  Promise.race([0, p1, p2, 3]).then((results) => {
    console.log('results', results);
  }, (reason) => {
    console.log('reason', reason);
  });
}

function test9 () {
  const p1 = Promise.reject(1);
  const p2 = new Promise((resolve) => {
    setTimeout(() => {
      resolve(4);
    }, 1000);
  });
  Promise.allSettled([0, p1, p2, 3]).then((results) => {
    console.log('results', results);
  });
}

function test10 () {
  const p = new Promise((resolve, reject) => {
    resolve(100);
  });
  p.then((result) => {
    return Promise.reject(result);
  }).catch((error) => {
    console.log('error', error);
  });
}

function test11 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
  p.finally(() => {
    console.log('befor process');
  }).then((result) => {
    console.log('result', result);
  }).finally(() => {
    console.log('after process');
  });
}

// test1();
// test2();
// test3();
// test4();
// test5();
// test6();
// test7();
// test8();
// test9();
// test10();
test11();

