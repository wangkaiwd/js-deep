## 手写`Promise`周边方法
> 在阅读本文之前，需要先根据`Promise/A+`规范实现符合规范的`Promise`。如果你想要学习如何写一个符合规范的`Promise`,可以参考笔者的这篇文章: [从零到一实现完全符合Promise/A+的Promise](https://github.com/wangkaiwd/js-deep/blob/master/advanced/async-2/readme.md) 。

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

> 原生的[`allSettled`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) 方法目前还不能直接，还处于`TC39`第4阶段草案

接下来让我们看看这些方法应该如何实现。

### `resolve`新的`Promise`
在我们之前实现的`Promise`中，并没有对立即执行函数中`resolve`函数中传入`promise`的情况进行处理。在原生`Promise`中会以`resolve`中传入的`Promise`的状态来作为`Promise`实例的状态，让我们看下下边的代码：
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
  // 如果是Promise的话，进行递归调用
  if (typeof result.then === 'function') {
    return result.then((y) => {
      resolve(y);
    }, (r) => {
      reject(r);
    });
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

### `Promise.resolve`方法
> `Promise.resolve(value)`返回一个以给定值解析后的`Promise`对象

1. `value`是`thenable`或`Promise`，将会等到`Promise`执行完成后才会执行`resolve`方法，并且采用`value`的最终状态
2. 其它情况，返回以`value`为值的解决状态的`Promise`

实现如下：
```javascript
class Promise {
  // ...
  static resolve (result) {
    return new Promise((resolve) => {
      resolve(result);
    });
  }
  // ...  
}
```

测试代码： 
```javascript
const p = Promise.resolve(new Promise((resolve, reject) => {
  resolve(100);
}));
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
// result 100
```

### `Promise.reject`方法
> `Promise.reject(reason)`: 方法返回一个带有拒绝原因的`Promise`对象。

实现如下：
```javascript
class Promise {
  // ...
  static reject (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  // ...  
}
// result 100
```

测试代码：
```javascript
const p = Promise.reject(100);
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
// reason 100
```

### `Promise.all`方法
> `Promise.all(iterable)`: 返回一个`Promise`实例，此实例在`iterable`参数内所有的`Promise`都"完成(resolved)"或参数中不包含`promise`时回调完成(resolve);如果参数中`promise`有一个失败(rejected)，此实例回调失败(reject)，失败的原因是第一个失败`promise`的结果。

1. 该方法会返回一个新的`Promise`实例
2. 只有当参数中所有的`promise`全部被解决或没有`promise`时，新返回的`promise`状态会变为解决，参数是所有被解决的`promise`按照**传入顺序**所组成的数组
3. 只要参数数组中有一个`promise`被拒绝，新返回的`promise`状态就会变为拒绝状态，原因为第一个被拒绝`promise`的原因

实现如下：
```javascript
class Promise {
  // ...  
  static all (iterable) {
    return new Promise((resolve, reject) => {
      const final = [];
      let count = 0; // 记录promise执行次数，全部执行完成后，将结果进行resolve
      for (let i = 0; i < iterable.length; i++) { // 这里要使用let,防止执行顺序错乱
        const item = iterable[i];
        // 不是promise的其它值通过Promise.resolve转换为promise进行统一处理
        Promise.resolve(item).then((result) => {
          final[i] = result;
          if (++count === iterable.length) {
            resolve(final);
          }
        }, (reason) => {
          // 一旦有promise被拒绝就立即拒绝all方法返回的promise，虽然循环还会继续，
          // 但是由于Promise的状态只能由pending变为其它状态，所以之后的resolve和reject并不会生效
          reject(reason);
        });
      }
    });
  }
}
```

测试代码：
````javascript
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4);
  }, 1000);
});
Promise.all([0, p1, p2, 3]).then((results) => {
  console.log('results', results);
}, (reason) => {
  console.log('reason', reason);
});
// results [0, 1, 4, 3]
````

### `Promise.race`方法
> `Promise.race(iterable)`: 方法返回一个`promise`，一旦迭代器中的某个`promise`解决或拒绝，返回的`promise`就会解决或拒绝

实现代码：
```javascript
class Promise {
  // ...  
  static race (iterable) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < iterable.length; i++) {
        const item = iterable[i];
        Promise.resolve(item).then(resolve, reject);
      }
    });
  }
  // ...  
}
```

测试代码：
```javascript
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4);
  }, 1000);
});
Promise.race([0, p1, p2, 3]).then((results) => {
  console.log('results', results);
}, (reason) => {
  console.log('reason', reason);
});
```

### `Promise.allSettled`方法
> 返回一个在所有给定的`promise`已被解决或被拒绝后的解决状态的`promise`，并带有一个对象数组，每个对象表示对应的`promise`结果

1. 方法最终都会返回一个处于解决状态的`promise`
2. `onFulfilled`函数的参数为对象组成的数组，对象中包含`promise`解决或拒绝的状态以及解决的值和失败的原因。

实现如下：
```javascript
class Promise {
  // ...  
  static allSettled (iterable) {
    return new Promise((resolve, reject) => {
      const final = [];
      let count = 0; // 记录promise执行次数，全部执行完成后，将结果进行resolve
      for (let i = 0; i < iterable.length; i++) { // 这里要使用let,防止执行顺序错乱
        const item = iterable[i];
        // 不是promise的其它值通过Promise.resolve转换为promise进行统一处理
        Promise.resolve(item).then((result) => {
          final[i] = { status: 'fulfilled', value: result };
          if (++count === iterable.length) {
            resolve(final);
          }
        }, (reason) => {
          // 一旦有promise被拒绝就立即拒绝all方法返回的promise，虽然循环还会继续，
          // 但是由于Promise的状态只能由pending变为其它状态，所以之后的resolve和reject并不会生效
          ++count;
          final[i] = { status: 'rejected', reason };
        });
      }
    });
  }
  // ...  
}
```

测试代码：
```javascript
const p1 = Promise.reject(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(4);
  }, 1000);
});
Promise.allSettled([0, p1, p2, 3]).then((results) => {
  console.log('results', results);
});
// results [
//  { status: 'fulfilled', value: 0 },
//  { status: 'rejected', reason: 1 },
//  { status: 'fulfilled', value: 4 },
//  { status: 'fulfilled', value: 3 }
// ]
```

### `Promise`的一些原型方法

#### `Promise.prototype.catch`
> `catch()`: 返回一个`Promise`，并且处理拒绝的情况

实现如下：
```javascript
class Promise {
  // ...  
  catch (onRejected) {
    return this.then(null, onRejected);
  }
  // ...  
}
```

测试代码：
```javascript
const p = new Promise((resolve, reject) => {
  resolve(100);
});
p.then((result) => {
  return Promise.reject(result);
}).catch((error) => {
  console.log('error', error);
});
```

#### `Promise.prototype.finally`
> `finally()`方法返回一个`Promise`。在`Promise`结束时，无论结果是`fulfilled`或者是`rejected`，都会执行指定的回调函数。这为在`Promise`是否成功完成后都需要执行的代码提供了一种方式。

1. 由于无法知道`promise`的最终状态，所以`finally`的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的结果
2. 调用`.finally`方法并不会更改前一个`promise`的状态和值，只是添加了一段在解决或拒绝时都会执行的代码

实现如下：
```javascript
class Promise {
  // ...  
  finally (onFinally) {
    return new Promise((resolve, reject) => {
      this.then((result) => {
        onFinally();
        resolve(result);
      }, (reason) => {
        onFinally();
        reject(reason);
      });
    });
  }
  // ...  
}
```

测试代码：
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 1000);
});
p.finally(() => {
  console.log('befor process');
}).then((result) => {
  console.log('result', result);
}).finally(() => {
  console.log('after process');
});
```

到目前为止，我们已经重新实现了所有`Promise`的周边方法
