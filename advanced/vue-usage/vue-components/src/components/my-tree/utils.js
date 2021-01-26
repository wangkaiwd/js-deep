// [{key:1,title:1,children:[{key:'1-1',title:'1-1'}]}]
export function flatTree (data, parent) {
  return data.reduce((map, cur) => {
    const { key, children } = cur;
    // shallow copy avoid modify origin object reference
    map[key] = { ...cur };
    // 加上parent属性，之后便可以通过parent属性来找出当前元素对应的所有父级
    // 可以通过children查找所有的子集，可以灵活的处理各种情况
    map[key].parent = parent;
    if (children?.length >= 0) {
      // map = { ...map, ...flatTree(children, cur) };
      Object.assign(map, flatTree(children, cur));
    }
    return map;
  }, {});
}

export function toggle (keys, key, checked) {
  if (checked) {
    uncheck(keys, key);
  } else {
    check(keys, key);
  }
}

export function check (keys, key) {
  if (!keys.includes(key)) {
    keys.push(key);
  }
}

export function uncheck (keys, key) {
  if (keys.includes(key)) {
    const index = keys.indexOf(key);
    keys.splice(index, 1);
  }
}
