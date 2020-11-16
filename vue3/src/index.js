import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom';
import initGlobalApi from './global-api';

function Vue (options) {
  this._init(options);
}

// 扩展原型
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

initGlobalApi(Vue);
export default Vue;
