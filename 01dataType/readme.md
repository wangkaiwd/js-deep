## `JavaScript`数据类型
> 参考阅读：  
> [Data types](https://javascript.info/types)

首先我们通过一段最简单的`JavaScript`代码来开始我们的学习：
```javascript
const a = 10;
const obj = { x: 100 }; 
```
这段代码只是`JavaScript`简单的赋值操作，那么`JavaScript`在赋值时具体会做些什么呢？

* 创建值
* 创建变量
* 让变量和值关联起来

这里我们先理解一下指针的概念
> 指针是一个变量，它存储了另一个变量的地址，即我们可以通过指针将变量和地址连接起来
  
这里让变量和值关联起来的操作，是通过指针将变量指向其对应的值，从而实现`JavaScript`的赋值操作。

那么上述的俩个赋值操作有什么区别吗？想要了解这个问题，我们先学习下面的内容

> 如果想进一步理解指针，请看这里: [指针究竟是什么？是地址？还是类型？](https://www.zhihu.com/question/31022750/answer/50629732)
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200319162124.png)

### 数据类型分类

基本数据类型（值类型）:

* string
* number
* boolean
* null
* undefined
* symbol
* bigint

所有基本类型的值都是**不可改变**的。而变量是可以变的，它可以通过指针重新指向一个新的基本类型的值

复杂数据类型（引用类型）:
* object(Array, Function, Date ,Regexp ...)

复杂数据类型的值在创建的时候会开辟一片堆内存，堆内存有一个可后续方便索引的16进制的地址。之后赋值时，`JavaScript`引擎会通过指针将变量指向其对应的可索引地址来完成赋值操作。

### 知识点补充
#### `Number`类型`NaN`
`NaN`(`not-a-number1`)与其它任何值都不相等，通过函数`isNaN`来检测一个数字是否是`NaN`
```javascript
typeof NaN // number
```
`NaN`比较常见的一种出现情况：将一个元素转换为`number`类型但转换失败:  
```javascript
isNaN(1) // false
isNaN('10') // false
isNaN('a')  // true
isNaN(undefined) // true
isNaN(null) // false
```
#### `object`的`key`
> 一个对象的属性名可以是任何有效的`JavaScript`字符串，或者可以被转换为字符串的任何类型，包括字符串`" "`(空字符串)。

`JavaScript`中`object`的键值如果不是字符串或者`Symbol`的话，都会执行`toString`方法强制转换为字符串
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

这里是一道测试题：
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

console.log('obj', obj);
console.log(obj[a] === obj[b])
```
<details>
  <summary>question</summary>
  
  ```text
  // obj { '[object Object]': 'bbb' }
  // true
  ```
</details>
这里由于`a`和`b`都是对象，最终会通过`toString`转换为`[object Object]`，将会表示同一个对象属性。所以对象的值最终是`{[object Object]: 'bbb'}`}

### 总结
现在，我们来解释下，文章开头位置的代码的具体执行过程：  

变量`a`的赋值过程：  

* 创建变量`a`和值10，之后将变量`a`通过指针指向10

变量`obj`的赋值过程：

* 创建变量`obj`
* 在内存中开辟一片堆内存，用来存储对象中的键值对。该堆内存有一个可索引的16进制地址，存在栈内存中
* 使用指针将变量指向堆内存对应的地址

可以看到，`JavaScript`在为复杂数据类型赋值的时候会单独开辟内存，并通过地址来查找其所对应的的值。这与简单数据数据类型的赋值操作是完全不同的。

到这里，大家是不是都对`JavaScript`的赋值操作和数据类型有了进一步的认识呢？
