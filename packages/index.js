
import zTree from './zTree/index.js'
import zButton from './zButton/index.js'
import zMonth from './zMonth/index.js'
import zPiechart from './zPiechart/index.js'
import fullScreen from './fullScreen/index.js'
import zRing from './zRing/index.js'
import zTabs from './zTabs/index.js'

const components =  [zTree, zMonth, zButton, zPiechart, zRing, zTabs]

const install = function(Vue, opts = {}) {
  Vue.use(fullScreen)
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  zTree,
  zMonth,
  zButton,
  zPiechart
}