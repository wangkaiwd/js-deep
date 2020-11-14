// <div id="app" style="color:red">
//   hello {{name}}
//   <span>hello</span>
// </div>
// render() {
//   return _c('div',{id:'app',style:{color:'red'}}, _v('hello',_s(name)),_c('span',null,_v('hello')))
// }

function genProps (attrs) {
  console.log('attrs', attrs);
  let str = '';
  if (attrs.length === 0) {
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
  const code = `_c(${el.tag},${genProps(el.attrs)})`;
  return code;
}

export default generate;
