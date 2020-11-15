import { initMixin } from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom';

function Vue (options) {
  this._init(options);
}

// 扩展原型
initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
export default Vue;
