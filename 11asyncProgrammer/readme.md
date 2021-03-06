## `JavaScript`事件循环机制
> 阅读推荐： 
> * [并发模型与事件循环](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
> * [事件循环：微任务和宏任务](https://zh.javascript.info/event-loop)
> * [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
> * [JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

`JS`本身是单线程的(浏览器只分配一个线程供`JS`代码自上而下运行)

`JS`中的异步编程：
* 浏览器
    * 定时器
    * 事件绑定
    * `Promise/Async/Await`
    * `ajax/fetch`请求(`HTTP`事务)
    * ...
* `Node.js`：
    * `progress.nextTick`
    * `setImmediate`
    * `fs`进行`I/O`操作
    * ...

`JS`中异步操作的运行机制：事件队列(`Event Queue`)和事件循环(`Event Loop`)

首先，浏览器会分配一个线程，让代码在执行上下文栈中自上而下执行。

浏览器出了创建执行上下文栈，还会有一块堆内存来存储事件队列(`Event Queue`)。

事件队列：预先把一些不立即执行的方法进行存储，方便后期找到并执行

我们看一下下面代码的执行过程：
```javascript
let n = 0;
// 设置定时器的操作是同步的，但是1s后做的事情是异步的
setTimeout(() => {
  n += 10;
  console.log(n); // will output 15 after one second
}, 1000);

n += 5;
console.log(n); // 5
```
* 执行上下文栈中自上而下执行代码
* 在遇到异步任务时，会将其放到事件队列中(这里将`setTiemout`中的异步任务"1s后执行箭头函数"放到宏任务队列中)
* 继续执行之后的代码
* 执行上下文中栈中的代码执行完毕，线程进入空闲状态(执行完最后一行`console.log(n)`)
* 先在微任务事件队列中查找，找到后放到执行上下文栈中执行(上例中没有微任务)
* 然后在宏任务事件队列中查找，找到后放到执行上下文中执行(时间到达后执行箭头函数)

<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200427002818.png)
</details>

需要注意的是：
* 只有主线程空闲下来，才会去事件队列中查找对应的任务，放到执行上下文栈中执行
* 当事件队列中的任务在主线程中执行时，主线程又开始了忙碌，只有等到主线程再次空闲时，才会继续去事件队列中查找任务并放到执行上下文栈中执行

当有异步任务时，执行过程是这样的：主线程执行同步代码 -> 执行完成后，将事件队列中的任务放到执行上下文中执行 -> 主线程忙碌起来，再次执行事件队列中的任务 -> 执行完成后，再次将事件队列中的任务放到执行上下文中执行 -> ... -> 直到事件队列中没有任务。这样的代码执行->查找->执行->...循环过程，我们称之为事件循环。

`JS`不管在任何时候同时只能做一件事情，它的异步并不是真正的异步，而是基于事件队列和事件循环机制，把一些方法延后执行而已。

发送`ajax`请求是一个例外，浏览器会单独分配一个线程继续执行`JS`，另外分配一个线程去发送`HTTP`事务

### 测试题
```javascript
setTimeout(() => {
  console.log(1);
}, 20);

console.log(2);

setTimeout(() => {
  console.log(3);
}, 10);

console.log(4);
// console.time('AA');
for (let i = 0; i < 90000000; i++) {
  // do something
}
// console.timeEnd('AA'); // 大概60ms左右
console.log(5);
// 由于之前执行for循环会耗费比较长的时间，
// 所以在将下边的异步任务放入任务队列的时候，
// 之前放入任务队列中的2个任务已经执行完毕了
setTimeout(() => {
  console.log(6);
}, 8);
console.log(7);

setTimeout(() => {
  console.log(8);
}, 15);
console.log(9);
// 任务队列中的任务执行顺序：谁先到执行的时间就先执行谁
```
<details>
  <summary>answer diagram</summary>
  
  output: `2 4 5 7 9 3 1 6 8`
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200427232715.png)
</details>

### 异步`ajax`
为什么同步操作时，`readystatechange`事件在`send`之前，只在`readyState`为4的时候触发？

### `Promise`和`async/await`
例1：
```javascript
async function async1 () {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2 () {
  console.log('async2');
}

console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
```
<details>
  <summary>answer diagram</summary>
  
  output: `script start, async1 start, async2, promise1, script end, async1 end, promise2, setTimeout`
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200444429224546.png) 
</details>

例2：
```javascript
console.log(1);
setTimeout(() => console.log(2), 1000);

async function fn () {
  console.log(3);
  setTimeout(() => {console.log(4);}, 20);
  return Promise.reject();
}

async function run () {
  console.log(5);
  await fn();
  console.log(6);
}

run();

for (let i = 0; i < 90000000; i++) {}

setTimeout(() => {
  console.log(7);
  new Promise((resolve, reject) => { // 宏任务
    console.log(8);
    resolve(); // 微任务，会将then中的一个函数放到微任务队列中
  }).then(() => {console.log(9);});
}, 0);

console.log(10);
```
<details>
  <summary>answer diagram</summary>
  
  output: `1, 5, 3, 10, Uncaught(in promise) undefined, 4, 7, 8, 9, 2`
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200444429224546.png) 
</details>

### `async/await`需要注意的几个点
* 如果`await`后的`async`报错或者执行`Promise.reject(reason)`,`await`下边的代码将不会执行
* 为了让`await`不影响后边代码的执行，可以使用`try...catch`语句。或者在`Promies`对象后再跟一个`catch`方法来处理错误
```javascript
// try catch
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))

// .catch处理错误
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
```
