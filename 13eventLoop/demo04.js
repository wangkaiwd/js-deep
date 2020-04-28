const p1 = new Promise((resolve, reject) => {
  console.log(1);
  // 微任务 reject/resolve
  resolve(100);
  console.log(2);
});
p1.then(result => {
  console.log('成功', result);
}, reason => {
  console.log('失败', reason);
});
console.log(3);

