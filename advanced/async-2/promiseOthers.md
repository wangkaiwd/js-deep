## 手写`Promise`的其它方法
> 在阅读本文之前，需要先根据`Promise/A+`规范实现符合规范的`Promise`。如果你想要学习如何写一个符合规范的`Promise`,可以参考我的这边文章: [从零到一实现完全符合Promise/A+的Promise](https://github.com/wangkaiwd/js-deep/blob/master/advanced/async-2/readme.md) 。

在`Promise/A+`的基础上，原生`Promise`还为我们提供了一些额外的方法，方便用户使用。

`Promise`原型方法：  

* Promise.prototype.catch(onRejected)
* Promise.prototype.finally(onFinally)

`Promise`自身的方法：

* Promise.resolve(value)
* Promise.reject(reason)
* Promise.all(iterable)
* Promise.race(iterable)
* Promise.allSettled(iterable)

> 原生的[`allSettled`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 方法目前还不能直接使用，目前还处于`TC39`第4阶段草案

接下来让我们看看这些方法应该如何实现。

### `resolve`新的`Promise`
在我们之前实现的`Promise`中，并没有对立即执行函数中`resolve`函数中传入`promise`的情况进行处理。在原生`Promise`中会以`resolve`中传入的`Promise`的状态来作为`Promise`实例的状态，让我看下下边的代码：
```javascript
// 解决一个rejected的Promise,最终会调用最外层Promise立即执行函数的reject函数
const p = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(100);
    }, 1000);
  }));
});
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
// reason 100

// 解决一个resolved的Promise,最终会调用最外层Promise立即执行函数的resolve函数
const p = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(100);
    }, 1000);
  }));
});
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
// result 400
```
还是同样的代码，让我们看一下为`reject`传入`Promise`会发生什么情况：
```javascript
// 拒绝一个rejected状态的Promise
const p = new Promise((resolve, reject) => {
  reject(new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(100);
    }, 1000);
  }));
});
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
// reason Promise { <pending> }
// UnhandledPromiseRejectionWarning

// 拒绝一个resolved状态的Promise
const p = new Promise((resolve, reject) => {
  reject(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000);
  }));
});
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
// result Promise { <pending> }
```
通过打印结果，我们不难得出结论：`resolve`方法在执行的时候，如果`resolve`的参数是`Promise`，将会等到`Promise`执行完成。如果`Promise`为`resolved`状态，将会用`Promise`的值作为参数执行`resolve`方法；如果`Promise`为`rejected`状态，将会用`Promise`的原因作为参数执行`reject`方法。如果`resolve`中传入的`Promise`继续`resolve`一个`Promise`，将会递归上述过程。

而`reject`方法在执行时，并不会对传入的参数进行类型判断，而是直接执行`reject`方法。下面，我们对自己的`Promise`源码进行改造：
```javascript
const resolve = (result) => {
  if (result !== null && typeof result === 'object' || typeof result === 'function') {
    try {
      const then = result.then;
      then.call(result, (y) => {
        resolve(y);
      }, (r) => {
        reject(r);
      });
    } catch (e) {
      reject(e);
    }
    return;
  }
  if (this.state !== PENDING) return;
  this.state = RESOLVED;
  this.value = result;
  this.resolveFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onFulfilled时this指向为undefined
};
```
在更改`Promise`的状态、值以及执行`.then`中的方法之前，先对`resolve`的参数类型进行判断，如果是`Promise`，将会等到`Promise`处理完成后，再调用`resovle`或`reject`方法。

这里可能会涉及到一道面试题目：`Promise`中立即执行函数的`resolve`和`reject`有什么区别？
```text
resolve中传入Promise的话，会根据Promise的最终状态来决定调用resolve还是reject方法，即调用resolve方法并不一定返回一个
解决状态的Promise

而reject执行时不会对参数类型进行判断，即使是Promise，也会直接`reject`，不会等待Promise执行完毕，最终一定会返回一个拒绝
状态的Promise
```
