## 原型链和原型的底层运行机制
* 每一个类(函数)都具备`prototype`，并且属性值是一个对象
* `prototype`对象上本身一个属性：`constructor`，指向类本身
* 每一个对象(普通对象、`prototype`、实例、函数等)都具备：`__proto__`属性，属性值是当前实例所属类的原型

```javascript
function Fn () {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  };
}

Fn.prototype.getX = function () {
  console.log(this.x);
};

Fn.prototype.getY = function () {
  console.log(this.y);
};

const f1 = new Fn();
const f2 = new Fn;

console.log(f1.getX === f2.getX); // false
console.log(f1.getY === f2.getY); // true

console.log(f1.__proto__.getY === Fn.prototype.getY); // true
console.log(f1.__proto__.getX === f2.getX); // false
console.log(f1.getX === Fn.prototype.getX); // false
console.log(f1.constructor); // Fn
console.log(Fn.prototype.__proto__.constructor); // Object

f1.getX(); // 100
f1.__proto__.getX(); // undefined
f2.getY(); // 200
Fn.prototype.getY(); // undefined
```

<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200326232606.png)
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200327003810.png)
</details>

数组原型链图，并扩展原型上的方法，且支持链式调用：
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200327004016.png)

借用数组上的`slice`方法，来将字符串或者伪数组(如`arguments`)转换为真实数组：
```javascript
function fn () {
  return Array.prototype.slice.call(arguments, 0);
}
console.log(fn(1, 2, 3, 4, 5));

console.log(Array.prototype.slice.call('这是一段字符串', 0)); // ['这','是','一','段','字','符','串']
```
![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200327005239.png)
