## `JS`高阶编程技巧

### 单例模式
假设我们使用原生`JavaScript`进行项目开发，并进行项目模块划分。为了防止全局变量之间相互干扰，每个模块之间可以使用自执行函数形成闭包来保护其中的变量。

如分别开发商品模块和新闻模块：
```javascript
// shop.js
// 商品模块
(() => {
  const getList = () => { //获取商品列表

  };

  const getCategory = () => { // 获取商品分类

  };
  
})();

// new.js
// 新闻模块
(() => {
  const getList = () => { // 获取物流信息列表

  };
})();
```
此时如果在新闻模块中需要使用到商品模块中的获取商品分类方法，我们可以将商品模块中的元素通过`return`返回，并通过一个变量来接收，之后就可以直接在新闻模块中使用。
```javascript
const shopModule = (() => {
  const getList = () => { //获取商品列表

  };

  const getCategory = () => { // 获取商品分类

  };
  return {
    // 这里通过对象返回，如果还有内容需要供外界使用，可以继续为对象提供属性
    getCategory,
  };
})();

// 新闻模块
const newsModule = (() => {
  const getList = () => { // 获取物流信息列表

  };
  shopModule.getCategory();
  return {};
})();
```

上边代码所描述的模块化方式我们称之为单例设计模式，它是最原始的模块化思想，它有如下特点：
* 利用闭包机制包裹元素，保护其中的变量
* 将想要让外界访问的内容通过`return`返回

### 惰性函数
在`dom2`时期的事件绑定需要进行兼容性处理，实现的过程如下：
```javascript
function emit (element, event, fn) {
  if (element.addEventListener) {
    element.addEventListener(event, fn);
  } else if (element.attachEvent) {
    element.attachEvent(event, fn);
  } else {
    element[`on${event}`] = fn;
  }
}

// 使用emit进行事件绑定
// 假设页面中有id为button的按钮
const $button = document.getElementById('button');
emit($button, 'click', () => {
  console.log('fn1');
});
emit($button, 'click', () => {
  console.log('fn2');
});
```
在上面的代码中，当我们第二次执行`emit`的时候，其实通过第一次`emit`的执行，就可以确定当前的执行环境，以及可以使用的`api`。

但是代码第二次执行的时候还是会执行对应的`if`语句来判断哪一个`api`可以使用。

为了让代码可以在第一次执行后，就可以识别当前的执行环境，并且在之后的执行中只使用当前环境下支持的`api`，而不用在执行多余的`if`语句，我们将代码改写为如下形式：
```javascript
function emit (element, event, fn) {
  if (element.addEventListener) {
    emit = function (element, event, fn) {
      element.addEventListener(event, fn);
    };
  } else if (element.attachEvent) {
    emit = function (element, event, fn) {
      element.attachEvent(event, fn);
    };
  } else {
    emit = function (element, event, fn) {
      element[`on${event}`] = fn;
    };
  }
  emit(element, event, fn);
}
// 使用emit进行事件绑定
// 假设页面中有id为button的按钮
const $button = document.getElementById('button');
emit($button, 'click', () => {
  console.log('fn1');
});
emit($button, 'click', () => {
  console.log('fn2');
});
```
这样当我们第一次执行代码时，就会为`emit`赋值为当前环境下的事件绑定函数。在之后执行代码时，由于我们改变了函数的指针指向，所以就会执行`emit`所赋值的新函数，而不会在执行`emit`最初所指向的函数。

这就是`JavaScript`中的惰性函数，在执行了一次`if`分支后，接下来会直接执行该条件下的代码，减少不必要的判断逻辑，提升代码性能。

### 函数柯理化
