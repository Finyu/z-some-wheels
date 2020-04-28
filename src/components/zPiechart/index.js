import zPiechart from './src/main.js';

if (!CSS.registerProperty) {
  console.warn('The current browser does not support gradient animation ---zPiechart')
} else {
  CSS.registerProperty({
    name: "--Zcolor1",
    syntax: "<color>",
    initialValue: "transparent",
    inherits: true
  });
  CSS.registerProperty({
    name: "--Zcolor2",
    syntax: "<color>",
    initialValue: "transparent",
    inherits: true
  });
  CSS.registerProperty({
    name: '--Zpos',
    syntax: '<length-percentage>',
    initialValue: '0',
    inherits: true
  })
}

/* istanbul ignore next */
zPiechart.install = function(Vue) {
  Vue.component(zPiechart.name, zButton);
};

export default zPiechart;
