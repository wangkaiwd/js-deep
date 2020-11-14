// 将html编译为函数
import { parseHTML } from './parse';

export function compileToFunctions (template) {
  // html模板 -> render函数
  // 例子： webpack, eslint
  const ast = parseHTML(template);
  console.log('ast', ast);
}

// 虚拟dom: 用对象来描述节点
// ast是用来描述代码的
