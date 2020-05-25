## 从零到一实现完全符合`Promise/A+`的`Promise`
> * [本文源代码](https://github.com/wangkaiwd/js-deep/blob/master/advanced/async-2/promise.js)
> * 参考文章：[Promise的源码实现（完美符合Promise/A+规范）](https://github.com/YvetteLau/Blog/issues/2)

`Promise/A+`规范专注于提供一个**通用的`then`方法**，对于如何创建、解决以及拒绝`promise`并没有进行处理，对于`Promise.all`,`Promise.catch`等方法也没有进行明文规定。所以我们这里的实现也是以一个通用的`then`方法为核心

> 为了方便理解： 
>
> * 文中`.then`中传入的俩个回调函数我们分别用`onFulfilled`和`onRejected`来代指。
> * 源码中的编号注释对应规范中的相应编号

### 基础使用场景
下面是一个`Promise`最基础的使用方法：
```javascript
const p = new Promise((resolve, reject) => {
  resolve(100);
});
p.then((result) => {
  console.log('result', result);
});
```

我们先让我们自己的`Promise`满足上述用法。

由于我们对`Promise`使用了`new`关键字，所以`Promise`是`JavaScript`中的类。在执行`Promise`的时候，传入了一个立即执行函数，函数的参数为`resolve,reject`俩个回调函数。这样，我们得到如下实现：  
```javascript
class Promise {
  constructor (executor) {
    const resolve = (result) => {

    };
    const reject = (reason) => {

    };
    executor(resolve, reject);
  }
}
```

`Promise`有三种状态：`pending`等待态，`rejected`解决态，`rejected`拒绝态。

`Promise`的立即执行函数中，如果`resolve`函数执行，`Promise`的状态将会从`pending`变为`rejected`，并且`Promise`的`value`是`resolve`执行时的参数。

`reject`函数执行时和`resolve`执行的逻辑类似，`Promise`的状态将会从`pending`变为`rejected`，并且`Promise`的`reason`是`reject`执行时的参数。

需要注意的是，**`Promise`的状态一旦从`pending`变为其它状态，就不能再进行更改**。到现在，我们可以得到如下代码：
```javascript
// 2.1.
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined; // 1.3. 任何合法的JavaScript值
    this.reason = undefined; // 1.5. 表示为什么promise被拒绝的一个值
    const resolve = (result) => {
      if (this.state !== PENDING) return;
      this.state = RESOLVED;
      this.value = result;
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
    };
    executor(resolve, reject);
  }
}

module.exports = Promise;
```
`Promise`的实例上有一个`.then`方法，它接收俩个回调函数作为参数。当`Promise`的状态为`resolved`时，用`Promise`的`value`作为参数，执行`.then`中的第一个回调函数。当`Promise`的状态为`rejected`时，用`Promise`的`reason`作为参数执行第二个回调函数。代码如下：
```javascript
class Promise {
  // ...
  then (onFulfilled, onRejected) {
    if (this.state === RESOLVED) {
      onFulfilled(this.value);
    } else if (this.state === REJECTED) {
      onRejected(this.reason);
    }
  }
}
```
到这里，需求已经实现了，但是代码完全是同步的，我们需要用`setTimeout(()=> {...},0)`来实现异步，确保`.then`中的回调函数是异步执行的。
```javascript
class Promise {
  // ...
  then (onFulfilled, onRejected) {
    if (this.state === RESOLVED) {
      setTimeout(() => {
        onFulfilled(this.value);
      }, 0);
    } else if (this.state === REJECTED) {
        setTimeout(() => {
        onRejected(this.reason);
      }, 0);
    }
  }
}
```

### 实现异步的`resolve/reject`
现在将我们的使用场景进行升级：
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
});
p.then((result) => {
  console.log('result', result);
});
```
当`Promise`的`resolve`和`reject`并不是立即执行的时候，我们此时需要将`.then`中传入的回调函数进行存储。当`resolve/reject`被调用时，再调用我们提前存储好的回调函数。
````javascript
// 2.1.
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined; // 1.3. 任何合法的JavaScript值
    this.reason = undefined; // 1.5. 表示为什么promise被拒绝的一个值
    this.resolveFnList = [];
    this.rejectFnList = [];
    const resolve = (result) => {
      if (this.state !== PENDING) return;
      this.state = RESOLVED;
      this.value = result;
      this.resolveFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onFulfilled时this指向为undefined
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      this.rejectFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onRejected时this指向为undefined
    };
    executor(resolve, reject);
  }

  then (onFulfilled, onRejected) {
    if (this.state === RESOLVED) {
      setTimeout(() => {
        onFulfilled(this.value);
      }, 0);
    } else if (this.state === REJECTED) {
      setTimeout(() => {
        onRejected(this.reason);
      }, 0);
    } else { // pending
      this.resolveFnList.push(() => {
        setTimeout(() => {
          onFulfilled(this.value);
        }, 0);
      });
      this.rejectFnList.push(() => {
        setTimeout(() => {
          onRejected(this.reason);
        }, 0);
      });
    }
  }
}

module.exports = Promise;
````
这样我们就实现了异步的`resolve/reject`

### 实现链式调用
> `then`方法的实现是`Promise/A+`规范中的最重要的部分，代码逻辑会相对较难一些。而且`Promise`也是围绕`then`来进行扩展和使用，需要重点理解和学习。

现在我们的`Promise`并不支持链式调用，我们继续将用例进行升级：
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
});
p.then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
}).then((result) => {
  console.log('result2', result);
}, (reason) => {
  console.log('reason2', reason);
});
```
`.then`方法会返回一个新的`Promise`，新`Promise`的返回值是由`.then`方法中传入的2个回调函数的返回值来确定的。其可能的情况如下： 
* 回调函数中返回普通值(不包括`Promise`)，此时直接将返回值`resolve(x)`,如果没有返回值即相当于返回`undefined`
  ```javascript
  const p = new Promise((resolve) => {
    resolve(100);
  });
  p.then((result1) => result1 * 2).then((result2) => console.log(result2)); 
  // 200
  ```
* 回调函数中返回一个`Promise`，将会以返回的`Promise`的状态和值作为`.then`方法返回的`Promise`的状态和值
  ```javascript
  const p = new Promise((resolve) => {
    resolve(100);
  });
  // 返回一个解决状态的Promise
  p.then((result1) => {
    return new Promise((resolve, reject) => {
      resolve(400);
    });
  }).then((result2) => {
    console.log(result2);
  });
  // 400
  
  // 返回一个拒绝状态的Promise
  p.then((result1) => {
    return new Promise((resolve, reject) => {
      reject(400);
    });
  }).then((result2) => {
    console.log(result2);
  }, (reason) => {
    console.log(reason);
  });
  // reason 400
  ```
* 如果`.then`方法中传入的回调函数在执行时出现了错误，新返回的`Promise`将用错误`e`来作为原因被拒绝
  ````javascript
  p.then((result1) => {
    console.log(a);
  }).then((result2) => {
    console.log('result2', result2);
  }, (reason) => {
    console.log('reason', reason);
  });
  // reason ReferenceError: a is not defined
  ````
这里我们用图来简单描述一下：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/Untitled-2020-04-12-1644%20(2).png)

`.then`方法的实现如下：
```javascript
class Promise {
  then (onFulfilled, onRejected) {
    // 2.2.7. then必须返回一个Promise
    // 这里能访问到Promise吗？
    // 可以。then方法在执行的时候已经完成了Promise的定义，方法在定义的时候并不会执行，而是会在堆内存中存储代码字符串
    // 之后在函数真正执行的时候，才会从作用域中查找变量

    // 新的Promise的状态和值是有.then中传入的回调函数的返回值来确定的
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            // 2.2.7.1.
            const x = onFulfilled(this.value);
            // 2.2.7.1.
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2
            reject(e);
          }
        }, 0);
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            // 2.2.7.1.
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2.
            reject(e);
          }
        }, 0);
      } else { // pending
        this.resolveFnList.push(() => {
          setTimeout(() => {
            try {
              // 2.2.7.1.
              const x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // 2.2.7.2
              reject(e);
            }
          }, 0);
        });
        this.rejectFnList.push(() => {
          setTimeout(() => {
            try {
              // 2.2.7.1.
              const x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // 2.2.7.2.
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  resolvePromise (promise2, x, resolve, reject) {
    // 2.3.1. 如果promise和x引用同一个对象，用TypeError作为原因拒绝promise
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle!'));
    }
    if (x !== null && typeof x === 'object' || typeof x === 'function') { // 2.3.3. 如果x是一个对象或函数
      // 2.3.3.1 让then成为x.then
      // 2.3.3.3.
      let called = false;
      // return {
      //   then: function (resolvePromise, rejectPromise) {
      //     resolvePromise(sentinel);
      //     rejectPromise(other);
      //   }
      // };
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(x, (y) => {
            // 2.3.3.3.1
            // 如果y还是一个promise，会递归调用this.resolvePromise,直到y为一个普通值，而resolve,reject方法一直调用的都是.then方法返回的Promise的
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            // 2.3.3.3.2.
            if (called) return;
            called = true;
            reject(r);
          });
        } else {
          resolve(x);
        }
      } catch (e) {
        // 2.3.3.2. 如果检索x.then属性发生错误，用错误e作为原因拒绝Promise
        // 2.3.3.3.4
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
}
```
这里的`resolvePromise`就是`Promise/A+`规范中提到的`[[Resolve]](promise, x)`，它会判断`.then`中传入回调返回值的类型，来确定`.then`返回`Promise`的状态和值。

有时候我们传递给`.then`函数中的值可能不是函数，而是其它值。此时，`.then`函数执行后会返回一个和之前`Promise`完全相同的`Promise`，只不过俩个`Promise`所占用的堆内存不同。我们看下面的例子：
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 1000);
});
// 第一个第二.then返回的Promise都是相当于p的拷贝新的promise
p.then().then(null, 1).then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});

// 相当于
p.then(y => y, r => {throw r})
.then(y=> y, r => {throw r}).then((result) => {
  console.log('result', result);
}, (reason) => {
  console.log('reason', reason);
});
```
我们在`.then`函数中添加如下代码，来构造`Promise`可以处理的函数：
```javascript
then (onFulfilled, onRejected) {
  // 2.2.1.
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y;
  onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r;};
  // ...
}
```
到这里，我们已经从零到一实现了一个符合`Promise/A+`的`Promise`，全部源码如下：
```javascript
// 2.1.
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

class Promise {
  constructor (executor) {
    this.state = PENDING;
    this.value = undefined; // 1.3. 任何合法的JavaScript值
    this.reason = undefined; // 1.5. 表示为什么promise被拒绝的一个值
    this.resolveFnList = [];
    this.rejectFnList = [];
    const resolve = (result) => {
      if (this.state !== PENDING) return;
      this.state = RESOLVED;
      this.value = result;
      this.resolveFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onFulfilled时this指向为undefined
    };
    const reject = (reason) => {
      if (this.state !== PENDING) return;
      this.state = REJECTED;
      this.reason = reason;
      this.rejectFnList.forEach(fn => fn.call(undefined)); // 2.2.5 调用onRejected时this指向为undefined
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then (onFulfilled, onRejected) {
    // 2.2.1.
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : y => y;
    onRejected = typeof onRejected === 'function' ? onRejected : r => {throw r;};
    // 2.2.7. then必须返回一个Promise
    // 这里能访问到Promise吗？
    // 可以。then方法在执行的时候已经完成了Promise的定义，方法在定义的时候并不会执行，而是会在堆内存中存储代码字符串
    // 之后在函数真正执行的时候，才会从作用域中查找变量

    // 新的Promise的状态和值是有.then中传入的回调函数的返回值来确定的
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === RESOLVED) {
        setTimeout(() => {
          try {
            // 2.2.7.1.
            const x = onFulfilled(this.value);
            // 2.2.7.1.
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2
            reject(e);
          }
        }, 0);
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            // 2.2.7.1.
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // 2.2.7.2.
            reject(e);
          }
        }, 0);
      } else { // pending
        this.resolveFnList.push(() => {
          setTimeout(() => {
            try {
              // 2.2.7.1.
              const x = onFulfilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // 2.2.7.2
              reject(e);
            }
          }, 0);
        });
        this.rejectFnList.push(() => {
          setTimeout(() => {
            try {
              // 2.2.7.1.
              const x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              // 2.2.7.2.
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }

  resolvePromise (promise2, x, resolve, reject) {
    // 2.3.1. 如果promise和x引用同一个对象，用TypeError作为原因拒绝promise
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle!'));
    }
    if (x !== null && typeof x === 'object' || typeof x === 'function') { // 2.3.3. 如果x是一个对象或函数
      // 2.3.3.1 让then成为x.then
      // 2.3.3.3.
      let called = false;
      // return {
      //   then: function (resolvePromise, rejectPromise) {
      //     resolvePromise(sentinel);
      //     rejectPromise(other);
      //   }
      // };
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(x, (y) => {
            // 2.3.3.3.1
            // 如果y还是一个promise，会递归调用this.resolvePromise,直到y为一个普通值，而resolve,reject方法一直调用的都是.then方法返回的Promise的
            if (called) return;
            called = true;
            this.resolvePromise(promise2, y, resolve, reject);
          }, (r) => {
            // 2.3.3.3.2.
            if (called) return;
            called = true;
            reject(r);
          });
        } else {
          resolve(x);
        }
      } catch (e) {
        // 2.3.3.2. 如果检索x.then属性发生错误，用错误e作为原因拒绝Promise
        // 2.3.3.3.4
        if (called) return;
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }
}

module.exports = Promise;
```
### 测试`Promise`
`Promise/A+`组织为我们提供了一套[测试用例](https://github.com/promises-aplus/promises-tests)，来让我们测试实现的`Promise`是否符合`Promise/A+`规范。

为了使用测试用例，需要在`Promise`源码末尾添加如下代码：
```javascript
Promise.deferred = function () {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};
```
`promises-tests`要求我们必须要用`Node.js`模块导出一个非常小的接口：
```javascript
{
  deferred: function() {
    return {
      promise,
      resolve,
      reject
    }
  }
}
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200525004610.png)

这样暴露出来的`Promise`可以让我们再使用的时候少写`new Promise`的相关代码，直接使用`Promise`实例和`resolve`以及`reject`方法:
```javascript
const deferred = Promise.deferred();
setTimeout(() => {
  deferred.resolve(100);
}, 1000);
deferred.promise.then((result) => {
  console.log('result', result);
});
```

接下来我们在命令行中安装`promises-tests`并测试自己的`Promise`代码：
```shell script
yarn init -y
yarn add promises-aplus-tests -D
npx promises-aplus-tests ./promise.js
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/202005222225002044.png)

当然，社区中还有许多优秀的[符合`Promise/A+`规范的实现](https://promisesaplus.com/implementations#standalone)，我们可以参考优秀的代码进行借鉴学习。
