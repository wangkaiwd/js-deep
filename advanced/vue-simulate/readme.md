## 问题记录
* 开发时为什么要在本地起一个服务？(`webpack-dev-server`)
* 配置`webpack`开发环境
* 配置`webpack`优先引入`source/vue` 

### 数据劫持
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-4-9-23.png)

### 编译文本
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-7-1-38-text-compiler2.png)

### 依赖收集
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/2020-6-7-5-19-dependence-collect.png)

`DocumentFragment`不能直接得到其中的`html`内容，需要将其放入一个`DOM`元素中，调用`innerHTML/outerHTML`来获取去它的序列化`HTML`字符串
* [代码段](https://gist.github.com/gleuch/2475825#file-gistfile1-js-L10-L15)

#### 对象

#### 数组

#### knowledge point
* [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

### 异步批量更新
