// <div id="app" style="color:red">
//   hello {{name}}
//   <span>hello</span>
// </div>
// render() {
//   return _c('div',{id:'app',style:{color:'red'}}, _v('hello',_s(name)),_c('span',null,_v('hello')))
// }

import { defaultTagRE } from './parse';

function gen (node) {
  if (node.type === 1) { // 元素
    return generate(node);
  } else { // 文本
    const text = node.text;
    // 最后会通过new Function来进行执行，这里要通过JSON.stringify来将其转换为带有双引号的文本
    // 文本中{{}}中的字符串需要单独处理
    // <div id="app" style="color:red">
    //   hello {{name}} xxx {{msg}} tt
    //   <span>hello</span>
    // </div>
    let lastIndex = defaultTagRE.lastIndex = 0;
    let match = defaultTagRE.exec(text);
    if (!match) {
      return `_v(${JSON.stringify(text)})`;
    }
    const tokens = [];
    let index = undefined;
    while (match) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = defaultTagRE.lastIndex;
      match = defaultTagRE.exec(text); // 全局匹配，lastIndex会一直增加
    }
    tokens.push(JSON.stringify(text.slice(lastIndex)));
    return `_v(${tokens.join('+')})`;
  }
}

function genChildren (el) {
  const children = el.children;
  if (children) {
    return children.map(child => gen(child)).join(',');
  } else {
    return '';
  }
}

function genProps (attrs) {
  let str = '';
  if (!attrs || (attrs.length === 0)) {
    return 'undefined';
  }
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    // {style: "color:red;width:100px"}
    if (attr.name === 'style') {
      const value = attr.value.split(';').reduce((obj, current) => {
        const [key, val] = current.split(':');
        obj[key] = val;
        return obj;
      }, {});
      str += `${attr.name}:${JSON.stringify(value)},`;
    } else {
      str += `${attr.name}:${attr.value},`;
    }
  }
  return `{${str.slice(0, -1)}}`;
}

function generate (el) {
  const children = genChildren(el);
  const code = `_c("${el.tag}",${genProps(el.attrs)}, ${children})`;
  return code;
}

export default generate;
