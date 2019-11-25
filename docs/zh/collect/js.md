# 常见案例
## 校验0~999的数字
```html
<input @input="format()"></input>
```
```js
format (val) {
  val = val.replace(/\D/g, '').slice(0, 3)
}
```

## 判断类型
通过typeof进行判断是否为函数，typeof用法如下:
```js
undefined、boolean、number、string、object、function
```

## 获取浏览器当前语言
```js
export default () => window.navigator.language || window.navigator.browserLanguage
```

## mixins引用
xx.js
```js
  export default {
    data () {
      return {
        
      }
    },
    methods: {
      aaa (pageSize) {
        this.tableField.pageSize = pageSize
        this.getTableData()
      }
    }
  }
```

vue中引用
```js
import methods from './methods.js'
mixins: [methods]
```

## 获取数组最大值
```javascript
  Math.max(aaaa)
```


## 快速初始化数组模板
```javascript
new Array(n).fill('').map((index, dd) => {
  return {
    index:  dd,
    mmm: ''
  }
})
```

## 数组追加
```javascript
this.list = this.list.concat(arr)
```

## moment  
```javascript
// 一天的开始和结束时间
moment().startOf('day').toDate()
moment().endOf('day').toDate()
```

## 字符全角转半角的问题
全角（数字之间看起来像有空格，实际不是空格）,解决方案，转成半角即可解决
```javascript
fullChar2halfChar (str) {
      let result = ''
      for (let i = 0; i < str.length; i++) {
        let code = str.charCodeAt(i)// 获取当前字符的unicode编码
        // 在这个unicode编码范围中的是所有的英文字母以及各种字符
        if (code >= 65281 && code <= 65373) {
          // 把全角字符的unicode编码转换为对应半角字符的unicode码
          result += String.fromCharCode(str.charCodeAt(i) - 65248)
          // 空格
        } else if (code === 12288) {
          result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32)
        } else {
          result += str.charAt(i)
        }
      }
      return result
    },
```
