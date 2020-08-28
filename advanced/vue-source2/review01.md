## 数据劫持
1. vue/index.js -> export default Vue
2. Vue.prototype._init -> initState
3. observe/index -> export initState
4. initState -> initData, initComputed, initWatch
4. initData
  1. handle data options
  2. observe all data property, Observer class to recursive traverse object property 
  3. proxy vm._data property to vm
