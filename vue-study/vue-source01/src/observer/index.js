import { arrayProto, dependArray } from './array';
import Dep from './dep';

class Observer {
  constructor (data) {
    this.dep = new Dep();
    // 被添加__ob__说明该属性被监测过
    Object.defineProperty(data, '__ob__', {
      value: this,
      configurable: false, // 不能修改和删除，默认值就是false
      enumerable: false, // 不可枚举，防止遍历，默认值就是false
    });
    if (Array.isArray(data)) { // array need to handle specially
      Object.setPrototypeOf(data, arrayProto);
      // 对数组中的每一项继续进行检测
      this.observeArray(data);
    } else { // handle object
      this.walk(data);
    }
  }

  walk (data) {
    const keys = Object.keys(data);
    keys.forEach(key => {
      let value = data[key];
      defineReactive(data, key, value);
    });
  }

  observeArray (data) {
    data.forEach(item => observe(item));
  }
}

export function observe (data) {
  if (typeof data !== 'object' || data == null) {
    return;
  }
  if (data.__ob__) {
    return;
  }
  return new Observer(data);
}

// 全局的Vue.util.defineReactive
export function defineReactive (data, key, value) {
  // 继续监听data中的所有属性值，保证所有属性都具有响应性
  const childOb = observe(value); // 会new Observer,而Observer中会处理所有的属性，包括对象和数组
  // 每个对象属性都会创建dep来收集对应的watcher
  const dep = new Dep();
  // 这里调用set,get方法时，会形成闭包，defineReactive中查找value
  Object.defineProperty(data, key, {
    get () {
      // 如果只在js中操作data中的值，而没有在模板中使用，那么就不会收集它的依赖
      if (Dep.target) {
        dep.depend();// 这里的dep会收集arr的依赖，但是无法在array.js中在调用原型来notify收集的watcher，因为它们不是同一个dep
        if (childOb) {
          // 对象和数组可以从__ob__.dep中拿到dep,这里对象的另一个dep会再次收集watcher。
          // 但是对象的另一个watcher不会通过set方法notify，它notify的是当前的dep，而不是定义在watcher中的dep,目前另一个dep好像没有什么作用
          // 收集数组的依赖，数组的依赖会通过调用数组的方法来进行notify
          childOb.dep.depend();
          dependArray(value);
        }
      }
      return value;
    },
    set (newValue) {
      if (value === newValue) {return;}
      // 继续为新增的值设置get/set方法
      observe(newValue);
      value = newValue;
      dep.notify();
    }
  });
}
