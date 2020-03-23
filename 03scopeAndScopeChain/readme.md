## 作用域和作用域链
```javascript
function A (y) {
  let x = 2;
  function B (z) {
    console.log(x + y + z);
  }
  return B;
}
let C = A(2);
C(3);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315162947.png)
</details>


```javascript
let x = 5;
function fn (x) {
  return function (y) {
    console.log(y + (++x));
  };
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
```
闭包：函数执行形成一个全新的执行上下文，当前执行上下文中的变量和其它执行上下文之间是互不干扰的，保护变量不会被污染。当函数执行上下文中的函数所对应的堆内存被外部所占用的时候，当前执行上下文不会被销毁，而是被压缩到全局上下文栈的底部，其中的变量对象也会一直保存下来，可以供未来的作用域链来查找并使用。

闭包的作用：保护+保存
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200323233304.png)
</details>

```javascript
let x = 5;
// 函数创建： 1. 创建堆内存 2. 生成作用域
function fn () {
  return function (y) {
    console.log(y + (++x));
  };
}

// 函数每次执行都会生成一个全新的执行上下文
// 函数执行： 1. 初始化作用域链  2. 实参赋值 3. 形参赋值 4. 执行代码
let f = fn(6);
f(7);
fn(8)(9);

// f对应的存储地址创建于之前fn执行后的返回值，所以作用域链要在这里进行查找，所以会用到前一次fn执行时的上下文环境
f(10);
console.log(x);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200323235221.png)
</details>

```javascript
let a = 0, b = 0;
function A (a) {
  A = function (b) {
    alert(a + b++);
  };
  alert(a++);
}
A(1);
A(2);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200323235409.png)
</details>
