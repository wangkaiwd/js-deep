let activeEffect;

export function effect (fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// 如何为每一个属性都收集依赖，并且不会重复收集？
// 利用map和set
// {
//    target1: { key: [] }, // 数组用set来代替，保证唯一
//    target2: {}
// }
// Map:{
//
// }
// 思考深层嵌套的对象会怎么样？

// 依赖收集思路：
// 1. 为每个属性收集对应的effect
// 2. 为每个组件单独收集effect，实现组件级的更新
const targetMap = new Map();

function track (target, key) { // 收集依赖
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map;
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) { // 没有deps
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (activeEffect && !dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
  console.log(targetMap);
}

function trigger (target, key) { // 触发依赖
  const depsMap = targetMap.get(target);
  if (!depsMap) {return;}
  const effects = depsMap.get(key);
  effects.forEach((effect) => {
    effect();
  });
}

/**
 * 目前存在的问题：
 *  1. 页面上没有用到属性更新了，也会渲染视图
 */
// Proxy get: https://javascript.info/proxy#default-value-with-get-trap
// Proxy set: https://javascript.info/proxy#validation-with-set-trap
export function reactive (target) {
  // 值更新时只是在执行trigger而已，即执行已经收集好的effect,而不会再重新收集effect
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
      trigger(target, key);
      return result;
    },
    get (target, key) { // 先不考虑递归的情况
      const result = Reflect.get(target, key);
      // 依赖收集
      track(target, key);
      return result;
    }
  });
}
