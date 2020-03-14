## 代码运行机制
### 名词解释
* ECStack: execute context stack
* EC: execute context
* GO: global object
* VO: variable object

### 面试题详解
变量赋值的三步操作： 
1. 创建变量：declare
2. 创建值
3. 让变量和值关联(通过指针关联)起来(赋值)：定义 defined

在创建值的时候
* 基础数据类型，直接存储在栈内存中
* 复杂数据类型
    * 开辟一个存储对象内存空间“堆内存”
    * 所有的堆内存都有一个可被后续查找的16进制地址
    * 后续关联赋值时，是把堆内存地址给与变量
    
```javascript
// 1.
let a = 12;
let b = a;
b = 13;
console.log('a', a);

// 2.
let a = {
  n: 12,
};

let b = a;
b.n = 13;
console.log(a.n);
```

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200314213145.png)

如何释放占用内存：`a = null`。

> 指针是一个变量，其值为另一个变量的地址

`null`并没有开辟新的内存，只是将之前的指针指向了一个空指针，取消了之前对某一个堆的引用，从而释放内存

[`null`]((https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)的本质是让变量指向一个空的指针，达到对原有被指针指向对象内存的释放和回收

* `null`: 接下来要赋值，但是暂时不赋值
* `undefined`: 并不确定变量是否要赋值

```javascript
let a = {x:100, y:200}
a = 0 // 占用栈中的内存空间
a = null // 指向一个空指针，不会占用内存，并且表示一个暂未赋值的变量
a = undefined // 指向空指针,并且表示一个没有赋值的变量
```
