## 浏览器渲染机制
> [How the browser renders a web page? — DOM, CSSOM and Rendering](https://itnext.io/how-the-browser-renders-a-web-page-dom-cssom-and-rendering-df10531c9969)
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200410001328.png)
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200410001943.png)
### 进程和线程
浏览器是多线程

页面渲染是单线程(`JS`是单线程)，即浏览器只分配了一个线程来做这件事

进程：一个程序(一个进程可能包含多个线程)

线程：程序中要做的事情(一个线程同时只能做一件事情)


### 经典面试题
浏览器的地址栏中输入一个`url`地址到呈现页面，经历了哪些事情？

### 页面加载过程
浏览器分配一个线程，“自上而下、从左到右”依次解析和渲染代码

#### `css`加载
* `link`标签引入
    * 浏览器会开辟一个新的线程，去服务器获取对应的资源文件（不会阻碍主线程的渲染）
* `style`标签引入
* `@import`引入

#### `js`加载
* `script src=*`引入，或者直接在`script`中写`js代码
    * 主线程会从服务器获取`js`资源，并且把`js`资源进行解析和加载，加载完成后再继续渲染`dom`结构


### 减少网络请求次数
网络资源请求或者`http`请求的[最大并发数](https://stackoverflow.com/a/985704):  
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
