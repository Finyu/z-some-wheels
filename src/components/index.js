import Vue from 'vue'
import zTree from './zTree/index.js'
import zMonth from './zMonth/index.js'

const components =  [zTree, zMonth]

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component)
  })

}

/* istanbul ignore if */
if (typeof window !== 'undefined' ) {
  install(Vue)
}

export default {
  version: '1.0.0',
  zTree,
  zMonth
}