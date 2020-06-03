import { observe } from './index';

function defineReactive (data, key, value) {
  // 如果value依旧是一个对象(不包括function)的话，为对象中的每一个属性设置get,set方法
  observe(value);
  // 重新设置set,get方法
  Object.defineProperty(data, key, {
    get () {
      return value;
    },
    set (newVal) {
      if (value === newVal) return;
      value = newVal;
    }
  });
}

class Observer {
  constructor (data) {
    this.walk(data);
  }

  walk (data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = data[key];
      defineReactive(data, key, value);
    }
  }
}

export default Observer;
