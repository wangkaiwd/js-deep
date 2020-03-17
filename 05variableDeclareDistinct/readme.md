## `let`,`const`,`var`的区别

`JavaScript`执行步骤：
```text
ECStack
  EC(G)
    VO(G)
  在当前执行上下文执行之前，首先会把所有带有`var`或者`function`关键字的声明或定义(var:提前声明, function:提前声明+定义)进行提前
  函数定义：1. 生成堆内存，并将变量指向堆内存的映射地址 2. 创建函数作用域:[[scope]] 
```

`let`,`const`没有变量声明提升

变量提升的一个问题
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

浏览器中的执行情况，`NodeJs`中会不一样

**全局变量对象`VO(G)`中**声明的变量(用`var`声明的)，也会给全局对象`GO(window)`中增加一个对应的属性。私有的执行上下文中使用`var`声明变量并不会给全局对象设置属性，仅仅是声明变量，并不会有额外的操作。
```javascript
var x = 1;
console.log(window.x); // 1

let y = 2;
console.log(window.y); // undefined

const z = 3;
console.log(window.z); // undefined
```
当不使用关键字直接进行变量赋值的时候，如果私有上下文中没有对应的变量，那么会为全局变量对象`VO(G)`设置属性
```javascript
function fn() {
  x = 100 // => window.x = 100
}
fn()
console.log(x); // 100
```

`let/const`不能重复声明变量，而且该错误检测会在编译阶段执行，发现错误后不会再使用`V8`引擎执行代码
> 编译阶段(编译器)：词法解析 => AST抽象语法树(共浏览器运行)
> 引擎执行阶段：ECStack => EC(G) => VO(G) ...
```javascript
console.log('OK');
let x = 12;
console.log(x);
// 在编译阶段进行词法解析时就会发现这个错误，直接报错，不再进入代码执行阶段
// Uncaught SyntaxError: Identifier 'x' has already been declared
let x = 13;
console.log(y)
```

下面这种情况会在代码执行阶段报错
```javascript
console.log('ok'); // ok
console.log(x); // x is not defined
let x = 12;
```

暂时性死区(暂时没解决的`bug`)
```javascript
console.log(typeof a) // undefined (正常应该报错)
// 使用let声明变量后，代码会报错，因为在let声明变量之前，只要用到该变量就会报错
// let a;
```
