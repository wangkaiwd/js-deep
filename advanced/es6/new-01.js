function _new (Constructor, ...args) {
  // const plainObject = {};
  // plainObject.__proto__ = constructor.prototype;
  // __proto__在有些浏览器中不支持，而且JavaScript也不推荐直接使用该属性
  // Object.create: 创建一个新对象，使用现有的对象提供新创建的对象的__proto__
  const plainObject = Object.create(Constructor.prototype);
  // 将this指向新创建的对象
  const result = Constructor.call(plainObject, ...args);
  const isObject = result !== null && typeof result === 'object' || typeof result === 'function';
  // 如果返回值不是对象的话，返回this(这里是plainObject)
  return isObject ? result : plainObject;
}

// 实现Object.create方法
// function create (proto) {
//   function A() {
//
//   }
//   A.prototype = proto
//   return new A()
// }
function Animal (name) {
  this.name = name;
  this.age = 2;
}

Animal.prototype.say = function () {
  console.log('say');
};

const animal = new Animal('Panda');
console.log(animal.name);
animal.say();
