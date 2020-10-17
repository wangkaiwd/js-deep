import createRouteMap from './create-route-map';

const createMatcher = (routes) => {
  const { pathList, pathMap } = createRouteMap(routes);
  // 根据路径匹配对应的路由记录
  const match = (path) => {

  };
  // 用于动态添加路由
  const addRoute = (routes) => {

  };
  return {
    match,
    addRoute
  };
};
export default createMatcher;
