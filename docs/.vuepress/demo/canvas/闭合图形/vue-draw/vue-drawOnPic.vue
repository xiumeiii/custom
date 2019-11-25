<template>
  <div>
    <div class="setting-privacy-canvas">
      <div class="setting-canvas-box" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}">
        <img :src="pic" class="canvas-img">
        <!-- area是区域 -->
        <div
          class="area"
          v-for="(item, index) in area"
          :key="index"
          :class="{active: item.active}"
          :style="{top: item.top + 'px', left: item.left + 'px', width: item.right - item.left + 'px', height: item.bottom - item.top + 'px'}">
        </div>
        <!-- mask是画板 -->
        <!-- area始终放置在画板下方，是为了放置拖动事件父子元素变动引起的错误 -->
        <div class="mask" @mousedown="draw"></div>
      </div>
    </div>
  </div>
</template>

<script>
import action from './action'
export default {
  name: 'VueDrawOnPic',
  data () {
    return {
      canvasWidth: 704,
      canvasHeight: 576,
      pic: '',
      area: []
    }
  },
  methods: {
    getData () {
      action.lala().then(({ data }) => {
        this.pic = data.capturePicUrl
        this.canvasWidth = data.widthScale * 2
        this.canvasHeight = data.heightScale * 2
        this.area = data.areas.filter(item => item.left || item.right || item.top || item.bottom).slice()
      }).catch(err => {
        console.error(err)
      })
    },
    save () {
      if (this.area.length === 0) {
        this.area.push({
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        })
      }
      action.lala({
        areas: this.area
      }).then(() => {

      }).catch(err => {
        console.error(err)
      })
    },
    draw (e) {
      // 只能画一个框
      this.clear()
      var _area = {
        top: e.offsetY,
        left: e.offsetX,
        right: e.offsetX,
        bottom: e.offsetY
      }
      this.area.push(_area)
      document.onmousemove = (event) => {
        let _offsetX = Math.abs(event.clientX - e.clientX)
        let _offsetY = Math.abs(event.clientY - e.clientY)
        // 如果event.offsetX > e.offsetX说明是向右滑动，反之向左
        if (event.clientX > e.clientX) {
          // 碰撞检测：如果向右划出边框，则是最右边框
          this.area[0].right = _offsetX > this.canvasWidth - e.offsetX ? this.canvasWidth : e.offsetX + _offsetX
        } else {
          // 碰撞检测：如果向左划出边框，则是最左边框
          this.area[0].left = _offsetX > e.offsetX ? 0 : e.offsetX - _offsetX
        }
        // 如果event.offsetY > e.offsetY说明是向下滑动，反之向上
        if (event.clientY > e.clientY) {
          // 碰撞检测：如果向下划出边框，则是最下边框
          this.area[0].bottom = _offsetY > this.canvasHeight - e.offsetY ? this.canvasHeight : e.offsetY + _offsetY
        } else {
          // 碰撞检测：如果向上划出边框，则是最上边框
          this.area[0].top = _offsetY > e.offsetY ? 0 : e.offsetY - _offsetY
        }
        this.area[0].active = true
      }
      document.onmouseup = () => {
        // 如果画出的框是一条线或者一个点，视为无效操作，剔除
        if (this.area[0].top - this.area[0].bottom === 0 ||
          this.area[0].right - this.area[0].left === 0) {
          this.area.splice(0, 1)
        }
        document.onmousemove = document.onmouseup = null
      }
    },
    clear () {
      let length = this.area.length
      this.area.splice(0, length)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.noselect {
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.page-card-main {
  width: 704px;
  padding-bottom: 40px;
  margin: 40px auto;
}
.sensitive-box {
  margin-top: -4px;
  .sensitive-box-checkbox {
    width: 60px;
  }
  .el-button {
    margin-left: 8px;
  }
}
.setting-privacy-canvas {
  .setting-canvas-box {
    width: 704px;
    height: 576px;
    margin: 8px 0;
    background: #aaa;
    position: relative;
    overflow: hidden;
    .canvas-img {
      width: 100%;
      height: 100%;
      border: 1px solid #000;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      cursor: crosshair;
      .noselect;
    }
    .area {
      position: absolute;
      z-index: 0;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: default;
      &.active {
        border: 1px dashed #ffd100;
      }
    }
  }
  .setting-canvas-tips span {
    margin: 8px 0;
    color: #999;
    &::before {
      content: "* ";
      color: #ff0000;
    }
  }
}
</style>
