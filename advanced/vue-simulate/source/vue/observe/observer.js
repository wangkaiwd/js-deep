import { observe } from './index';
import { arrayMethods, dependArray, observeArray } from './array';
import Dep from './dep';

function defineReactive (data, key, value) {
  // 如果value依旧是一个对象(不包括function)的话，为对象中的每一个属性设置get,set方法
  const childOb = observe(value);
  const dep = new Dep();
  // 重新设置set,get方法
  Object.defineProperty(data, key, {
    get () { // 在替换双花括号里的内容时，获取vm.msg,此时Dep.target为渲染watcher。获取person.name时，还是添加同一个watcher
      console.log('获取数据');
      if (Dep.target) {
        // dep.addSubscribe(Dep.target);
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          dependArray(value);
        }
      }
      return value;
    },
    set (newVal) {
      console.log('设置数据');
      if (value === newVal) return;
      // 如果新设置的值是对象，继续进行观察
      observe(newVal);
      value = newVal;
      dep.notify(); // 赋值的时候，vm.msg = 'xxx',调用渲染watcher的update方法，来再次更新视图
    }
  });
}

class Observer {
  constructor (data) {
    this.dep = new Dep();
    // data.__ob__ = this
    Object.defineProperty(data, '__ob__', {
      get: () => {
        return this;
      }
    });
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
