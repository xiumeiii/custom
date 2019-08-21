<!-- [[toc]] -->
## img

  img标签的src直接写地址即可发起图片请求
  ```html
  <img class="pic-class" :src="`${address}?picUrl=${picUrl}&token=''`"/>
  ```

## window点击跳转新页面
  ```js{3}
  window.location.href = url
  或
  window.open(`.../link/info`)
  ```

## new date()常用方法
```js
   let data = new Date();

   data.getYear(); //获取当前年份(2位)
   data.getFullYear(); //获取完整的年份(4位,1970-????)
   data.getMonth(); //获取当前月份(0-11,0代表1月)
   data.getDate(); //获取当前日(1-31)
   data.getDay(); //获取当前星期X(0-6,0代表星期天)
   data.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
   data.getHours(); //获取当前小时数(0-23)
   data.getMinutes(); //获取当前分钟数(0-59)
   data.getSeconds(); //获取当前秒数(0-59)
   data.getMilliseconds(); //获取当前毫秒数(0-999)
   data.toLocaleDateString(); //获取当前日期
   let mytime=data.toLocaleTimeString(); //获取当前时间
   data.toLocaleString( ); //获取日期与时间

    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()

  // 时间戳的获取方式 - 4种：
   1. let timestamp =Date.parse(new Date());
   2. let timestamp =(new Date()).valueOf();
   3. let timestamp=new Date().getTime()；
   4. +new Date(`${Y}/${M}/${D}`)
```

  ## 数组包含对象
  ```js
  return list.contains(ele)
  ```
  ## 抛出错误提示
  ```js
  throw new Error('****')
  ```
  ## 是否含有属性
  ```js
  styleName.hasOwnProperty(prop)
  ```

  ## box-sizing样式
  :::tip content-box
  是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

  `width` = 内容的宽度

  `height` = 内容的高度
  :::

  :::tip border-box
  告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

  `width = border + padding + 内容的宽度`

  `height = border + padding + 内容的高度`
  :::

## 旋转180度
  ```scss
    transform: rotate(180deg);
  ```
## 盒子悬浮阴影
  ```scss
   .code-box:hover{    
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    box-shadow: h-shadow v-shadow blur spread color inset;
  ```
  ​
## mounted不会渲染

  就是页面中查看详情按钮第一次点击进去详情页可以被渲染，回退出来第二次进去钩子函数没有被执行
  ```html
  <template>
    <div class="app">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
  </template>
  ```
  ```js
  created: function () {
    console.log(1)
  },
  mounted: function () {
    console.log(2)
  },
  activated: function () {
    console.log(3)
  },
  deactivated: function () {
    console.log(4)
  }
  ```
  ::: warning
  法1:这部分需要注意下，当引入`keep-alive` 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。

  所以，应该activated中留一份数据获取的代码，或者不要created部分，直接将created中的代码转移到activated中。

  法2：监听路由做处理
  :::

## 创建.文件(.vuepress)

  方法1. 非window系统用命令：
  ```Bash 
  md .vuepress
  ```

  方法2. 新建文件夹是名字改为 
  ```Bash 
  .vuepress.
  ```
  :tada: :100: :bamboo: :gift_heart: :fire:


  ## 本地新建项目，第一次提交到git新建的仓库
  直接关联远程
  ```bash
  git remote add origin https://github.com/userName/custom.git
  会报
  fatal: Not a git repository (or any of the parent directories): .git
  ```
  解决：
  ```bash
  首先：
    git init
  然后关联：
    git remote add origin https://github.com/userName/custom.git
    然后远程就是master分支了
  再次提交：
    git add .
    git commit -m ""
    git push origin master
  提交成功
  ```
## vue style 深度作用选择器（>>> 与 /deep/(sass/less用法)）
```html
<!-- vue编译后的html -->
<div data-v-17bb8a05 class="fuck"> 
  <div class="weui-cells"> </div>
</div>


<style lang="less" scoped>
  .fuck .weui-cells {
    /* 没有任何效果
    因为，所有的scoped中的css最终编译出来都会变成这样 
    .fuck[data-v-17bb9a05] .weui-cells[data-v-17bb9a05] */
  }
</style>

```
```less
// 解决方式：

// 方法1：scoped 移除,style标签样式完全变成全局的 
<style lang="less">
  .fuck .weui-cells {
      /* 没有任何效果 */
}
</style>

// 方法2：使用 深度作用选择器  >>>  （但是只作用于css，sass/less的话可能无法识别）
<style lang="less" scoped>
  .fuck >>> .weui-cells {
      // ...
  }
</style>

// 方法3：使用 /deep/ 选择器
<style lang="scss" scoped>
  .fuck {
    /deep/ .weui-cells {
      // ...
    }
  }
  </style>
```



