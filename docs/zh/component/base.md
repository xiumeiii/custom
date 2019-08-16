# Input 输入框

## 基础用法
<template>
  <code-box>
    <el-input class='el-input--width' ref="inputVal" v-model="input" placeholder="请输入">
    </el-input>
  </code-box>
</template>

```html
<el-input
  class="el-input--width"
  ref="inputVal"
  v-model="input"
  placeholder="请输入"
></el-input>
<script>
  export default {
    data() {
      return {
        input: ''
      };
    }
  };
</script>
```

<script>
   export default {
    data() {
      return {
        input:''
      }
    }
   }
</script>