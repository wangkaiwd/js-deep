import { initMixin } from './init';

function Vue (options) {
  this._init(options);
}

// 扩展原型
initMixin(Vue);

export default Vue;
