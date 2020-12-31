import { isObject, defineProperty } from '../shared/utils';
import { arrayMethods } from './array';

export function observe (data) {
  if (isObject(data)) {
    new Observer(data);
  }
}

export function defineReactive (target, key) {
  // 每个属性的set/get都会有这个作用域中的变量
  let value = target[key];
  observe(value);
  Object.defineProperty(target, key, {
    get () {
      console.log('get value');
      return value;
    },
    set (newValue) {
      if (newValue !== value) {
        // 递归监控
        console.log('set value');
        observe(newValue);
        // 改值之后会从更新value，下次get方法会取到最新的value
        value = newValue;
      }
    }
  });
}

class Observer {
  constructor (value) {
    this.value = value;
    // 这里要将__ob__设置为不可枚举
    defineProperty(this.value, '__ob__', this);
    // 数组单独进行处理，需要改写数组的原型方法
    if (Array.isArray(this.value)) {
      // 改写数组原型的方法
      Object.setPrototypeOf(this.value, arrayMethods);
      this.observeArray(this.value);
    } else {
      this.walk();
    }
  }

  walk () {
    for (const key in this.value) {
      if (this.value.hasOwnProperty(key)) {
        defineReactive(this.value, key);
      }
    }
  }

  observeArray (value) {
    value.forEach(item => {
      observe(item);
    });
  }
}
