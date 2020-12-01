import { createStore } from 'vuex';
import root from '@/store/root';

// automatically register vuex modules and add namespaced for all sub modules
// note: there only support two level directory
const autoRegisterModules = () => {
  const context = require.context(
    // The relative path of the components folder
    './modules',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /(.js)$/
  );

  context.keys().map(fileName => {
    const module = context(fileName).default;
    const name = fileName.replace('./', '').replace('.js', '');
    root.modules = root.modules ?? {};
    module.namespaced = true;
    root.modules[name] = module;
  });
};
autoRegisterModules();
export default createStore(root);
