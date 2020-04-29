### zPiechart 简易饼图

用css3实现的简易饼图

！！！本组件兼容要求较高

[can i use](https://caniuse.com/#search=conic-gradient)


### 用法


:::demo 
```html
<template>
  <z-piechart
  @onClick='handleNodeClick'
  :value='value'>

  </z-piechart>
</template>

<script>
  export default {
    data() {
      return {
        value: 80,
      }
    },
    methods:{
      handleNodeClick(data){
        this.value ++
      }
    }
  }
</script>


```
:::

### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 数据值 | Nember | - | — |
| total | 总数 | Nember | - | 100 |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| onClick | 点击按钮触发 | function |  - |