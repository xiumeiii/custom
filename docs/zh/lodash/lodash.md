# 常用函数
```javascript
import _ from 'lodash'
```

## 过滤满足条件的数据
```javascript
this.list = _.remove(this.rows.split('|'), (n) => {
  return n < CONSTNUM
})
```

## 剔除数组里面某数据
```javascript
this.list = _.pull(this.list, m)
```

## 向数组里面加入新数据
```javascript
this.list = _.concat(this.conlist, m)
```
