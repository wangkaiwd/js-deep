## `this`的俩种情况

事件绑定时`this`指向问题：  
```javascript
var x = 10; // window.x => 10 , 注意：let , const 不会将变量挂载到window中
const obj = {
  x: 20,
  fn () {
    console.log(this.x);
  },
};

const fn = obj.fn;

// 假设页面中有id为box的dom元素
const $box = document.getElementById('box');
$box.x = 30;

fn(); // 10

obj.fn(); // 20

$box.addEventListener('click', function () {
  obj.fn(); // 20
});

$box.addEventListener('click', obj.fn); // 30
```

```javascript
var x = 3, obj = { x: 5 };
obj.fn = (function () {
  this.x *= ++x; // window.x => 12
  return function (y) {
    this.x *= (++x) + y;
    console.log(x);
  };
})();

var fn = obj.fn;
obj.fn(6); // obj.x = 5 * 13 + 6 => 71, window.x => 13
// obj.fn对应的函数的地址是在自执行函数中创建的，所以作用域及作用域链都要从其定义的位置开始查找
fn(4);     // window.x = 13 * 14 + 4 => 186
console.log(obj.x, x); // 71, 186
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200316224129.png)
