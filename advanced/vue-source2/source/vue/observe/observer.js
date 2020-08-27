function defineReactive (data, key, value) {
  Object.defineProperty(data, key, {
    get () {
      return value;
    },
    set (newValue) {
      if (value === newValue) return;
      value = newValue;
    }
  });
}

class Observer {
  constructor (data) {
    this.walk(data);
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
