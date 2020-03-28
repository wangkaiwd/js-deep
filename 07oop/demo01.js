function fn () {
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
const f = new fn(); // 通过new执行的时候，func就是一个自定义的类

// fn(); // 普通函数执行 this => window

const f2 = new fn();

// new 执行函数时和普通函数相同，都会形成一个全新的执行上下文，在执行时会重新创建一个新的堆来存储this
// 并将返回值指向这个新创建的堆所对应的的地址
console.log(f === f2); // false

// instanceof: 用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上
console.log(f instanceof fn); // true, instanceof:用来判断某一个实例是否属于某个类
