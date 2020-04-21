### z-button按钮




### 用法

#### 第一种样式

:::demo type设置为1
```html
<template>
  <div style='background: black;padding: 40px'>
    <z-button  type="1" @onClick='handleNodeClick'>
      我是一个按钮
    </z-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      handleNodeClick(data){
        console.log(1)
      }
    }
  }
</script>

```
:::

#### 第二种样式

:::demo type设置为2
```html
<template>
  <div style='background: black;padding: 40px'>
    <z-button  type="2" @onClick='handleNodeClick'>
      我是一个按钮
    </z-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      handleNodeClick(data){
        console.log(1)
      }
    }
  }
</script>

```
:::

#### 第三种样式

:::demo type设置为3
```html
<template>
  <div style='background: #ECEFFC;padding: 40px'>
    <z-button  type="3" @onClick='handleNodeClick'>
      我是一个按钮
    </z-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods:{
      handleNodeClick(data){
        console.log(1)
      }
    }
  }
</script>

```
:::



### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 按钮的展示样式 | string | 1,2,3 | — |

### 事件
| 参数      | 说明          | 类型      | 返回值  |
|---------- |-------------- |----------  |-------- |
| onClick | 点击按钮触发 | function |  - |