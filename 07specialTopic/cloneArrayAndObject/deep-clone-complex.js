// 可能的类型：
// A value can be a string in double quotes, or a number, or true or false or null, or an object or an array.
// 1. 对象或数组的原型要拷贝吗？(目前不拷贝)
// 2. Date, Math如何处理？
// 3. regexp 要如何处理
// 4. function 如何处理
// 5. 环形对象该如何处理？
// 6. 爆栈问题如何解决？

function getType (value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

const strategies = {};
strategies.object = function (value) {
  const result = {};
  // Object.keys只会按照对象被遍历的顺序来遍历对象自身的可枚举属性
  const keys = Object.keys(value);
  keys.forEach(key => {
    result[key] = deepClone(value[key]);
  });
  return result;
};
strategies.regexp = function (value) {
  return new RegExp(value.source, value.flags);
};
strategies.array = function (value) {
  const result = [];
  value.forEach(item => {
    result.push(deepClone(item));
  });
  return result;
};
strategies.function = function (value) {
  return function () { // 这里通过bind进行拷贝，this需要在调用前指定，不太好
    // 函数的拷贝：返回一个新的函数，该函数会执行被拷贝的函数，并且通过apply将新函数和被拷贝函数的this指向同一个值
    return value.apply(this, arguments);
  };
};
// 所有的策略都不满足，执行默认策略
strategies.default = function (value) {
  return value;
};
const deepClone = (value) => { // clone之后返回深拷贝后的内容
  const type = getType(value).toLowerCase();
  const strategy = strategies[type] || strategies.default;
  return strategy(value);
};

class Person {
  say () {
    console.log('say');
  }
}

const p = new Person();
const reg = /a/g;
const cloneReg = deepClone(reg);
cloneReg.lastIndex = 2;
console.log(cloneReg.lastIndex, reg.lastIndex);