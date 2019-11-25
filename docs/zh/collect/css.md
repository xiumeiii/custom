# css
```less
<style lang="less">
  .aa{
    @dd: 50px;
    margin-left: calc(~"100% + @{dd}");
    // margin-left: e("calc(100% + @{dd})");
  }
</style>
```

## div中图片居中
div高度自适应为100%，图片下面包含文本也需要居中
```html
<div class="no-data">
  <img src="no_data.svg"/>
  <p>无数据</p>
</div>
```

```css
.no-data {
  position: relative;
  text-align: center;
  height: 100%;
  margin-left: -120px; //有的图片左边是白色，看起来图片就好像向右偏移，所以可以往做移动下
  img,
  p {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  p {
    left: 50%;
    margin: 80px 56px; // 文字在图片下相对于图片居中
  }
}
```

## 禁止点击状态同时改变透明度
```css
cursor: not-allowed; 
opacity: .4;
```

## vue中引入css文件
```css
<style lang="less">
  @import url("../css/config.less");
</style>
```

  ## 滑动收缩动画
  主要写样式
  父vue组件(Parent.vue)
  ```html
  <div
    :class="{
      'chlid-btn': true,
      'show-chlid': showChild
    }"
    title=""
    @click="changeShow">
    <i :class="!showChild ? 'icon-left' : 'icon_right'"></i>
  </div>
  <child :visible="showChild"/>
  ```
  ```js
  import Child from './Child'
  export default {
  name: 'Parent',
  props: {
    breadcrumbObj: Object,
    default () { return null }
  },
  components: {
    Child
  },
  mixins: [method],
  data () {
    return {
      showChild: false
    }
  },
    methods: {
    changeShow () {
      this.showChild = !this.showChild
    }
  }
}
  ```

  ```css
  .chlid-btn {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 10000;
    color: rgba(0, 0, 0, 0.4);
    -webkit-transition: right, 0.75s;
    transition: right, 0.75s;
    text-align: center;
    line-height: 70px;
    font-size: 24px;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: pointer;
    width: 19px;
    height: 64px;
    background: #d8d8d8;
    border-radius: 8px 0px 0px 8px;
}

.chlid-btn:hover {
    color: rgba(0, 0, 0, 0.5);
}

.show-chlid {
    right: 50%;
}
  ```

  子组件(Child.vue)

  ```html
    <div :class="{
      chlid: true,
      show: visible
    }">
    <div> 内容 </div>
    </div>
  ```
  ```js
  export default {
    name: 'Child',
    props: {
      visible: {
        type: Boolean,
        default: true
      },
    }
  }
  ```

  ```css
  .chlid {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 0;
    z-index: 3000;
    background: #fff;
    transition: width, 0.75s;
    overflow: auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 2px 6px 7px #999;
}

.chlid.show {
    width: 50%;
}

.chlid .hljs {
    padding: 0.5em 1em;
}
  ```
p和span里面的图标老是对不齐
```html
<p><span class="icon-btn"></span>asdfasdf</p>
```
```css
span {
    font-size: 24px;
    vertical-align: middle;
  }
```
[event.target 和 event.currentTarget 的区别](https://www.cnblogs.com/yzhihao/p/9398917.html)

## flex(弹性布局)
display:flex 弹性布局
[css display:flex属性](https://www.jianshu.com/p/d9373a86b748) 
[display:flex 布局教程](https://www.jianshu.com/p/5ba0ea681454) 


