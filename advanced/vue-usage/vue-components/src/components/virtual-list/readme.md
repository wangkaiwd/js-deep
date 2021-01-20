## 超长列表渲染优化

* 微任务 -> ui渲染 -> 宏任务
* 分片：导致页面`DOM`元素过多，造成页面卡顿
* requestAnimationFrame: 宏任务，配合浏览器刷新频率
