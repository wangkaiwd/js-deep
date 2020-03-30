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
这个例子里介绍了几个常见的`this`指向的例子：
* 事件绑定函数中的`this`为绑定事件的元素
* 直接执行函数，相当于`window.fn()`，此时函数中的`this`指向`window`
* 作为对象的方法来调用，`this`指向调用该函数的对象(函数前有“点”的话，`this`为点前边的内容，否则为`window`)

```javascript
var x = 3, obj = { x: 5 };
obj.fn = (function () {
  this.x *= ++x;
  return function (y) {
    this.x *= (++x) + y;
    console.log(x);
  };
})();

var fn = obj.fn;
obj.fn(6);
// obj.fn对应的函数的地址是在自执行函数中创建的，所以作用域及作用域链都要从其定义的位置开始查找
fn(4);
console.log(obj.x, x);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200316224129.png)
</details>
