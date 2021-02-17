## 对象的克隆

### 浅克隆

浅克隆的原理：创建一个新对象，将原始对象的每一项(第一级)的`key`和`value`分别赋值给新对象的`key`和`value`

```javascript
const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
```

当然，我们可以使用扩展运算符或者`Object.assign`方法来简化这个过程：

```javascript
const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj3 = { ...obj1 };
const obj4 = Object.assign({}, obj1);
console.log(obj3 === obj1); // false
console.log(obj4 === obj1); // false
```

数组是特殊的对象，和对象的浅克隆完全相同。不过有由于数组有`length`属性，并且其`key`为从0开始依次递增的，所以我们可以使用`Array`原型提供的`Array.prototype.slice`方法来实现浅克隆：

```javascript
const arr1 = [1, { a: 'hh' }];
const arr2 = arr3.slice();
console.log(arr2 === arr2); // false
```

浅克隆的本质就是遍历对象的第一级内容，并且将其`key`和`value`赋值给新的对象:

```javascript
const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj2 = {};

for (const obj1Key in obj1) {
  if (!obj1.hasOwnProperty(obj1Key)) {break;}
  obj2[obj1Key] = obj1[obj1Key];
}
```

当然，这样存在的问题就是如果对象的`value`还是对象或数组的话，会直接将原始数组的该`value`对应的地址赋值给新对象或数组，俩个`value`指向同一片堆内存，即使用相同的引用。

当原始对象或数组中的为数组或对象的项的值发生改变后，会导致新对象的该值也发生变化：

```javascript
const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj2 = { ...obj1 };
obj1.c.name = '我更新了';
console.log(obj2.c); // 我更新了
```

可以看到当我们更改`obj1`的`c`属性时，会进一步修改`obj2`的`c`属性。

那么我们只想修改`obj1`的`c`属性而保持`obj2.c`属性不会被影响该怎么办呢？接下来，我们介绍数组和对象的深克隆来解决这个问题。