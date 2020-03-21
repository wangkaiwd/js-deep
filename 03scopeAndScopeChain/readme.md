## 作用域和作用域链
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
