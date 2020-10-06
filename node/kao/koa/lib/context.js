const context = {};

// __defineGetter__方法已经被废弃
function defineGetter (target, key) {
  context.__defineGetter__(key, function () {
    // 这里的this并不是指context,而是调用key的对象
    return this[target][key];
  });
}

function defineSetter (target, key) {
  // 这里访问是通过原型链进行访问的，请求的时候由于使用了俩次Object.create()
  // 所以ctx.__proto__.__proto__ = context
  // 定义了set方法后，可以修改原型链继承的属性
  context.__defineSetter__(key, function (val) {
    // 这里的this并不是指context,而是调用key的对象
    this[target][key] = val;
  });
}

// 感觉这样写也不太好，可以使用类似于vue将this._data中的属性代理到this上的方法来实现
defineGetter('request', 'url');
defineGetter('request', 'path');
defineSetter('response', 'body');
defineGetter('response', 'body');
module.exports = context;
