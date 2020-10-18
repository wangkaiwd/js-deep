import History from './base';

const ensureSlash = () => {
  if (!location.hash) location.hash = '/';
};

class HashHistory extends History {
  constructor (router) {
    super(router);
    ensureSlash();
  }

  getCurrentLocation () {
    return getHash();
  }
}

export default HashHistory;

export function getHash () {
  return location.hash.slice(1);
}
