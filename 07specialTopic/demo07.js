// 原型继承

// B子类 => A父类

// 存在的问题，所有继承过来的属性都要通过原型链查找，不能会为其添加私有属性
// 特点：
//    1. 并不会把父类中的方法克隆一份给子类，而是建立了子类和父类之间的原型链查找机制
//    2. 重定向子类的原型后，会丢失原本的constructor属性(也可能丢失其原本原型上的属性和方法)
//    3. 子类或者子类的实例，可以基于原型链"肆意"修改父类的属性方法，对父类造成一些“不必要的破坏”
//    4. 会把父类中私有的属性方法作为子类的共有属性方法继承过来(父类中不管是共有还是私有，最后都变成了公有)
function A () {
  this.x = 100;
}

A.prototype.getX = function () {
  console.log(this.x);
};

function B () {
  this.y = 200;
}

B.prototype = new A();
B.prototype.getY = function () {
  console.log(this.y);
};

const b = new B();

console.log(b.x);
b.getX();
b.getY();
console.log(b.y);
