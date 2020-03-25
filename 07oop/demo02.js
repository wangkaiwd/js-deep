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
//  3. 将this指向这个空对象
//  4. 如果没有返回对象的话，将this返回

function _new (fn, ...args) {
  const tempObject = {};
  Object.setPrototypeOf(tempObject, fn.prototype);
  const result = fn.call(tempObject, ...args);
  //
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
