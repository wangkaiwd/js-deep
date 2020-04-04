const _instanceof = function (instance, Class) {
  // let proto = instanceof.__proto__
  let proto = Object.getPrototypeOf(instance);
  while (Class.prototype) {
    if (proto === Class.prototype) {
      return true;
    }
    // proto = proto.__proto__
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
console.log(_instanceof([], Array));

console.log(_instanceof([], Object));
