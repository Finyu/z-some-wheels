## zTabs标签页


### 用法


:::demo 
```html
<template>
  <div class='tabsBox' >
    <z-tabs ref='ads' v-model='name' @tabClick='tabClick'>
      <z-tab-pane :label='"标签页" + index' v-for='(item, index) in  arr'  :name='index' >
        <zButton type='3' >按钮{{index}}</zButton>
      </z-tab-pane>
    </z-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: [0, 1, 2,3,4,5,6,7,8,9,10],
        name: 2
      }
    },
    methods:{
      tabClick(data){
      }
    },
    computed: {},
  }
</script>

<style lang='scss'>
  .tabsBox {
    height: 200px;
    width: 100%;
  }
</style>

```
:::


### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model | 标签页的name | string | — | first |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| tabClick | 点击标签标题触发 | function |  具体日期如： 标签页对应的name |
