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
