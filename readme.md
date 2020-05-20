## 深入学习`JavaScript`
> 阅读参考：  
> * [冴羽的博客](https://github.com/mqyqingfeng/Blog)
> * [木易杨前端进阶](https://www.muyiy.cn/blog/)

### 深入`JavaScript`执行机制
问题记录：
* 执行上下文和函数作用域及作用域链
* 图解如下代码：
  ```javascript
  for (var i = 0; i < 5; i++) {
    (function fn (i) {
      setTimeout(() => {
        console.log(i);
      }, 10);
    }(i));
  }
  ```
* `redux`的`compose`源码特别绕，需要理解

### 面向对象
问题记录:
* 图解`prototype`的相关内容

### `WebStorm`笔记
#### `AceJump`
> * 快速跳转
> * 灵活选中代码

* `ctrl + ;`(cycle)
    * `Word Mode` (once)
    * `Declaration` (twice)
    * `Target Mode` (thrice): 

* `->`: to target the last
* `<-`: to target the first
* `↑`: to target the first non-whitespace characters of every line in the editor

* `Line Mode`: `ctrl + shift + ;`
    * to target the beginning, first non-whitespace, and last character of every line in the editor
