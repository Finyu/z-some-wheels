## zRing炫酷旋转背景

### 用法


:::demo 
```html
<template>
  <z-ring  @dateClick='dateClick' :month="'2019-1'"></z-ring>
</template>

<script>
  export default {
    data() {
      return {
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
