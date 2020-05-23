## Promise/A+
> 参考:
> * [【翻译】Promises/A+规范](https://www.ituring.com.cn/article/66566)
`promise`表示一个异步操作的最终结果。和一个`promise`进行交互的主要方式是通过它的`then`方法，该方法注册回调要么接收一个`promise`的最终值，要么接收`promise`为什么不能被**满足**的原因。

这个规范详细描述了`then`方法的行为，提供了一个可交互操作的基础，所有的符合`promise/A+`规范的`promise`的实现都可以依靠该基础来实现。因此，这个规范应该被认为是十分稳定的。尽管`Promise/A+`组织可能会偶尔地通过一些较小的向后兼容的改变来修订这个规范，来解决新发现的一些边界情况。只有在经过仔细的考虑、讨论和测试后，我们才会集成大的或者向后不兼容的更改。

从历史上来说，`Promise/A+`阐明了早期`Promise/A 提案`的行为条款，扩展了原有规范约定俗成的行为，并且省略了没有被指定或者有问题的部分。

最终，`Promise/A+`规范没有处理如何创建、满足或拒绝`promises`,而是选择去专注于提供一个可交互操作的`then`方法。未来在相关规范的工作中可能会提到这些话题。

### 1. 术语
* 1.1. promise: 一个拥有符合这个规范的行为的`then`方法的对象或函数。
* 1.2. thenable: 定义了一个`then`方法的对象或函数。
* 1.3. 值(value): 任意合法的`JavaScript`值(包括`undefined`,`thenable`,`promise`)。
* 1.4. 异常(exception): 使用`throw`语句抛出的一个值
* 1.5. 原因(reason): 表示`promise`为什么被拒绝的一个值

### 2. 必要条件

#### 2.1. Promise States
`promise`必须是这三个状态中的一种：等待态`pending`,解决态`fulfilled`或拒绝态`rejected`

* 2.1.1. 当一个`promise`处于等待状态的时候：
    * 2.1.1.1. 可能变为**解决**或者**拒绝**状态。
* 2.1.2. 当一个`promise`处于**解决**状态的时候：
    * 2.1.2.1. 一定不能转换为任何其它状态
    * 2.1.2.2. 必须有一个不能改变的**值**
* 2.1.3. 当一个`promise`处于**拒绝**状态的时候：
    * 2.1.3.1. 一定不能转换为任何其它状态
    * 2.1.3.2. 必须有一个不能改变的**值**

在这里，"一定不能改变"意味着不变的身份(例如 `===`)，但是并不意味着深度不可变性。(译注者：这里应该是说只要**值**的引用相同即可，并不需要引用中的每一个值都相等)

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
* 2.2.2.1. 它必须在`promise`被**解决**后调用，`promise`的值作为它的第一个参数。
* 2.2.2.2. 它一定不能在`promise`被**解决**前调用。
* 2.2.2.3. 它一定不能被调用多次。

#### 2.2.3. 如果`onRejected`是一个函数
* 2.2.3.1. 它必须在`promise`被**拒绝**之后调用，用`promise`的原因作为它的第一个参数。
* 2.2.3.2. 它一定不能在`promise`被**拒绝**之前调用。
* 2.2.3.3. 它一定不能被调用多次。

#### 2.2.4. 在执行上下文栈中只包含平台代码之前，`onFulfilled`或`onRejected`一定不能被调用
#### 2.2.5. `onFulfilled`和`onRejected`一定被作为函数调用(没有`this`值)
#### 2.2.6. 同一个`promise`上的`then`可能被调用多次
* 2.2.6.1. 如果`promise`被**解决**，所有相应的`onFulfilled`回调必须按照他们原始调用`then`的顺序执行
* 2.2.6.2. 如果`promise`被**拒绝**，所有相应的`onRejected`回调必须按照他们原始调用`then`的顺序执行

#### 2.2.7. `then`必须返回一个`promise`
```javascript
promise2 = promise1.then(onFulfilled,onRejected)
```
* 2.2.7.1. 如果`onFulfilled`或`onRjected`返回一个值`x`，运行`promise`解决程序`[[Resolve]](promise2,x)`
* 2.2.7.2. 如果`onFulfilled`或`onRejected`抛出一个异常`e`，`promise2`必须用`e`作为原因被**拒绝**
* 2.2.7.3. 如果`onFulfilled`不是一个函数并且`promise1`被**解决**，`promise2`必须用与`promise1`相同的值被**解决**
* 2.2.7.4. 如果`onRejected`不是一个函数并且`promise1`被**拒绝**，`promise2`必须用与`promise1`相同的原因被拒绝

#### 2.3. `Promise`解决程序
`promise`解决程序是一个抽象操作，它以一个`promise`和一个值作为输入，我们将其表示为`[[Resolve]](promise, x)`。如果`x`是一个`thenable`，它尝试让`promise`采用`x`的状态，并假设`x`的行为至少在某种程度上类似于`promise`。否则，它将会用值`x`**解决** `promise`。

这种`thenable`的特性使得`Promise`的实现更具有通用性：只要其暴露一个遵循`Promise/A+`协议的`then`方法即可。这同时也使遵循`Promise/A+`规范的实现可以与那些不太规范但可用的实现能良好共存。

要运行`[[Resolve]](promise, x)`，执行如下步骤：

* 2.3.1. 如果`promise`和`x`引用同一个对象，用一个`TypeError`作为原因来拒绝`promise`
* 2.3.2. 如果`x`是一个`promise`，采用它的状态： 
    * 2.3.2.1. 如果`x`是等待态，`promise`必须保持等待状态，知道`x`被**解决**或**拒绝**
    * 2.3.2.2. 如果`x`是**解决**态，用相同的值解决`promise`
    * 2.3.2.3. 如果`x`是**拒绝**态，用相同的原因拒绝`promise`
* 2.3.3. 否则，如果`x`是一个对象或函数
    * 2.3.3.1. 让`then`成为`x.then`
    * 2.3.3.2. 如果检索属性`x.then`导致抛出了一个异常`e`，用`e`作为原因拒绝`promise`
    * 2.3.3.3. 如果`then`是一个函数，用`x`作为`this`调用它，第一个参数是`resolvePromise`，第二个参数是`rejectPromise`：
        * 2.3.3.3.1. 如果`resolvePromise`用一个值`y`调用，运行`[[Resolve]](promise, y)`
        * 2.3.3.3.2. 如果`resolvePromise`用一个原因`r`调用，用`r`拒绝`promise`。
        * 2.3.3.3.3. 如果`resolvePromise`和`rejectPromise`同时被调用，或者对同一个参数进行多次调用，那么第一次调用优先，以后的调用都会被忽略。
        * 2.3.3.3.4. 如果调用`then`抛出了一个异常`e`,
            * 2.3.3.4.1. 如果`resolvePromise`或`rejectPromise`已经被调用，忽略它
            * 2.3.3.4.2. 否则，用`e`作为原因拒绝`promise`
    * 2.3.3.4. 如果`then`不是一个函数，用`x`**解决**`promise`
* 2.3.4. 如果`x`不是一个对象或函数，用`x`解决`promise`

如果`promise`用一个循环的`thenable`链**解决**，由于`[[Resolve]](promise, thenalbe)`的递归特性，最终将导致`[[Resolve]](promise, thenable)`被再次调用，遵循上上面的算法将会导致无限递归。规范中并没有强制要求处理这种情况，但也鼓励实现者检测这样的递归是否存在，并且用一个信息丰富的`TypeError`作为原因**拒绝**`promise`。

译者注：这里的循环`thenable`可能是指如下情况：
```javascript
const obj = {
    then:function() { 
      //...    
    }
}
obj.then.then = obj.then
```
这样`obj`对象中的`then`将会形成一个环，可以一直无限循环调用`.then`方法。(类似于`window`全局对象，`window.window`依旧是`window`自己)
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200523221732.png)

由于`resolvePromise`方法中会对返回值(参数`x`)的类型进行判断，这样会导致返回值的类型一直为`promise`,即无限循环调用`resolvePromise`。  
[resolvePromise](https://github.com/wangkaiwd/js-deep/blob/144a92af2d840a8a3ec6ffd2955b0dcf3caf717e/advanced/async/demo04.js#L137-L143)

### 3. 注释
* 3.1.

