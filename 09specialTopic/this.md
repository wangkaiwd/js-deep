## `this`指向
`this`指向情况分为以下几种情况：

* 普通函数执行
* 事件绑定
* 构造函数
* 箭头函数
* `call/apply/bind`指定

下面我们来进行一一介绍
### 普通函数执行
`this`取决于方法执行前面是否有“点”，有“点”的话，“点”前面是谁`this`就是谁，如果没有点的话，`this`指向`window`
```javascript
const fn = function () {
  console.log(this);
};

const obj = { name: 'OBJ', fn };

fn();

obj.fn();

const fn1 = obj.fn;
fn1();
```
<details>
  <summary>answer</summary>
  
  ```test
  1. window
  2. {name: 'OBJ', fn: function() {console.log(this)}} // obj
  3. window
  ```
</details>

### 事件绑定
在进行事件绑定的时候，事件绑定函数中的`this`是绑定事件的元素：
```javascript
// 假设页面中有id为button的button元素
// var x = 100;
window.x = 100;
const fn = function () {
  console.log(this.x);
};
const obj = { x: 200, fn };
const $button = document.getElementById('button');
$button.x = 300;

obj.fn();
const fn1 = obj.fn;
fn1();

$button.addEventListener('click', fn);
$button.addEventListener('mouseenter', obj.fn);

$button.addEventListener('mouseleave', function () {obj.fn();});
```
<details>
  <summary>answer</summary>
  
  ```test
  1. 200
  2. 100
  3. 点击button时：300
  4. 鼠标移入button时：300
  5. 200
  ```
</details>

### 构造函数(`new Fn`)
构造函数(`new Fn`)执行，函数中的`this`是当前类的实例:  
```javascript
var x = 100;
const Fn = function () {
  this.x = 200;
  console.log(this.x);
};

const fn = new Fn();
```
<details>
  <summary>answer</summary>
  
  ```test
  1. 200
  ```
</details>

### 箭头函数
箭头函数中没有自身的`this`，所用到的`this`都是其最近父级上下文中的`this`
```javascript
const fn = function () {
  console.log(this);
  setTimeout(() => {
    console.log(this);
  }, 1000);
  setTimeout(function () {
    console.log(this);
  });
};

const obj = { x: 100, fn };

obj.fn();
```
<details>
  <summary>answer</summary>
  
  ```test
  1. {x:100, fn: function() {...}} // obj
  2. window
  3. {x:100, fn: function() {...}} // obj
  ```
</details>

### `call/apply/bind`改变`this`指向

### `call/apply/bind`源码实现

