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
