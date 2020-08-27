import { observe } from 'vue/observe/index';

function defineReactive (data, key, value) {
  observe(value); // 如果value是对象的话，继续观测
  Object.defineProperty(data, key, {
    get () {
      return value;
    },
    set (newValue) {
      if (value === newValue) return;
      value = newValue;
    }
  });
}

class Observer {
  constructor (data) {
    // 数组先不做处理
    if (Array.isArray(data)) return;
    this.walk(data);
  }

  walk (data) {
    const keys = Object.keys(data);
    keys.forEach(key => {
      const value = data[key];
      defineReactive(data, key, value);
    });
  }
}

export default Observer;
