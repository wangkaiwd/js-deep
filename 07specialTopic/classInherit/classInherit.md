## `JavaScript`继承方案
### 原型继承
```javascript
function A () {
  this.x = 100;
}

A.prototype.getX = function () {
  console.log(this.x);
};

function B () {
  this.y = 200;
}

B.prototype = new A();
B.prototype.getY = function () {
  console.log(this.y);
};

const b = new B();

console.log(b.x);
b.getX();
b.getY();
console.log(b.y);
```
<details>
  <summary>diagram</summary>
  
  ![](https://raw.githubusercontent.com/wangkaiwd/drawing-bed/master/20200329173920.png)
</details>

### `call`继承
```javascript
function A () {
  this.x = 100;
}

A.prototype.getX = function () {
  console.log(this.x);
};

function B () {
  A.call(this);
  this.y = 200;
}

B.prototype.getY = function () {
  console.log(this.y);
};

const b = new B();
```

### 寄生组合式继承
```javascript
function A () {
  this.x = 100;
}

A.prototype.getX = function () {
  console.log(this.x);
};

function B () {
  A.call(this);
  this.y = 200;
}

// 只继承公有属性
// Object.create(A.prototype): 1. 创建一个空对象 2. 将对象的原型指向A.prototype，即：const obj = {}; obj.__proto__ = A.prototype;
B.prototype = Object.create(A.prototype);
// Object.create创建的原型没有指定constructor，需要手动指定
B.prototype.constructor = B;
B.prototype.getY = function () {
  console.log(this.y);
};
```

### es6`class`继承
```javascript
class A {
  constructor () {
    this.x = 100;
  }

  getX () {
    console.log(this.x);
  }
}

class B extends A {
  constructor () {
    super(); // 相当于 A.call(this),将私有属性继承过来
    this.y = 200;
  }

  getY () {
    console.log(this.y);
  }
}
```
