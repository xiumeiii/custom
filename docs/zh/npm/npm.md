# npm
## npm源
  当使用官方npm源安装各种包比较慢的时候，建议修改npm源地址

  查看npm源地址，在终端输入以下命令

  ```js
  npm config list`或`npm config get registry
  ```
  

  修改registry地址

  ```js
  npm set registry https://registry.npm.taobao.org/
  ```

  注销源

  
  ```js
  npm config rm registry
  ```

## nrm
  nrm是专门用来管理和快速切换私人配置的registry

  用nrm ls命令查看默认配置，带*号即为当前使用的配置 

  ```js 
  nrm ls 
  ```

  查看当前使用的是哪个源 
  ```js 
    nrm current
  ```

  切到源http://r.cnpmjs.org/(别名：cnpm),命令：nrm use 源的别名
  ```js
  nrm use cnpm
  ```


  用nrm add 命令添加公司私有npm源，如http://registry.npm.360.org(别名:qihoo)
  ```js
  nrm add qihoo http://registry.npm.360.org
  ```

  顺便测试下速度
  ```js
  nrm test npm
  ```