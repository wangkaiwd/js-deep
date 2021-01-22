import History from './base';

// 确保根路径为localhost:8080/#/
const ensureSlash = () => {
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/';
};

class HashHistory extends History {
  constructor (router) {
    super(router);
    ensureSlash();
  }

  getCurrentLocation () {
    // 路径中去掉#
    return window.location.hash.slice(1);
  }
}

export default HashHistory;
