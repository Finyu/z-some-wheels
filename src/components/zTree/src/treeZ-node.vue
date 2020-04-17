<template>
<div class='z-tree-this.dataBox'>
  <p
  :class='{
    "z-tree-hasChild": data[childrenName] && data[childrenName].length > 0,
    "z-tree-dataBox-list-open": openList.indexOf(data[keyName]) > -1,
    "z-tree-dataBox-title": true
  }'
  @click='treeClick'
  >
  <img :src="data.src || defaultImgUrl" alt="">
  {{data[keyName]}}
  </p>
  <transition-group v-if='data[childrenName] && data[childrenName].length > 0' class='z-tree-itemBox-list' name='slide-fade'>
    
    <treeZNode 
      :key='item[keyName]'
      :data='item'
      v-for='item in openList.indexOf(data[keyName]) > -1 ? data[childrenName] : []'>
    </treeZNode>
  </transition-group>
</div>
</template>

<script>
export default {
  name: 'treeZNode',
  inject: {
    openList: { default: [] },
    changeOpenList: {  default: ()=>{} },
    ItemClcik: {  default: ()=>{} },
    defaultImgUrl: {},
    keyName: {},
    childrenName: {}
  },
  props: ['data'],
  methods: {
    treeClick(){
      this.ItemClcik(this.data)
      if (this.data[this.childrenName] && this.data[this.childrenName].length > 0) {
        this.changeOpenList(this.data) 
      }
    }
  },
}
</script>

<style>

</style>