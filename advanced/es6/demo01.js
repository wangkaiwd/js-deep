function Animal (name) {
  this.name = name;
}

Animal.prototype.say = function () {
  console.log(`${this.name}: say`);
};

const animal = new Animal('动物');
animal.say();

// 将父类原型上的方法可以让子类通过原型链进行查找
// Tiger.prototype.__proto__ = Animal.prototype;
// 在不支持直接访问__proto__的情况下：
// Tiger.prototype.setPrototypeOf(Animal.prototype);
// Object.create() 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
// search keywords: classical inheritance with Object.create()

Tiger.prototype = Object.create(Animal.prototype);
// 该更constructor指向
Tiger.prototype.constructor = Tiger;

function Tiger (name) {
  Animal.call(this, name); // 将Animal当做普通函数执行，将this值指向Tiger的实例
}

// 每个函数(类)都有prototype对象

// Object.create的原理：创建一个空的构造函数，将构造函数的原型执行传入的参数
// 返回该空构造函数的实例：即返回一个没有自身属性，returnValue.__proto__ === Fn.prototype === 传入的参数
function create (proto) {
  function Fn () {}

  Fn.prototype = proto;
  return new Fn();
}

const tiger = new Tiger('tiger');
tiger.say();
