// let a = 0, b = 0;
// function A (a) {
//   // 这里的上下文在A(2)执行的时候不会被销毁，因为这里新创建的函数地址会被全局变量A所占用
//   // 将作用域和函数地址都统一替换为了一个新的函数
//   A = function (b) {
//     alert(a + b++); // 4
//   };
//   alert(a++); // 1
// }
// A(1);
// A(2);

var x = 3, obj = { x: 5 };
obj.fn = (function () {
  this.x *= ++x; // window.x => 12
  return function (y) {
    this.x *= (++x) + y;
    console.log(x);
  };
})();

var fn = obj.fn;
obj.fn(6); // obj.x = 5 * 13 + 6 => 71, window.x => 13
// obj.fn对应的函数的地址是在自执行函数中创建的，所以作用域及作用域链都要从其定义的位置开始查找
fn(4);     // window.x = 13 * 14 + 4 => 186
console.log(obj.x, x); // 71, 186
