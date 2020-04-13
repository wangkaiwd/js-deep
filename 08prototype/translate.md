## `JavaScript`中的柯理化：回答一个传统的问题，`Add(2)(3)`，给出俩个数字的和
> 原文： [Currying in JS: Answering the traditional question, Add(2)(3), which gives sum of both numbers](https://theanubhav.com/2019/02/03/js-currying-in-interview/#references)

理解`currying`的概念，并且深入分析关于`currying`的最常见的面试问题。

### 首先，用`JavaScript`实现`add(2)(3)`

在开始之前，如果我们做一个简单的分析，我们可以简单的说，这不只是`JavaScript`可以实现的一个问题，而是任何有`First Class`函数的语言都可以实现的一个问题。

当函数在一个语言中像任何其它变量一样被对待时，我们就说这个编程语言有`First Class`函数。例如，在这样的语言中，一个函数可以被作为一个参数传递给其它函数，可以通过另一个函数返回以及可以作为一个值赋值给一个变量。

现在，我们只需要创建一个函数，该函数返回另外一个函数，依次执行函数就能给出总和，就是这样。

如果你第一次第一次遇到这个问题，在继续阅读之前，请尝试先自己解决这个问题。

解决方法：
```javascript
function add (x) {
  return function (y) {
    return x + y
  }
}
```

也可以使用`ES6`中的箭头函数实现：
```javascript
const add = (x) => (y) => x + y
```
这个问题就是`JS`中`currying`的概念。

### 什么是`currying`


