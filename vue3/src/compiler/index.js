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

const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名 <aa></aa>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <my:xxx></my:xxx>， 捕获内容为标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配结尾标签
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配双花括号之间的任意字符

// 开始标签
function start (tagName, attrs) {

}

// 结束标签
function end () {

}

// 文本
function chars () {

}

function parseHTML (html) {
  while (html) { // 一点点删除html
    const textEnd = html.indexOf('<'); // 标签会以'<'开头
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
      }
    }
    break;
  }

  function parseStartTag () {
    const start = html.match(startTagOpen); // 没有匹配到会返回null
    if (start) {
      const match = { tagName: start[1], attrs: [] };
      advance(start[0].length);
      // 递归匹配属性
      let end = html.match(endTag);
      let attr = html.match(attribute);
      while (!end && attr) {
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
        advance(attr[0].length);
        end = html.match(endTag);
        attr = html.match(attribute);
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  // 删除已经处理过的内容
  function advance (startIndex) {
    return html = html.substring(startIndex);
  }
}

// 将html编译为函数
export function compileToFunctions (template) {
  // html模板 -> render函数
  // 例子： webpack, eslint
  const ast = parseHTML(template);
}

// 虚拟dom: 用对象来描述节点
// ast是用来描述代码的
