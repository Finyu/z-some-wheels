import zTree from './src/main';

/* istanbul ignore next */
zTree.install = function(Vue) {
  Vue.component(zTree.name, zTree);
};

export default zTree;
