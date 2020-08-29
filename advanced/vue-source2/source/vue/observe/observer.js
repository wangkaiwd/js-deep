import { observe } from 'vue/observe/index';
import arrayMethods, { observeArray } from 'vue/observe/array';

function defineReactive (data, key, value) {
  observe(value); // 如果value是对象的话，继续观测
  Object.defineProperty(data, key, {
    get () {
      console.log('获取值');
      return value;
    },
    set (newValue) {
      console.log('设置值');
      if (value === newValue) return;
      value = newValue;
    }
  });
}

class Observer {
  constructor (data) {
    // 数组先不做处理
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      // 继续监控数组的每一项
      observeArray(data);
    } else {
      this.walk(data);
    }
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
