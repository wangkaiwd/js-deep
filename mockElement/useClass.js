import { Utils } from './demo04';

const useClass = () => {
  const utils = new Utils();
  utils.a(1, 2);
  utils.b();
};
export {
  useClass
};
