var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var fnToString = hasOwn.toString;
var ObjectFunctionString = fnToString.call(Object);

'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' ').forEach(function anonymous (item) {
  class2type['[object ' + item + ']'] = item.toLowerCase();
});

function toType (obj) {
  if (obj == null) {
    return obj + '';
  }
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
