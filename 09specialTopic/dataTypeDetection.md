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

