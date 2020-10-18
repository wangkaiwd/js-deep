import createRouteMap from './create-route-map';

export function createRoute (route, location) {
  let record = route ? { ...route } : null;
  const matched = [];
  while (record) {
    matched.unshift(record);
    record = record.parent;
  }
  return {
    ...location,
    matched
  };
}

const createMatcher = (routes) => {
  const { pathList, pathMap } = createRouteMap(routes);
  // 根据路径匹配对应的路由记录
  const match = (path) => { // 如果要进行子路由的匹配，还需要收集matched
    return createRoute(pathMap[path], { path });
  };
  // 用于动态添加路由
  const addRoutes = (routes) => {
    // 在原来的基础上在新增路径列表以及路由和路径的映射关系
    createRouteMap(routes, pathList, pathMap);
  };
  return {
    match,
    addRoutes
  };
};
export default createMatcher;
