## Watch
* 会新`new`一个`watcher`，传入`watch`中对应的参数
* 初始化时会通过`watch`中传入的`expr`进行获取值，该值为旧值
* 取值时会触发属性对应的`get`方法，`dep`会调用`depend`然后在`watcher`中调用`dep.addSub`收集`watcher`
* 在`watch`的`expr`设置值时，会调用属性对应`set`方法，执行`dep.notify`，会分别执行`watch watcher`以及渲染`watcher`
* 此时`watch watcher`会继续通过`expr`来获取最新的值，并将新值和旧值作为参数传给我们为`watch`中对应属性传入的函数
