## vue-demo

### 封装`Vuex`
* 使用`require.context`自动注册所有的`modules`
* 为`vuex`的`actions`和`mutations`中的方法名设置常量
### 封装`axios`
* 每个请求都创建一个`axios`实例
* 封装全局`loading` (体验可能会不好)
* 页面切换取消请求

### 登录
* 处理登录验证码
* 刷新(`beforeCreate`)重新调用用户信息？

### 路由
* `beforeEach`钩子可以分功能进行处理封装
* 根据后端返回列表生成菜单
  * 根据一个对象来生成树结构(id,pid,引用类型)
  * 递归动态添加路由列表
