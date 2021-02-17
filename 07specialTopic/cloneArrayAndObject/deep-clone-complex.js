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

function isPlainObject (value) {
  return getType(value) === 'Object';
}

function isReg (value) {
  return getType(value) === 'Regexp';
}

const deepClone = (value) => { // clone之后返回深拷贝后的内容
  if (Array.isArray(value)) { // 数组
    const result = [];
    value.forEach(item => {
      result.push(deepClone(item));
    });
    return result;
  } else if (typeof value === 'object' && value !== null) {
    const result = {};
    if (isPlainObject(value)) { // 普通对象
      // Object.keys只会按照对象被遍历的顺序来遍历对象自身的可枚举属性
      const keys = Object.keys(value);
      keys.forEach(key => {
        result[key] = deepClone(value[key]);
      });
    } else if (isReg(value)) { // 分别对不同类型进行处理

    }
    return result;
  } else if (typeof value === 'function') {
    // https://stackoverflow.com/a/1833851
    return function () { // 这里通过bind进行拷贝，this需要在调用前指定，不太好
      // 函数的拷贝：返回一个新的函数，该函数会执行被拷贝的函数，并且通过apply将新函数和被拷贝函数的this指向同一个值
      return value.apply(this, arguments);
    };
  } else {
    return value;
  }
};

class Person {
  say () {
    console.log('say');
  }
}

const p = new Person();

const cloneP = deepClone(p);
console.log(cloneP, p.say);