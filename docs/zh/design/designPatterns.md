## 广播

dispatch 和 broadcast 方法都需要 3 个参数，componentName 组件名称， eventName 事件名称， params 传递的参数
:::tip
dispatch 方法会寻找所有的父组件，直到找到名称为 componentName 的组件，调用其 $emit() 事件。

broadcast 方法则是遍历当前组件的所有子组件，找到名称为 componentName 的子组件，然后调用其 $emit() 事件。
:::

父组件 App.vue
```html
<template>
  <div id="app">
    <hello></hello>
  </div>
</template>
<script>
  import Hello from 'components/Hello'
  import Emitter from './emitter'
  export default {
    name: 'app',
    componentName: 'ROOT',
    mixins: [Emitter],
    components: {
      Hello
    },
    created () {
      // 监听子组件的'message'事件
      this.$on('message', params => {
        // 广播给子组件,让子组件监听 'visible'事件
        this.broadcast(params.componentName, 'visible', params.text)
      })
    }
  }
</script>
```

子组件 hello.vue
```html
<template>
  <div></div>
</template>
<script>
import Emitter from 'element-ui/lib/mixins/emitter'
import event from './event'
export default {
  componentName: 'Hello',
  mixins: [Emitter, event],
  data () {
    return {
      name: 'hello',
      textarea: '',
      tableData: []
    }
  },
  methods: {
    submit () {
      // 发送给父组件，让父组件监听'message'事件
      this.communicate('message', {
        componentName: 'Hello',
        text: this.textarea
      })
      this.textarea = ''
    }
  },
  created () {
    // 监听父组件的'visible'事件
    this.$on('visible', text => {
      this.tableData.push(this.getMessage(text))
    })
  }
}
</script>
```