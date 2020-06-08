function A () {
  this.a = 100;
}

A.prototype.getA = function () {
  console.log(this.a);
};
// 继承原型方法
// 创建一个新对象，使用一个已经存在的对象作为新创建对象的原型
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

function B () {
  // 继承私有方法
  A.call(this); // 如果有参数的话可以在这里传入
  this.b = 200;
}

B.prototype.getB = function () {
  console.log(this.b);
};

const b = new B();
console.log('b', b.a);
b.getA();
console.log('b', b.b);
b.getB();
