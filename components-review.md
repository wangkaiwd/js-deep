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

* 手动通过`input.click()`来触发`input`的`change`事件，然后可以拿到对应上传的文件对象
* 在弹出窗口中点击确定，会将对应的文件首先格式化成想要的格式，然后保存到`this.files`中
* 在处理文件之前，可以执行`beforeUpload`钩子函数，来控制是否继续执行上传操作
* 遍历`this.files`进行文件上传
* 封装文件上传方法: XMLHttpRequest,
  * 处理上传进度 xhr.upload.onprogress，要监听xhr.upload的progress事件
  * 最后要将`xhr`进行返回，这样方便之后如调用`xhr.abort()`来取消正在上传的文件
* 拖拽上传：监听对应的拖拽事件，然后在`drop`事件触发时，可以通过`e.data.transfer`拿到文件对象。此时调用之前封装好的上传文件方法即可，与正常文件上传完全相同

### date picker

* 天面板生成的过程比较复杂，要计算上月的最后几天，当月天数，以及下月的前几天
  * 计算当月第一天星期几，然后推导出上月的天
  * 计算当月总天数(下个月的第0天)
  * 42-前一月天数 - 当月天数 计算出下一个月的天数
* 对应的值要处理成日期格式，方便获取到年月日进行样式处理
* 支持双向数据绑定，可以通过正则匹配出用户输入的内容，然后更新选择的日期，如果匹配不到，忽略用户的输入

### infinite scroll
