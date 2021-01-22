const createRouteMap = (routes, oldPathList, oldPathMap) => {
  const pathList = oldPathList || [];
  const pathMap = oldPathMap || {};
  const flatRoutes = (routes, parent) => {
    routes.forEach(route => {
      addRouteRecord(route, parent);
    });
  };
  const addRouteRecord = (route, parent) => {
    let { path, component } = route;
    path = parent ? `${parent.path}/${route.path}` : path;
    // 记录路由的父级
    const record = { path, component, parent };
    if (!pathMap[path]) {
      pathList.push(path);
      pathMap[path] = record;
    }
    if (route.children) {
      // 记录每个组件的父级组件,方便查找该条记录的父级
      flatRoutes(route.children, record);
    }
  };
  flatRoutes(routes);
  return {
    pathList,
    pathMap
  };
};
export default createRouteMap;
