import initMixin from './init';
import { lifecycleMixin } from './lifecycle';
import { renderMixin } from './vdom';
import { initGlobalApi } from './global-api';
import { stateMixin } from './state';
import { domPush } from './v-dom-demo/push';
import { domShift } from './v-dom-demo/shift';
import { firstToLast } from './v-dom-demo/first-to-last';
import { lastToFirst } from './v-dom-demo/last-to-first';
import { random } from './v-dom-demo/random';

function Vue (options) {
  this._init(options);
}

initMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
stateMixin(Vue);
initGlobalApi(Vue);
export default Vue;

// domPush();
// domShift();
// firstToLast();
// lastToFirst();
random();
