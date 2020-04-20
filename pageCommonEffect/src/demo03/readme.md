## 拖拽模态框
* 屏幕内拖拽的逻辑
* 使用事件委托，监听`document`的`mouseup`事件和`mousemove`事件，防止拖拽过快移出模态框的问题

获取浏览器可视窗口的宽高(包括滚动条)：
* [`window.innerHeight`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight)
* [`window.innnerWidth`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerWidth)

在拖动时禁用文本选择：
* [`selectstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/selectstart_event)
* [javascript: Disable Text Select](https://stackoverflow.com/questions/16805684/javascript-disable-text-select)
