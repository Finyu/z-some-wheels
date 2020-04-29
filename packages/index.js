import Vue from 'vue'
import zTree from './zTree/index.js'
import zButton from './zButton/index.js'
import zMonth from './zMonth/index.js'
import zPiechart from './zPiechart/index.js'
import fullScreen from './fullScreen/index.js'
import zRing from './zRing/index.js'

const components =  [zTree, zMonth, zButton, zPiechart, zRing]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

Vue.use(fullScreen)
/* istanbul ignore if */
if (typeof window !== 'undefined' ) {
  install(Vue)
}

export default {
  version: '1.0.0',
  zTree,
  zMonth,
  zButton,
  zPiechart
}