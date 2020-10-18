## Vue-Router
* history: history.pushState 进行地址切换，不会刷新页面
* hash: hashchange event 切换`hash`进行地址切换，页面不会刷新

### 实现思路
* 根据用法进行推导代码的书写结构，并进行学习
* 扁平化用户传入的路由配置项`routes`
* 建立`history`相关文件，实现页面切换以及组件切换
