const myJQuery = function (selector, context) {
  return new myJQuery.fn.init(selector, context);
};

myJQuery.fn = myJQuery.prototype = {
  constructor: myJQuery,
  add: function () {
    console.log('add');
  }
};

const init = myJQuery.fn.init = function (selector, context) {
  // 在new执行该函数时，this是构造函数创建的实例
  return {
    0: document.querySelector(selector),
    length: 1
  };
};

init.prototype = myJQuery.fn;


