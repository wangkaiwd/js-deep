## `JavaScript`可视化：`Promise`和`Asnyc/Await`
曾经必不得不处理没有按照你期望的方式运行的`JS`代码吗？可能是函数被随机的、不可预测时间的执行，或者被延迟执行。你可能正在处理`ES6`引入的一个非常酷的新特性:`Promise`!

我多年之前的好奇心已经得到了回报，在不眠的夜晚再次给了我时间来制作一些动画。是时候来谈论`Promise`了：为什么你要使用它们，它们在底层是如何工作的，以及我们如何能用最现代的方式来书写它们？

> 如果你还没有阅读我之前发表的文章`JavaScript`事件循环，那么先去阅读一下可能会好理解这篇文章。我将会再次涉及事件循环，假设一些关于调用栈、`Web API`和队列等基础知识，但是这次我也会介绍一些令人兴奋的额外特性🤩

> * [JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
> * 笔者翻译的[中文版本](https://zhuanlan.zhihu.com/p/137276025)

### 介绍
在书写`JavaScript`的时候，我经常不得不去处理一些依赖于其它任务的任务！比如说我们想要得到一个图片，对其进行压缩，应用一个滤镜，然后保存它📸。

我们最先需要做的事情是得到我们想要编辑的图片。`getImage`函数可以处理这个问题！一旦图片被成功加载，我们可以传递那个值到一个`resizeImage`函数。当图片已经被成功地重新调整大小时，我们想要在`applyFilter`函数中为图片应用一个滤镜。在图片被压缩和添加滤镜后，我们想要保存图片并且让用户知道所有的事情都正确地完成了！🥳

最后，我们可能得到这样的结果:
![](https://res.cloudinary.com/practicaldev/image/fetch/s---Kv6sJn7--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ixceqsql5hpdq8txx43s.png)

额，注意到了吗？尽管它完成了事情，但是完成的并不是很好。我们最终得到了许多嵌套的回调函数，这些回调函数依赖于前一个回调函数。这通常被称为[回调地狱](http://callbackhell.com/)，由于我们最终得到了大量嵌套的回调函数，这使我们的代码阅读起来特别困难。

幸运的，我们现在有一个叫做`Promise`的东西来帮助我们摆脱困境！让我们看看`promise`是什么，以及它们是如何在类似于上述的情况下帮助我们的。😃