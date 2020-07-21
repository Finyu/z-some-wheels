<template>
  <div class='z-tabs'>
    <div class='z-tabs-title'>
      <div class='z-tabs-title-bottom'></div>
      <i class='el-icon-arrow-right'></i>
      <div class='z-tabs-title-box'>
        <span class='z-tabs-title-name' @click='tabClick(item)' v-for='item in attrs' :key='item.label' :class='{"active": item.name  === name}'>{{item.label}}</span>
      </div>
    </div>
    <div class='z-tabs-content'>
      <slot></slot>
      <slot :name='name'></slot>
    </div>
  </div>
</template>

<script>
import pane from './tab-pane.vue'
export default {
  name: 'z-tabs',
  props: {
  },
  data(){
    return {
      name: 'first',
      attrs: [],
      shouldStretch: false,
      contents: []
    }
  },
  watch:{
    'name' (){
      this.queSlot()
    }
  },
  components: {
    pane
  },
  methods: {
    tabClick(item){
      this.name = item.name
      this.$emit('tabClick', item.name)
      this.$emit('input', item.name)
      this.$nextTick(this.setBottom)
    },
    // 重新分配插槽
    queSlot(){
      for (let  i = 0;  i < this.$slots.default.length; i ++) {
        let item = this.$slots.default[i]
        if (item.tag == undefined || item.tag.indexOf('z-tab-pane') === -1) continue
        let {name, label} = item.data.attrs
        this.$slots[name] = item
        this.$slots.default.splice(i, 1)
        i --
      }
    },
    // 计算底部active线条位置 
    setBottom() {
      let el = this.$el
      el = el.getElementsByClassName('z-tabs-title-name active')[0]
      let solid = this.$el.getElementsByClassName('z-tabs-title-bottom')[0]
      solid.setAttribute('style', `width: ${el.offsetWidth}px; left: ${el.offsetLeft}px`)
    },
    // 检查标签宽度总和是否超过父元素的宽度
    checkWidth(){
      this.shouldStretch = false
      let boxFather = this.$el.getElementsByClassName('z-tabs-title')[0]
      let box = this.$el.getElementsByClassName('z-tabs-title-box')[0]
      if (boxFather.offsetWidth < box.offsetWidth) {
        this.shouldStretch = true
      }
      this.setBottom()
    }
  },
  created() {
    let attrs = []
    let contents = []
    this.name = this.$attrs.value
    for (let  i = 0;  i < this.$slots.default.length; i ++) {
      let item = this.$slots.default[i]
      if (item.tag == undefined || item.tag.indexOf('z-tab-pane') === -1) continue
      let {name, label} = item.data.attrs
      this.$slots[name] = item
      this.$slots.default.splice(i, 1)
      i --
      attrs.push({name, label})
    }
    this.attrs = attrs
    this.$nextTick(this.checkWidth)
  }
}
</script>