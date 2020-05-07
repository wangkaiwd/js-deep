// 对某些函数进行扩展，面向切片编程
// 使用场景?
const say = function (who) {
  console.log('say', who);
};
say.before = function (callback) {
  return (...args) => {
    callback();
    this(...args);
  };
};
// 原型上扩展
Function.prototype.before = function (callback) {
  return (...args) => {
    callback();
    this(...args);
  };
};
// 扩展say方法，让它在执行之前先做一些事情
// 俩种方法：1. 为say添加私有属性，进行调用
//          2. 为Function.prototype扩展say方法
const newSay = say.before(function () {
  console.log('before say');
});
newSay('me');
