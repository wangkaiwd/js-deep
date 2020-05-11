## Promise/A+

### 术语
### 2. 要求

#### 2.1. Promise States

#### 2.2. The `then` Method
`Promise`必须提供一个`then`方法来访问当前或最终的值或原因。

`Promise`的`then`方法接受俩个参数：
```javascript
promise.then(onFulfilled, onRejected)
```

##### 2.2.1 `onFulfilled`和`onRejected`都是可选的参数
* 2.2.1.1. 如果`onFulfilled`不是一个函数，它必须被忽略
* 2.2.1.2. 如果`onRejected`不是一个函数，它必须被忽略

#### 2.2.2。 如果`onFulfilled`是一个函数
* 2.2.2.1 它必须在`promise`被**满足**后调用，`promise`的值作为它的第一个参数。
* 2.2.2.2 它一定不能再`promise`被**满足**前调用。
* 2.2.2.3 它一定不能被调用多次。

#### 2.2.3. 如果`onRejected`是一个函数
* 2.2.3.1.
* 2.2.3.2.
* 2.2.3.3.
