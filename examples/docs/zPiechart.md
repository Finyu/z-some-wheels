### zPiechart 简易饼图

用css3实现的简易饼图

！！！本组件兼容要求较高

[can i use](https://caniuse.com/#search=conic-gradient)


### 用法

#### 基础使用
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


#### 初始化动画


:::demo  本组件动画由CSS.registerProperty实现，部分浏览器目前并未支持
```html
<template>
  <div style='width: 200px;height: 200px'>
    <z-piechart
      :key='key'
      firstAnimate
      :value='value'>
    </z-piechart>

    <p style='height: 20px'></p>

    <z-button
      type='3'
      @onClick='handleNodeClick'>
      重新加载饼图
    </z-button>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        value: 80,
        key: 1
      }
    },
    methods:{
      handleNodeClick(data){
        this.key ++
      }
    }
  }
</script>


```
:::


#### 过度动画


:::demo  本组件动画由CSS.registerProperty实现，部分浏览器目前并未支持
```html
<template>
  <div style='width: 200px;height: 200px'>
    <z-piechart
      :key='key'
      animated
      :value='value'>
    </z-piechart>

    <p style='height: 20px'></p>

    <z-button
      type='3'
      @onClick='handleNodeClick'>
      修改数据
    </z-button>
  </div>
  
</template>

<script>
  export default {
    data() {
      return {
        value: 80,
        key: 1
      }
    },
    methods:{
      handleNodeClick(data){
        this.value = this.value * 2 % 100
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
| animated | 是否在每次数据修改的时展示动画 | Boolean | - | false |
| firstAnimate | 是否在初次加载时展示动画 | Boolean | - | false |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| onClick | 点击按钮触发 | function |  - |