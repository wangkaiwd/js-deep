let activeEffect;

export function effect (fn) {
  activeEffect = fn;
  fn();
}

// Proxy get: https://javascript.info/proxy#default-value-with-get-trap
// Proxy set: https://javascript.info/proxy#validation-with-set-trap
export function reactive (target) {
  return new Proxy(target, {
    set (target, key, value, receiver) { // receiver: similar to get trap, matters only for setter properties
      // const result = Reflect.set(target, key, value);
      // 设置值时，可以执行页面更新的操作
      // return result;
      // target[key] = value;
      // The set trap should return true if setting is successful, and false otherwise
      // Reflect.set有对应的返回值
      // 对于每一个被Proxy可以捕获的内部方法，在Reflect中都有相应的方法，拥有和Proxy捕获器相同的名字和参数
      const result = Reflect.set(target, key, value);
      // 设置值时更新视图
      activeEffect?.();
      return result;
    },
    // get () {
    //
    // }
  });
}
