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
console.log(1 instanceof Number); false
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


### 总结
