## [译]`JavaScript`中的柯理化：回答一个经典问题，`Add(2)(3)`，给出俩个数字的和
> 原文： [Currying in JS: Answering the traditional question, Add(2)(3), which gives sum of both numbers](https://theanubhav.com/2019/02/03/js-currying-in-interview/#references)

> 理解柯理化的概念，并且深入分析关于柯理化的最常见的面试问题。

### 首先，用`JavaScript`实现`add(2)(3)`

在开始之前，如果我们做一个简单的分析，可以简单的说，柯理化不只是`JavaScript`可以实现的一个问题，而是任何有`First Class`函数的语言都可以实现的一个问题。

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
这个问题就是`JS`中柯理化的概念。

### 什么是柯理化

柯理化是一个将拥有多个参数的函数转换为拥有单个或多个函数序列的技术。在上面的问题中，我们简单的将`add(2,3)`转换为`add(2)(3)`。

你可以通过这篇 [文章](https://bjouhier.wordpress.com/2011/04/04/currying-the-callback-or-the-essence-of-futures) 来深入柯理化。

### `add(2)(3)`问题的变体
在这个柯理化问题中可能也会看到漂浮在这个问题周围的许多变体问题。

#### `add(2)(3)(4)...`,可以传入无数个参数

我们知道如何去处理求和并且返回函数(与闭包一起)，但是我们不确定什么时候停止返回函数，也就是说我们不知道什么时候主函数返回结果以及什么时候主函数返回另一个`curried`函数。

这里可能有俩个选项：

##### 1. 使用`valueOf`属性

在这篇[文章](https://theanubhav.com/2018/11/07/understanding-primitive-and-getter-setters/) 中，我们已经理解`ToPrimitive`操作是如何被`JS`引擎处理的。
考虑到这一事实，如果我们返回一个`valueOf`属性为到目前为止的计算结果的对象(或函数)，我们将能够区分**为了进一步求和返回一个函数**和**到目前为止求和的结果**之间的区别。让我们看一下下边的代码：
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

换句话说，这些例子不会按照预期工作或者在一些地方出乎预料，比如：
```javascript
add(3)(4)(5) // return function
console.log(add(3)(4)(5)) // output: function
console.log(add(3)(4)(5) === 12) // false, '==='不会进行强制类型转换 
```

这个行为基于一个事实：在`JS`引擎需要将`add(2)(3)(4)`的结果转换为原始类型的时候，`valueOf`属性将会被`JS`引擎调用。上面所有得出正确结果的陈述是由于`JS`引擎尝试转换结果为原始值这个事实

##### 2. 显式的调用一个属性

另一个方法是，我们遵循一个约定：函数的消费者应该显式(明确的)的调用结果中的一个属性来获得总和。这个解决方案和使用`valueOf`的解决方案非常类似，但是不会有隐式的转换发生。像这样：
```javascript
function add (x) {
  let sum = x;
  function resultFn (y) {
    sum += y;
    // 通过函数的属性来记录求和后的值
    resultFn.result = sum;
    return resultFn;
  }
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
> 译者注：![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200423231219123.png)

##### 3. 为最后的结果显式的调用没有参数的函数
当函数在没有参数的情况下调用时，也可以设计函数返回求和结果。如果参数被传递，函数将继续为之前的结果加上这些数字。
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
这种实现的使用方式如下：
```javascript
console.log(add(2)(3)()); // 5
const t = add(3)(4)(5);
console.log(t()); // 12
```
#### 在同一个函数中使用`add(2)(3)(4)`和`add(2,3,4)`
这是另一个变体，用同一个函数满足`add(2,3,4)`和`add(2)(3)(4)`俩种用例以及任何的组合情况。因此，一个单独的函数应该满足如下情况：

* add(2)(3)(4)
* add(2,3,4)
* add(2)(3,4)
* add(2,3)(4)

对于这种情况，让我们考虑有固定数量`n`个参数(在我们的例子中，n=3)。如果需要用变化数量的参数实现，我们可以将上面问题讨论的解决方案和这个问题的解决方案结合起来。这里的技巧是追踪参数数量`n`,只要我们有足够数量的参数，我们就返回总和。

##### 1. 使用参数数量解决
下边的代码保存了所有传递参数的数量，如果传递参数的数量到达3的话，它将会给出求和结果。
```javascript
function add (...outerArgs) {
  let args = outerArgs;

  function resultFn (...innerArgs) {
    args = args.concat(innerArgs);
    return args.length >= 3 ? args.reduce((a, b) => a + b) : resultFn;
  }
  // 直接执行，如果第一次执行add时参数的数量就达到了3个，会直接求和
  return resultFn();
}

console.log(add(2, 3)(4));
```
使用示例：
```javascript
console.log(add(2)(3)(4)); // 9
console.log(add(2, 3)(4));  // 9
console.log(add(2, 3, 4));  // 9
console.log(add(2)(3, 4)); // 9
```

##### 2. 固定数量函数的通用方法
这个方法要创建一个高阶函数，该高阶函数第一个参数为一个函数，第二个参数为函数(第一个参数)必须要传入的参数的数量--在我们的例子`add(2,3,4)`中是3。这个函数将会追踪参数，除非收集的参数总数和传入函数期望的参数总和相同。
```javascript
const fixCurry = (fn, totalArg) => {
  const length = totalArg || fn.length;
  return function resultFn (...args) {
    return args.length < length ? resultFn.bind(null, ...args) : fn(...args);
  };
};
```
上面的函数接受一个函数-`fn`和一个可选的`totalArgs`,这俩个参数在调用`fn`之前是必须的。如果`totalArgs`没有传入，将会依赖于函数签名并且使用函数被定义时参数的数量(译者注：形参的数量)。`totalArg`可能被用于函数`fn`,`fn`依赖于`arguments`实现并且在它的签名中没有参数被定义。`fixCurry`返回了一个函数，该函数不断为另一个函数添加(通过`bind`)参数，如果达到阈值，它会用到目前为止之间所有调用搜集的参数来调用`fn`。

让我们看一下使用示例：
```javascript
const add = fixCurry((a, b, c) => a + b + c, 3);
console.log(add(1, 2, 3)); // 6
console.log(add(1)(2, 3)); // 6
console.log(add(1)(3)(2)); // 6
console.log(add(1, 2)(3)); // 6
```
同样适用于乘法(或者任何其它可以被柯理化的函数)：
```javascript
const multiply = fixCurry((a, b, c) => a * b * c, 3);
console.log(multiply(1, 2, 3)); // 6
console.log(multiply(1)(2, 3)); // 6
console.log(multiply(1)(3)(2)); // 6
console.log(multiply(1, 2)(3));  // 6
```
这个`fixCurry`也可以被用于柯理化任何拥有固定参数的函数

对于相加和相乘需要另外注意的一点是，前3个自然数的相加和相乘是相同的。
