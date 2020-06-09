## 彻底理解：`JavaScript`原型和原型链
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-4-9-40-prototype-bg%40%E5%87%A1%E7%A7%91%E5%BF%AB%E5%9B%BE01.png)

`JavaScript`中有许多内置对象，如:`Object, Math, Date`等。我们通常会这样使用它们：
```javascript
// 创建一个JavaScript Date实例
const date = new Date();
// 调用getFullYear方法，返回日期对象对应的年份
date.getFullYear();
// 调用Date的now方法
// 返回自1970-1-1 00:00:00 UTC(世界标准时间)至今所经过的毫秒数 
Date.now()
```

当然，我们也可以自己创建自定义对象：
```javascript
function Person() {
    this.name = '张三';
    this.age = 18;
}
Person.prototype.say = function() {
    console.log('say');
}
const person = new Person();
person.name; // 张三
person.say(); // say
```

看到这些代码，不知道你是否有这些疑问：
* `new`关键执行函数和普通函数执行有什么区别吗？
* 对象的实例为什么可以调用构造函数的原型方法，它们之间有什么关系吗？

接下来，让我们带着这些问题一步步深入学习。

### `new`对函数做了什么？
当我们使用`new`关键字执行一个函数时，除了具有函数直接执行的所有特性之外，`new`还帮我们做了如下的事情：
* 创建一个空的简单`JavaScript`对象(即`{}`)
* 将空对象的`__proto__`连接到(赋值为)该函数的`prototype`
* 将函数的`this`指向新创建的对象
* 函数中如果没有返回对象的话，将`this`作为返回值

用代码表示大概是这样：
```javascript
// 1. 创建空的简单js对象
const plainObject = {};
// 2. 将空对象的__proto__连接到该函数的prototype
plainObject.__proto__ = function.prototype;
// 3. 将函数的this指向新创建的对象
this = plainObject;
// 4. 返回this
return this
```
可以看到，当我们使用`new`执行函数的时候，`new`会帮我们在函数内部加工`this`，最终将`this`作为实例返回给我们，可以方便我们调用其中的属性和方法。

下面，我们尝试实现一下`new`: 
```javascript
function _new (Constructor, ...args) {
  // const plainObject = {};
  // plainObject.__proto__ = constructor.prototype;
  // __proto__在有些浏览器中不支持，而且JavaScript也不推荐直接使用该属性
  // Object.create: 创建一个新对象，使用现有的对象提供新创建的对象的__proto__
  const plainObject = Object.create(Constructor.prototype);
  // 将this指向新创建的对象
  const result = Constructor.call(plainObject, ...args);
  const isObject = result !== null && typeof result === 'object' || typeof result === 'function';
  // 如果返回值不是对象的话，返回this(这里是plainObject)
  return isObject ? result : plainObject;
}
```

简单用一下我们实现的`_new`方法：
```javascript
function Animal (name) {
  this.name = name;
  this.age = 2;
}

Animal.prototype.say = function () {
  console.log('say');
};

const animal = new Animal('Panda');
console.log(animal.name); // Panda
animal.say(); // say
```
在介绍`new`的时候，我们提到了`prototype`,`__proto__`这些属性。你可能会疑惑这些属性的具体用途，别急，我们马上进行介绍！

### 原型和原型链
在学习原型和原型链之前，我们需要首先掌握以下三个属性：
* `prototype`: 每一个函数都有一个特殊的属性，叫做**原型**(`prototype`)
* `constructor`: 相比于普通对象的属性，**`prototype`属性本身会有一个属性`constructor`**，该属性的值为`prototype`所在的函数
* `__proto__`: 每一个对象都有一个`__proto__`属性，该属性指向对象(实例)所属构造函数(类)的原型`prototype`

> 以上的解释只针对于`JavaScript`语言

我们再来看下边的一个例子：
```javascript
function Fn () {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  };
}

Fn.prototype.getX = function () {
  console.log(this.x);
};

Fn.prototype.getY = function () {
  console.log(this.y);
};

const fn = new Fn()
```

我们画图来描述一下上边代码中实例、构造函数、以及`prototype`和`__proto__`之间的关系：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-4-9-29prototype.png)

我们再来看一下`Function`和`Object`以及其原型之间的关系：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-4-10-00.png)
由于`Function`和`Object`都是函数，因此它们的所属类为`Function`，它们的`__proto__`都指向`Function.prototype`。而`Function.prototype.__proto__`又指向`Object.prototype`，所以它们既可以调用函数原型上的方法，也可以调用对象原型上的方法。

当我们需要获取实例上的某个属性时：
> 上例中：
> * 实例：`fn`
> * 实例所属类: `Fn`
1. 首先会从自身的私有属性上进行查找
2. 如果没有找到，会到自身的`__proto__`上进行查找，而实例的`__proto__`指向其所属类的`prototype`,即会在类的`prototype`上进行查找
3. 如果还没有找到，继续到类的`prototype`的`__proto__`中查找，即`Object.prototype`
4. 如果在`Object.prototype`中依旧没有找到，那么返回`null`

上述查找过程便形成了`JavaScript`中的原型链。

在理解了原型链和原型的指向关系后，我们看看以下代码会输出什么：
```javascript
const f1 = new Fn();
const f2 = new Fn();
console.log(f1.getX === f2.getX);
console.log(f1.getY === f2.getY);

console.log(f1.__proto__.getY === Fn.prototype.getY);
console.log(f1.__proto__.getX === f2.getX);
console.log(f1.getX === Fn.prototype.getX);
console.log(f1.constructor);
console.log(Fn.prototype.__proto__.constructor);

f1.getX();
f1.__proto__.getX();
f2.getY();
Fn.prototype.getY();
// false
// true

// true
// false
// false
// Fn
// Object

// 100
// undefined
// 200
// undefined
```

到这里，我们已经初步理解了原型和原型链的一些相关概念，下面让我们通过一些实际例子来应用一下吧！

### 借用原型方法
在`JavaScript`中，我们可以通过`call/bind/apply`来更改函数中`this`指向，原型上方法的`this`也可以通过这些`api`来进行更改。比如我们要将一个伪数组转换为真实数组，可以这样做：
```javascript
function fn() {
  return Array.prototype.slice.call(arguments)
}
fn(1,2,3) // [ 1, 2, 3]
```
这里我们使用`arguments`调用了数组原型上的`slice`，这是怎么做到的呢？我们先简单模拟下`slice`方法的实现：
> `arguments`是一个类似数组的对象，有`length`属性和从零开始的索引，它可以调用`Object.prototype`上的方法，但是不能调用`Array.prototype`上的方法。
```javascript
Array.prototype.mySlice = function (start = 0, end = this.length) {
  const array = [];
  // 一般会通过Array的实例(数组)调用该方法，所以this指向调用该方法的数组
  // 这里我们将this指向了arguments = {0: 1, 1: 2, 2: 3, length: 3}
  for (let i = 0; i < end; i++) {
    array[i] = this[i];
  }
  return array;
};

function fn () {
  return Array.prototype.mySlice.call(arguments);
}

console.log(fn(1, 2, 3)); // [1, 2, 3]
```
可能你想直接调用`arguments.slice()`方法，但是遗憾的是`arguments`是一个对象，不能调用数组原型上的方法。

当我们将`Array.prototype.slice`方法的`this`指向`agruments`对象时，由于`arguments`拥有索引属性以及`length`属性，所以可以像数组一样根据`length`和索引来进行遍历，从而相当于用`arguments`调用了数组原型上的方法。

下面是另一个借用原型方法常见的例子：
```javascript
Object.prototype.toString.call([1,2,3]) // [object Array]
Object.prototype.toString.call(function() {}) // [object Number]
```
这里将`Object.prototype.toString`的`this`由对象(`Object`的实例)改为了数组(`Array`的实例)和函数(`Function`的实例)，相当于为数组和函数调用了对象上的`toString`方法，而不是调用它们自身的`toString`方法。

通过借用原型方法，我们可以让变量调用自身以及自己原型上没有的方法，增加了代码的灵活性，也避免了一些不必要的重复工作。

### 实现构造函数之间的继承
通过`JavaScript`中的原型和原型链，我们可以实现构造函数的继承关系。假设有如下`A`,`B`俩个构造函数：
```javascript
function A () {
  this.a = 100;
}

A.prototype.getA = function () {
  console.log(this.a);
};

function B () {
  this.b = 200;
}

B.prototype.getB = function () {
  console.log(this.b);
};
```

#### 方案一
这里我们可以让`B.prototype`成为`A`的实例，那么`B.prototype`中就拥有了私有方法`a`,以及原型对象上的方法`B.prototype.__proto__`即`A.prototype`上的方法`getA`。最后记得要**修正`B.prototype`的`constructor`属性**，因为此时它变成了`B.prototype.constructor`，也就是`B`。
```javascript
function A () {
  this.a = 100;
}

A.prototype.getA = function () {
  console.log(this.a);
};
B.prototype = new A();
B.prototype.constructor = B;
function B () {
  this.b = 200;
}

B.prototype.getB = function () {
  console.log(this.b);
};
```
画图理解一下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-8-10-08prototype-inhert.png)

下面我们创建`B`的实例，看下是否成功继承了`A`中的属性和方法。
```javascript
const b = new B();
console.log('b', b.a);
b.getA();
console.log('b', b.b);
b.getB();
// b 100
// 100
// b 200
// 200
```

#### 方案二
我们也可以通过将父构造函数当做普通函数来执行，并通过`call`指定`this`，从而实现实例自身属性的继承，然后再通过`Object.create`指定子构造函数的原型对象。
```javascript
function A () {
  this.a = 100;
}

A.prototype.getA = function () {
  console.log(this.a);
};
// 继承原型方法
// 创建一个新对象，使用一个已经存在的对象作为新创建对象的原型
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

function B () {
  // 继承私有方法
  A.call(this); // 如果有参数的话可以在这里传入
  this.b = 200;
}

B.prototype.getB = function () {
  console.log(this.b);
};
```
这里我们再次通过画图的形式梳理一下逻辑：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-8-10-52-call-Object.create-inherit.png)

下面我们创建`B`的实例，看下是否成功继承了`A`中的属性和方法。
```javascript
const b = new B();
console.log('b', b.a);
b.getA();
console.log('b', b.b);
b.getB();
// b 100
// 100
// b 200
// 200
```

#### `class extends`实现继承
在`es6`中为开发者提供了`extends`关键字，可以很方便的实现类之间的继承：
```javascript
function A () {
  this.a = 100;
}

A.prototype.getA = function () {
  console.log(this.a);
};
// 继承原型方法
// 创建一个新对象，使用一个已经存在的对象作为新创建对象的原型
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;

function B () {
  // 继承私有方法
  A.call(this); // 如果有参数的话可以在这里传入
  this.b = 200;
}

B.prototype.getB = function () {
  console.log(this.b);
};
```

下面我们创建`B`的实例，看下是否成功继承了`A`中的属性和方法。
```javascript
const b = new B();
console.log('b', b.a);
b.getA();
console.log('b', b.b);
b.getB();
// b 100
// 100
// b 200
// 200
```
大家可能会好奇`class`的`extends`关键字是如何实现继承的呢？下面我们用[`babel`](https://babeljs.io/) 编译代码，看下其源码中比较重要的几个点：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200609110822.png)
看下这俩个方法的实现：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200609111043.png)

值得留意的一个地方是：`extends`将父类的静态方法也继承到了子类中
```javascript
class A {
  constructor () {
    this.a = 100;
  }

  getA () {
    console.log(this.a);
  }
}

A.say = function () {
  console.log('say');
};

class B extends A {
  constructor () {
    // 继承私有方法
    super();
    this.b = 200;
  }

  getB () {
    console.log(this.b);
  }
}

B.say(); // say
```

`extends`的实现类似于方案二:
* `apply`方法更改父类`this`指向，继承私有属性
* `Object.create`继承原型属性
* `Object.setPrototypeOf`继承静态属性
 
具体的细节小伙伴们可以自己研究`babel`编译后的源码，地址在这里：[传送门](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=MYGwhgzhAECC0G8BQ1rAPYDsIBcBOArsDuntABQCUiKq0OAFgJYQB0Y0AvNAIwAMfANy0AvkloBzAKY54VGnTRYI6EFNYh0E8oxbtKw1GLFJQkGACFoUgB44pmACYx4yVBmz4iJMvLd0AegDoQHO_QH8jQEHPQEhzQE7TQFWbWlQIAgAHKTwqQzpdNgAjLmgAJgEsk1RpHCs_RKVsVXVNbRzWXINRJBMPXGh87kwpAHdoC0zTZXqNLXIAclzpgBoe_WFc1grYUa6Jxpm5xdXWlbWZEYMgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015%2Creact%2Cstage-2%2Cenv&prettier=false&targets=&version=7.10.2&externalPlugins=)

### 结语
理解`JavaScript`的原型原型链可能并不会直接提升你的`JavaScrit`编程能力，但是它可以帮助我们更好的理解`JavaScript`中一些知识点，想明白一些之前不太理解的东西。在各个流行库或者框架中也有对于原型或原型链的相关应用，学习这些知识也可以为我们阅读框架源码奠定一些基础。

如果文章内容有帮到你的话，请点赞鼓励一下作者，这将是对作者创作的最大动力！
