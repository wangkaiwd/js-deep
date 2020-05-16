// call继承:
//  把父类当做普通函数执行，让其执行的时候，方法中的this变为子类的实例
// B子类 => A父类
//  1. 只能继承父类中的私有属性(继承的私有属性赋值给子类实例的私有属性)，而且是类似拷贝过来一份，而不是链式查找
//  2. 因为只是将父类当做普通函数执行，所以父类原型上的公有属性无法被继承

function A () {
  this.x = 100;
}

A.prototype.getX = function () {
  console.log(this.x);
};

function B () {
  A.call(this);
  this.y = 200;
}

B.prototype.getY = function () {
  console.log(this.y);
};

const b = new B();
//
// console.log(b.x);
// b.getX();
// b.getY();
// console.log(b.y);
