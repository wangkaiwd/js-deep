// add(2)(3)
// function add (x) {
//   return function (y) {
//     return x + y
//   }
// }

// const add = (x) => (y) => x + y

// 传参个数不确定
const add = function (x) {
  let sum = x

  function result (y) {
    sum = sum + y
    return result
  }

  // 直接赋值存在的问题：会直接的到初始值，之后即使sum的值发生改变，result.valueOf的值也不会更新
  // 解决方法：
  // 1. 赋值为对象，来改变对象中的键值对，之后通过对象来获取键值对内容
  // 2. 赋值为函数，函数会在每次执行时都开辟一个执行上下文，并通过作用域链来进行变量查找，找到的都是最新的sum值
  // result.valueOf = sum
  result.valueOf = function () {
    return sum
  }
  return result
}

// 下边的`+`和`==` 会将add执行结果强制转换为number,这里会首先调用valueOf方法
console.log(5 + add(2)(3)) // true
console.log(add(2)(3)(4) == 9) // true
console.log(add(3)(4)(5).valueOf()) // 9
