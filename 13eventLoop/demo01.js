let n = 0;
// 设置定时器的操作是同步的，但是1s后做的事情是异步的
setTimeout(() => {
  n += 10;
  console.log(n); // will output 15 after one second
}, 1000);

n += 5;
console.log(n); // 5
