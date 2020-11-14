import { arrayProto } from './array';

class Observer {
  constructor (data) {
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
  new Observer(data);
}

// 全局的Vue.util.defineReactive
export function defineReactive (data, key, value) {
  // 继续监听data中的所有属性值，保证所有属性都具有响应性
  observe(value);
  // 这里调用set,get方法时，会形成闭包，defineReactive中查找value
  Object.defineProperty(data, key, {
    get () {
      return value;
    },
    set (newValue) {
      if (value === newValue) {return;}
      // 继续为新增的值设置get/set方法
      observe(newValue);
      value = newValue;
    }
  });
}
