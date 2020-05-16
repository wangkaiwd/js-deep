## `this`指向
> 参考文章：  
> * [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

`JavaScript`中`this`指向分为以下几种情况：

* 普通函数或作为对象属性
* 事件绑定
* 构造函数
* 箭头函数
* `call/apply/bind`指定

下面我们来进行一一介绍
### 普通函数或作为对象属性
`this`取决于方法执行前面是否有“点”，有“点”的话，“点”前面是谁`this`就是谁，如果没有点的话，`this`指向`window`
```javascript
const fn = function () {
  console.log(this);
};

const obj = { name: 'OBJ', fn };

fn();

obj.fn();

const fn1 = obj.fn;
fn1();
```
<details>
  <summary>answer</summary>
  
  ```text
  1. window
  2. {name: 'OBJ', fn: function() {console.log(this)}} // obj
  3. window
  ```
</details>

可以看到函数作为对象的属性被调用的时候，其`this`指向调用该函数的对象，否则其`this`指向`window`

### 事件绑定
在进行事件绑定的时候，事件绑定函数中的`this`是绑定事件的元素：
```javascript
// 假设页面中有id为button的button元素
// var x = 100;
window.x = 100;
const fn = function () {
  console.log(this.x);
};
const obj = { x: 200, fn };
const $button = document.getElementById('button');
$button.x = 300;

obj.fn();
const fn1 = obj.fn;
fn1();

$button.addEventListener('click', fn);
$button.addEventListener('mouseenter', obj.fn);

$button.addEventListener('mouseleave', function () {obj.fn();});
```
<details>
  <summary>answer</summary>
  
  ```text
  1. 200
  2. 100
  3. 点击button时：300
  4. 鼠标移入button时：300
  5. 鼠标移出时：200
  ```
</details>

但是需要注意的是，这里我们是在用户点击时，浏览器帮我们将点击事件的`this`指向绑定该事件的`DOM`元素。如果通过代码来触发对应的事件的话，我们可以通过`call/apply/bind`来指定其`this`
```javascript
$button.click.call() // this为window,打印结果为100
```

### 构造函数(`new Fn`)
构造函数(`new Fn`)执行，函数中的`this`是当前类的实例，这是`new`关键字帮我们做到的:  
```javascript
var x = 100;
const Fn = function () {
  this.x = 200;
  console.log(this.x);
};

const fn = new Fn();
```
<details>
  <summary>answer</summary>
  
  ```text
  1. 200
  ```
</details>

### 箭头函数
箭头函数中没有自身的`this`，所用到的`this`都是其最近父级上下文中的`this`
```javascript
const fn = function () {
  console.log(this);
  setTimeout(() => {
    console.log(this);
  }, 1000);
  setTimeout(function () {
    console.log(this);
  });
};

const obj = { x: 100, fn };

obj.fn();
```
<details>
  <summary>answer</summary>
  
  ```text
  1. {x:100, fn: function() {...}} // obj
  2. window
  3. {x:100, fn: function() {...}} // obj
  ```
</details>

### `call/apply/bind`改变`this`指向
为`call/apply/bind`传入的第一个参数即为函数的`this`： 
```javascript
var x = 100;
const obj = { x: 200, y: 200 };
const fn = function () {
  console.log(this.x);
};

fn();
fn.call(obj);
fn.apply(obj);

const fixedThisFn = fn.bind(obj);
fixedThisFn();
```

<details>
  <summary>answer</summary>
  
  ```text
  1. 100
  2. 200
  3. 200
  4. 200
  ```
</details>

* `call`在执行时，第一个参数为`this`指向，之后的参数为`fn`执行时的参数
* `apply`在执行时，第一个参数为`this`指向，之后的参数为`fn`执行时的参数组成的数组，数组的每一项会和`fn`的每一个参数进行对应
* `bind`在执行时，第一个参数为预先传入`this`指向，之后的参数为实际调用`fn`前预先传入的参数，返回值为一个函数`fixedThisFn`，`fixedThisFn`内部会调用`fn`并指定其`this`指向

为了更深入的理解`call/apply/bind`是如何改变函数中`this`指向的，下面我们分别模拟实现这三个函数

### `call/apply/bind`源码实现
根据前面的介绍，我们知道：当函数作为对象属性被调用时，`this`指向调用该函数的对象
```javascript
const obj = { x: 100, fn () {console.log(this);} };
obj.fn(); // {x: 100, fn: function() {...}} => obj
```
利用`JavaScript`这个特性，我们可以将执行的函数作为`call/apply`的第一个参数`context`的属性，然后通过`context`来调用该属性对应的函数，函数的`this`便指向了`context`

`call`的源码模拟如下：
```javascript
Function.prototype.myOwnCall = function (context, ...args) {
  const uniqueKey = new Date().getTime();
  // this为调用call方法的函数
  context[uniqueKey] = this;
  // 作为对象的方法被对象调用，this指向该对象context
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};
```
到这里，有的小伙伴可能已经发现了，如果`call/apply`传入的`context`不是对象呢？

首先我们看下`mdn`对`call`方法的第一个参数的描述：
> 语法：`function.call(thisArg, arg1, arg2, ...)`  
> * `thisArg`  
>   可选的。在`function`函数运行时使用的`this`值。请注意，`this`可能不是该方法看到的实际值：如果这个函数处于非严格模式下，**则指定`null`或`undefined`时会自动替换为指向全局对象，原始值会被包装**

接下来，我们对`myOwnCall`方法的第一个参数做如下处理：
```javascript
function translateToObject (context) {
  // 可以通过 == 进行判断 context == null
  // null == undefined  => 2个等号是成立的
  // null,undefined => window
  if (typeof context === 'undefined' || context === null) {
    context = window;
  } else if (typeof context === 'number') { // 原始值转换为包装对象
    context = new Number(context);
  } else if (typeof context === 'string') {
    context = new String(context);
  } else if (typeof context === 'boolean') {
    context = new Boolean(context);
  }
  return context;
}
```
在`myOwnCall`方法中调用该函数：
```javascript
Function.prototype.myOwnCall = function (context, ...args) {
  context = translateToObject(context);
  const uniqueKey = new Date().getTime();
  // this为调用call方法的函数
  context[uniqueKey] = this;
  // 作为对象的方法被对象调用，this指向该对象context
  const result = context[uniqueKey](...args);
  delete context[uniqueKey];
  return result;
};
```

`apply`的实现与`call`基本相同，只不过第二个参数是一个数组：
```javascript
Function.prototype.myOwnBind = function (context, paramsArray) {
  context = translateToObject(context);
  const uniqueKey = new Date().getTime();
  // this为调用call方法的函数
  context[uniqueKey] = this;
  // 作为对象的方法被对象调用，this指向该对象context
  const result = context[uniqueKey](...paramsArray);
  delete context[uniqueKey];
  return result;
};
```

相比于`call/apply`，`bind`函数并没有立即执行函数，而是预先传入函数执行时的`this`和参数，并且返回一个函数，在返回的函数中执行调用`bind`函数并将预先传入的`this`和参数传入

`bind`的源码模拟：
```javascript
Function.prototype.myOwnBind = function (context, ...outerArgs) {
  const fn = this;
  return function (...innerArgs) {
    return fn.call(context, ...outerArgs, ...innerArgs);
  };
};
```
精简版如下：
```javascript
Function.prototype.myOwnBind = (context, ...outerArgs) => (...innerArgs) => this.call(context, ...outerArgs, ...innerArgs);
```
> 这里并没有实现通过`new`操作符来执行`fn.bind(context)`的操作，如果想知道其详细的实现过程，可以看我的这篇文章: [JS进阶-手写bind](https://zhuanlan.zhihu.com/p/83778815)

在深入理解`call/apply/bind`的实现原理后，我们尝试完成下面的测试：
```javascript
function fn1 () {console.log(1);}
function fn2 () {console.log(2);}
fn1.call(fn2);

fn1.call.call(fn2);

Function.prototype.call(fn1);
Function.prototype.call.call(fn1);
```
<details>
  <summary>answer</summary>
  
  ```text
  1. 1
  2. 2
  3. 什么都不输出
  4. 1
  ```
</details>

这里我们根据`call`的源码来进行推导一下`Function.prototype.call.call(fn1)`，其它的执行过程类似：
```javascript
// 1. 首先会将Function.prototype.call作为一个对象来执行它原型上的call方法
// 所以call方法内部：
//    this => Function.prototype.call
//    context => fn1
// 通过对象的属性来执行方法改变this指向
//    fn1[uniqueKey] = this(Function.prototype.call)
//    fn1[uniqueKey]() // 执行 Function.prototype.call方法，但是this是context
// 2. 在this为fn1的情况下执行Function.prototype.call方法
// 所以call方法内部：
//    this => fn1
//    context => window
// 通过对象的属性来改变this指向
//    window[uniqueKey] = fn1
//    window[uniqueKey]() // 执行fn1()，但是this是window
```

这里就是有笔者关于`JavaScript`中`this`指向的相关内容的理解，希望能对阅读的小伙伴有所帮助
