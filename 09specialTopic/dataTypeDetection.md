## 数据类型检测
在`JavaScript`中，数据类型检测有如下方法：

* typeof
* instanceof
* constructor
* Object.prototype.toString.call
* Array.isArray

接下来我们一一介绍每种方式的使用方式及使用技巧

### typeof
首先看一下`mdn`中关于`typeof`返回值的介绍：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200326005346.png)


从上图中可以看到，`typeof`对于简单数据类型(`Number,String,Boolean,Undefined`)的判断是准确的。

对于复杂数据类型，*`typeof`会将`function`进行单独处理*。而`function`之外的数据类型，不管是字面量对象，还是`Date, Regexp, Math`都会统一返回`object`。当`typeof`用来处理`null`时也会返回`object`

总结一下：
* `typeof function === 'function'`
* `typeof null === 'object'`
* `typeof execeptFunctionObject === 'object'`

当我们使用`typeof`来判断一个未声明的变量时，会返回`undefined`，并不会报错:
```javascript
const a = 1
console.log(typeof a) // 'number'
console.log(typeof b) // 'undefined' （不会报错）
```

需要注意的是，**`typeof`的返回值为`string`类型**，我们看一下下边的代码：
```javascript
console.log(typeof typeof []) // typeof 'object' => 'string'
console.log(typeof typeof {}) // typeof 'object' => 'string'
```

### instanceof
> 参考：  
> * [类检查："instanceof"](https://zh.javascript.info/instanceof)

我们先看下`mdn`对于`instanceof`的介绍：  
> `instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的原型链上

对于`instanceof`我们可以这样理解：

* 检测某个实例是否属于某个类
* 所有出现在实例原型链上的类都会返回`true`

我们看下面一个例子：
```javascript
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
```

`instanceof`的执行过程就是判断实例的`__proto__`是否为`instanceof`后边的类的`prototype`。

是的话就会返回`true`,如果不是的话，继续从原型链向上查找，即实例的`__proto__.__proto__`是否为`instanceof`后边的类的`prototype`,直到找最后`Object.prototype`都没有找到的话，返回`false`,否则返回`true`

这里我们用代码模拟一下`instanceof`的查找过程，方便理解：
```javascript
const _instanceof = function (instance, Class) {
  // let proto = instanceof.__proto__
  let proto = Object.getPrototypeOf(instance);
  while (Class.prototype) {
    if (proto === Class.prototype) {
      return true;
    }
    // proto = proto.__proto__
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};

console.log(_instanceof([], Array));  // true

console.log(_instanceof([], Object)); // true
```
根据`instanceof`的原理可以做出如下推论：
* 由于`[].__proto__ === Array.prototype`，所以`[] instanceof Array`返回`true`
* 由于`Array.prototype.__proto__ === Object.prototype`，即`[].__proto__.__proto === Object.prototype`，所以`[] instanceof Object`返回`true`

由于`instanceof`是根据原型链来进行检测的，所以我们可以得出以下俩个结论：
* 原型链的指向可以改变，所以`instanceof`用来检测数据类型并不完全准确
* 由于简单数据类型没有`__proto__`属性，所以无法使用`instanceof`来检测类型

我们看下`instanceof`无法准确进行检测的例子：
```javascript
const fn = function() { };

// 更改原型和原型链指向
fn.__proto__ = Array.prototype;
fn.prototype = Array.prototype;
const fn1 = new fn();

console.log(fn instanceof Function); // false
console.log(fn instanceof Array); // true

console.log(fn1 instanceof fn); // true
console.log(fn1 instanceof Array); // true

// 简单数据类型检测不准确
console.log(1 instanceof Number); // false
```

### constructor
每一个函数都有一个`prototype`属性，该属性的值为对象。而`prototype`相比于普通对象，其天生就带有`constructor`属性，属性值为原型所属的函数：
```javascript
const arr = [];
console.log(arr.constructor); // Array
```
上边我们定义了一个数组`arr`，在获取`arr`的`constructor`属性时：
* 从本身的属性中查找并没有找到`constructor`属性
* 从`arr.__proto__`中查找
* 由于`arr`是`Array`的实例，所以`arr.__proto__ === Array.prototype`
* `Array.prototype === Array`，所以`arr.constructor`为`Array`

`constructor`和`instanceof`类似，都是基于原型链来进行数据类型检测，所以当我们修改原型指向后，检测结果并不准确。
```javascript
const arr = [];
// 当然，一般情况下我们并不会这样做，这里仅仅举例说明
Array.prototype.constructor = null;
console.log(arr.constructor); // null
```

### Array.isArray
`Array.isArray`是构造函数`Array`上的一个属性，它可以判断一个值的类型是否为数组：
```javascript
Array.isArray([1,2,3]); // true
Array.isArray(1); // false
Array.isArray('abc'); // false
```
当然，该方法只能用于判断数组，并不能判断是否为其它数据类型

### Object.prototype.toString.call
在上文中介绍的数据类型检测方法都有一定的不足，这里我们介绍的`Object.prototype.toString.call`方法可以很好的判断数据类型，并且弥补了之前几种方法出现的问题。

下面我们看下如何使用该方法来进行数据类型检测：
```javascript
const toString = Object.prototype.toString
// 判断简单数据类型
console.log(toString.call(1)); // '[object Number]'
console.log(toString.call('a')); // '[object String]'
console.log(toString.call(true)); // '[object Boolean]'
console.log(toString.call(null)); // '[object Null]'
console.log(toString.call(undefined)); // '[object Undefined]'

// 判断复杂数据类型，可以详细区分不同的对象
console.log(toString.call([])); // '[object Array]'
console.log(toString.call({})); // '[object Object]'
console.log(toString.call(new Date)); // '[object Date]'
```

即使我们更改原型链，也可以准确检测数据类型：
```javascript
const arr = []
arr.__proto__ = Function.prototype
console.log(arr instanceof Array); // false
console.log(toString.call(arr)); // '[object Array]'
```

`Object.prototype.toString`并不会将对象转换为字符串，而是将对象的信息作为`[object Type]`的格式输出。

我们通过`call`方法来借用`Object.prototype.toString`，让其它非对象数据类型也能调用该方法，获取到其信息来进行数据检测。

如果你不知道选择哪种方式来检测数据类型的话，使用`Object.prototype.toString.call`方法准没错！

### `JQuery`源码数据类型检测
在掌握了`JavaScript`中关于数据类型检测的相关知识后，我们看一下在`JQuery`中是如何进行数据类型检测的。

先看下如何使用`JQuery`中的数据类型检测方法： 
```javascript
jQuery.type( true ) === "boolean"
jQuery.type( 3 ) === "number"
jQuery.type( "test" ) === "string"
jQuery.type( function(){} ) === "function"
jQuery.type( [] ) === "array"
jQuery.type( undefined ) === "undefined"
```

下面是笔者整理的`JQuery`中的类型检测相关代码：
```javascript
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
```
`JQuery`会将类型经过`Object.prototype.toString`方法转换后的结果作为`key`放到`class2type`中，并将类型的小写值作为属性值，最终在调用时返回

`JQuery`还为我们封装了一些工具方法方便进行类型判断：
```javascript
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
```

在日常开发中，我们可以结合`JQuery`源码封装自己的类型判断函数。

### 总结
`JavaScript`中的类型检测方法各有特点，对于其用法我们做一下小结：

* 简单数据类型可以使用`typeof`来判断，语法简单快捷
* 可以直接使用`Array.isArray`来检测数组
* `instanceof`和`constructor`可以用来检测对象的具体类型，但是在修改了原型链后，结果会不准确
* `Object.prototype.toString.call`是一个万能公式，基本上可以用来检测`JavaScript`中所有的数据类型 
