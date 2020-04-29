
import Vue from 'vue'
import mark from './src/mark.js'

const fullScreenConstructor = Vue.extend(mark);


const fullScreen = {}
fullScreen.install = Vue => {
  Vue.directive('fullScreen', {
    bind: function(el, binding, vnode) {
      if (typeof binding.value !== 'boolean') {
        console.error('The value of the fullScreen directive should be either false or true')
        return
      }
      Vue.nextTick(() => {
        let instance = new fullScreenConstructor({
          el: document.createElement('div'),
          data: {},
        })
        el.parentNode.appendChild(instance.$el)
        instance.$el.appendChild(el)
        instance.$parent = vnode.context.$parent
        vnode.context.$parent = instance
        instance.$refs.fullScreenContent = vnode.context
        el.classList.add("fullScreen-Content")
      })

     },
    update: function(el, binding, vnode, oldvnode) {
     if(binding.value === true && el) {
      vnode.context.$parent.fullScreen = true
      let [clientWidth, clientHeight] = [el.clientWidth, el.clientHeight]
      let [innerWidth, innerHeight] = [window.innerWidth, window.innerHeight]
     }
    }
  })
}

export default fullScreen