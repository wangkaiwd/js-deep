## 面向对象编程
> `new`运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

### 面向对象实例
下面是一个简单的自定类的例子
```javascript
function func () {
  const x = 100;
  this.num = x + 100;
}
const f = new func(); // 通过new执行的时候，func就是一个自定义的类

// func(); // 普通函数执行 this => window
const f2 = new func();

console.log(f === f2); // false

// true, instanceof:用来判断某一个实例是否属于某个类
console.log(f instanceof func);
```

这里我们对比下普通函数执行和`new`运算符执行函数的具体步骤
```text
new 执行函数相比于普通函数执行：  
     形成执行上下文
     初始化作用域链: scopeChain
     确定this指向
     创建激活变量对象(AO(activation object))
         实参赋值
         形参赋值
         变量声明提升
         [新] 创建一个空的简单`JavaScript`对象(即`{}`)
         [新] 将`this`指向步骤1创建的对象
         代码执行
         [新] 如果该函数没有返回对象，则返回`this`(`return this`，即步骤1创建的对象)
```

### `new`的原理

相比于普通函数执行，`new`命令执行函数时帮我们做了如下操作：
* 创建一个空对象
* 将空对象的`__proto__`指向该执行函数的`prototype`
* 将函数的`this`指向该空对象
* 如果函数的返回值不是对象，那么返回`this`

用代码来表示大概是这样：
```javascript
// 1. 创建一个空对象
const tempObject = {}
// 2. 将空对象的`__proto__`指向该执行函数的`prototype`
tempObject.__proto__ = Fn.prototype
// 3. 将函数的`this`指向该空对象
this = tempObject
// 4. 如果函数的返回值不是对象，那么返回`this`
return this
```
由于`JavaScript`不推荐直接访问`__proto`，所以我们通过`Object.create`来创建一个指定原型的空对象，代码如下：
```javascript
// 1. 创建一个空对象
// 2. 将空对象的`__proto__`指向该执行函数的`prototype`
const tempObject = Object.create(Fn.prototype)
// 3. 将函数的`this`指向该空对象
this = tempObject
// 4. 如果函数的返回值不是对象，那么返回`this`
return this
```
> `Object.create(proto)`: 创建一个新对象，使用传入的参数`proto`来提供新创建对象的`prototype`

![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200326004537.png)

在了解了`new`帮我们做了些什么以后，我们可以使用函数模拟一下`new`的实现过程：
```javascript
function _new (fn, ...args) {
  const tempObject = Object.create(fn.prototype);
  const result = fn.call(tempObject, ...args);
  // 返回值是对象的话返回该对象
  if (typeof result === 'object' && result !== null || typeof result === 'function') {
    return result;
  }
  return tempObject;
}
```
这里我们还可以将判断是否为对象的逻辑进行提取，方便复用：
```javascript
const isObject = (value) => {
  // typeof 函数 === 'function'
  return (typeof value === 'object' || typeof value === 'function') && value !== null;
};

function _new (fn, ...args) {
  const tempObject = Object.create(fn.prototype);
  const result = fn.call(tempObject, ...args);
  // 返回值是对象的话返回该对象
  if (isObject(result)) {
    return result;
  }
  return tempObject;
}
```

到这里，我们根据`new`的原理实现了一个与`new`功能相同的函数。
