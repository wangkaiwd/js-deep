## 原型链和原型的底层运行机制
### 原型链查找机制
首先我们了解下关于原型和原型链比较重要的三个理论知识：
* 每一个函数(普通函数和类)都具备`prototype`属性，并且属性值是一个对象
* `prototype`对象上本身有一个属性：`constructor`，指向类本身
* 每一个对象(普通对象、`prototype`、实例、函数等)都具备：`__proto__`属性，属性值是当前实例所属类的原型(`prototype`)

下面是一个实例原型和原型链相关的例子：
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
const f2 = new Fn;

console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true

console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX); // false
console.log(f1.getX === Fn.prototype.getX); // false
console.log(f1.constructor); // Fn
console.log(Fn.prototype.__proto__.constructor); // Object

f1.getX(); // 100
f1.__proto__.getX(); // undefined
f2.getY(); // 200
Fn.prototype.getY(); // undefined
```

<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200326232606.png)
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200327003810.png)
</details>

### 借用原型方法
我们先定义一个数组，看一下它的原型和原型链之间的关系：
```javascript
const arr = [1,2,3]
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200327004016.png)
</details>

下面是一个借用数组上的`slice`方法，来将字符串或者伪数组(如`arguments`)转换为真实数组的例子：
```javascript
function fn () {
  return Array.prototype.slice.call(arguments, 0);
}
console.log(fn(1, 2, 3, 4, 5));

console.log(Array.prototype.slice.call('这是一段字符串', 0)); // ['这','是','一','段','字','符','串']
```

为了弄明白上边代码的含义，我们先简单模拟实现一下`Array.prototype.slice`函数：
```javascript
Array.prototype.mySlice = function (start, end) {
  const { length } = this;
  end = end || length;
  const result = [];
  for (let i = start; i < end; i++) {
    result[i] = this[i];
  }
  return result;
};
```
`slice`方法会通过`this`的`length`属性通过`for`循环来遍历每一项，并且返回一个新数组。

`Array.prototype.slice.call(arguments,0)`将`slice`方法的`this`指向了`arguments`，然后会通过`length`属性遍历`arguments`来返回一个新的真实数组，实现了将伪数组转换为真数组的功能。

### 测试题

#### 基于内置类原型扩展方法

在`Number`的原型上添加方法，实现下面的调用
```javascript
let n = 10;
let m = n.plus(10).minus(5);
console.log(m);//=>15（10+10-5）
```
<details>
  <summary>answer</summary>
  
  ```javascript
  (function (proto) {
    const toNumber = number => {
      number = Number(number);
      if (isNaN(number)) {
        number = 0;
      }
      return number;
    };
  
    proto.plus = function (number) {
      return this + toNumber(number);
    };
    proto.minus = function (number) {
      return this - toNumber(number);
    };
  })(Number.prototype);  
  ```
</details>

#### 重置类的原型指向
普通对象和原型对象的区别就是原型对象本身就有一个指向类的`constructor`属性，所以重置原型指向(将原型对象的指针指向一个新的对象)时候，会丢失`constructor`属性，需要进行手动指定：
```javascript
function fun () {
  this.a = 0;
  this.b = function () {
    alert(this.a);
  };
}
fun.prototype = {
  b: function () {
    this.a = 20;
    alert(this.a);
  },
  c: function () {
    this.a = 30;
    alert(this.a);
  },
};
var my_fun = new fun();
my_fun.b(); // 0
my_fun.c(); // 30
```
<details>
  <summary>answer</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200328170420.png)
</details>

理解了详细的执行过程后，我们再回答一下下边的俩个问题：
```javascript
console.log(my_fun.constructor);
fun.prototype.b();
```
<details>
  <summary>answer</summary>
  
  ```text
  1. undefined
  2. 20 // 注意，这种执行方式的结果：fun.prototype.a = 30
  ```
</details>

#### 对象原型结合代码执行机制
函数多种角色和运算符优先级:
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200402214531.png)

> 注意：`new`带参数和不带参数的执行优先级是不同的

```javascript
function Foo () {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName () {
  console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

<details>
  <summary>answer</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200328180222.png)
</details>

#### 惰性函数和闭包
> [柯里化（Currying）](https://zh.javascript.info/currying-partials)

编写一个`add`函数满足如下需求:
```javascript
add(1);         //1
add(1)(2);      //3
add(1)(2)(3);   //6
add(1)(2, 3);   //6
add(1, 2)(3);   //6
add(1, 2, 3);   //6
```

实现如下：
```javascript
const curry = (fn) => {
  return function curried (...argsOuter) {
    // 实参的个数大于等于被柯理化函数的个数，会直接直接执行函数
    // 这里由于用到了fn.length,所以fn的参数个数要确定，不能使用...rest参数
    if (argsOuter.length >= fn.length) {
      return fn(...argsOuter);
    }
    return function (...argsInner) {
      return curried(...argsOuter.concat(argsInner));
    };
  };
};

const sum = function (a, b, c) {
  return a + b + c;
};

const add = curry(sum);
console.log(add(1)(2)(3)); // 6
```
函数的执行步骤如下：
* 上边的代码会对一个函数进行柯理化包装返回`curried`函数，返回的`curried`支持传入任意数量的参数
* 如果新函数传入参数的数量小于被包装函数(`sum`)的形参的数量时，会继续返回一个新的函数
* 该新函数在执行时会将之前传入的参数和当前参数进行拼接继续执行`curried`函数。然后重复之前的逻辑
* 直到传入参数的数量大于等于被包装函数(`sum`)的形参数量时，执行`sum`函数并传入之前执行时的所有参数

这样实现必须要求函数的参数的长度必须确定，那么对于参数个数不确定的函数我们该怎么办呢？
* [Currying in JS: Answering the traditional question, Add(2)(3), which gives sum of both numbers](https://theanubhav.com/2019/02/03/js-currying-in-interview/#references)
* 如果想看中文的话，这里有[笔者的翻译版本]()
