// 1. 扩展运算符
const arr1 = [1, { a: 'hh' }];

const arr2 = [...arr1];
console.log(arr1 === arr2); // false
console.log(arr1[1] === arr2[1]); // true

// 2. Array.prototype.slice

const arr3 = [1, { a: 'hh' }];
const arr4 = arr3.slice();

console.log(arr4 === arr3); // false
console.log(arr3[1] === arr4[1]); // true

// 浅克隆：
//    原理
//    遍历数组/对象的每一项，然后将key和value都赋值给新的数组/对象
//    由于只会遍历数组/对象的第一级内容，所以在赋值时，
//    一级的value值对应的内容还是数组/对象的话，会直接将地址赋值给新的值，
//    即新值和旧值指向相同的地址，对应同一块堆内存中的对象键值对
const obj1 = { a: 1, b: 2, c: { name: 'hh' } };
const obj2 = { a: obj1.a, b: obj1.b, c: obj1.c };
const obj3 = { ...obj1 };
const obj4 = Object.assign({}, obj1);
console.log(obj4 === obj1);

obj1.c.name = '我更新了';
console.log(obj2.c);
