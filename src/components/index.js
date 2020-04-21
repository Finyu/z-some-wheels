import Vue from 'vue'
import zTree from './zTree/index.js'
import zButton from './zButton/index.js'
import zMonth from './zMonth/index.js'
import fullScreen from './fullScreen/index.js'

const components =  [zTree, zMonth, zButton]

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
  zMonth
}