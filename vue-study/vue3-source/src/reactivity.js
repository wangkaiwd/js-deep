let activeEffect;

export function effect (fn) {

}

// Proxy get: https://javascript.info/proxy#default-value-with-get-trap
// Proxy set: https://javascript.info/proxy#validation-with-set-trap
export function reactive (target) {
  return new Proxy(target, {
    set (target, key, value, receiver) { // receiver: similar to get trap, matters only for setter properties
      // const result = Reflect.set(target, key, value);
      // 设置值时，可以执行页面更新的操作
      // return result;
      target[key] = value;
    },
    // get () {
    //
    // }
  });
}
