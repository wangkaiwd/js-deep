## 代码运行机制
> [What is the Execution Context & Stack in JavaScript?](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)
### 名词解释
* ECStack: execute context stack
* EC: execute context
* GO: global object
* VO: variable object

### 执行上下文

执行上下文通常分为：
* 全局执行上下文
* 函数执行上下文

### 执行上下文栈
`JavaScript`来管理执行上下文，我们可以使用数组来模拟执行上下文栈。

代码执行时，首先会向全局上下文栈中压入一个全局执行上下文，在函数执行时，会将对应函数的执行上下文压入执行上下文栈中执行

### 变量对象

### 作用域和作用域链
在创建函数的时候，除了开辟堆内存来存储函数中的代码字符串以及函数中的属性和方法键值对，还会为函数添加`[[scope]]`属性为当前的执行上下文中的变量对象(`VO:variable object`)。
```javascript
const fn = function() {
  console.log('fn')
}

// 开辟堆内存存储函数中的代码字符串和键值对(如,name,length,prototype,__proto__等)
//    fn = AAAFFF111(reference to function f) => heap(代码字符串和键值对)
//    fn.[[scope]] = VO(G) 函数的作用域为全局上下文对象
```

函数在使用变量时，会先从当前执行上下文的变量对象中查找，如果没有找到，就会从其父级(函数的作用域，即函数创建的位置)的变量对象中查找，一直找到全局执行上下文中的全局变量对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域。

作用域链会在函数执行的时候初始化。


### 牛刀小试
变量赋值的三步操作： 
1. 创建变量：declare
2. 创建值
3. 让变量和值关联(通过指针关联)起来(赋值)：定义 defined

在创建值的时候
* 基础数据类型，直接存储在栈内存中
* 复杂数据类型
    * 开辟一个存储对象内存空间“堆内存”
    * 函数在此时会确定作用域，即为其添加`[[scope]]`属性
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
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200314213145.png)
</details>

如何释放占用内存：`a = null`。

[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)的本质是让变量指向一个空的指针，达到对原有被指针指向对象内存的释放和回收

当然我们使用`a = undefined`也可以释放内存，它们之间的区别如下：
* `null`: 表示尚未创建的变量，接下来要赋值为对象，但是暂时不赋值
* `undefined`: 并不确定变量是否要赋值

下面我们介绍下`JavaScript`中的内存泄露

### 内存泄露
> 这里涉及到了垃圾回收机制，更多的阅读参考：
> * [`mdn`内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
> * [`JavaScript` 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
> * [`JavaScript`中的垃圾回收和内存泄漏](https://github.com/BooheeFE/weekly/issues/8)

不再用到的内存，没有及时释放，就叫做内存泄漏(`memory leak`)

手动释放内存很麻烦，所以大多数语言(包括`JavaScript`)提供自动内存管理，减轻程序员的负担，这被称为"垃圾回收机制"

#### 垃圾回收机制
`IE`浏览器用到的方法叫做“引用计数”，如果一个值的引用次数是0,就表示这个值不再用到了，因此可以将这块内存释放。

如果一个值不再需要了，引用数却不为0，垃圾回收机制无法释放这块内存，从而导致内存泄露。
```javascript
const arr = [1,2,3]
console.log('hello world')
```
在上面代码中，尽管后面代码没有用到`arr`,但是变量`arr`还是会一直占用`[1,2,3]`对应的堆内存的引用(地址)，所以引用次数为1，会持续占用内存。

只要我们解除`arr`对它所占用的堆内存的引用，这块内存的引用次数变为0，就可以被垃圾回收机制释放了
```javascript
let arr = [1,2,3]
console.log('hello world')
arr = null // 将arr指向空对象指针，释放占用的内存，防止内存泄露
```

谷歌浏览器的“垃圾回收机制”：  
浏览器会在空闲的时候，把所有不被占用的堆内存，进行释放和销毁

```javascript
let a = {x:100, y:200}
a = 0 // 占用栈中的内存空间
a = null // 指向一个空指针，不会占用内存，并且表示一个暂未赋值的对象
a = undefined // 指向空指针,并且表示一个没有赋值的变量
```

### 面试题分析
```javascript
// 阿里面试题
let a = {
  n: 10,
};

let b = a;

b.m = b = {
  n: 20,
};
console.log(a);
console.log(b);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315004757.png)
</details>

```javascript
// 360面试题
let x = [12, 23];
function fn (y) {
  y[0] = 100;
  y = [100];
  y[1] = 200;
  console.log(y);
}

fn(x);
console.log(x);
```

执行过程：
* `fn(x)`在执行的时候，首先会将`x`对应的堆中存储的复杂对象的地址作为函数的实参传入
* 函数执行步骤：
    1. 初始化实参集合: `arguments`(`arguments = {0:AAAFFF000 ...}`)
    2. 创建形参变量并赋值: `y=AAAFFF000`
    3. 执行函数中的代码
* 函数内容执行完毕后，函数内的堆内存没有被外部其它执行上下文中的元素占用，需要出栈，然后继续执行后边的代码
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315133628.png)
</details>

```javascript
let x = 10;

~function (x) {
  console.log(x);
  x = x || 20 && 30 || 40;
  console.log(x);
}();

console.log(x);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020031515054749.png)
</details>

```javascript
let x = [1, 2], y = [3, 4];
~function (x) {
  x.push('A');
  x = x.slice(0);
  x.push('B');
  x = y;
  x.push('C');
  console.log(x, y);
}(x);

console.log(x, y);
```

<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315154836.png)
</details>

