import zTabs from './src/main';

/* istanbul ignore next */
zTabs.install = function(Vue) {
  Vue.component(zTabs.name, zTabs);
};

export default zTabs;
