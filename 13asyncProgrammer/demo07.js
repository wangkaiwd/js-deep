console.log(1);
setTimeout(() => console.log(2), 1000);

async function fn () {
  console.log(3);
  setTimeout(() => {console.log(4);}, 20);
  return Promise.reject();
}

async function run () {
  console.log(5);
  await fn();
  console.log(6);
}

run();

for (let i = 0; i < 90000000; i++) {}

setTimeout(() => {
  console.log(7);
  new Promise((resolve, reject) => { // 宏任务
    console.log(8);
    resolve(); // 微任务，会将then中的一个函数放到微任务队列中
  }).then(() => {console.log(9);});
}, 0);

console.log(10);

// 1, 5, 3, 10, Uncaught(in promise) undefined, 4, 7, 8, 9, 2

// 微任务： 1. await fn console.log(6); 2. promise resolve
// 宏任务： 1. 1000ms, () => console.log(2); 2. 20ms, () => console.log(4) 3. 0ms, () => console.log(7)
