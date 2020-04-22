## `JavaScript`中的柯理化：回答一个传统的问题，`Add(2)(3)`，给出俩个数字的和
> 原文： [Currying in JS: Answering the traditional question, Add(2)(3), which gives sum of both numbers](https://theanubhav.com/2019/02/03/js-currying-in-interview/#references)

理解`currying`的概念，并且深入分析关于`currying`的最常见的面试问题。

### 首先，用`JavaScript`实现`add(2)(3)`

在开始之前，如果我们做一个简单的分析，我们可以简单的说，这不只是`JavaScript`可以实现的一个问题，而是任何有`First Class`函数的语言都可以实现的一个问题。

当函数在一个语言中像任何其它变量一样被对待时，我们就说这个编程语言有`First Class`函数。例如，在这样的语言中，一个函数可以被作为一个参数传递给其它函数，可以通过另一个函数返回以及可以作为一个值赋值给一个变量。

现在，我们只需要创建一个函数，该函数返回另外一个函数，依次执行函数就能给出总和，就是这样。

如果你第一次遇到这个问题，在继续阅读之前，请尝试先自己解决这个问题。

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

`currying`是一个将拥有多个参数的函数转换为拥有单个或多个函数序列的技术。在上面的问题中，我们简单的将`add(2,3)`转换为`add(2)(3)`。

你可以通过这篇 [文章](https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures) 深入`currying`。

### `add(2)(3)`问题的变体
在这个`currying`问题中可能也会看到漂浮这个问题周围的许多变体问题。

#### `add(2)(3)(4)...`,可以传入无数个参数

我们知道如何去处理求和并且返回函数(与闭包一起)，但是我们不确定什么时候停止返回函数，这意味着：什么时候主函数返回结果以及什么时候主函数返回另一个`curried`函数。

这里可能有俩个选项：

##### 1. 使用`valueOf`属性

在这篇[文章](https://theanubhav.com/2018/11/07/understanding-primitive-and-getter-setters/) 中，我们已经理解`ToPrimitive`操作是如何通过`JS`引擎被处理的。
考虑到这一事实，如果我们返回一个`valueOf`属性为到目前为止的计算结果的对象(或函数)，我们将能够区分为了进一步求和返回一个函数和到目前为止求和的结果之间的区别。让我们看一下下边的代码：
```javascript
// 传参个数不确定
const add = function (x) {
  let sum = x

  function result (y) {
    sum = sum + y
    return result
  }

  // 直接赋值存在的问题：会直接的到初始值，之后即使sum的值发生改变，result.valueOf的值也不会更新
  // 解决方法：
  // 1. 赋值为对象，来改变对象中的键值对，之后通过对象来获取键值对内容
  // 2. 赋值为函数，函数会在每次执行时都开辟一个执行上下文，并通过作用域链来进行变量查找，找到的都是最新的sum值
  // result.valueOf = sum
  result.valueOf = function () {
    return sum
  }
  return result
}
```
> 笔者注：在进行强制类型转换时，都会先调用该值的`valueOf`方法

如下的执行将会工作：
````javascript
// 下边的`+`和`==` 会将add执行结果强制转换为number,这里会首先调用valueOf方法
console.log(5 + add(2)(3)) // true
console.log(add(2)(3)(4) == 9) // true
console.log(add(3)(4)(5).valueOf()) // 9
````

换句话说，这些例子不会按照预期工作或者在一些地方会出现异常，比如：
```javascript
add(3)(4)(5) // return function
console.log(add(3)(4)(5)) // output: function
console.log(add(3)(4)(5) === 12) // false, '==='不会进行强制类型转换 
```

这个行为基于一个事实：在`JS`引擎需要将`add(2)(3)(4)`的结果转换为原始类型的时候，`valueOf`属性将会被`JS`引擎调用。上面所有得出正确结果的陈述是由于`JS`引擎尝试转换结果为原始值这个事实

##### 2. 显式的调用一个属性

另一个方法是，我们们遵循一个约定：函数的消费者应该显示的调用结果中的一个属性来获得总和。这个解决方案和使用`valueOf`的解决方案非常类似，但是不会有隐式的转换发生。像这样：
```javascript
function add (x) {
  let sum = x;
  function resultFn (y) {
    sum += y;
    // 通过函数的属性来记录求和后的值
    resultFn.result = sum;
    return resultFn;
  }
  // f.result = () => sum;
  return resultFn;
}

```
使用将会是：
```javascript
console.log(add(3)(4)(5).result); // 12
const t = add(3)(4);
console.log(t.result); // 7
console.log(t(5).result); //12
```
如果必须要实现这类问题，应该通过模块/类而不只是用一个简单的函数来模拟这些行为。

##### 3. 为最后的结果显示的调用没有参数的函数
当函数被没有参数的情况下调用时，也可以设计函数返回求和结果。如果参数被传递，函数将继续为之前的结果加上这些数字。
```javascript
function add (x) {
  if (!x) return;
  let sum = x;
  return function resultFn (y) {
    const length = arguments.length;
    if (length === 0) {
      return sum;
    }
    sum += y;
    return resultFn;
  };
}
```
这可以用以下几种方式使用
```javascript
console.log(add(2)(3)()); // 5
const t = add(3)(4)(5);
console.log(t()); // 12
```
#### 在同一个函数中使用`add(2)(3)(4)`和`add(2,3,4)`
