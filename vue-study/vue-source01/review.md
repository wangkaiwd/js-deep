## Vue2原理解析

### 数据劫持

> 为`data`中的属性设置`get/set`方法，可以在`get/set`方法中进行依赖收集等逻辑

* 对象
* 数组
  * 改写会修改原数组的原型方法
* 为`Vue`实例代理`_data`上的属性，方便使用

### 模板编译

* 没有`el`选项需要手动执行`$mount`方法进行手动挂载
* 是否有`template`，如果没有就用`el.outerHTML`作为`template`
* 将`template`通过正则 + 树 + 栈处理为`ast`抽象语法树
* 将`ast`抽象语法树处理为`code` `JavaScript`代码字符串
* `new Function + with`将字符串转换为`render`函数
* 实现`render`函数中用到的`Vue`原型方法
* 将`render`方法最终会将生成虚拟节点
* `_update`中调用`patch`将虚拟节点生成真实`dom`

### 生命周期合并

* 生命周期函数即为在特定时刻执行的回调函数
* `initGlobalApi`,这里会定义`Vue`的一些静态方法
  * Vue.options中有所有全局配置的一些选项，如: mixin,component,nextTick...
  * 在`Vue.mixins`中会将用户传入的`mixins`根据不同的策略合并到`Vue.options`中，其中相同名字的生命周期函数会将会合并为一个数组，`mixins`的生命周期函数将会在组件之前
  * 在`Vue`执行`_init`方法时，会将组件实例化时传入的选项和`Vue.options`进行合并，这样全局注册的一些指令、组件等都可以直接在组件内进行使用
  * `mergeOptions`函数会根据不同的合并策略来合并`Vue`的选项
  * 之后可以封装`callHook`函数，来通过传入`vm`和钩子函数名字来调用该钩子对应的所有数组中的函数

### 依赖收集

> 只对`plain object`进行依赖收集，复杂类型不进行收集

* 到目前为止，要想更新页面，需要手动调用`vm._render`将`template`转换为虚拟`dom`，然后再调用`vm._update(vNode)`将虚拟节点转换为真实dom，并进行渲染
* 目标：更新实例中的属性，会自动更新页面; 如何实现：收集每个在页面中用到的`data`中的属性的渲染`watcher`，并在值更新的时候通知`watcher`执行`update`方法
* 这里要通过`Dep`来收集每个`template`中用到属性的`render watcher`，然后更新的时候调用`Dep.notify`来通知页面更新
* 在`defineReactive`方法中，为属性创建一个`dep`实例，用来收集和发布`watcher`。
* 需要注意，由于之前数据劫持将数组和对象分别进行劫持，所以`defineReactive`中只能收集对象属性的`watcher`,数组需要单独进行依赖收集
* 每个符合要求的数组和对象都会执行`observe`，最终会返回`Observer`的实例，在实例中为对象和数组又分别单独创建了`dep`实例
* 此时在`defineReactive`，可以通过`observe`为其返回该值的`Observer`实例，实例中的`dep`为数组和对象的`dep`，如果其存在即调用它的`depend`方法，会为当前`dep`
  再次收集对应的`watcher`
* 收集`watcher`要在`watcher`的`addSub`中进行，会对`dep`进行去重(用到了`set`)，然后在`watcher`中收集`dep`，再为该`dep`收集`watcher`。相互收集，方便之后实现计算属性。
* 数组要继续递归的为其中的子数组继续收集依赖
* 在数组调用其修改方法时，会通知收集的`watcher`进行更新。此时实现了：数据更新，页面同步更新

### nextTick异步更新

`Vue`也会提供静态`nextTick`方法和原型`$nextTick`方法

* 调用`watcher`的`update`时候(目前之后`watch watcher`和渲染`watcher`会在`update`方法中调用`nextTick`方法)，并不会直接渲染页面，而是在所有的主线程的逻辑执行完成之后再渲染页面
  * 首次进行页面渲染时，会直接进行渲染。只有在之后更新时才会进行异步渲染
* 通过`watcherQueue`将需要执行`update`方法的`watcher`进行去重，然后放到队列中。过程中会设置一个表标识，在执行`nextTick`方法后就设置为`true`，防止多次为`nextTick`中添加内容
* 在`nextTick`中会将用户传入的执行所有队列中`watcher`的函数继续放到一个新的队列中，在`Promise,MutationObserver,setImmediate,setTimeout`
  中进行执行，此时依旧要有一个标识防止多次执行
* 之后用户可能会手动调用`$nextTick`方法，会继续向`nextTick`中的队列添加函数，等到主线程代码执行完毕后，微任务中的代码会开始执行，将队列中的函数依次执行，即首先会执行`watcher`
  的更新，然后是用户传入的`$nextTick`中的函数

### watch实现原理

`watch`本质上是从`watch`中监听的`key`中获取值，并且在后续更新的时候，在下一次事件循环中将新值和旧值传递给回调函数

* `initState` -> `initWatcher`
* 通过`vm.$options`获取到用户传入的`watcher`
* 遍历所有的`watcher`属性，并创建用户定义的`watcher(vm,key,handler,{user: true})`
* 在`watcher`中, 由于`key`为表达式，会将`getter`方法会通过`key`从`vm`中进行取值，然后返回。之后会直接执行`this.get`，将返回值赋值给`this.value`,该值即为旧值
* 由于进行取值操作，会为该属性收集用户定义的`watcher`
* 在`vm.key`修改后，会触发用户定义的`watcher`的`update`方法，该方法会将`watcher`放到微任务队列中，异步执行。
* 执行时`run`方法最终会执行`this.get`方法会返回最新的`value`，此时调用`key`对应的回调，传入新值和旧值，然后用新值更新旧值
* 在`vm.key`更新后继续重复上述步骤

### virtual dom handle

虚拟`dom`的`diff`算法。虚拟`dom`本质上就是用`js`的对象来描述`dom`节点

`diff`是对树的每一次进行对比，核心思想是：能复用就复用，进可能避免多余的节点创建

首次渲染时，会用虚拟节点生成的真实`dom`替换掉`el`中传入的`dom`。在之后的渲染中，会将老的虚拟节和新生成的虚拟节点传入，内部会通过`patch`方法对比老的虚拟节点和新的虚拟节点。具体的比对过程如下：

* 标签名是否相同,不相同直接进行替换
* 是否是文本节点，如果是文本节点，直接比对即可
* 标签名相同，需要用新节点的属性更新老节点的属性
* 继续比对孩子节点
  * 如果老的有孩子，新的没有孩子，老孩子置位空
  * 如果老的没有孩子，新的有孩子，用新的孩子直接替换老的孩子
  * 如果老的有孩子，新的有孩子，这里会进入`diff`算法
    * 原理：为新老节点分别设置头尾指针
    * 结尾插入：
      * 头结点和头结点相同，继续递归的处理节点的属性以及该节点的子节点。头结点和尾节点时后移
      * 当头节点移动到和为节点索引相同时，停止移动，将新节点的剩余节点直接插入到老节点的后边
    * 开头插入：
      * 老节点的尾指针和新节点的尾指针相同，继续递归的处理节点的属性以及该节点的子节点。新老节点的尾指针同时后移
      * 停止移动后，新节点剩余的节点插入到老节点的头指针之前(尾指针的下一个节点之前，通过`insertBefore`来兼容`appendChild`方法)
    * 老节点的最第一项移动到了最后一项：
      * 头节点和尾节点相同，继续递归`diff`节点的属性以及该节点的子节点。将老节点的头节点移动到老节点的尾节点后面, 老节点的头指针后移，新节点的尾指针前移
      * 之后头和头相同什么也不做，继续后移，直到结束
    * 老节点的最后一项移动到了第一项：
      * 老节点的尾指针和新节点的头指针相同，继续递归的处理节点的属性以及该节点的子节点。将老节点的尾指针对应的节点移动到头指针之前
      * 老节点的尾指针前移，新节点的头指针后移
      * 新老节点头指针相同，继续后移，直到结束
    * 其它情况：乱序：
      * 头->头，尾->尾，头->尾，尾->头 都不相同
      * 将新节点的头指针通过`key`在老节点中进行查找，如果找到的话，将该节点移动到老节点头指针的前边，并将该虚拟节点置为null，之后比对时跳过
      * 如果没有找到，将该节点插入到老节点头指针之前
      * 新节点头指针后移
      * 如果出现头尾指针相同的情况，会继续走之前的逻辑
      * 遍历结束后，将老节点头指针之后内容删除

### computed实现原理

计算属性需要手动通过`Object.defineProperty`为`key`添加`get`方法，并且在取值时会有一个标识，如果标识为`true`才会去重新执行`handler`来获取计算属性的值。当计算完成后，将标识置为`false`
。在依赖的属性更新后，会触发计算属性`watcher`,会将标识再次置为`true`，这样会再次求值。

* 遍历用户传入的所有配置项，找对对应的`key`和`handler`
* 创建计算属性`watcher`： new Watcher(vm,handler,() => {},{lazy: true})
* 在`watcher`中，`this.getter=handler`,如果`lazy`为`true`的话，不会立即执行`this.get()`(这里`this.get`会执行`hanlder`)
* 为计算属性的`key`通过`Object.defineProperty`定义为`vm`的属性，并且创建其`get`方法，在`get`方法中，要获取到该属性对应的计算属性`watcher`
* 如果`dirty`是`true`，调用`watcher.evaluate`方法来执行`this.get`进行求值，此时会为其依赖属性收集计算属性`watcher`,并将`dirty`设置为`false`
* 此时如果`Dep.target`有值的话，会调用`watcher.depend`方法，来为`watcher`中的`deps`即依赖属性的`dep`收集`Dep.target`渲染`watcher`，其内部会调用所有`dep`
  的`depend`方法
* 之后在依赖属性更新后，会调用计算属性的`update`方法，将`dirty`置为`false`，如果页面中用到了计算属性，还会再调用渲染`watcher`的`update`方法，用于更新视图
* 在视图更新的时候，会再次触发计算属性`key`的`get`方法，通过`watcher.evaluate`进行求值，从通过`watcher.value`获取到最新值
