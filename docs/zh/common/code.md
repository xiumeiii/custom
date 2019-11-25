# 常用代码

## $nextTick
```js
// 页面加载完成后处理
 this.$nextTick(() => {
    this.$refs.appMenuTree.setCheckedKeys(
      this.menuSelection.filter(node => !node.children).map(node => node.indexCode)
    )
  })
```

## 校验
```js
this.$refs.form.validate((valid) => {
  if (valid) {
    
  } else {
    
  }
})

// 重置校验表单
this.$refs.form && this.$refs.form.resetFields()
```
## 数据绑定
```js
// 更新已有绑定的数据
 this.$set(data, key, value)
```

## vuex
```js
 commit('commonInfo', commonInfo)

```

## 事件监听

[自定义事件](https://www.cnblogs.com/shapeY/p/7923353.html)

[js原生事件](https://blog.csdn.net/yushuangyushuang/article/details/79306993)

```js
// 添加和取消事件监听
destroyed () {
  window.removeEventListener('resize', this.resizeMethod)
},
mounted () {
   this.$nextTick(() => {
      this.resizeMethodx()
    })
  window.addEventListener('resize', this.resizeMethod)
}
// 销毁前解除全部绑定事件
beforeDestroy () {
  this.$off()
},
```

## 数组循环
```js
// 判断是否是数组
Array.isArray(aaa)
// 循环
aaa.forEach(item => {})
data.map(item => item.xxx).includes(Obj)
```

## 解构
```js
let { data } = this
```

## watch
```js
// 监听
watch: {
  aaa: {
    handler: function (val) {
    },
    deep: true
  }
  // 或
  // aaa (val) {
  // }
},
```

## prop
```js
props: {
  // 数组
  aaa: {
    type: Array,
    default: () => []
  },
  // 对象
  aaa: {
    type: Object,
    default: () => {}
  },
  // boolean
  aaa: {
    type: Boolean,
    default: false
  },
  // 字符串
  aaa: {
    type: String,
    default: ''
  },
},
```

