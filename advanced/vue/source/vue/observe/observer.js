function defineReactive (data, key, value) {
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
