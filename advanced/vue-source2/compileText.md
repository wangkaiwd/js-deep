## 文本编译
目标：使用`data`中的属性提换`html`中`{{}}`中的内容

* 获取组件挂载的位置
* 更新视图函数
  * 创建文档碎片来缓存真实dom
  * 匹配dom中的`{{}}`中的表达式
  * 通过表达式获取`data`中对应的属性值
  * 用`data`中的替换`dom`，然后重新渲染dom
* 使用watcher执行更新视图函数

### 记录
* 正则学习
* `reduce`方法的考虑
  * 手写实现`reduce`方法
    ```javascript
    function reduce (array, fn, initial) {
      let accumulator = initial || array[0];
      for (let i = 0; i < array.length; i++) {
        const k = initial ? i : i + 1;
        if (k < array.length) {
          accumulator = fn(accumulator, array[i + 1], i + 1);
        } else break;
      }
      return accumulator;
    }
    
    console.log('my-reduce', reduce([1, 2, 3], function (a, b) {
      return a + b;
    }));
    ```
* `DocumentFragment`没有`outerHTML/innerHTML`属性
  * `DocumentFragment`继承自`Node`，而不是拥有`.innerHTML/outerHTML`属性的`Element`
  * 我们可以创建一个临时`div`，然后将`fragment`插入到`div`中，然后通过`div`的`innerHTML/outerHTML`来查看`fragment`中的内容
  * [inherit](https://stackoverflow.com/a/54806517)
  * [code snippet](https://gist.github.com/gleuch/2475825#file-gistfile1-js-L10-L15)
  * [browser reflow](https://developers.google.com/speed/docs/insights/browser-reflow)
