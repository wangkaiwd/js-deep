class Observer {
  constructor (data) {
    if (Array.isArray(data)) { // array need to handle specially

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
}

export function observe (data) {
  if (typeof data !== 'object' || data == null) {
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
      console.log('get');
      return value;
    },
    set (newValue) {
      if (value === newValue) {return;}
      console.log('set');
      // 继续为新增的值设置get/set方法
      observe(newValue);
      value = newValue;
    }
  });
}
