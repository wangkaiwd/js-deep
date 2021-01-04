/**
 * convert ast to code
 */
//<div id="app">
//   {{arr}}
//   <div class="xx">
//     hh
//     <span style="color:red">span</span>
//     zz
//   </div>
// </div>
// _c('div',{id:'app'},_v(_s(arr)),_c('div',{class:'xx'},_v("hh"),_c('span',{style:{color:'red'}},_v('span')),_v('zz')))
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function genChildren (children) {
  const result = children.map(child => gen(child));
  return result.join(',');
}

function genElement (ast) {
  const children = genChildren(ast.children);
  return `_c("${ast.tag}",${genAttrs(ast.attrs)}${children && `,${children}`})`;
}

// {name:'id',value:"app"}
function genAttrs (attrs) {
  const result = [];
  attrs.forEach(attr => {
    let { name, value } = attr;
    // {name:'style',value: 'color: red;border:1px solid pink;'}
    if (name === 'style') {
      value = value.split(';').reduce((obj, current) => {
        const [key, val] = current.split(':');
        obj[key] = val.trim();
        return obj;
      }, {});
    }
    result.push(`${name}:${JSON.stringify(value)}`);
  });
  return `{${result.join(',')}}`;
}

function genText (text) {
  if (!defaultTagRE.test(text)) { // 没有{{}}被匹配到，直接返回对应的字符串
    return `_v("${text}")`;
  }
  const tokens = [];
  // String.prototype.match 当设置global 标识时，返回值没有捕获分组
  let lastIndex = defaultTagRE.lastIndex = 0;
  // 返回一个数组，并且更新正则表达式的lastIndex属性
  // 如果匹配失败，方法返回null并且设置lastIndex为0
  let match;
  while (match = defaultTagRE.exec(text)) {
    // match.index: 匹配字符在原始字符串中基于0的索引
    // lastIndex: 跟随匹配字符串的下一个位置(指定开始下一次匹配的索引)
    const index = match.index;
    if (lastIndex > index) {
      // lastIndex === index时，说明匹配到的内容就是{{xxx}}
      // 当lastIndex > index时，匹配到的内容时 "xxx {{xxx}}"
      tokens.push(`"${text.slice(lastIndex, index)}"`);
    }
    tokens.push(`_s(${match[1]})`);
    lastIndex = defaultTagRE.lastIndex;
  }
  return `_v(${tokens.join('+')})`;
}

function gen (node) {
  if (node.type === 1) {
    return genElement(node);
  } else if (node.type === 3) {
    return genText(node.text);
  }
}

export function generate (ast) {
  return genElement(ast);
}



