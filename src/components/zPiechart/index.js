import zPiechart from './src/main.js';

/* istanbul ignore next */
zPiechart.install = function(Vue) {
  Vue.component(zPiechart.name, zButton);
};

export default zPiechart;
