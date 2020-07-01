import createRouteMap from './createRouteMap';

function createMatcher (routes) {
  // 将数据进行扁平化
  // pathList 表示所有的路径的集合[/, /about, /about/a, /about/b]
  // pathMap 通过pathList中的某一项来获取对应的信息
  const { pathList, pathMap } = createRouteMap(routes);
  const addRoutes = () => {
  };
  const match = (location) => {

  };
  return {
    addRoutes,
    match
  };
}

export default createMatcher;
