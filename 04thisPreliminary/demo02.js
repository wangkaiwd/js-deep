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
