## `vue`流程简述
* `watch`和`computed`会在使用实例属性替换模板之前
* `watch`和`computed`都是以对象的形式传入
### `watch`

1. 传入配置项: `watch:{msg:function(newVal,oldVal) {}}`
2. 执行`initWatch`函数
3. 遍历`vm.$options.watch`对象中的每一个`key`，分别为每一项创建一个用户定义的`watcher`
4. 此时传入`Watcher`的参数为： exprOrFn => msg, cb => function(newVal,oldVal) {}, opts => {user: true}
5. 获取`msg`的值作为`watcher`的`value`，并且在取值时执行`get`方法，`msg`对应的`dep`收集了`watch watcher`,并且获取到`msg`一开始的值
6. 当`msg = 'otherValue'`时，会将`msg`调用对应的`dep`收集的`watch watcher`的`update`方法，`update`缓存将`watcher`缓存到队列，最终调用`run`方法，再次获取`msg`的最新值

### `computed`

1. 传入配置项：`computed:{fullName() {return this.firstName + this.lastName}}`
2. 初始化`initComputed`，遍历`computed`中的每个值，分别为对应的`key`在`vm`中设置`get`方法
3. 创建计算属性`watcher`,传入`key`值作为表达式，`key`对应的值`function() {return this.firstName + this.lastName}`，以及选项`{lazy: true}`
4. `getter = function fullName() {}`，并且由于是`lazy: true`，所以在初始化时并不执行
5. 渲染页面，渲染`watcher`更新视图，此时会触发`fullName`的`get`方法
6. 第一次取值，`dirty: true`，调用计算属性`watcher`的`evaluate`方法，会执行`fullName`函数，并将值赋值到`watcher`的实例上，通过`watcher.value`来获取。此时还会调用`firstName,lastName`的`get`方法，此时`firstName,lastName`对应的`dep`会收集计算属性`watcher`
7. 此时`Dep.target`为渲染`watcher`，调用计算属性`watcher`的`depend`方法，为计算属性`watcher`中`dep`收集渲染`watcher`
8. 完成页面视图渲染
9. `this.firstName = 'xxx'`，此时会调用`firstName`的`set`方法，即调用`dep`的`notify`方法，此时调用计算属性`watcher`的`update`方法，`dirty: true`
10. 触发渲染`watcher`，重复5~9的逻辑
