## 组件知识点复习

### lazyLoad

图片懒加载： 图片在 "可视区域 + 预加载区域内" 时才会加载，否则不会

* 通过自定义指令来实现
  * 将图片列表中的每个图片的src替换为v-lazy
  * 在install方法中，为Vue添加全局指令`Vue.directive(v-lazy,{})`
  * 要在`bind`钩子函数中访问`dom`，需要使用`$nextTick`
* 获取图片列表最近的设置了滚动属性(`overflow: scroll/auto, overflow-y: scroll/auto`)的父元素
  * getComputedStyle: 可以获取到一个元素在应用激活样式表并且解决完这些值中可能包含的基础计算之后的所有`css`属性值
* 要为父元素监听滚动事件(只设置一次)
* 将所有绑定`v-lazy`的`dom`元素都收集到数组中
* 手动触发`lazyHandler`
  * `lazyHandler`中会检测数组中收集的每个元素是否在 "可视区域 + 预加载区域" 内，并且它的状态为`init`，才会对其进行加载
  * 由于`lazyHandler`会频繁触发，可以对其进行节流，在特定时间内只触发一次
* 加载图片
  * 可以创建一个假的`img`元素，然后给他设置`src`属性，监听它的`onload`和`onerror`事件
  * 然后为真实的`img`元素设置不同状态的`src`(`loading,success,failure`)

### upload

### date picker

### infinite scroll
