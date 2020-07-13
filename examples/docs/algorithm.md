### 去重

:::demo 
```html
<template>
  <p>fn([1,2,2,3,5,4,3]) // {{fn([1,2,2,3,5,4,3])}}</p>
</template>

<script>
export default { 
  methods: {
    fn: function(arr) {
      return arr.reduce((Darr, item, index) => {
        Darr.indexOf(item) === -1 && Darr.push(item)
        return Darr
      }, [])
    }
  }
}
</script>


```
:::


### 检查回文

:::demo 总比split.reserve.join要好 2333
```html
<template>
  <p>fn('123456') // {{fn('123456')}}</p>
  <p>fn('123321') // {{fn('123321')}}</p>
</template>

<script>
export default { 
  methods: {
    fn: function(str) {
      var len  = str.length
      var middle = parseInt(len/2)
      for (var i = 0;i < middle; i ++) {
        if (str[i] != str[len - i - 1]) {
          return false
        }
      }
      return true
    }
  }
}
</script>


```
:::
