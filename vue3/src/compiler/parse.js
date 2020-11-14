// <div id="app"> hello <div>hello {{name}}</div>
//   <span>world</span>
// </div>

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

// 树 + 栈

// 开始标签
let root = undefined;
let currentParent = undefined;
const stack = []; // 用来存储当前在操作的所有元素
function start (tagName, attrs) {
  const element = createASTElement(tagName, attrs);
  if (!root) {
    root = element;
  }
  currentParent = element;
  stack.push(element);
}

// <div id="app"> hello <div>hello {{name}}</div>
//   <span>world</span>
// </div>
// 结束标签 [div,]
function end (tagName) { // 结尾标签处可以得到父子关系
  const element = stack.pop(); // remove the last element from an array and returns that element
  const currentParent = stack[stack.length - 1];
  element.parent = currentParent;
  if (currentParent) { // 当结束最外层标签时，stack为[]，此时不会有currentParent
    currentParent.children.push(element);
  }
}

function isEmpty (value) {
  return (value === '') || (value == null);
}

// 文本
function chars (text) {
  text = text.replace(/\s/g, '');
  if (isEmpty(text)) {return; }
  currentParent.children.push({
    type: 3,
    text
  });
}

function createASTElement (tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    attrs,
    children: [],
    parent: null
  };
}

export function parseHTML (html) {
  while (html) { // 一点点删除html
    const textEnd = html.indexOf('<'); // 标签会以'<'开头
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) { // 开始标签
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      // 结束标签
      const endTagMatch = html.match(endTag);
      if (endTagMatch) { // 结束标签
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
      }
    }
    let text;
    if (textEnd > 0) { // 文本内容
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
    }
  }

  function parseStartTag () {
    const start = html.match(startTagOpen); // 没有匹配到会返回null
    if (start) {
      const match = { tagName: start[1], attrs: [] };
      advance(start[0].length);
      // 递归匹配属性
      let end = html.match(startTagClose);
      let attr = html.match(attribute);
      while (!end && attr) {
        match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
        advance(attr[0].length);
        end = html.match(startTagClose);
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

  return root;
}
