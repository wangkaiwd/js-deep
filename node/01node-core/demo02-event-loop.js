// node事件环：node中的微任务，优先级比Promise高
// console.log(process.nextTick);
// process.nextTick(() => {
//   console.log(1);
//   process.nextTick(() => {
//     console.log(2);
//     process.nextTick(() => {
//       console.log(3);
//     });
//   });
// });
//
// Promise.resolve().then(() => {
//   console.log('promise');
// });

// 执行先后顺序受性能影响
setImmediate(() => {
  console.log('setImmediate'); // node 中的宏任务
});

setTimeout(() => {
  console.log('setTimeout');
});

const fs = require('fs');
fs.readFile('./demo01.js', () => {
  // i/o操作会处于poll阶段，之后会进入check阶段，所以会先执行setImmediate
  setImmediate(() => {
    console.log('immediate');
  });
  setTimeout(() => {
    console.log('timeout');
  });
});

// 阅读文档：https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
