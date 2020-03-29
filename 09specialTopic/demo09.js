// 寄生组合继承：call继承+变异版的原型继承共同完成
// call继承实现：私有到私有
// 原型继承：公有到公有

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

// 只继承公有属性
// Object.create(A.prototype): 1. 创建一个空对象 2. 将对象的原型指向A.prototype，即：const obj = {}; obj.__proto__ = A.prototype;
B.prototype = Object.create(A.prototype);
// Object.create创建的原型没有指定constructor，需要手动指定
B.prototype.constructor = B;
B.prototype.getY = function () {
  console.log(this.y);
};
