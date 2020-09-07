## 总结`Vue`的`MVVM`实现原理
### 数据劫持
1. 遍历对象中的每一个属性，并通过`Object.defineProperty`为其设置`get/set`方法
2. 如果`data`中的属性值为数组，改写会修改原数组的原型方法。数组中的对象属性也会代理，数组的索引不会代理
3. 通过数组方法新增的值继续进行代理
4. 为了方便用户使用，将`vm._data`中的属性代理到`vm`上

### 文本编译
1. 处理`el`选项，`el`可以是`HTMLElement`或者`CSS selector`字符串，统一将其转换为`HTMLElement`并将其赋值给`vm.$el`
2. `new`渲染`watcher`，`exprOrFn`是渲染页面函数，并调用`exprOrFn`
3. 渲染页面函数逻辑如下：
    1. 创建文档碎片
    2. 将真实`DOM`中的内容移动到文档碎片中
    3. 通过正则将文档碎片中的`{{}}`替换为`data`中对应属性的值
    4. 将文档碎片中替换后的内容重新放入页面真实`DOM`中 
### 异步批量更新
1. 在设置执行会调用`watcher`的`update`方法
2. 此时并不会立即执行文本编译
3. 而是会将`watcher`去重后放入一个队列中，然后异步的调用队列中的所有`watcher.run`
4. 异步任务的`api`调用优先级：
    * `Promise`
    * `MutationObserver`
    * `setImmediate`
    * `setTimeout`

### 依赖收集
注意：对象和数组分别是不同的`Dep`实例

对象依赖收集：  
1. 为对象的每一个属性都`new Dep`，并且在其`getter`方法中收集其依赖的`Watcher`
2. 创建`Dep`类，可以通过`depend`调用`watcher`的`addSub`方法，来将`dep`去重后收集到`watcher`，然后再调用`dep.addSub`将`watcher`添加到对应的`Dep`中
3. 更改`data`中的值时，会调用`dep.notify`，通过`dep`中收集的所有`watcher`调用`update`方法，更新页面

数组：  
1. 为数组添加`__ob__`属性，该属性是`data`中的属性定义`getter/setter`时的`Observer`类
2. 为`Observer`类的实例添加属性: `this.dep = new Dep()`
3. 为每一个对象的属性添加`getter`时，如果该属性的值为数组，会通过`value.__ob__.dep.depend()`来收集数组的依赖
4. 如果`value`依旧是对象的话，会递归的为其收集依赖
5. 在调用更改数组的方法时会执行`value.__ob__.dep.notify`方法来更新视图
### watch
1. pass watch object in vue instance options
2. create `user: true` watcher, exprOrFn => key of watch, callback(newVal, oldVal) => value of watch
3. get method equal get current value by exprOrFn from vm
4. execute get method, return init value and assign it to `this.value`
5. key of watch assigned, first invoke user watcher get newly value and pass init obtain value as old value, current value as newly value to callback, then invoke render watcher to update view  

### computed
1. 在`Vue`实例化中作为配置项`{computed: {key: fn}}`传入
2. `initComputed`: 在配置项中获取到`key,fn`, 并在`vm`中代理`key`对应的属性，方便进行取值
3. `new`计算属性`watcher`，`exprOrFn: fn`, `options: {lazy: true}`
4. 初始化时只是进行赋值，并不会执行`fn`。计算属性只有在用到时才会执行
5. 开始文本替换，对`computed`中的`key`进行取值，此时会调用之前在`vm`上为其定义的`get`方法
6. 这里会用到`computed`的值，所以会执行`fn`进行取值，由于计算属性是依赖于其它属性，所以会触发依赖属性的`get/set`方法
7. 依赖属性的`get/set`方法会通过`Dep`来收集其对应的计算属性`watcher`，然后获取到最新的计算属性`key`对应的值
8. 将`dirty`置为`false`,所以再次获取值时不会再进行求值，直接将之前的计算结果返回
9. 之后，`Dep.target = render watcher`, 需要为计算属性中的`watcher`再收集`Dep.target`，以在为其设置值时会执行计算属性`watcher`和渲染`watcher`
