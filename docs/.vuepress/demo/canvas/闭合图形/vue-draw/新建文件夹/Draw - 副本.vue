<template>
<div>
    <div>
      <el-button @click="undo()">撤销</el-button>
      <el-button @click="clear_canvas()">清除</el-button>
      <el-button @click="showPic">回显图形</el-button>
    </div>
    <canvas
      :id="'drawTest'"
      :class="'draw-canvas'"
      :width="width"
      :height="height"
      :style="{'width':`${width}px`,'height':`${height}px`}"
      @mousedown="point_it($event)"
      @contextmenu.prevent="() =>show()">
      Your browser does not support the HTML5 canvas tag.
    </canvas>
    <div>
        <p><strong>Coordinates:</strong></p>
        <textarea id="coordinates" style="width:300px; height:200px;"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: { // 图片路径
      type: String
    },
    width: { // 绘图区域宽度
      type: String
    },
    height: { // 绘图区域高度
      type: String
    },
    // lineColor: { // 画笔颜色
    //   type: String,
    //   default: 'white'
    // },
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
    closeStrokeStyle: { // 画笔颜色
      type: String,
      default: 'blue'
    },
    lineCap: { // 线帽的样式
      type: String,
      default: 'square'
    },
    constArr: {
      type: Array,
      default: [{ 'x': 337, 'y': 198 }, { 'x': 446, 'y': 261 }, { 'x': 338, 'y': 350 }, { 'x': 221, 'y': 285 }, { 'x': 213, 'y': 161 }, { 'x': 314, 'y': 102 }, { 'x': 394, 'y': 150 }, { 'x': 334, 'y': 177 }, { 'x': 286, 'y': 219 }]
    }
    // lineType: { // 画笔类型
    //   type: String,
    //   default: 'circle'
    // }
  },
  data () {
    return {
      radom: 'drawTest',
      context: {}, // canvas对象
      drawCanvas: null, // canvas画布
      // canvasMoveUse: false,  // 是否处于绘制状态
      img: new Image(), // 背景图片缓存
      perimeter: [], // 储存坐标信息
      complete: false,
      popArr: []
      // constArr: [{ 'x': 337, 'y': 198 }, { 'x': 446, 'y': 261 }, { 'x': 338, 'y': 350 }, { 'x': 221, 'y': 285 }, { 'x': 213, 'y': 161 }, { 'x': 314, 'y': 102 }, { 'x': 394, 'y': 150 }, { 'x': 334, 'y': 177 }, { 'x': 286, 'y': 219 }]
    }
  },
  mounted () {
    this.initDraw()
  },
  methods: {
    showPic () {
      this.initDraw(true, true)
    },
    /**
     * @Author: zouxiumei
     * @Date: 2019-09-26 16:49:10
     * @Params: flag:撤销，editShow：回显
     * @Desc: 初始化绘制信息
     */
    initDraw (flag = false, editShow = false) {
      // 初始化画布
      this.drawCanvas = document.getElementById(this.radom)
      this.context = this.drawCanvas.getContext('2d')
      // 初始化背景图片
      this.img.setAttribute('crossOrigin', 'Anonymous')
      this.img.src = this.url
      this.img.onerror = () => {
        var timeStamp = +new Date()
        this.img.src = this.url + '?' + timeStamp
      }
      this.img.onload = () => {
        this.clean()
        this.context.lineWidth = this.lineWidth
        this.context.strokeStyle = this.strokeStyle
        this.context.lineCap = this.lineCap
        this.context.fillStyle = this.fillStyle
        this.context.beginPath()

        // 撤销
        if (flag && !editShow) {
          this.perimeter = this.popArr
          this.draw(false)
        }
        // 回显
        if (editShow) {
          this.perimeter = this.constArr
          this.draw(true)
        }
      }
    },
    point_it ($event) {
      if (this.complete) {
        alert('Polygon already created')
        return false
      }
      let rect
      let x
      let y
      if ($event.ctrlKey || $event.which === 3 || $event.button === 2) {
        if (this.perimeter.length === 2) {
          alert('You need at least three points for a polygon')
          return false
        }
        x = this.perimeter[0]['x']
        y = this.perimeter[0]['y']
        if (this.check_intersect(x, y)) {
          alert('The line you are drowing intersect another line')
          return false
        }
        this.draw(true)
        alert('Polygon closed')
        $event.preventDefault()
        return false
      } else {
        rect = this.drawCanvas.getBoundingClientRect()
        x = $event.clientX - rect.left
        y = $event.clientY - rect.top
        if (this.perimeter.length > 0 && x === this.perimeter[this.perimeter.length - 1]['x'] && y === this.perimeter[this.perimeter.length - 1]['y']) {
          // same point - double click
          return false
        }
        if (this.check_intersect(x, y)) {
          alert('The line you are drowing intersect another line')
          return false
        }
        this.perimeter.push({ 'x': x, 'y': y })
        this.draw(false)
        return false
      }
    },
    draw (end) {
      for (let i = 0; i < this.perimeter.length; i++) {
        if (i === 0) {
          this.context.moveTo(this.perimeter[i]['x'], this.perimeter[i]['y'])
          end || this.point(this.perimeter[i]['x'], this.perimeter[i]['y'])
        } else {
          this.context.lineTo(this.perimeter[i]['x'], this.perimeter[i]['y'])
          end || this.point(this.perimeter[i]['x'], this.perimeter[i]['y'])
        }
      }
      if (end) {
        this.context.lineTo(this.perimeter[0]['x'], this.perimeter[0]['y'])
        this.context.closePath()
        this.context.fillStyle = this.fillStyle
        this.context.fill()
        this.context.strokeStyle = this.closeStrokeStyle
        this.complete = true
      }
      this.context.stroke()

      // print coordinates
      if (this.perimeter.length === 0) {
        document.getElementById('coordinates').value = ''
      } else {
        document.getElementById('coordinates').value = JSON.stringify(this.perimeter)
      }
    },
    line_intersects (p0, p1, p2, p3) {
      let s1_x
      let s1_y
      let s2_x
      let s2_y
      s1_x = p1['x'] - p0['x']
      s1_y = p1['y'] - p0['y']
      s2_x = p3['x'] - p2['x']
      s2_y = p3['y'] - p2['y']

      let s
      let t
      s = (-s1_y * (p0['x'] - p2['x']) + s1_x * (p0['y'] - p2['y'])) / (-s2_x * s1_y + s1_x * s2_y)
      t = (s2_x * (p0['y'] - p2['y']) - s2_y * (p0['x'] - p2['x'])) / (-s2_x * s1_y + s1_x * s2_y)

      if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        // Collision detected
        return true
      }
      return false // No collision
    },
    check_intersect (x, y) {
      if (this.perimeter.length < 4) {
        return false
      }
      let p0 = []
      let p1 = []
      let p2 = []
      let p3 = []

      p2['x'] = this.perimeter[this.perimeter.length - 1]['x']
      p2['y'] = this.perimeter[this.perimeter.length - 1]['y']
      p3['x'] = x
      p3['y'] = y

      for (let i = 0; i < this.perimeter.length - 1; i++) {
        p0['x'] = this.perimeter[i]['x']
        p0['y'] = this.perimeter[i]['y']
        p1['x'] = this.perimeter[i + 1]['x']
        p1['y'] = this.perimeter[i + 1]['y']
        if (p1['x'] === p2['x'] && p1['y'] === p2['y']) { continue }
        if (p0['x'] === p3['x'] && p0['y'] === p3['y']) { continue }
        if (this.line_intersects(p0, p1, p2, p3) === true) {
          return true
        }
      }
      return false
    },
    point (x, y) {
      this.context.fillRect(x - 2, y - 2, 4, 4)
      this.context.moveTo(x, y)
    },
    // 获取坐标信息
    getInfo () {
      return this.perimeter
    },
    // 清空画布
    clean (flag) {
      this.context.drawImage(this.img, 0, 0, this.width, this.height)
      this.perimeter = []
    },
    show () {
      return false
    },
    /** 
     * @Author: zouxiumei 
     * @Date: 2019-09-26 17:12:57 
     * @Desc: 撤销 
     */    
    undo () {
      this.context = null
      this.perimeter.pop()
      this.popArr = this.perimeter
      this.complete = false
      this.initDraw(true)
    },    
    clear_canvas () {
      this.context = null
      this.perimeter = []
      this.complete = false
      document.getElementById('coordinates').value = ''
      this.initDraw()
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
