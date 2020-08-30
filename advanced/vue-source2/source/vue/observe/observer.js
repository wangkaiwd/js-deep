import { observe } from 'vue/observe/index';
import arrayMethods, { observeArray } from 'vue/observe/array';
import Dep from 'vue/observe/dep';

function defineReactive (data, key, value) {
  observe(value); // 如果value是对象的话，继续观测
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get () {
      console.log('获取值');
      if (Dep.target) {
        // 这样在多次取值时同一个watcher会加入多次
        // dep.addSubs(Dep.target);

        // watcher会对dep进行去重，然后将dep保存到watcher中，也会将当前的watcher保存到dep中
        // watcher <-> dep
        dep.depend();
      }
      return value;
    },
    set (newValue) {
      console.log('设置值');
      if (value === newValue) return;
      value = newValue;
      dep.notify();
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
