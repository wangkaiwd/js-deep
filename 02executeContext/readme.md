## 代码运行机制
> [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)
### 名词解释
* ECStack: execute context stack
* EC: execute context
* GO: global object
* VO: variable object

### 面试题详解
变量赋值的三步操作： 
1. 创建变量：declare
2. 创建值
3. 让变量和值关联(通过指针关联)起来(赋值)：定义 defined

在创建值的时候
* 基础数据类型，直接存储在栈内存中
* 复杂数据类型
    * 开辟一个存储对象内存空间“堆内存”
    * 所有的堆内存都有一个可被后续查找的16进制地址
    * 后续关联赋值时，是把堆内存地址给与变量
    
```javascript
// 1.
let a = 12;
let b = a;
b = 13;
console.log('a', a);

// 2.
let a = {
  n: 12,
};

let b = a;
b.n = 13;
console.log(a.n);
```

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200314213145.png)

如何释放占用内存：`a = null`。

> 指针是一个变量，其值为另一个变量的地址

`null`并没有开辟新的内存，只是将之前的指针指向了一个空指针，取消了之前对某一个堆的引用，从而释放内存

[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)的本质是让变量指向一个空的指针，达到对原有被指针指向对象内存的释放和回收

* `null`: 接下来要赋值，但是暂时不赋值
* `undefined`: 并不确定变量是否要赋值

```javascript
let a = {x:100, y:200}
a = 0 // 占用栈中的内存空间
a = null // 指向一个空指针，不会占用内存，并且表示一个暂未赋值的变量
a = undefined // 指向空指针,并且表示一个没有赋值的变量
```

```javascript
// 阿里面试题
let a = {
  n: 10,
};

let b = a;

b.m = b = {
  n: 20,
};
console.log(a);  // { n: 10, m: { n: 20 } }
console.log(b);  // { n: 20 }
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315004757.png)

```javascript
// 360面试题
let x = [12, 23];
function fn (y) {
  y[0] = 100;
  y = [100];
  y[1] = 200;
  console.log(y); // [100, 200]
}

fn(x);
console.log(x); // [100,23]
```

执行过程：
* `fn(x)`在执行的时候，首先会将`x`对应的复杂堆中存储的复杂对象的地址作为函数的实参传入
* 函数执行步骤：
    1. 初始化实参集合: `arguments`(`arguments = {0:AAAFFF000 ...}`)
    2. 创建形参变量并赋值: `y=AAAFFF000`
    3. 执行函数中的代码
* 函数内容执行完毕后，函数内的内存没有被其它元素占用，需要出栈，然后继续执行后边的代码

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315133628.png)

```javascript
let x = 10;

~function (x) {
  console.log(x);
  x = x || 20 && 30 || 40;
  console.log(x);
}();

console.log(x);
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020031515054749.png)

```javascript
let x = [1, 2], y = [3, 4];
~function (x) {
  x.push('A');
  x = x.slice(0);
  x.push('B');
  x = y;
  x.push('C');
  console.log(x, y); // [3, 4, 'C'], [3, 4, 'C']
}(x);

console.log(x, y); // [1, 2 ,'A'], [3, 4, 'C']
```
> 这里涉及到了垃圾回收机制，更多的阅读参考：
> * [`mdn`内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
> * [`JavaScript` 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
> * [`JavaScript`中的垃圾回收和内存泄漏](https://github.com/BooheeFE/weekly/issues/8)

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315154836.png)
