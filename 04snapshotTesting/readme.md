## 快照测试

### 第一个快照测试例子

### 另外一个快照例子

使用`u`命令会更新所有的快照

使用命令行中的交互模式：`i`进入交互模式来对每一个快照进行更新

### 属性匹配器
有些时候，我们要使用到的变量本身就是可变的，比如自增长的`id`、当前的日期`new Date`等，这回导致我们的快照即使更新也会一直处于失败状态。

为了解决类问题，可以在`toMathSnapshot`中传入参数，来支持一些可变的内容：
```js
test('test snapshot', () => {
  expect(generateConfig()).toMatchSnapshot({
    // property matcher: 值为任意内容，方便来保存时间或自增涨的id等内容
    time: expect.any(Date)
  });
});
```
