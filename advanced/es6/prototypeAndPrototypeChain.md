## 彻底理解：`JavaScript`原型和原型链
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
当我们使用`new`关键字执行一个函数时，除了具有所有函数直接执行的所有特性之外，`new`还帮我们做了如下的事情：
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

下面，我们尝试实现以下`new`: 
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
* `constructor`: 相比于普通对象的属性，`prototype`属性本身会有一个属性`constructor`，该属性的值为`prototype`所在的函数
* `__proto__`: 每一个对象都有一个`__proto__`属性，该属性指向对象所属实例的原型`prototype`

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

const f1 = new Fn();
const f2 = new Fn();
```

我们画图来描述一下实例、构造函数、以及`prototype`和`__proto__`之间的关系：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-06-04-0953-prototype.png)
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
```

到这里，我们已经初步理解了原型和原型链的一些相关概念，下面让我们通过一些实际例子来应用一下吧！

### 借用原型方法
在`JavaScript`中，我们可以通过`call/bind/apply`来更改`this`指向，

### 实现构造函数之间的继承

