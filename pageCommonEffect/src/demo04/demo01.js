const dialog = function (selector, options) {
  return new Dialog(selector, options);
};

// dialog.prototype.fn1 = function () {
//   console.log('fn1');
// };
//
// dialog.fn = dialog.prototype;
//
// const init = dialog.fn.init = function (selector, options) {
//   this.name = 'dialog';
//   return this;
// };

// axios是一个函数，同时也是一个对象，而且支持多种方式调用
function Dialog (selector, options) {

}

Dialog.prototype = dialog.prototype;

dialog.unique = 'unique';
window.dialog = dialog;
// dialog('xxx') 只会调用原型上的方法
const dialog = dialog('1');
