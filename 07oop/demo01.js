function func () {
  const x = 100;
  this.num = x + 100;
}
// new 执行函数相比于普通函数执行：
//      形成执行上下文
//      初始化作用域链: scopeChain
//      确定this指向
//      创建激活变量对象(AO(activation object))
//          实参赋值
//          形参赋值
//          变量声明提升
//          [新] 创建一个空的简单`JavaScript`对象(即`{}`)
//          [新] 将`this`指向步骤1创建的对象
//          代码执行
//          [新] 如果该函数没有返回对象，则返回`this`(`return this`)
const f = new func(); // 通过new执行的时候，func就是一个自定义的类

// func(); // 普通函数执行 this => window

const f2 = new func();

console.log(f === f2); // false

console.log(f instanceof func); // true, instanceof:用来判断某一个实例是否属于某个类
