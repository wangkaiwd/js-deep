function A (y) {
  let x = 2;
  function B (z) {
    console.log(x + y + z);
  }
  return B;
}
let C = A(2);
C(3);

// 第一步：创建全局执行上下文，并将其压入ECStack中
// ECStack = [
//   // => 全局执行上下文
//   EC(G) = {
//     // => 全局变量对象
//     VO(G): {
//       ... // => 包含全局对象原有的属性
//       x: 1,
//       A: function(y) {...},
//       A[[scope]]: VO(G) // 作用域为当前函数所在的变量对象
//     }
//   },
// ];

