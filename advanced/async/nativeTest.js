const promise = new Promise((resolve, reject) => {
  resolve(100);
});

// 引用同一个对象：2.3.1
const promise2 = promise.then(() => promise2);

// 调用promise.then可能会报错
// Object.defineProperties(promise, 'then', {
//   get () {
//     throw new Error('error');
//   }
// });

// const obj = {
//   a: 1,
//   then () {
//     if (++this.a === 2) {
//       throw Error('error');
//     }
//   }
// };
// obj.then();
// obj.then(); // 第二次取值时报错
