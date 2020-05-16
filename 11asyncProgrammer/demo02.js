// 设置定时器时，浏览器就开始计时了
setTimeout(() => {
  console.log(1);
}, 20);

console.log(2);

setTimeout(() => {
  console.log(3);
}, 10);

console.log(4);
// console.time('AA');
for (let i = 0; i < 90000000; i++) {
  // do something
}
// console.timeEnd('AA'); // 大概60ms左右
console.log(5);
// 由于之前执行for循环会耗费比较长的时间，
// 所以在将下边的异步任务放入任务队列的时候，
// 之前放入任务队列中的2个任务已经执行完毕了
setTimeout(() => {
  console.log(6);
}, 8);
console.log(7);

setTimeout(() => {
  console.log(8);
}, 15);
console.log(9);
// 任务队列中的任务执行顺序：谁先到执行的时间就先执行谁
