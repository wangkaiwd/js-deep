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
  // null/undefined === null
  // 若果obj是null或者undefined，返回其对应的字符串('null'或者'undefined')
  if (obj == null) {
    return obj + ''; // return 'null' / return 'undefined'
  }
  // 复杂数据类型： typeof object = 'object' ; typeof function = 'function'
  // 1. typeof obj === 'object' || typeof obj === 'function' , 这个逻辑表示obj为对象或者null，null之前已经进行了处理
  // 2. class2type[toString.call(obj)) || 'object',
  //    这个逻辑表示会根据obj调用Object.prototype.toString方法后是否是class2type的属性，
  //    是的话返回其类型，否则返回'object'
  // 3. 对象 ? class2type中的属性值类型或'object' : typeof obj，
  //    即复杂数据类型通过class2type中的属性值判断或者返回'object',简单数据类型直接使用typeof进行判断
  return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
}

/*================*/

var isFunction = function isFunction (obj) {
  return typeof obj === 'function' && typeof obj.nodeType !== 'number';
};

var isWindow = function isWindow (obj) {
  // null和undefined返回false, window = window.window
  return obj != null && obj === obj.window;
};

// 普通对象的逻辑：
//    1. toString.call(obj) === '[object Object]'
//    2. Object.create(null) 如果没有原型并且满足条件1就是普通对象
//    3. 如果对象的原型有constructor属性，并且置为Object的话，就是普通对象
var isPlainObject = function isPlainObject (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }
  // 获取obj的原型
  proto = Object.getPrototypeOf(obj);

  // 如果一个对象没有原型，那么是plain object
  // Objects with no prototype (`Object.create( null )`)
  if (!proto) {
    return true;
  }

  // proto原型自身有constructor属性，赋值给Ctor,否则Ctor为false
  // Objects with prototype are plain if they were constructed by a global Object function
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
  // 如果Ctor是一个函数，
  // 那么Ctor调用Function.prototype.toString方法是否和Object调用Function.prototype.toString方法结果相同
  return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
};

// 空对象
var isEmptyObject = function isEmptyObject (obj) {
  var name;
  // 如果obj是空对象不会执行该循环
  // in 关键字会遍历原型上的一些属性和方法，需要与hasOwnProperty进行结合使用
  for (name in obj) {
    return false;
  }
  return true;
};

// 伪数组：
//    1. 有length属性
//    2. 不是函数和全局对象window
var isArrayLike = function isArrayLike (obj) {
  // 如果obj存在，并且有length属性
  var length = !!obj && 'length' in obj && obj.length,
    type = toType(obj);
  // 函数和全局对象window都有length属性
  if (isFunction(obj) || isWindow(obj)) {
    return false;
  }
  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
};
