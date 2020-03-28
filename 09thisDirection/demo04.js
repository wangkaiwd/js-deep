function fn1 () {console.log(1);}
function fn2 () {console.log(2);}
fn1.call(fn2); // 1

// 首先会调用fn1.call上的call方法
// fn1.call.call 是从Function.prototype上寻找call方法
// 所以首先，fn1.call执行，将fn1.call对应的函数的this指向fn2
// 即fn2.$fn = this(fn1.call => Function.prototype.call)
// 执行:fn2.$fn() 这时会执行fn1.call(Function.prototype),this指向fn2
// context:undefined , args: []
// window.$fn = this(fn2)
fn1.call.call(fn2); // 2, fn2执行

// 特例： Function.prototype是一个anonymous function，但是它的行为和对象一摸一样
Function.prototype.call(fn1); // 什么都不输出
Function.prototype.call.call(fn1); // 1

// 规律：1个.call是“点”前面的函数执行，而2个及2个以上的call都是让调用call方法时传入的函数执行
