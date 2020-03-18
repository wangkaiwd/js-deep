// 柯理化函数

// 柯理化的思想：
//    利用闭包的机制，把一些内容事先存储和处理，等到后期需要的时候直拿来使用即可(闭包的保存机制)

// 需求：需要为fn传入200并且this指向obj
const obj = { x: 100 };

// 可以通过bind来预先传入参数，函数原本的参数会放到bind传入的参数后边
// 直接使用bind绑定参数e没有办法放到前边
const fn = function (y, e) {
  this.x += y;
  console.log(this);
};

// document.addEventListener('click', fn.bind(200));

// 通过call方法改变this指向
document.addEventListener('click', (e) => fn.call(obj, 200, e));

setTimeout(() => fn.call(obj, 200), 2000);
setTimeout(fn.bind(obj, 200), 2000);
