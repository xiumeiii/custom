<template>
  <div id="customPositionDiv"  >
    <div class="canvas-div">
      <div
        @mousedown="mousedown"
        @mousemove="mousemove"
        @mouseup="mouseup"
        @mouseleave="mouseleave"
        class="img-style">
        <img :src="`data:image/jpeg;base64,${imgSrc}`" class="img-style">
        <canvas ref="drawCanvas" :width="DivWidth" :height="DivHeight" class="canvas-style"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import vue from 'vue'
export default {
  name: 'Draw',
  props: {
    imgSrc: { // 图片路径
      type: String
    },
    constArr: {
      type: Object,
      default: () => {
        return {}
      }
    }
    // showData: {
    //   startx: 3,
    //   starty: 6,
    //   width: 100,
    //   height: 100
    // },
  },
  data () {
    return {
      startX: '', // 画画开始的X坐标
      startY: '', // 画画开始的Y坐标
      endX: '', // 画画结束的X坐标
      endY: '', // 画画结束的Y坐标
      isMouseDownInCanvas: '', // 鼠标是否按下

      customcxt: '', // cxt
      // customRwidth: '', // 原图与展示图片的宽度比
      // customRheight: '', // 原图与展示图片的高度比
      // imgstyle: '', // 根据图片大小自适应样式
      // canvasstyle: '', // 根据图片大小canvas自适应样式 居中显示
      // canvasWidth: '', // 根据图片大小自适应canvas宽
      // canvasHeight: '', // 根据图片大小自适应canvas高
      DivWidth: 640, // 最大宽度
      DivHeight: 380, // 最大高度
      hasDrawed: false, // 修改标志
      strokeStyle: '#0000ff', // 矩形框颜色
      lineWidth: '2', // 矩形框宽度
      fillStyle: 'rgb(255,0,0,0.5)'
    }
  },
  watch: {
    'imgSrc': function () {
      this.show()
    }
  },
  mounted () {
    this.show()
  },

  methods: {
    // 取消时返回组件调用处所需的数据
    // customClose () {
    //   this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight)
    //   this.$emit('custom', { 'type': 1, 'data': '' })
    // },
    showRect () {
      this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight)

      //      this.customcxt.strokeStyle = '#0000ff' // 矩形框颜色
      // this.customcxt.lineWidth = '2' // 矩形框宽度
      // this.customcxt.fillStyle = 'rgb(255,0,0,0.5)'

      // 保留修改初始值
      this.startX = this.constArr.startx
      this.endX = this.constArr.startx + this.constArr.width
      this.startY = this.constArr.starty
      this.endY = this.constArr.starty + this.constArr.height

      this.customcxt.fillRect(this.constArr.startx, this.constArr.starty, this.constArr.width, this.constArr.height) // 填充矩形
      this.customcxt.strokeRect(this.constArr.startx, this.constArr.starty, this.constArr.width, this.constArr.height) // 绘制矩形
    },
    getInfo () {
      // this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight)
      // 根据绘制进行图片裁剪
      // 没有绘制区域
      if (this.startX === this.endX || this.startY === this.endY) {
        return null
      } else {
        if (this.startX > this.endX) {
          let curX = this.endX
          this.endX = this.startX
          this.startX = curX
        }
        if (this.startY > this.endY) {
          let curY = this.endY
          this.endY = this.startY
          this.startY = curY
        }
        let arr = [
          { x: this.startX, y: this.startY },
          { x: this.endX, y: this.startY },
          { x: this.endX, y: this.endY },
          { x: this.startX, y: this.endY }
        ]

        let obj = arr.length ? {
          detectPoint: arr.map((dd) => {
            return {
              x: Number.parseFloat(dd.x / this.DivWidth).toFixed(3),
              y: Number.parseFloat(dd.y / this.DivHeight).toFixed(3)
            }
          }),
          maskPoint: {
            startx: this.startX,
            starty: this.startY,
            width: this.endX - this.startX,
            height: this.endY - this.startY
          }
        } : null
        return obj
      }
    },
    // dialog展示自定义矩形框画板，计算img与canvas标签自适应图片的大小
    show () {
      vue.nextTick(_ => {
        let customCanvas = this.$refs.drawCanvas// canvas显示层
        this.customcxt = customCanvas.getContext('2d')
        let img = new Image()
        // img.src = this.imgSrc
        img.setAttribute('crossOrigin', 'anonymous')
        img.src = `data:image/jpeg;base64,${this.imgSrc}`
        // let that = this
        img.onload = () => {
          // let canvasleft = 0
          // let canvastop = 0
          // let WrH = img.width / img.height // 图片宽高比
          // let RWrH = that.DivWidth / that.DivHeight // 放置图片DIV的宽高比
          // let aa = 0
          // 根据宽高比大小判断确定自适应的宽和高
          // if (RWrH > WrH) {
          //   aa = that.DivHeight / img.height
          //   that.canvasHeight = that.DivHeight
          //   that.canvasWidth = img.width * aa
          //   canvasleft = (that.DivWidth - that.canvasWidth) / 2
          // } else {
          //   aa = that.DivWidth / img.width
          //   that.canvasHeight = img.height * aa
          //   that.canvasWidth = that.DivWidth
          //   canvastop = (that.DivHeight - that.canvasHeight) / 2
          // }
          // that.imgstyle = ' position: relative;  width:' + that.canvasWidth + ' px; height:' + that.canvasHeight + 'px' // img浮动定位居中显示
          // that.imgstyle = 'position: relative;  width:640px; height:380px;' // img浮动定位居中显示
          // that.customRwidth = that.canvasWidth / img.width // 原图与展示图片的宽高比
          // that.customRheight = that.canvasHeight / img.height

          // that.canvasstyle = 'position: absolute;left: ' + canvasleft + '; top: ' + canvastop + ';' // canvas浮动定位
          // that.canvasstyle = '' // canvas浮动定位

          this.customcxt.strokeStyle = this.strokeStyle
          this.customcxt.lineWidth = this.lineWidth
          this.customcxt.fillStyle = this.fillStyle

          if (!this.hasDrawed && !!this.$store.state.taskInfo) {
            this.showRect()
            this.hasDrawed = !this.hasDrawed
          }
        }
      })
    },
    // 鼠标按下时执行
    mousedown (e) {
      this.isMouseDownInCanvas = true
      // 鼠标按下时开始位置与结束位置相同 防止鼠标在画完矩形后 点击图画形成第二个图形
      this.endX = e.offsetX
      this.endY = e.offsetY
      this.startX = e.offsetX
      this.startY = e.offsetY
      this.mousemove(e)
    },
    // 鼠标移动式时执行
    mousemove (e) {
      if (this.isMouseDownInCanvas) { // 当鼠标有按下操作时执行
        this.endX = e.offsetX
        this.endY = e.offsetY
        let wwidth = this.endX - this.startX
        let wheigth = this.endY - this.startY

        // 清除指定区域的所有像素
        this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight)
        this.customcxt.fillRect(this.startX, this.startY, wwidth, wheigth) // 绘制矩形
        this.customcxt.strokeRect(this.startX, this.startY, wwidth, wheigth) // 绘制矩形
      }
    },
    // 鼠标松开时执行
    mouseup (e) {
      this.isMouseDownInCanvas = false
    },

    mouseleave (e) {
      this.isMouseDownInCanvas = false
    }

  }
}
</script>
<style lang="less">
.canvas-style {
  position: absolute;
  left: 0px;
  top: 0px;
}
.canvas-div {
  width: 640px;
  height: 380px;
  margin: 0 auto;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
.img-style {
  position: relative;
  width: 640px;
  height: 380px;
}
</style>
