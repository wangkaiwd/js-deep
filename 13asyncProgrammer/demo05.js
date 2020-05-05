const p1 = Promise.resolve(100);
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(200);
  }, 1000);
});

// 添加async关键字的函数的返回值一定是promise
async function fn () {
  console.log(1);
  console.time('test');
  const AA = await p2;
  console.log(AA);
  // await 是异步编程(微任务)
  // await 后边的代码也都会被列到任务队列中，即将await和await之后的代码都放到微任务队列中等待执行
  const result = await p1;
  console.log(result);
  console.timeEnd('test');
}

fn().then();
console.log(2);
// output: 1, 2 , 100
