## `Promise A+`规范

实现过程中注意的几个点：
1. `Promise`的状态一旦确定就不会再改变
2. `Promise.then(resolved,rejected)`只是将`resolved,rejected`函数进行缓存
3. `Promise`传入的立即执行函数执行时，会传入内部的`resolve,reject`方法
4. 用户调用立即执行函数`resolve,reject`的时候，如果没有使用`setTimeout`等异步任务，`Promise`内容将会把`.then`缓存的函数放到微任务队列，等到执行上下文栈中的内容执行完毕后，主线程空闲下来，再去执行缓存中的方法
