import LtButton from './button';

import LtIcon from './icon';

const install = (Vue) => {
  Vue.component(LtButton.name, LtButton);
  Vue.component(LtIcon.name, LtIcon);
};

export default install;
