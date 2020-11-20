## 组件知识点回顾
### LazyLoad组件
* `img`绑定指令`v-lazy`来替换`src`属性
* 图片懒加载原理：
  * 通过`v-lazy`绑定的元素，找到其最近的可以滚动的父元素(`getComputedStyle`)
  * 图片加载区域： 父元素的高度 * 预加载比例
  * 收集`v-lazy`绑定的所有元素，判断它们是否在加载区域内，并且修改其对应的状态(`init,pending,success,error`)，如果处于`init`状态就加载图片
  * 加载图片时会通过`dom`操作新建一个`img`标签，为它设置`src`属性，模拟真实图片的加载过程。加载完成后修改真实图片`dom`的`src`以及其对应的状态

### 无限滚动组件
* 自定义指令：`bind`钩子函数中要想进行`dom`操作可以在`$nextTick`进行，`$nextTick`会保证`dom`更新完毕，因为首次渲染页面是同步渲染，之后更新是异步更新。
* 共享变量：通过自定义一个`key`: `scope=GoInfiniteScroll`，将它作为`el`的属性，在该属性上放置需要共享的变量
* 自己设置用户传入参数的默认项。由于用户传入的参数是通过`html`属性传递，需要通过`getAttribute`获取到对应的属性，并根据属性值在`vNode.context`即用户组件实例上取到`data`中的值
* 通过`v-infinite-scroll`找到其对应的最近滚动容器父组件，如果`container.offsetHeight` + `distance` + `container.scrollTop` > `container.scrollHeight`,此时需要执行用户传入的`load`方法
* 如果设置了首次填满容器，需要通过`MutationObserver`来监听`handleScroll`方法


### 图片上传组件
* 点击按钮，在按钮的点击事件中通过`js`来触发`input`的点击事件，从而触发`input`的`change`事件，客户端会弹出图片上传窗口
* 用户选择文件后，通过事件对象`e.target.files`拿到用户选择的所有文件
* 格式化文件信息，为其添加相关信息，方便之后的使用和界面展示
* 遍历所有的`files`，通过`XMLHttpRequest`发起请求
* 整理请求需要的各种参数，并且将文件对应的`xhr`实例以`uid`为`key`存储到对项中，如果用户在请求过程中删除正在上传的文件，通过`xhr.abort`来中断请求
* `xhr.progress`事件只在下载阶段中触发,`xhr.upload`专门用来追踪上传事件，所以上传进度处理需要监听`xhr.upload.progress`事件

### 日期选择器
* click-outer-side: 点击外部会隐藏日期选择弹窗，但是点击弹窗本身以及日期选择框不会隐藏弹框
* 遍历日期，生成对应的日、月、年选择面板(需要掌握日期的对应`api`，否则计算会比较复杂)
* 双向数据绑定 -> 通过正则匹配对应格式的输入值，在面板中对应激活该日期，屏蔽不正确的格式 
