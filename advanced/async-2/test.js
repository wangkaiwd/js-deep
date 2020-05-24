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
      reject(100);
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

// resolved promise
function test4 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
  p.then((result1) => {
    console.log(a);
  }).then((result2) => {
    console.log('result2', result2);
  }, (reason) => {
    console.log('reason', reason);
  });
}

// rejected promise
function test5 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
  p.then((result1) => {
    return new Promise((resolve, reject) => {
      resolve(400);
    });
  }).then((result2) => {
    console.log(result2);
  });
}

// 抛错
function test6 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
  p.then((result1) => {
    return new Promise((resolve, reject) => {
      reject(400);
    });
  }).then((result2) => {
    console.log(result2);
  }, (reason) => {
    console.log('reason', reason);
  });
}

// .then的参数不是函数
function test7 () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  });
  // 第一个第二.then返回的Promise都是相当于p的拷贝新的promise
  p.then().then(null, 1).then((result) => {
    console.log('result', result);
  }, (reason) => {
    console.log('reason', reason);
  });
}

// test1();
// test2();
// test3();
// test4();
// test5();
// test6();
test7();
