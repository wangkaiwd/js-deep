## Vue
* Vue 是一个 MVVM 框架(文档？)？
  * 数据变化会视图更新
  * 视图变化也会更新数据(`v-model`)
  * `MVVM`不能跳过数据直接更新视图，而`Vue`可以通过`$ref`来进行`DOM`操作，直接更新视图

* 当前目录结构的意图？

* html渲染过程：vue 官网生命周期执行流程图
  * 通过正则解析为`ast`语法树
  * 将语法树生成字符串
  * 将字符串通过`new Function`和`with`组合执行，生成一个函数
  
* 使用`Vue.mixins`和直接在公共文件内定义变量并引入有什么不同？
  * 公共变量会由于变量引用而导致发生变化(小心！)
  
* 合并配置项: vm.$options = mergeOptions(Vue.options,options),不同的配置项采用不同的合并策略
  * different push with concat
* dep 和 watcher 双向记录：为了实现computed
* object 为什么也要在watcher中为它添加dep? 为了实现Vue.set(obj,'a',100)为对象新增属性



* 面试题：1. 模板中是否用到了a 2. watcher去重 3. 异步更新
  ```vue
  <script>
    export default{
      mounted() {
        this.a = 1
        this.a = 2
        this.a = 3
      }
    }
  </script>
  ```
* $nextTick: 值更新之后，dom是异步更新的，所以并不能直接获取到最新的dom,需要利用$nextTick
* 异步更新和`watcher`面试题：
  ```vue
  <script>
    export default {
      data() {
        return {
          a: 1
        } 
      },
      watch: {
        a(newValue,oldValue) {
          console.log(newValue,oldValue)
        }
      },
      mounted() {
        this.a = 2
        console.log(1)
        this.$nextTick(() => {
          this.a = 3
          console.log(4)
        })
      }
    }
  </script>
  ```

### `diff`算法图解
* [头和头相同](https://excalidraw.com/#json=6323180297781248,5P1UibC53d7pFiPyG1gadw)
* [尾和尾相同](https://excalidraw.com/#json=6282157085425664,ShN7flboAy7R-H7f1Bpw3A)
* [reverse反转](https://excalidraw.com/#json=5717246110334976,tryA_tqRh4TgnV8KfiQS2w)
* [新节点将老节点尾部移动到头部](https://excalidraw.com/#json=5742657385005056,quCfr-Eipq7hHqyvcWdXeQ)
* [新节点将老节点头部移动到尾部](https://excalidraw.com/#json=5749951145443328,eP4pUJHAJu2ggUcY6McHEA)

面试题：为什么不能用`index`作为`v-for`列表的`key`?

### computed
* 面试题：`watch`和`computed`的区别？

### 组件
* 复习继承：思考实现继承的几种方法
* 为什么要拆分小组件？
  1. 实现复用
  2. 方便维护
  3. vue更新问题，每一个组件一个`watcher`，这样在更新时可以减少比对内容
* Vue.component
* Vue.component
* Vue.options.components 的合并策略： 利用原型链
