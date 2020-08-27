## 数据类型检测
typeof  

```js
// typeof null 为 'obejct'
typeof null === 'object'

// typeof Function 为 'function'
typeof Function === 'function'

// 为定义变量会返回字符串 'undefined'，不会报错
typeof a === 'undefined'

// 返回值为String类型
console.log(typeof typeof []) // 'string'
console.log(typeof typeof {}) // 'string'
```

instanceof:   

语法：`object instanceof constructor`

* The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. The return value is a boolean value

递归查找原型，如果找到的原型为`constructor`的原型返回`true`,否则返回`false`
```js
const _instanceof = (object, Constructor) => {
  let proto = Object.getPrototypeOf(object);
  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
```

constructor: 

* arr.constructor === Array.prototype.constructor === Array


jQuery:  
```js
var class2type = {};
var toString = class2type.toString; // Object.prototype.toString
var hasOwn = class2type.hasOwnProperty; // Object.prototype.hasOwnProperty
var fnToString = hasOwn.toString; // Function.prototype.toString
// Function.prototype.toString.call(Object)
// Object是一个类，也属于函数，可以调用函数的toString方法
var ObjectFunctionString = fnToString.call(Object);

// 一些常见数据类型
'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(function anonymous (item) {
  class2type['[object ' + item + ']'] = item.toLowerCase();
  // 拼接成如下格式 class2type[object Type] = type
});

function toType (obj) {
  if (obj == null) {
    return obj + ''; // return 'null' / return 'undefined'
  }
 
  return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
}
```
