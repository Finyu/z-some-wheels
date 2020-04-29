## zRing旋转背景

### 腥红之月

:::demo 
```html
<template>
<div style='padding: 40px;background: black'>
    <z-ring style='width: 100px;height: 100px' bkColor='red' @dateClick='dateClick' ></z-ring>
</div>

</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      dateClick(){
      }
    },
    computed: {},
  }
</script>

<style lang='scss'>
</style>

```
:::


### 头像背景

:::demo 
```html
<template>
<div style='width: 160px;height:160px;position:relative'>
  <z-ring style='width: 160px;height: 160px;position: absolute' bkColor='green' ></z-ring>
  <img src='http://img2.xkhouse.com/bbs/hfhouse/data/attachment/forum/corebbs/2009-11/2009113011534566298.jpg'
    style='width: 160px;height: 160px;position: absolute;border-radius:50%;background-size:cover '
  >
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
| bkColor | 旋转的背景颜色 | string | — | --- |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| dateClick | 点击了组件 | function |  ---- |
