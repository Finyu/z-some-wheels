## zTabs标签页


### 用法


:::demo 
```html
<template>
  <div class='tabsBox'>
    <z-tabs :name='name'>
      <tabs v-for = 'item  in  arr' :label='"管理" + item'  :name='item'>
        {{item}}
      </tabs>
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
      dateClick(data){
        console.log(data)
      }
    },
    computed: {},
  }
</script>

<style lang='scss'>
  .tabsBox {
    height: 400px;
    width: 100%;
  }
</style>

```
:::


### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| month | 渲染的月份如：2019-1 | string | — | --- |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| dateClick | 点击日期对象触发 | function |  具体日期如： 2019-1-1 |
