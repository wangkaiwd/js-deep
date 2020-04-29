async function async1 () {
  console.log('async1 start');
  await async2(); // async2执行是同步的，但await等到async2执行后，返回对应状态的Promise的值的过程是异步的
  console.log('async1 end');
}

async function async2 () {
  console.log('async2');
}

console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

// script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout

// async2 为什么会直接执行输出async
