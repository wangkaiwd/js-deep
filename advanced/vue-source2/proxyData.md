## 数据劫持
核心逻辑：通过`Object.defineProperty`为`data`中定义的所有属性设置`set/get`方法。
