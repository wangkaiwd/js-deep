class EventBus {
  cache = {};

  $on (type, fn) {
    this.cache[type] = this.cache[type] || [];
    if (!this.cache[type].includes(fn)) {
      this.cache[type].push(fn);
    }
  }

  $emit (type) {
    // 借用数组的`slice`方法
    const args = [].slice.call(arguments, 1);
    let array = this.cache[type] || [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (item === null) {
        array.splice(i, 1);
        i--;
      } else {item.apply(null, args);}
    }
  }

  $off (type, fn) {
    const array = this.cache[type] || [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (item === fn) {
        // splice会更改原数组的内容，造成数组塌陷
        // array.splice(i, 1);
        array[i] = null;
      }
    }
  }
}

// requirement：not allow add the same function for one type
const eventBus = new EventBus();

const fn1 = (x, y) => {
  console.log('fn1', x, y);
};
const fn2 = (x, y) => {
  console.log('fn2', x, y);
};
const fn3 = (x, y) => {
  console.log('fn3', x, y);
  eventBus.$off('AA', fn1);
  eventBus.$off('AA', fn2);
};
const fn4 = (x, y) => {
  console.log('fn4', x, y);
};
const fn5 = (x, y) => {
  console.log('fn5', x, y);
};
const fn6 = (x, y) => {
  console.log('fn6', x, y);
};
eventBus.$on('AA', fn1);
eventBus.$on('AA', fn2);
eventBus.$on('AA', fn3);
eventBus.$on('AA', fn4);
eventBus.$on('AA', fn5);
eventBus.$on('AA', fn6);

eventBus.$emit('AA', 1, 23);
eventBus.$emit('AA', 1, 23);





