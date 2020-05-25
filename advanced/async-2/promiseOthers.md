## 手写`Promise`的其它方法

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

