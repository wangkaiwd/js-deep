## date-picker
* [A modern css rest](https://github.com/hankchizljaw/modern-css-reset)
* difficulty: how to calculate need to display day in current content panel
* difficulty: set content panel style
* padStart/padEnd(targetLength[, padString])
### vue theory
* Can I use variable in props?


### 问题记录
* 设计日历组件的样式：为什么是7*6?
  * 以跨度最大的31天为例，即1号为周6
  * 以实际日历作为参考
  * 防止内容区域进行大小变化
  * 参考业界做法
* 能否实现一个9*9乘法表出来？
```javascript
let str = '\n';
for (let i = 1; i <= 9; i++) {
  for (let j = 1; j <= i; j++) {
    str += `${i}*${j} `;
  }
  str += '\n';
}
```
* 自己实现一遍，参考其他人的实现，阅读`element-ui/ant-design`源码
