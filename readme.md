## 深入学习`JavaScript`
> [冴羽的博客](https://github.com/mqyqingfeng/Blog)
### 深入`JavaScript`执行机制
问题记录：
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

### 面向对象
