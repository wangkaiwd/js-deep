## 从零到一实现符合`Promise/A+`的`Promise`
`Promise/A+`规范专注于提供一个**通用的`then`方法**，对于如何创建、解决以及拒绝`promise`并没有进行处理，对于`Promise.all`,`Promise.catch`等方法也没有进行明文规定。

### 实现基础使用场景
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

`reject`函数执行时和`resolve`执行的逻辑类似，`Promise`的状态警徽从`pending`变为`rejected`，并且`Promise`的`reason`是`reject`执行时的参数。

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
`Promise`的实例上有一个`.then`方法，它接收俩个回调函数作为参数。当`Promise`的状态为`resolved`时，用`Promise`的`value`作为参数，执行第`.then`中的第一个回调函数。当`Promise`的状态为`rejected`时，用`Promise`的`reason`作为参数执行第二个回调函数。代码如下：
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
到这里，我们的需求已经实现了，但是代码完全是同步，我们需要用`setTimeout(()=> {...},0)`来实现异步，确保`.then`中的回调函数是异步执行的。
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
