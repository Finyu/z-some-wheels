### zTree树形组件

支持多项默认展开,添加了logo图片


### 用法


:::demo `defaultList`的值为默认展开的列表的`key`值，即props中的`key`对应的属性值。
```html
<template>
  <z-tree
    :defaultList='["黄金糕-3"]'
    :props="{
      key: 'label', 
      children: 'children'
    }"
    :defaultImgUrl='"https://img.wanyx.com/softImg/soft/1650_s.jpg"' 
    @handleNodeClick='handleNodeClick'
    :tree='options'>
  </z-tree>
</template>

<script>
  export default {
    data() {
      return {
        aaa: false,
        options: [{
          label: '黄金糕',
          children: [
            {
              label: '黄金糕-1',
                children: [
                  {
                    label: '黄金糕-1-1'
                  },
                ]
            },
            {
              label: '黄金糕-2',
                children: [
                  {
                    label: '黄金糕-2-1'
                  },
                ]
            },
            {
              label: '黄金糕-3',
                children: [
                  {
                    label: '黄金糕-3-1'
                  },
                  {
                    label: '黄金糕-3-2'
                  },
                ]
            },
          ]
        }, {
          label: '双皮奶'
        }, {
          label: '蚵仔煎'
        }, {
          label: '龙须面'
        }, {
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods:{
      handleNodeClick(data){
      }
    }
  }
</script>

<style>
  
</style>

```
:::


### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| defaultList | 默认展开的列表 | Array | — | — |
| props | 有key和children两个属性代表数据中的key属性和下级属性 | Object | — | --- |
| tree | 列表数据 | Array | — | ---- |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| handleNodeClick | 点击列表对象触发 | function |  被点击的对象本身 |