const reg = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function getValue (vm, expr) {
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
  // 为节点添加一个属性，在第一次渲染时该属性不存在，所以会保存第一次带有{{}}花括号的字符串，方便第二次即后几次更新时替换
  // 这个属性在增加后也会一起添加到vm.$el中，所以下次移动到DocumentFragment中还是会存在
  if (!node.expr) {
    node.expr = node.textContent;
  }
  // 可能是对象
  // {{person.name}}
  node.textContent = node.expr.replace(reg, (...args) => {
    return getValue(vm, args[1]);
  });
}

