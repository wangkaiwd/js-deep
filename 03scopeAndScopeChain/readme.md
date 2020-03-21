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
f(10)
f(10);
console.log(x);
```
<details>
  <summary>diagram</summary>
  
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
  
</details>
