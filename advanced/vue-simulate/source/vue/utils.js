const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;
export function getValue(vm, expr) {
  const keys = expr.split('.');
  let result = undefined;
  // [person,name]
  // vm.person.name
  // 这里可以使用reduce来简化
  for (let i = 0; i < keys.length; i++) {
    const item = keys[i];
    result = result ? result[item] : vm[item];
  }
  return result;
}
export function compilerText (node, vm) {
  // 可能是对象
  // {{person.name}}
  node.textContent = node.textContent.replace(reg, (...args) => {
    return getValue(vm, args[1]);
  });
}

