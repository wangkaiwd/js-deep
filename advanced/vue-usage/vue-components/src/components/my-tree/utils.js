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

export function toggle (keys, key) {
  if (keys.includes(key)) {
    const index = keys.indexOf(key);
    keys.splice(index, 1);
  } else {
    keys.push(key);
  }
}

export function isCheck (copySelectedKeys, data) {
  const { children, key } = data;
  if (children) {
    // 判断所有的孩子是否都选中了
    const checkAll = children.every(child => this.selectedKeys.includes(child.key));
    if (checkAll) {
      if (!copySelectedKeys.includes(key)) {
        copySelectedKeys.push(key);
      }
    } else {
      if (copySelectedKeys.includes(key)) {
        const index = copySelectedKeys.indexOf(key);
        copySelectedKeys.splice(index, 1);
      }
    }
  }
}
