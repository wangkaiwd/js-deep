// 1.
// let x = 5;
// function fn (x) {
//   return function (y) {
//     console.log(y + (++x));
//   };
// }
// let f = fn(6); //
// f(7); // 14
// 函数执行的时候会形成一个全新的执行上下文(EC),并不会影响其它的该函数的执行上下文中执行的代码
// fn(8)(9); // 18  执行完成后会释放内存，函数内没有堆地址被外部使用
// 这里的作用域链查找时，会查找之前fn(6)执行时的执行上下文中的变量
// f(10)执行时会重新创建一个f函数执行的执行上下文环境
// f(10); // 18 f会一直占用着fn(6)返回值对应堆内存的地址，导致内存并不会被释放
// console.log(x); // 5

// 2.

let x = 5;
function fn () {
  return function (y) {
    console.log(y + (++x));
  };
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
