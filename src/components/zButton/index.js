import zButton from './src/main.js';

/* istanbul ignore next */
zButton.install = function(Vue) {
  Vue.component(zButton.name, zButton);
};

export default zButton;
