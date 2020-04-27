const xhr = new XMLHttpRequest(); // 0
xhr.open('get', './demo01.js', true); // 1
// readyState属性发生变化，就会调用该函数
// 1->2, 2->3, 3->4
// xhr.addEventListener('readystatechange', function (e) {
//   console.log('state', xhr.readyState); // async: 2,3,4 , sync: 4(why?)
// });
// 当执行异步执行时，并不会立即就变为2，而是会在头部和状态时可用的时候才会将readyState变为2
xhr.send();
xhr.addEventListener('readystatechange', function (e) {
  console.log('state', xhr.readyState); // async: 2,3,4; sync: no output
});
