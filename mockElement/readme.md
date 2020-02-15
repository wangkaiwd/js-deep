## mock
为什么要使用`mock`:
1. 可以让引入的外部模块变得简单，让单元测试运行更加快速
2. 提供一些`api`让测试变的简单
### 模拟定时器
要在模拟定时器之前先执行`jest.useFakeTimers()`,也可以在需要的时候通过`jest.clearAllTimers()`来清理所有处于等待状态的定时器

定时器分为三种：
* `runAllTimers`: 直接运行完所有的定时器
* `runOnlyPendingTimers`: 只运行当前处于等待过程的定时器
* `advanceTimersByTimers`: 所有定时器提前传入参数的毫秒数，所有的定时器将在这个时间帧进行执行

### 模拟`class`
* 通过`manual mock`来模拟`class`
