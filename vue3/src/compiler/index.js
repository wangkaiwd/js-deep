// 将html编译为函数
import { parseHTML } from './parse';
import generate from './generate';

export function compileToFunctions (template) {
  // html模板 -> render函数
  // 例子： webpack, eslint
  const ast = parseHTML(template);
  // 将ast树重新生成代码
  const code = generate(ast);
  return new Function(`with(this) {return ${code}}`);
}

// 虚拟dom: 用对象来描述节点
// ast是用来描述代码的
