## v-bind="$props"

我们有很多的原生属性，比如：name、placeholder、disabled等等。我们如果都定义在props显示接收，未免太过繁琐。所以官网出现了：v-bind="$props"这样的操作

```html
<!-- good -->
<!-- <input v-bind="$props"> -->
 <!-- bad 而不是下面这样，如果很多的属性就特别繁琐 -->
<!-- <input :name="name" :placeholder="placeholder" :disabled="disabled"> -->
```

## :is和is

:::tip
当使用 DOM 作为模板时 (例如，使用 el 选项来把 Vue 实例挂载到一个已有内容的元素上)，你会受到 HTML 本身的一些限制，因为 Vue 只有在浏览器解析、规范化模板之后才能获取其内容。

尤其要注意，像 ***`<ul>、<ol>、<table>、<select>`*** 这样的元素里允许包含的元素有限制，而另一些像 ***`<option>`*** 这样的元素只能出现在某些特定元素的内部。

通俗一点讲，就是“龙生龙，凤生凤，老鼠的儿子会打洞”，特殊的一下父元素如  ***`<ul>、<ol>、<table>、<select>`*** 里面不能包含不属于它的子元素，而与之相对应的  ***`<li>、<tr>、<option>`*** 只可以出现在特定的父元素里面。
:::

比如我定义了子组件 ***`<my-row>` ***

```html
<!-- 不能用在特殊表填table下面，自定义组件 <my-row> 会被当作无效的内容，因此会导致错误的渲染结果。-->
<table>
  <my-row>...</my-row>
</table>

<!-- 变通的方案是使用特殊的 is 特性： -->
<table>
  <tr is="my-row"></tr>  
  <!-- 或 <tr :is="my-row"></tr>  -->
</table>
```

# slot
:::tip
  封装的vue模板中判断是否有sidebar这个插槽
  ```html
  <template v-if="$slots.sidebar" slot="sidebar">
    <slot name="sidebar"></slot>
  </template>
  ```
:::
# tabs
```html
<div class="tabs">
  <el-tabs :value="curTab" @input="handleCurTab">
    <el-tab :label="tab1" name="tab1"></el-tab>
    <el-tab :label="tab2" name="tab2"></el-tab>
  </el-tabs>
  <router-view></router-view>
</div>
```
```js
handleCurTab (val) {
  this.curTab = val
  this.$router.push(`/..../${val}`)
}
```

