import zMonth from './src/main';

/* istanbul ignore next */
zMonth.install = function(Vue) {
  Vue.component(zMonth.name, zMonth);
};

export default zMonth;
