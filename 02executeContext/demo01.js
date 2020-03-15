// 编译器(把代码解析成为浏览器可以看的懂的结构)：
//    词法解析
//    AST抽象语法树
//    构建出浏览器能够执行的代码
// 引擎(V8 webkit内核)
//    变量声明提升
//    作用域 闭包
//    变量对象
//    堆栈内存
//    GO/VO/AO/EC/ECStack
//    ...

// let a = 12;
// let b = a;
// b = 13;
// console.log('a', a);
//
// let a = {
//   n: 12,
// };
//
// let b = a;
// b.n = 13;
// console.log(a.n);
