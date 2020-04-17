import Vue from 'vue'

import ElementUI from 'element-ui'
import hljs from 'highlight.js'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import './styles/index.css'

import App from './App'
import router from './router/index'


import ZsomeWheels from './components/index.js'
Vue.use(ZsomeWheels)

// markdown demo组件
import demoBlock from './views/demo-block.vue'
Vue.component('demo-block', demoBlock)


router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})


// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
