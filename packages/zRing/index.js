import zRing from './src/main';

/* istanbul ignore next */
zRing.install = function(Vue) {
  Vue.component(zRing.name, zRing);
};

export default zRing;
