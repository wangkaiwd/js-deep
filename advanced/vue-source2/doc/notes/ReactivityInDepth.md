### Reactivity in Depth

响应式系统底层原理介绍：
![](https://vuejs.org/images/data.png)

更改检测警告：

对象：  
* `Vue`不能检测属性的新增和删除
* 对于一个已经创建的实例，`Vue`不允许为其动态添加新的响应式属性

数组：  
* 直接用数组索引设置某一项的值
* 编辑数组的长度： `vm.items.length = newLength`

### 声明响应式属性
* 根层级提前声明响应式属性


### 异步更新队列
