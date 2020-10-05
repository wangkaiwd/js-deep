const context = {};

// __defineGetter__方法已经被废弃
function defineGetter (target, key) {
  context.__defineGetter__(key, function () {
    return this[target][key];
  });
}

// 感觉这样写也不太好，可以使用类似于vue将this._data中的属性代理到this上的方法来实现
defineGetter('request', 'url');
defineGetter('request', 'path');
module.exports = context;
