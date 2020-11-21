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
