
## 序表嵌套代码块
:::tip
注：换行+两个Tab

+ one
    ```js
     var a = 10; 
    ```
+ two
    ```html
    <template>
      <div>aaa</div>
    </template>
    ```
:::

## 任务列表
:::tip
兼容性一般 要隔开一行

- [x] 选项1
- [] 选项2
- [] 选项3
:::


## 支持内嵌CSS样式
<p style="color: #AD5D0F;font-size: 30px; font-family: '宋体';">内联样式</p>

## 语义标记
:::tip
*斜体*  _斜体_

**加粗**

***加粗+斜体***  **_加粗+斜体_**

~~删除线~~
:::

## 公式
Markdown[^1]

[^1]: Markdown是一种纯文本标记语言

<span v-for="i in 3">{{ i }} </span>

# $page和$site
this.$site 和 this.$page
{{ $page }}

{{ $site }}

::: v-pre
`{{ This will be displayed as-is }}`
:::

<demo-1> 
<p>{{val}}</p>
<span v-html="val2"></span>
</demo-1>

<script>
export default {
  data () {
    return {
      val: 'demo-1调用测试',
      val2:'v-html-value'
    }
  }
}
</script>



Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/>