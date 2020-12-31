// 匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 匹配开始标签
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 匹配开始标签结束
const startTagClose = /^\s*(\/?)>/;
// 结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

export function parseHtml (html) { // 一点点遍历html，将处理过的html删除
  let root, currentParent;
  const stack = [];

  function advance (n) {
    html = html.slice(n);
  }

  function createASTElement (tag, attrs) {
    return {
      tag,
      type: 1,
      attrs,
      children: [],
      parent: null
    };
  }

  function handleStartTag () {
    const start = html.match(startTagOpen);
    if (start) {
      const match = { tag: start[1], attrs: [] };
      advance(start[0].length);
      // 开始处理属性
      let end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
      }
      return match;
    }
  }

  function handleEndTag () {
    const match = html.match(endTag);
    if (match) {
      advance(match[0].length);
      return match;
    }
  }

  function start (tag, attrs) {
    const element = createASTElement(tag, attrs);
    if (!root) {
      root = element;
    } else {
      currentParent.children.push(element);
      element.parent = currentParent;
    }
    currentParent = element;
    stack.push(element);
  }

  function end (tag) {
    stack.pop();
    currentParent = stack[stack.length - 1];
  }

  function char (text) {
    text = text.replace(/\s/g, '');
    if (currentParent && text !== '') {
      currentParent.children.push({
        type: 3,
        text,
        parent: currentParent
      });
    }
  }

  function startParse () {
    while (html) {
      const textEnd = html.indexOf('<');
      if (textEnd === 0) {// 匹配到了标签
        const startTagMatch = handleStartTag();
        if (startTagMatch) {
          start(startTagMatch.tag, startTagMatch.attrs);
        }
        const endTagMatch = handleEndTag();
        if (endTagMatch) {
          end(endTagMatch[1]);
        }
      }
      if (textEnd > 0) { // 匹配到了文字
        let text = html.slice(0, textEnd);
        advance(text.length);
        char(text);
      }
    }
  }

  startParse();
  return root;
}
