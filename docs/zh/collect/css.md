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
