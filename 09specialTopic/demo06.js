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
  return obj != null && obj === obj.window;
};

var isPlainObject = function isPlainObject (obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  // Objects with no prototype (`Object.create( null )`)
  if (!proto) {
    return true;
  }
  // Objects with prototype are plain iff they were constructed by a global Object function
  Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
};

var isEmptyObject = function isEmptyObject (obj) {
  var name;
  for (name in obj) {
    return false;
  }
  return true;
};

var isArrayLike = function isArrayLike (obj) {
  var length = !!obj && 'length' in obj && obj.length,
    type = toType(obj);
  if (isFunction(obj) || isWindow(obj)) {
    return false;
  }
  return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
};
