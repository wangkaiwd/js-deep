// <div>hello {{name}}</div>
//   <span>world</span>

// convert html to json
// const json = {
//   tag: 'div',
//   type: 1, // 节点类型，用来区分是文本还是元素
//   parent: null,
//   attrs: [],
//   children: [
//     { tag: null, type: 3, parent: 'div', attrs: [], text: 'hello {{name}}' },
//     {
//       tag: 'span', type: 1, parent: 'div', attrs: [],
//       children: [
//         { tag: null, type: 3, parent: 'span', attrs: [], text: 'world' },
//       ]
//     },
//   ]
// };

function parseHTML (html) {
  return undefined;
}

// 将html编译为函数
export function compileToFunctions (template) {
  // html模板 -> render函数
  // 例子： webpack, eslint
  const ast = parseHTML(template);
}

// 虚拟dom: 用对象来描述节点
// ast是用来描述代码的
