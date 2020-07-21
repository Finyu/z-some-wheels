## zTabs标签页


### 用法


:::demo 
```html
<template>
  <div class='tabsBox'>
    <z-tabs v-model='name' @tabClick='tabClick'>
      <z-tab-pane label='标签页1'  name='1' >
        <zButton type='3'>按钮1</zButton>
      </z-tab-pane>
      <z-tab-pane label='标签页2'  name='2' >
        <zButton type='3'>按钮2</zButton>
      </z-tab-pane>
      <z-tab-pane label='标签页3'  name='3' >
        <zButton type='3'>按钮3</zButton>
      </z-tab-pane>
      </z-tab-pane>
    </z-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        arr: ['1', '2', '3'],
        name: '1'
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
