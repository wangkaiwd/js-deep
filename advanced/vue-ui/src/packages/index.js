import LtButton from './button';

import LtIcon from './icon';

const install = (Vue) => {
  Vue.component(LtButton.name, LtButton);
  Vue.component(LtIcon.name, LtIcon);
};

// 通过script全局引入Vue
if (typeof window.Vue !== 'undefined') {
  install(Vue);
}

export default install;
