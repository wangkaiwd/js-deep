import { isObject, defineProperty } from '../shared/utils';
import { arrayMethods, dependArray } from './array';
import Dep from './dep';

export function observe (data) {
  if (isObject(data)) {
    // 如果对象或数组有__ob__属性，说明已经被观测过了，不做处理
    if (data.__ob__) {
      return;
    }
    return new Observer(data);
  }
}

// new Vue({data() {return {arr:[1,2,3]}}})
// value = obj.arr;  此时value和arr指向了同一片内存空间
// arr: [{a:1},[1]]
export function defineReactive (target, key) {
  // 每个属性的set/get都会有这个作用域中的变量
  let value = target[key];
  // arr 1. 修改数组的原型 2. 递归观测数组中的每一项
  let childOb = observe(value);
  // 会为arr设置get/set方法，但是arr中的每一项的索引不会
  // 所以直接修改和设置arr的值是会被观测到的，而通过索引或长度来修改数组中的值不会
  const dep = new Dep();
  Object.defineProperty(target, key, {
    get () {
      // computed,watch,render
      // 直接取值，并不会执行watcher的get方法，所以并不会进行依赖收集
      // 只有在watcher中通过get方法进行取值时，才会进行依赖收集。这里的watcher会有渲染watcher,用户定义的watcher,以及计算属性watcher
      if (Dep.target) {
        dep.depend(); // arr 会收集对应的watcher
        if (childOb) { // 有childOb说明属性对应的值是对象或数组
          // 为在Observer中定义的dep收集依赖，方便直接通过vm.arr.__ob__.notify或vm.obj.__ob__.notify来触发
          childOb.dep.depend();
          // 数组中的每一项中如果有对象的话，也需要收集它的依赖
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set (newValue) {
      if (newValue !== value) {
        // 递归监控
        childOb = observe(newValue);
        // 改值之后会从更新value，下次get方法会取到最新的value
        value = newValue;
        dep.notify();
      }
    }
  });
}

/**
 * 数组并没有设置set/get方法，而是在调用修改原数组的方法后通知数组更新
 *
 * 所以需要单独为数组收集watcher
 */
class Observer {
  constructor (value) {
    this.value = value;
    // 这里会为对象和数组都创建一个dep,此时一个对象对应了2个dep。
    // 之后当调用$set/$delete时，可以通过vm.obj.__ob__.dep.notify()来更新收集到的watcher
    // 实现页面的更新
    this.dep = new Dep();
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
      observe(item); // 会为继续为数组中的每一项添加__ob__属性
    });
  }
}
