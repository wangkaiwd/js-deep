## mock
### 模拟定时器
要在模拟定时器之前先执行`jest.useFakeTimers()`,也可以在需要的时候通过`jest.clearAllTimers()`来清理所有处于等待状态的定时器

定时器分为三种：
* `runAllTimers`: 直接运行完所有的定时器
* `runOnlyPendingTimers`: 只运行当前处于等待过程的定时器
* `advanceTimersByTimers`: 所有定时器提前传入参数的毫秒数，所有的定时器将在这个时间帧进行执行

### 模拟`class`
