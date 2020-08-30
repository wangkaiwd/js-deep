## 数据劫持
object:
1. vue/index.js -> export default Vue
2. Vue.prototype._init -> initState
3. observe/index -> export initState
4. initState -> initData, initComputed, initWatch
5. initData
    1. handle data options
    2. observe all data property, Observer class to recursive traverse object property 
    3. proxy vm._data property to vm
    
array:
1. if observe entry is an Array
2. rewrite entry prototype
3. copy Array.prototype to new object, then modify new object push pop unshift shift reverse sort splice methods
4. push,unshift,splice can add new entries, we need observe new entries

