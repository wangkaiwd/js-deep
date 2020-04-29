## [译] `JavaScript`可视化：事件循环
> 原文地址：https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif
> 原文作者：https://dev.to/lydiahallie

事件循环是每一个`JavaScript`开发者必须使用一种方式或者另外的方法处理的事情之一，但是一开始理解起来可能有点令人困惑。我是一个可视化学习者，所以我认为我应该尝试用一种可视化的方式通过低分辨率的动图(`gifs`)来帮你解释它。现在是2019年，动图(`gifs`)还是有一点像素化和模糊。

但是首先，什么是事件循环以及我们为什么应该关心它呢？

`JavaScript`是**单线程**(`single-threaded`): 同时只能运行一个项目。通常这没什么大不了，但是想象一下，现在你正在运行一个需要30秒的任务。在任务期间，任何其它事情发生之(`JavaScript`默认运行在浏览器的主线程上，因此整个`UI`是卡住的)前都需要等待30秒。现在是2019年了，没有人想要一个慢的、响应不及时的网页。

幸运地，浏览器给我们一些`JavaScript`引擎它自己没有提供的特性：`WEB API`。它包括`DOM API`、`setTimeout`、`HTTP`请求等内容。这能帮助我们创建一些异步、非阻塞的行为。

当我们调用一个函数的时候，它会被添加到一个叫做调用栈的东西中。调用栈不是浏览器特有的，而是`JS`引擎的一部分。它是栈意味着它是先进后出(想想一堆煎饼)。当函数返回一个值的时候，它会被弹出栈。
![](https://res.cloudinary.com/practicaldev/image/fetch/s--44yasyNX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gid1.6.gif))

`respond`函数返回一个`setTimeout`函数。`setTimeout`通过`Web API`提供给我们，它让我们在不阻塞主线程的情况下延迟执行任务。我们为`setTimeout`传递的回调函数即箭头函数`() => { return 'Hey' }`被添加到`Web API`。与此同时，`setTimetout`函数和`respond`函数被弹出栈，它们都返回了它们的值。
![](https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif

在`Web API`中,定时器运行时间和我们传递给`setTimeout`的第二个参数一样长，即1000ms。回调函数不会立即被被添加到调用栈中，反而会被传给一个叫队列的东西。
![](https://res.cloudinary.com/practicaldev/image/fetch/s--MewGMdte--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif)

这是一个令人疑惑的部分：他并不意味着在1000ms后，回调函数被添加到调用栈(从而返回一个值)。它是在1000ms后被添加到队列。由于这是一个队列，因此函数必须等到轮到它的时候再执行。

这是我们一直在等待的部分，事件循环去做它唯一任务的时间到了：**通过调用栈连接队列**！如果调用栈是空的，也就是说所有之前被调用的函数已经返回它们的值并且已经从栈内弹出，那么队列中的第一项会被添加到调用栈。在这个例子中，没有其它的函数被调用，意味着到回调函数在队列中是第一项时调用栈是空的。
![](https://res.cloudinary.com/practicaldev/image/fetch/s--b2BtLfdz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif)

回调函数被添加到调用栈调用然后返回一个值，最终被弹出栈。
![](https://res.cloudinary.com/practicaldev/image/fetch/s--NYOknEYi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif5.gif)

阅读文章是有趣的，但是你只有通过不断地实践才能完全理解它。尝试想出如果我们运行如下代码控制台会得到什么？
```javascript
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
```

明白了吗？让我们快速看一下，当在浏览器中运行这段代码时发生了什么？
![](https://res.cloudinary.com/practicaldev/image/fetch/s--BLtCLQcd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif14.1.gif)

1. 我们调用`bar`。`bar`返回一个`setTimeout`函数。
2. 我们传递给`setTimeout`的回调被添加到`Web API`,`setTimeout`和`bar`被弹出调用栈。
3. 计时器开始运行，与此同时`foo`被调用并且输出`First`。`foo`返回`undefined`,`baz`被调用，并且回调被添加到队列中。
4. `baz`输出`Third`。在`baz`返回内容后，事件循环看到调用栈是空的，然后将回调添加到调用栈中。
5. 回调输出`Second`。

希望这能让你对事件循环更加熟悉！
