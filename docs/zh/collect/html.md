# html
# HTML a标签 download 属性
  ```html
  <a href="http://www.cuit.edu.cn/Images/logo.png" download="cuit_logo">下载图片</a>
  ```
  :::tip
  href 属性定义了下载链接的地址。
  download 属性定义了下载文件的名称，文件扩展名由浏览器自动检测添加。
  :::

  (1) 当 download 属性值不为空时，下载的文件的名字由 download 的属性值确定，扩展名分两种情况：
  ① download 中指定后缀名

  ```html
  <a href="1506701587.csv" download="测试文件.csv">下载文件</a>
  ```
  上面的文件下载下来之后的名字为：测试文件.csv

  ② download 中不指定后缀名，扩展名由浏览器自动检测添加
  ```html
  <a href="1506701587.csv" download="测试文件">下载文件</a>
  ```
  上面的文件下载下来之后的名字为：测试文件.xls
  :::tip
  特别注意：文件扩展名的检测正确率并不是 100%。例如 .csv 文件会被检测成 .xls 文件，导致下载后文件打不开。
  :::
  (2) 当 download 属性值为空时，下载的文件的名字和扩展名与源文件一致
  ```html
  <a href="1506701587.csv" download>下载文件</a>
  ```
  上面的文件下载下来之后的名字为：1506701587.csv
  :::tip  Notice
  Notice：预防文件扩展名发生变化，要么在 download 属性中指定扩展名，要么使 download 为空，下载文件与源文件保持一致。
  :::