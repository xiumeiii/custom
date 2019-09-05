# 校验0~999的数字
```html
<input @input="format()"></input>
```
```js
format (val) {
  val = val.replace(/\D/g, '').slice(0, 3)
}
```

# 判断类型
通过typeof进行判断是否为函数，typeof用法如下:
```js
undefined、boolean、number、string、object、function
```