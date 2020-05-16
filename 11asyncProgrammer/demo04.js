// const p1 = new Promise((resolve, reject) => {
//   console.log(1);
//   // 微任务 reject/resolve
//   resolve(100);
//   console.log(2);
// });
// p1.then(result => {
//   console.log('成功', result);
// }, reason => {
//   console.log('失败', reason);
// });
// console.log(3);

// promise的状态：[[promiseStatus]]: 'resolved' | 'rejected' | 'pending' (基于前一个promise的状态)
// promise的值： [[promiseValue]] 传递给.then中第一个函数和第二个函数的参数

new Promise((resolve, reject) => {
  resolve(a);
})
  .then(
    (result) => {
      console.log(`成功:${result}`);
    },
    (reason) => {
      console.log(`失败:${reason}`);
    })
  .then(
    (result) => {
      console.log(`成功:${result}`);
    },
    (reason) => {
      console.log(`失败:${reason}`);
    }
  );

// .then中传入的参数中的返回值决定返回的新的promise的状态和值
// 1. 代码报错， 新的promise的状态为rejected,值为报错信息
// 2. 什么都不返回，新的promise的状态为resolved,值为undefined
// 3. 返回非Promise内容，新的Promise的状态为resolved,值为其返回值
// 4. 返回Promise，新的Promise的状态为返回Promise的状态，值为返回Promise的值
// 5. 如果.then中传入非函数元素作为参数，则Promise在处于的状态执行该函数时会跳过该次执行，继续执行下一个.then
