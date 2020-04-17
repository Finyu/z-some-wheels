## zMonth单月日历组件

支持多项默认展开,添加了logo图片

### 用法


:::demo `dateClick`返回点击的具体日期。
```html
<template>
  <div class='monthsBox'>
    <z-month  @dateClick='dateClick' :month="'2019-1'"></z-month>
  </div>
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
