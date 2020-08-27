function Vue (options) {
  const vm = this;
  vm.$options = options;
  initData(vm);
}

function defineProperty (target) {
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      let value = target[key];
      if (Object.prototype.toString.call(value) === '[object Object]') {
        defineProperty(value);
      }
      Object.defineProperty(target, key, {
        get () {
          return value;
          // 在执行target[key]的时候又会调用target对应属性的get方法，造成递归取值
          // return target[key];
        },
        set (val) {
          value = val;
          // 同get
          // target[key] = val;
        }
      });
    }
  }
}

function proxy (vm) {
  for (const key in vm._data) {
    if (vm._data.hasOwnProperty(key)) {
      // 为什么这里不用递归代理？get方法：每次都会重新从vm._data上获取值，
      // 之后vm._data中的对应key对应的复杂数据类型与vm中对应key的复杂数据类型指向了同一块内存空间
      // 1. vm._data之后会进行递归代理，所以通过vm._data获得的对象属性是有get,set方法的
      // 2. var name = vm.person.name 相当于vm._data.person.name获取值，会调用name属性对应的get方法
      // 3. vm.person.name = 'vue' => vm._data.person.name = 'vue', 会调用name属性对应的set方法
      Object.defineProperty(vm, key, {
        get () {
          return vm._data[key];
        },
        set (val) {
          vm._data[key] = val;
        }
      });
    }
  }
}

function initData (vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data() : data;
  proxy(vm);
  // 递归data中的所有属性，为其设置set,get方法
  // 如果其值为对象的话，继续进行遍历（递归）
  defineProperty(vm._data);
}

export default Vue;

