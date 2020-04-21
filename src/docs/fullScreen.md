### fullScreen全屏命令

可以用来单独提取某个元素到整个显示屏上


### 用法


:::demo `v-fullScreen`绑定的值只能是`boolean`类型。
```html
<template>
  <div>
    <z-button  type="3" v-fullScreen='fullScreen' @onClick='handleNodeClick'>
      我是一个按钮
    </z-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fullScreen: false,
      }
    },
    methods:{
      handleNodeClick(data){
        this.fullScreen = true
      }
    }
  }
</script>


```
:::
