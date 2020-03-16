## `let`,`const`,`var`的区别

`JavaScript`执行步骤：
```text
ECStack
  EC(G)
    VO(G)
  在当前执行上下文执行之前，首先会把所有带有`var`或者`function`关键字的声明或定义(var:提前声明, function:提前声明+定义)进行提前
  函数定义：1. 生成堆内存，并将变量指向堆内存的映射地址 2. 创建函数作用域:[[scope]] 
```

`let`,`const`没有变量声明提升

变量提升的一个问题
```javascript

```
