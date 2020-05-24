const p = new Promise((resolve) => {
  resolve(100);
});
// p.then((result1) => result1 * 2).then((result2) => console.log(result2));
// p.then((result1) => {
//   return new Promise((resolve, reject) => {
//     resolve(400);
//   });
// }).then((result2) => {
//   console.log(result2);
// });
//
// p.then((result1) => {
//   return new Promise((resolve, reject) => {
//     reject(400);
//   });
// }).then((result2) => {
//   console.log(result2);
// }, (reason) => {
//   console.log('reason', reason);
// });

p.then((result1) => {
  console.log(a);
}).then((result2) => {
  console.log('result2', result2);
}, (reason) => {
  console.log('reason', reason);
});
// reason ReferenceError: a is not defined


