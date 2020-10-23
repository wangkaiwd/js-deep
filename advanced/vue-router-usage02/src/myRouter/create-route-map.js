const addRouteRecord = (routes, pathList, pathMap, parent) => {
  routes.forEach(route => {
    const { path, children, ...rest } = route;
    const normalizedPath = parent ? parent.path + '/' + path : path;
    pathList.push(normalizedPath);
    // 这个时候parent并没有什么用，而是在创建matched的时候使用
    pathMap[normalizedPath] = { path: normalizedPath, ...rest, parent };
    if (route.children) {
      addRouteRecord(route.children, pathList, pathMap, route);
    }
  });
};
const createRouteMap = (routes, pathList = [], pathMap = {}) => {
  addRouteRecord(routes, pathList, pathMap);
  return {
    pathList,
    pathMap
  };
};
export default createRouteMap;
