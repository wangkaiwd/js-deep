### 高级函数
* 柯理化
* 反柯理化


* 面向切片编程
    ```javascript
    const say = function (who) {
      console.log('say', who);
    };
    say.before = function (callback) {
      return (...args) => {
        callback();
        this(...args);
      };
    };
    // 原型上扩展
    Function.prototype.before = function (callback) {
      return (...args) => {
        callback();
        this(...args);
      };
    };
    // 扩展say方法，让它在执行之前先做一些事情
    // 俩种方法：1. 为say添加私有属性，进行调用
    //          2. 为Function.prototype扩展say方法
    const newSay = say.before(function () {
      console.log('before say');
    });
    newSay('me');
    ```
### 发布订阅
* 异步较早的解决方案：回调，但是无法使用`try catch`，所以`node`中传入的回调函数的第一个参数为`error`
* 回调解决异步问题
    * 这里介绍到`lodash`的一个方法`after`

* 观察者模式 vs 发布订阅
    * 发布订阅，发布`$emit`和订阅`$on`是没有关系的
    * 观察者模式需要手动为被观察者指定观察者，在被观察者状态更新的时候，通知观察者
* 观察者模式有什么用呢？感觉和发布订阅并没有什么必然联系，为什么要进行对比呢？

### 手写`promise`
* 尝试翻译`Promise/A+`
* 基本功能
* 链式`.then`调用

### `promise`周边
* `deffer`: 减少嵌套，进行延迟调用
* 实现`Promise`的`catch`方法
* 实现`node`中的`promisify`，支持将回调函数转换为`promise`
* `promise.all`方法实现
* 自己手动实现`promise.race`方法
* 自己手动实现`promise.finally`方法
* 递归解析`resovle`, 这里涉及到一个问题:`Promise.resolve`和`Promise.reject`的区别

### generator
* `generator + Promise`处理异步
* `generator`自动执行和传参(基础用法)
* `co`处理`generator`函数


