## 

### `JavaScript`数据类型
> 参考阅读：  
> [Data types](https://javascript.info/types)

基本数据类型（值类型）:
* string
* number
* boolean
* null
* undefined
* symbol
* bigint

复杂数据类型（引用类型）:
* object(Array, Function, Date ,Regexp ...)
### 知识点补充

#### `Number`类型`NaN`
`NaN`(`not-a-number1`)与其它任何值都不相等，通过函数`isNaN`来检测一个数字是否是`NaN`
```javascript
typeof NaN // number
```
将一个元素转换为`number`类型但失败时会出现`NaN`:  
```javascript
isNaN(1) // false
isNaN('10') // false
isNaN('a')  // true
isNaN(undefined) // true
isNaN(null) // false
```
#### `object`
`object`的`key`最终都会通过`toString`方法转换为字符串
```javascript
let a = { x: 100 };
let fn = () => {
  console.log('object key is a function');
};
let array = [1, 2, 3];
let obj = {
  0: 100,
  true: 'wk',
};
obj[a] = 'another obj';
obj[fn] = 'function';
obj[array] = 'array';
// {
//   '0': 100,
//   true: 'wk',
//   '[object Object]': 'another obj',
//   "() => {\n  console.log('object key is a function');\n}": 'function',
//   '1,2,3': 'array'
// }
console.log(obj);

// ({0:100,true: 'wk'}).toString() => [object Object]
// [1,2,3].toString() => 1,2,3
// (() => {console.log('object key is a function')}).toString() => '() => {\n  console.log('object key is a function');\n}'
```

一道面试题：  
```javascript
const a = {
  x: 100,
};
const b = {
  y: 200,
};
const obj = {};
obj[a] = 'aaa';
obj[b] = 'bbb';

console.log('obj', obj); // obj { '[object Object]': 'bbb' }
console.log(obj[a] === obj[b]) // => true
```
