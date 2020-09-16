function EventEmitter () {
  this._events = {};
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events && Array.isArray(this._events[eventName])) {
    // 数组内置的forEach方法不会出现问题
    this._events[eventName].forEach((event, i) => {
      return event(...args);
    });
    // 使用for循环在更改原数组后执行逻辑出现问题
    // for (let i = 0; i < this._events[eventName].length; i++) {
    //   const event = this._events[eventName][i];
    //   event(...args);
    // }
  }
};

EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {this._events = {};}
  if (!this._events[eventName]) {
    this._events[eventName] = [];
  }
  this._events[eventName].push(callback);
};

EventEmitter.prototype.off = function (eventName, callback) {
  const events = this._events[eventName];
  if (events) {
    // 通过splice删除时，会更改原数组，导致循环时索引发生变化
    this._events[eventName] = events.filter(event => (event !== callback) && (event.cb !== callback));
  }
};
EventEmitter.prototype.once = function (eventName, callback) {
  const one = (...args) => {
    callback(...args);
    this.off(eventName, one);
  };
  // 使绑定的函数和传入的回调函数之间产生关联
  one.cb = callback;
  this.on(eventName, one);
};
module.exports = EventEmitter;
