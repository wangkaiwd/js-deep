## `let`,`const`,`var`的区别
> 参考文章：  
> * [`let`和`const`命令](https://es6.ruanyifeng.com/#docs/let)

### `let`,`const`没有变量声明提升
首先让我们了解下`JavaScript`变量赋值的大概过程：
```text
ECStack
  EC(G)
    VO(G)
    声明提升(函数+变量)
      1. 函数声明提升
      2. 变量声明提升
    变量赋值：
      1. 创建变量
      2. 创建值(对象会开辟堆内存，如果是函数，还会在创建时确定作用域)
    函数定义：
      1. 生成堆内存，并将变量指向堆内存的映射地址 
      2. 创建函数作用域:[[scope]] 
```

可以看到变量提升是在变量赋值和函数定义之前。

关于变量声明提升，我们需要知道一下几点：
1. `function`声明的函数会将**声明 + 定义**都进行提升，并且函数的提升要优先于变量
2. `var`声明的变量只会将声明进行提升
3. 如果变量名和函数名相同，则变量声明提升不会干扰已经存在的函数(即变量名不会覆盖函数名)

下面是一个`var`变量声明和`funtion`函数声明提升的一个测试题：
```javascript
fn();
function fn () {
  console.log(1);
}
fn();
function fn () {
  console.log(2);
}
fn();
var fn = () => {
  console.log(3);
};
fn();
function fn () {
  console.log(4);
}
fn();
function fn () {
  console.log(5);
}
fn();
```
我们模拟一下代码执行的过程：
```text
// 进入全局执行上下文后，函数会优先将变量+定义进行提升，
// 所以最终会通过指针指向函数 function fn() {console.log(5)}所对应的16进制地址
VO(G) = {
  // 函数和变量之间即使同名也不会相互之间影响
  function fn: function fn() { console.log(5) }
  var fn: undefined
}

// 执行代码：
VO(G) = {
  // var fn赋值之前
  fn: function fn() {console.log(5)}
  // var fn赋值之后，fn的指针指向改变
  // 由之前function fn() {console.log(5)}的地址指向function fn() {console.log(3)}的地址
  fn: function fn() {console.log(3)}
}
```

### `let`,`const`不会为全局变量增加属性
**全局变量对象`VO(G)`中**声明的用`var`声明的变量，也会给全局对象`window`中增加一个对应的属性。

当然，私有的执行上下文中使用`var`声明变量仅仅是声明变量，并不会给全局对象设置属性
```javascript
var x = 1;
console.log(window.x); // 1

let y = 2;
console.log(window.y); // undefined

const z = 3;
console.log(window.z); // undefined

// 私有执行上下文
function fn () {
  var temp = 10
  console.log(window.temp) // undefined
  console.dir(fn.temp) // undefined
}

fn()
```

当不使用关键字直接进行变量赋值的时候，如果私有上下文中没有对应的变量，那么也会为全局对象`window`设置属性
```javascript
function fn() {
  x = 100 // => window.x = 100
}
fn()
console.log(x); // 100
```

### `let`,`const`不能重复声明变量
浏览器代码执行会分为2个阶段：  
 
* 编译阶段(编译器)：词法解析 => AST抽象语法树(供浏览器运行)
* `V8`引擎执行阶段：ECStack => EC(G) => VO(G) ...

`let/const`不能重复声明变量，而且该错误检测会在编译阶段执行，发现错误后不会再使用`V8`引擎执行代码
```javascript
console.log('OK');
let x = 12;
console.log(x);
// Uncaught SyntaxError: Identifier 'x' has already been declared
let x = 13;
console.log(y)
```
**上面的代码并不会打印任何内容**,浏览器在编译阶段进行词法解析时就会发现这个错误，直接报错，不再进入代码执行阶段

下面这种情况会在代码执行阶段报错，当然这是由于`let`不会进行声明提升而产生的
```javascript
console.log('ok'); // ok
console.log(x); // x is not defined
let x = 12;
```

### `let`,`const`的区别
关于`const`，`mdn`的介绍如下：
> 常量的值不能通过重新赋值来改变，并且不能重新声明

相比于`let`，我们可以通过`const`来声明我们程序里**不会重新赋值**的变量。所以如果改变量是对象，我们可以改变其内容。
> mdn的进一步描述：  
> `const`声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容

下面我们简单实践一下：
```javascript
const a = {x:100,y:200}
a.x = 300 // 不会报错， a => {x:300, y:200}
a = {z:300} // 报错，Uncaught TypeError: Assignment to constant variable
```

总结如下：  
`let`和`const`的区别：`let`创建的变量是可以更改指针指向的(也就是可以重新赋值)，而`const`声明的变量是不允许改变指针指向的(不可以重新赋值)

### 面试题讲解
下面这个面试题你大概率遇到过：  
```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 10);
}
```
