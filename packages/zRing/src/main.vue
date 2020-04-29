<template>
  <div class='z-tree'>
    <treeZNode 
    v-for='item in tree' 
    :key='item[keyName]'
    :data='item'>
    </treeZNode>
  </div>
</template>

<script>
import treeZNode from './treeZ-node'
export default {
  name: 'z-tree',
  data(){
    return {
      openList: [],
      keyName: this.props['key'],
      childrenName: this.props['children']
    }
  },
  components: {
    treeZNode
  },
  props: ['tree', 'defaultImgUrl', 'props', 'defaultList'],
  provide() {
    return  {
      keyName: this.keyName,
      childrenName: this.childrenName,
      defaultImgUrl: this.defaultImgUrl,
      openList: this.openList, // 展开的列表  key=name
      ItemClcik: (data) => { this.$emit('handleNodeClick', data) }, // 节点点击事件
      changeOpenList: (data) => {
        if (this.openList.indexOf(data[this.keyName]) > -1) {
          this.deleteTodo(data)
        } else {
          this.openList.push(data[this.keyName])
        }
      }
    }
  },
  methods: {
    deleteTodo(data) { // 把已经展开的下级列表一起收起来
      this.openList.splice(this.openList.indexOf(data[this.keyName]), 1)
      data[this.childrenName].forEach(item => {
        if (this.openList.indexOf(item[this.keyName]) > -1) {
          this.deleteTodo(data)
        }
      })
    },
    defaultOpen(key) {
      let that = this
      let path = []
      let selectSuccss = false
      fn1(this.tree, key)
      return path
      function fn1(arr, name){
        for (let i = 0; i < arr.length; i++){
          let item = arr[i]
          path.push(item)
          if (item[that.keyName] == name) {
            selectSuccss = true
            return 
          }
          else {
            if (item[that.childrenName] != undefined && item[that.childrenName].length > 0) {
              fn1(item[that.childrenName], name)
            }
            if (selectSuccss) return 
            path.pop()
          }
        } 
      }
    }
  },
  mounted(){
    this.defaultList.forEach(item => {
      let arr = this.defaultOpen(item)
      arr.forEach(item => {
        this.openList.push(item[this.keyName])
      })
    })
  }
}
</script>

<style>

</style>