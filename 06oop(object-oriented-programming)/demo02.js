function Dog (name) {
  this.name = name;
}

Dog.prototype.bark = function () {
  console.log('bark');
};

Dog.prototype.sayName = function () {
  console.log('My name is ' + this.name);
};

// const dog1 = new Dog('小狗1');
// console.log(dog1.name);
// dog1.bark();
// dog1.sayName();

// 相比于普通函数，new命令帮我们做的一些操作：
//  1. 创建一个空对象
//  2. 将空对象的__proto__属性指向当前函数的prototype
//  3. 将this指向这个空对象
//  4. 如果没有返回对象的话，将this返回

const isObject = (value) => {
  // typeof 函数 === 'function'
  return (typeof value === 'object' || typeof value === 'function') && value !== null;
};
function _new (fn, ...args) {
  // const tempObject = {};
  // 将空对象的原型指向构造函数的prototype属性
  // 但是浏览器不推荐我们直接使用__proto__属性
  // tempObject.__proto__ = fn.prototype;
  // es6中也可以使用setPrototypeOf(obj,proto)
  // 这里我们通过Object.create(proto)执行会返回一个新的对象，函数执行时的第一个参数为创建的新对象的__proto__
  // 相当于tempObject.__proto__ = fn.prototype
  // 但是避免了直接操作__proto__
  const tempObject = Object.create(fn.prototype);
  const result = fn.call(tempObject, ...args);
  // 返回值是对象的话返回该对象
  if (typeof result === 'object' && result !== null || typeof result === 'function') {
    return result;
  }
  return tempObject;
}

const dog2 = _new(Dog, '小狗2');
console.log(dog2.name);

dog2.bark();
dog2.sayName();

console.log(dog2 instanceof Dog);

// Object.create(proto)方法创建一个新对象，使用现有对象来提供新创建的对象的__proto__
const proto = { x: 1 };
const obj1 = Object.create(proto);

const obj2 = {};
Object.setPrototypeOf(obj2, proto);
console.log(obj1);
console.log(obj2);

// Object.create()其实相当于帮我们做了俩件事：
// 1. 创建一个新对象
// 2. 设置新对象的原型为函数执行时的第一个参数
