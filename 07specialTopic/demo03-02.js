/**
 * Created by wangkai on 2020/4/4
 */

// const obj = { x: 100, fn () {console.log(this);} };
// obj.fn(); // 作为一个对象的属性被对象调用的时候，this指向调用函数的对象
// Function.prototype.myOwnCall = function (context, ...args) {
//   context = translateToObject(context);
//   const uniqueKey = new Date().getTime();
//   // this为调用call方法的函数
//   context[uniqueKey] = this;
//   // 作为对象的方法被对象调用，this指向该对象context
//   const result = context[uniqueKey](...args);
//   delete context[uniqueKey];
//   return result;
// };
//
// function translateToObject (context) {
//   // 可以通过 == 进行判断 context == null
//   // null == undefined  => 2个等号是成立的
//   // null,undefined => window
//   if (typeof context === 'undefined' || context === null) {
//     context = window;
//   } else if (typeof context === 'number') { // 原始值转换为包装对象
//     context = new Number(context);
//   } else if (typeof context === 'string') {
//     context = new String(context);
//   } else if (typeof context === 'boolean') {
//     context = new Boolean(context);
//   }
//   return context;
// }
//
// function f () {
//   console.log(this);
// }
// f.call(1);

Function.prototype.myOwnBind = (context, ...outerArgs) => (...innerArgs) => this.call(context, ...outerArgs, ...innerArgs);
