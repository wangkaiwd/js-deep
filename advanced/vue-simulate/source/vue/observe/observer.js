import { observe } from './index';
import { arrayMethods, observeArray } from './array';

function defineReactive (data, key, value) {
  // 如果value依旧是一个对象(不包括function)的话，为对象中的每一个属性设置get,set方法
  observe(value);
  // 重新设置set,get方法
  Object.defineProperty(data, key, {
    get () {
      console.log('获取数据');
      return value;
    },
    set (newVal) {
      console.log('设置数据');
      if (value === newVal) return;
      // 如果新设置的值是对象，继续进行观察
      observe(newVal);
      value = newVal;
    }
  });
}

class Observer {
  constructor (data) {
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      // 还要对数组中的每一项再进行观察
      observeArray(data);
    } else {
      this.walk(data);
    }
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
