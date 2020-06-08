function A () {
  this.a = 100;
}

A.prototype.getA = function () {
  console.log(this.a);
};
B.prototype = new A();
B.prototype.constructor = B;

function B () {
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

// b 100
// 100
// b 200
// 200
