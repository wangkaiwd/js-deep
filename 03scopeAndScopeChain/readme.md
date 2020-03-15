## 作用域和作用域链
函数创建时：


函数执行时：


```javascript
function A (y) {
  let x = 2;
  function B (z) {
    console.log(x + y + z);
  }
  return B;
}
let C = A(2);
C(3);
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200315162947.png)

