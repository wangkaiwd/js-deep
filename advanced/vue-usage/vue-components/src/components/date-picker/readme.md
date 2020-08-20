## date-picker
* [A modern css rest](https://github.com/hankchizljaw/modern-css-reset)
* difficulty: how to calculate need to display day in current content panel
* difficulty: set content panel style
* padStart/padEnd(targetLength[, padString])
### vue theory
* Can I use variable in props?(think from soruce code)
* Implement range picker

### 问题记录
* 设计日历组件的样式：为什么是7*6?
  * 以跨度最大的31天为例，即1号为周6
  * 以实际日历作为参考
  * 防止内容区域进行大小变化
  * 参考业界做法(`ant design/element ui`)
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

### 日期计算
> 完全可以使用消除重复的方法，利用笨办法进行计算

* get total days of current month
  * [simple method](https://stackoverflow.com/a/1184359/12819402)
  * 分别计算30天和31天的月份，然后再根据平年还是闰年处理2月
* [last day of the previous month](https://stackoverflow.com/a/7466176/12819402)
  * 自己手动计算前一个月的总天数
  
思路：
* 算出日历当前面板中开始的那一天，然后循环42天
* 重点：**将所有的时间转换为毫秒**，然后用当于第一天的毫秒数，减去其根据星期得到的向前偏移天数的毫秒数
* 最终我们得到了当前日历面板第一天的毫秒数
* 然后累加对应天数的时间毫秒数
 
