## 发布订阅模式
设计模式：更好的管理项目中的代码：方便维护、方便团队协作、方便扩展

灵感来自于`DOM2`事件池机制

发布订阅模式用到的地方：
* [`DOM2`事件绑定](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
* [`vue`监听子组件自定义事件](https://cn.vuejs.org/v2/guide/components.html#%E7%9B%91%E5%90%AC%E5%AD%90%E7%BB%84%E4%BB%B6%E4%BA%8B%E4%BB%B6)
* [`node`事件触发器`event`](http://nodejs.cn/api/events.html#events_events)

数组塌陷问题：
* `axios`拦截器 [`interceptor eject`](https://github.com/axios/axios/blob/16b5718954d88fbefe17f0b91101d742b63209c7/lib/core/InterceptorManager.js#L30-L34) 源码
* `react/vue`应用

[`react`中的`key`值问题](https://kentcdodds.com/blog/understanding-reacts-key-prop)
