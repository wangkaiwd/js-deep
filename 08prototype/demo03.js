// 创建一个数据类型值：
//    1. 字面量方式
//    2. 构造函数方式
// 不论哪一种方式创建的值都是所属类的实例

// 基本数据类型俩种创建方式是不一样的：字面量创建的是基本类型值，构造函数方式创建的是引用类型

// const x = 10;
// const y = new Number(10);
//
// console.log(typeof x); // number
// console.log(typeof y); // object
//
// // y在进行运算时会先执行其valueOf方法来转换为其primitive value
// console.log(y.valueOf() === x); // true

// 扩展Number的原型，使如下代码可以正确执行
// let n = 10;
// let m = n.plus(10).minus(5);
// console.log(m);//=>15（10+10-5）
