// [{key:1,title:1,children:[{key:'1-1',title:'1-1'}]}]
export function flatTree (data, parent) {
  return data.reduce((map, cur) => {
    const { key, children } = cur;
    map[key] = cur;
    map[key].parent = parent;
    if (children?.length >= 0) {
      // map = { ...map, ...flatTree(children, cur) };
      Object.assign(map, flatTree(children, cur));
    }
    return map;
  }, {});
}
