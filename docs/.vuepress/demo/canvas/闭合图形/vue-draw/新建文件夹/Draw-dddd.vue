<template>
<div>
    <div>
      <el-button @click="clear_canvas()">{{$t('frs.ui.plan.clearAll')}}</el-button>
    </div>
    <canvas
      ref="canvas"
      :id="'drawTest'"
      :class="'draw-canvas'"
      :width="width"
      :height="height"
      :style="{'width':`${width}px`,'height':`${height}px`}"
      @mouseover="onmouseleave"
      @mouseenter="onmouseenter">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  </div>
</template>

<script>
export default {
  props: {
    url: { // 图片路径
      type: String
    },
    width: { // 绘图区域宽度
      type: String,
      default: '640'
    },
    height: { // 绘图区域高度
      type: String,
      default: '380'
    },
    lineWidth: { // 画笔宽度
      type: Number,
      default: 1
    },
    strokeStyle: { // 画笔颜色
      type: String,
      default: 'red'
    },
    fillStyle: { // 画笔颜色
      type: String,
      default: 'rgba(255, 0, 0, 0.5)'
    },
    constArr: {
      type: Array,
      default: () => {
        // return [{ 'x': 337, 'y': 198 }, { 'x': 446, 'y': 261 }, { 'x': 338, 'y': 350 }, { 'x': 221, 'y': 285 }, { 'x': 213, 'y': 161 }, { 'x': 314, 'y': 102 }, { 'x': 394, 'y': 150 }, { 'x': 334, 'y': 177 }, { 'x': 286, 'y': 219 }]
        return []
      }
    }
  },
  data () {
    return {
      radom: 'drawTest',
      context: {}, // canvas对象
      drawCanvas: null, // canvas画布
      img: new Image(), // 背景图片缓存
      perimeter: [], // 储存坐标信息
      complete: false,
      popArr: [],
      startx: 0, // 起始x坐标
      starty: 0, // 起始y坐标
      flag: 1, // 是否点击鼠标的标志
      x: 0,
      y: 0,
      leftDistance: 0,
      topDistance: 0,
      op: 0, // 操作类型 0 无操作 1 画矩形框 2 拖动矩形框
      layers: [], // 图层
      currentR: {}
    }
  },
  mounted () {
    this.drawImg()
  },
  watch: {
    url: {
      handler (val) {
        val && this.drawImg()
      },
      deep: true
    }
  },
  methods: {
    /**
     * @Author: zouxiumei
     * @Date: 2019-10-08 14:00:42
     * @Desc: 展示区域图片
     */
    drawImg () {
      if (this.$store.state.taskInfo) {
        this.showPic()
      } else {
        this.initDraw()
      }
    },
    showPic () {
      this.initDraw(true, true)
    },
    /**
     * @Author: zouxiumei
     * @Date: 2019-09-26 16:49:10
     * @Params: this.flag:撤销，editShow：回显
     * @Desc: 初始化绘制信息
     */
    initDraw (flag = false, editShow = false) {
      // 初始化画布
      this.drawCanvas = document.getElementById(this.radom)
      this.context = this.drawCanvas.getContext('2d')
      // 初始化背景图片
      this.img.setAttribute('crossOrigin', 'anonymous')
      if (this.url) {
        this.img.src = `data:image/jpeg;base64,${this.url}`
        this.img.onerror = (err) => {
          console.error(err)
        }
        this.img.onload = () => {
      console.log('ddd')
          // 回显
          if (editShow) {
          }
        }
      }
    },
    clear_canvas () {
      this.context = null
      this.perimeter = []
      this.complete = false
      this.initDraw()
    },
    resizeLeft (rect) {
      this.drawCanvas.style.cursor = 'w-resize'
      if (this.flag && this.op === 0) { this.op = 3 }
      if (this.flag && this.op === 3) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x1 = this.x
        this.currentR.width = this.currentR.x2 - this.currentR.x1
      }
    },
    resizeTop (rect) {
      this.drawCanvas.style.cursor = 's-resize';
      if (this.flag && this.op === 0) { this.op = 4 }
      if (this.flag && this.op === 4) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.y1 = this.y
        this.currentR.height = this.currentR.y2 - this.currentR.y1
      }
    },
    resizeWidth (rect) {
      this.drawCanvas.style.cursor = 'w-resize';
      if (this.flag && this.op === 0) { this.op = 5 }
      if (this.flag && this.op === 5) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x2 = this.x
        this.currentR.width = this.currentR.x2 - this.currentR.x1
      }
    },
    resizeHeight (rect) {
      this.drawCanvas.style.cursor = 's-resize'
      if (this.flag && this.op === 0) { this.op = 6 }
      if (this.flag && this.op === 6) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.y2 = this.y
        this.currentR.height = this.currentR.y2 - this.currentR.y1
      }
    },

    resizeLT (rect) {
      this.drawCanvas.style.cursor = 'se-resize'
      if (this.flag && this.op === 0) { this.op = 7 }
      if (this.flag && this.op === 7) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x1 = this.x
        this.currentR.y1 = this.y
        this.currentR.height = this.currentR.y2 - this.currentR.y1
        this.currentR.width = this.currentR.x2 - this.currentR.x1
      }
    },
    resizeWH (rect) {
      this.drawCanvas.style.cursor = 'se-resize'
      if (this.flag && this.op === 0) { this.op = 8 }
      if (this.flag && this.op === 8) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x2 = this.x
        this.currentR.y2 = this.y
        this.currentR.height = this.currentR.y2 - this.currentR.y1
        this.currentR.width = this.currentR.x2 - this.currentR.x1
      }
    },
    resizeLH (rect) {
      this.drawCanvas.style.cursor = 'ne-resize'
      if (this.flag && this.op === 0) { this.op = 9 }
      if (this.flag && this.op === 9) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x1 = this.x
        this.currentR.y2 = this.y
        this.currentR.height = this.currentR.y2 - this.currentR.y1
        this.currentR.width = this.currentR.x2 - this.currentR.x1
      }
    },
    resizeWT (rect) {
      this.drawCanvas.style.cursor = 'ne-resize'
      if (this.flag && this.op === 0) { this.op = 10 }
      if (this.flag && this.op === 10) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x2 = this.x
        this.currentR.y1 = this.y
        this.currentR.height = this.currentR.y2 - this.currentR.y1
        this.currentR.width = this.currentR.x2 - this.currentR.x1
      }
    },
    reshow (x, y) {
      let allNotIn = 1
      this.layers.forEach(item => {
        this.context.beginPath()
        this.context.rect(item.x1, item.y1, item.width, item.height)
        this.context.strokeStyle = item.strokeStyle
        this.context.fillStyle = 'rgb(255,0,0,0.3)'
        this.context.fill()
        if (x >= (item.x1 - 25) && x <= (item.x1 + 25) && y <= (item.y2 - 25) && y >= (item.y1 + 25)) {
          this.resizeLeft(item)
        } else if (x >= (item.x2 - 25) && x <= (item.x2 + 25) && y <= (item.y2 - 25) && y >= (item.y1 + 25)) {
          this.resizeWidth(item)
        } else if (y >= (item.y1 - 25) && y <= (item.y1 + 25) && x <= (item.x2 - 25) && x >= (item.x1 + 25)) {
          this.resizeTop(item)
        } else if (y >= (item.y2 - 25) && y <= (item.y2 + 25) && x <= (item.x2 - 25) && x >= (item.x1 + 25)) {
          this.resizeHeight(item)
        } else if (x >= (item.x1 - 25) && x <= (item.x1 + 25) && y <= (item.y1 + 25) && y >= (item.y1 - 25)) {
         this.resizeLT(item)
        } else if (x >= (item.x2 - 25) && x <= (item.x2 + 25) && y <= (item.y2 + 25) && y >= (item.y2 - 25)) {
          this.resizeWH(item)
        } else if (x >= (item.x1 - 25) && x <= (item.x1 + 25) && y <= (item.y2 + 25) && y >= (item.y2 - 25)) {
          this.resizeLH(item)
        } else if (x >= (item.x2 - 25) && x <= (item.x2 + 25) && y <= (item.y1 + 25) && y >= (item.y1 - 25)) {
          this.resizeWT(item)
        }
        if (this.context.isPointInPath(x, y)) {
          this.render(item)
          allNotIn = 0
        }
        this.context.stroke()
      })
      if (this.flag && allNotIn && this.op < 3) {
        this.op = 1
      }
    },
    render (rect) {
      this.drawCanvas.style.cursor = 'move'
      if (this.flag && this.op === 0) { this.op = 2 }
      if (this.flag && this.op === 2) {
        if (!this.currentR) { this.currentR = rect }
        this.currentR.x2 += this.x - this.leftDistance - this.currentR.x1
        this.currentR.x1 += this.x - this.leftDistance - this.currentR.x1
        this.currentR.y2 += this.y - this.topDistance - this.currentR.y1
        this.currentR.y1 += this.y - this.topDistance - this.currentR.y1
      }
    },
    isPointInRetc (x, y) {
      let len = this.layers.length
      for (let i = 0; i < len; i++) {
        if (this.layers[i].x1 < x && x < this.layers[i].x2 && this.layers[i].y1 < y && y < this.layers[i].y2) {
          return this.layers[i]
        }
      }
    },
    fixPosition (position) {
      if (position.x1 > position.x2) {
        let x = position.x1
        position.x1 = position.x2
        position.x2 = x
      }
      if (position.y1 > position.y2) {
        let y = position.y1
        position.y1 = position.y2
        position.y2 = y
      }
      position.width = position.x2 - position.x1
      position.height = position.y2 - position.y1
      return position
    },

    moveDetect (position) {
      position.strokeStyle = '#0000ff'

      // 宽高不变
      if (position.x2 > this.elementWidth) {
        position.x1 = this.elementWidth - position.width
        position.x2 = this.elementWidth
      }
      if (position.x1 <= 0) {
        position.x1 = 0
        position.x2 = position.width
      }
      if (position.y2 > this.elementHeight) {
        position.y1 = this.elementHeight - position.height
        position.y2 = this.elementHeight
      }
      if (position.y1 <= 0) {
        position.y1 = 0
        position.y2 = position.height
      }
      return position
    },

    mousedown (e) {
      this.startx = (e.pageX - this.drawCanvas.offsetLeft)
      this.starty = (e.pageY - this.drawCanvas.offsetTop)
      this.currentR = this.isPointInRetc(this.startx, this.starty)
      if (this.currentR) {
        this.leftDistance = this.startx - this.currentR.x1
        this.topDistance = this.starty - this.currentR.y1
      }
      this.context.strokeRect(this.x, this.y, 0, 0)
      this.context.strokeStyle = '#0000ff'
      this.flag = 1
    },
    mousemove (e) {
      this.x = (e.pageX - this.drawCanvas.offsetLeft)
      this.y = (e.pageY - this.drawCanvas.offsetTop)
      this.context.save()
      this.context.setLineDash([5])
      this.drawCanvas.style.cursor = 'default'
      this.context.clearRect(0, 0, this.elementWidth, this.elementHeight)
      if (this.flag && this.op === 1) {
        this.context.strokeRect(this.startx, this.starty, this.x - this.startx, this.y - this.starty)
      }
      this.context.restore()
      this.reshow(this.x, this.y)
    },
    mouseup (e) {
      if (this.op === 1) {
        // 只允许画一个矩形
        if (this.layers.length) {
          this.currentR = null
          this.flag = 0
          this.reshow(this.x, this.y)
          this.op = 0
          return false
        }
        this.layers.push(this.fixPosition({
          x1: this.startx,
          y1: this.starty,
          x2: this.x,
          y2: this.y,
          strokeStyle: '#0000ff'
        }))
      } else if (this.op === 2) {
        this.layers[0] = this.moveDetect(this.currentR)
      } else if (this.op >= 3) {
        this.fixPosition(this.currentR)
      }
      this.currentR = null
      this.flag = 0
      this.reshow(this.x, this.y)
      this.op = 0
    },
    onmouseleave () {
      this.drawCanvas.onmousedown = null
      this.drawCanvas.onmousemove = null
      this.drawCanvas.onmouseup = null
    },
    onmouseenter (e) {
      this.drawCanvas.onmousedown = this.mousedown(e)
      this.drawCanvas.onmousemove = this.mousemove(e)
      document.onmouseup = this.mouseup(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas {
  cursor: crosshair;
}
.draw-canvas {
  margin-top: 20px;
}
</style>
