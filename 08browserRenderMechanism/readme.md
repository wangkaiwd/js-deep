## 浏览器渲染机制
> [How the browser renders a web page? — DOM, CSSOM and Rendering](https://itnext.io/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969)
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200410001328.png)
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200410001943.png)
### 进程和线程
浏览器是多线程

页面渲染是单线程(`JS`是单线程)，即浏览器只分配了一个线程来做这件事

进程：一个程序(一个进程可能包含多个线程)

线程：程序中要做的事情(一个线程同时只能做一件事情)

比如浏览器打开一个窗口，该窗口就是一个进程，窗口会分配一个线程来渲染页面，分配一个线程来加载`link`引入的`css`，还会分配一个线程来加载图片等。

### 经典面试题
浏览器的地址栏中输入一个`url`地址到呈现页面，经历了哪些事情？

### 页面加载过程
首先浏览器会通过服务器获得`html`代码，之后浏览器分配一个线程，“自上而下、从左到右”依次解析和渲染代码。

![](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/webkitflow.png)

主线程渲染`DOM`树

分配新的线程来处理`CSS`

`CSS`和`DOM`结合生成`Render Tree`

`painting`阶段，浏览器通知GPU(显卡)开始按照`Render Tree`绘制图形到页面中

#### `css`加载
* `link`标签导入外部资源
    * 每次遇到`link`标签，浏览器都会分配一个新的线程，去服务器获取对应的资源文件（不会阻碍主线程的渲染）
* `style`标签内嵌
    * 主线程会按照顺序解析，完成后继续续解析`DOM`结构
* `@import`引入
    * 不会分配新的线程去请求`CSS`资源，而是让主线程去获取，这样将会阻塞`DOM`结构的继续渲染。在外部`CSS`被导入并解析后，才会继续渲染`DOM`树

> 图片的加载过程类似于link标签
    
如果`style`中的`CSS`样式内容过多的话，会阻塞`html`代码的拉取，导致首页加载时间过长，造成页面白屏问题。

所以在`css`较多的情况，最好使用`link`标签引入样式，这样浏览器会分配新的线程去请求样式资源，而主线程可以继续解析`DOM`结构。

如果样式内容较少的话，使用`style`标签内嵌样式性能比较好。这样不会阻塞主线程较长时间，而且减少了浏览器分配线程和请求资源的时间，可以较快渲染页面。

#### `js`加载
`JS`中会有操作`DOM`的代码

为什么要把`link`写到`html`结构的上边(`head`里)，把`script`写到`html`结构的下边(`body`)?  
* 通过`link`方式引入`css`样式文件，不会阻塞`DOM`结构的解析，当放到文件头部的时候，会较早时间开始加载`css`，从而更早的获取到`css`资源
* `script`(没有`async`和`defer`属性)会阻塞`DOM`结构的解析，如果放到页面上方影响下边`DOM`结构的渲染速度。而且我们可能会在`script`中操作`DOM`，所以在`js`执行时要确保`DOM`结构已经渲染完毕。

* `script src=*`引入，或者直接在`script`中写`js代码
    * 主线程会从服务器获取`js`资源，并且把`js`资源进行解析和加载，加载完成后再继续渲染`dom`结构
    
当外部加载的`script`标签设置了`defer`或者`async`属性，`JavaScript`的加载将不会再阻塞网页渲染的问题。

`defer`的运行流程：
1. 浏览器开始解析`HTML`网页
2. 解析过程中发现带有`defer`属性的`script`元素
3. 浏览器继续往下解析`HTML`网页，同事并行下载`script`标签加载的外部脚本
4. 浏览器完成解析`HTML`网页，此时再回过头**按照它们在页面上出现的顺序**执行已经下载完成的脚本

`async`的运行流程：
1. 浏览器开始解析`HTML`网页
2. 解析过程中发现带有`async`属性的`script`元素
3. 浏览器继续往下解析`HTML`网页，同时并行下载`script`标签加载的外部脚本
4. 脚本下载完成，浏览器暂停解析`HTML`网页，开始执行下载的脚本
5. 脚本执行完毕，浏览器恢复解析`HTML`网页

现代浏览器都有完善的代码扫描机制：  
如果遇到`script`标签需要同步加载和渲染代码，浏览器在渲染`js`的时候，同时会向下继续扫描代码，如果发现有一些异步的资源代码，此时就开始加载请求了

`js`的等待机制：  
在`js`中可能会操作元素的`css`样式，所以即使都是异步请求资源的情况下，如果`js`先加载回来，也会等到它之前发送请求的`css`加载并渲染完成后才会执行`js`代码

如果我们想要将`js`代码写到页面结构上方的时候，可以使用`load`和`DOMContentLoaded`事件来处理：  
* `DOMContented`: 当初始的`HTML`文档被完全加载和解析完成后，`DOMContentLoaded`事件被触发，而无需等待样式表、图像和子框架的完成加载。注意：**`DOMContentLoaded`事件必须等待其所属`script`之前的样式表加载解析完成才会触发**
* `load`: 当整个页面已经被加载时会触发`load`事件，此时所有的像样式表和图片等依赖资源也已经加载完毕

### 减少网络请求次数
浏览器网络资源请求或者`http`请求的[最大并发数](https://stackoverflow.com/a/985704):  
```text
Firefox 2:  2
Firefox 3+: 6
Opera 9.26: 4
Opera 12:   6
Safari 3:   4
Safari 5:   6
IE 7:       2
IE 8:       6
IE 10:      8
Chrome:     6
```

为了避免并发的出现，导致某些资源延迟加载，页面渲染速度变慢，我们应该尽可能减少`http`请求的数量

### 回流和重绘(Reflow & Repaint)
> [Understanding Repaint and Reflow in JavaScript](https://medium.com/darrja-%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%9C%E0%A4%BE/what-the-heck-is-repaint-and-reflow-in-the-browser-b2d0fb980c08)

`DOM`的重绘和回流`Repaint & Reflow`

重绘：元素样式的我改变(但宽高、大小、位置等不变)

回流：元素的大小或位置发生了变化(当页面布局和几何信息发生变化的时候)，触发了重新布局，导致渲染树重新计算布局和渲染

注意：回流一定会触发重绘，而重绘不一定会回流

#### 避免`DOM`的回流
* `vue/react`中的`virtual DOM`
* 分离读写操作
* 集中改变样式
* 缓存布局信息
* 元素批量修改

 
现代浏览器的渲染队列机制：在更改样式的时候，会检查之后的代码是否继续修改样式，如果是的话，会统一将操作放到一个队列中，一起执行
```javascript
window.addEventListener('DOMContentLoaded',function() {
  const navBox = document.getElementById('navBox')
  // => 由于渲染队列机制，只会引发一次回流(读写分离)
  navBox.style.width = '100px';
  navBox.style.height = '100px';
  console.log(navBox.offsetWidth);
  
  // => 读写不分离，触发俩次回流
  navBox.style.width = '100px';
  console.log(navBox.offsetWidth);
  navBox.style.height = '100px';
})
```
