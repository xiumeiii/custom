
<template>
  <transition
    enter-active-class="fadeIn"
    leave-active-class="fadeOut"
  >
    <div
      v-if="currentVisible"
      class="img-viewer"
    >
      <!-- 灰色背景 -->
      <div class="img-viewer__background"></div>
      <div
        class="img-viewer__container"
        @click="clickModal"
      >
        <!-- 标题 -->
        <div class="img-viewer__head">
          <div class="img-viewer__title">{{viewImgInfo.title}}</div>
          <div class="img-viewer__detail">
            <span
              v-for="(item, index) of viewImgInfo.details"
              :key="item"
            >
              <div
                class="img-viewer__dividing"
                v-if="index"
              ></div>
              <span>{{item}}</span>
            </span>
          </div>
        </div>
        <div class="img-viewer__main">
          <!-- 图片 -->
          <div
            v-for="(imgInfo, index) of imgList"
            :key="index"
            class="img-viewer__trans"
            :class="transClassList[index]"
          >
            <div
              class="img-viewer__imgbox"
              :class="{'img-viewer__imgbox_left': imgInfo.idUrl && !single}"
            >
              <img
                :src="imgInfo.url"
                @load="getStandardImgStyle($event, index)"
              >
            </div>
            <div
              v-if="imgInfo.idUrl && !single"
              class="img-viewer__imgbox img-viewer__imgbox_right"
            >
              <img
                ref="compare"
                :src="imgInfo.idUrl"
              >
            </div>
            <!-- 标签 -->
            <template v-if="imgInfo.idUrl && !single">
              <el-tag
                color="#2196F3"
                class="img-viewer__tag img-viewer__tag_left"
              >{{$t('batteryCar.predeal')}}</el-tag>
              <el-tag
                color="#02BF0F"
                class="img-viewer__tag img-viewer__tag_right"
              >{{$t('batteryCar.afterdeal')}}</el-tag>
            </template>
          </div>
          <!-- 翻页按钮 -->
          <!-- <button
            class="img-viewer__btn img-viewer__btn_prev"
            :class="{disabled: !prevEnable}"
            :disabled="!prevEnable"
            @click="prev"
          >
            <i class="h-icon-angle_left"></i>
          </button> -->
          <!-- <button
            class="img-viewer__btn img-viewer__btn_next"
            :class="{disabled: !nextEnable}"
            :disabled="!nextEnable"
            @click="next"
          >
            <i class="h-icon-angle_right"></i>
          </button> -->
          <slot name="buttomBtn"></slot>
        </div>
        <!-- 关闭按钮 -->
        <button
          class="img-viewer__btn img-viewer__btn_close"
          @click="currentVisible=false"
        >
          <i class="h-icon-close"></i>
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
// 引用
// <img-viewer
//   :visible.sync="imgViewVisible"
//   :data="imgData"
//   :single="singleImg"
//   :index="imgIndex">
//   <template slot="buttomBtn">
//     <div class="img-viewer__bottom_btn" v-show="selectRow.operationstatus !== null">
//       <p @click=""><span class="icon-btn"></span>{{adsfasdf}}</p>
//       <p @click=""><span class="icon-btn"></span>{{fsadfasdf}}</p>
//   </div>
//   </template>
// </img-viewer>

// imgData () {
//   return [{
//     url: this.singleImg ? this.selectRow.imageurl : this.selectRow.appstatus,
//     title: this.$t('batteryCar.eventSource'),
//     details: [
//       this.selectRow.recvtimeString,
//       this.selectRow.regionindexcode,
//       EVENTSTATUS[String(this.selectRow.processingstatus)],
//       this.selectRow.processingoptions].filter(n => n),
//     idUrl: this.singleImg ? '' : this.selectRow.appstatusafter
//   }]
// }
export default {
  name: 'ImgViewer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    /**
    * data数组内对象属性包括
    * url：抓拍图地址
    * title：标题
    * details：详情，数组
    * idUrl: 证件照图片地址
    */
    data: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    single: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentIndex: this.index,
      transiting: false,
      direction: ''
    }
  },
  computed: {
    currentVisible: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
        this.$emit('input', val)
      }
    },
    /**
    * 使用3张图片实现切换动画，当currentIndex改变时，imgList内数据按以下规则变动
    * currentIndex     imgList
    * 0                [0, 0, 1]
    * 1                [2, 0, 1]
    * 2                [2, 3, 1]
    * 3                [2, 3, 4]
    * 4                [5, 3, 4]
    * 5                [5, 6, 4]
    */
    imgList () {
      let index0 = Math.max(Math.min(Math.floor((this.currentIndex + 2) / 3) * 3 - 1, this.data.length - 1), 0)
      let index1 = Math.max(Math.min(Math.floor((this.currentIndex + 1) / 3) * 3, this.data.length - 1), 0)
      let index2 = Math.max(Math.min(Math.floor(this.currentIndex / 3) * 3 + 1, this.data.length - 1), 0)
      return [this.data[index0], this.data[index1], this.data[index2]]
    },
    /**
    * 当前展示图位于imgList的位置，总是imgList内中间数字下标
    */
    viewIndex () {
      return (this.currentIndex + 1) % 3
    },
    viewImgInfo () {
      return this.imgList[this.viewIndex]
    },
    /**
    * 控制图片位置，展示图总是在中间，展示图左边的在左边，右边的在右边，循环考虑。使用加号避免出现负号
    */
    transClassList () {
      let viewIndex = this.viewIndex
      let list = []
      list[viewIndex] = ''
      list[(viewIndex + 2) % 3] = 'trans--left'
      list[(viewIndex + 1) % 3] = 'trans--right'
      return list
    },
    nextEnable () {
      return this.currentIndex < this.data.length - 1
    },
    prevEnable () {
      return this.currentIndex !== 0
    }
  },
  watch: {
    currentVisible (val) {
      if (val) this.currentIndex = this.index
    }
  },
  methods: {
    // 下一张
    next () {
      if (this.nextEnable) {
        this.currentIndex++
      }
    },
    // 上一张
    prev () {
      if (this.prevEnable) {
        this.currentIndex--
      }
    },
    // 设置证件照大小
    getStandardImgStyle (event, index) {
      if (this.$refs.compare) {
        let copmareDom = this.$refs.compare[index]
        if (copmareDom) {
          copmareDom.style.height = event.target.naturalHeight + 'px'
          copmareDom.style.display = 'block'
        }
      }
    },
    // 点击蒙层------事件冒泡
    clickModal (e) {
      if (e.target === e.currentTarget) {
        this.currentVisible = false
      }
    },
    // 键盘事件
    keyupEvent (e) {
      if (!this.currentVisible) return
      if (e.keyCode === 37) {
        this.prev()
        return
      }
      if (e.keyCode === 39) {
        this.next()
        return
      }
      if (e.keyCode === 27) {
        this.currentVisible = false
      }
    }
  },
  mounted () {
    addEventListener('keyup', this.keyupEvent)
  },
  beforeDestroy () {
    removeEventListener('keyup', this.keyupEvent)
  }
}
</script>
<style lang="less" scoped>
.img-viewer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
}
.img-viewer__background {
  background-color: rgba(26, 26, 26, 0.9);
  width: 100%;
  height: 100%;
}
.img-viewer__container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 32px 24px 0;
}
.img-viewer__title {
  font-size: 16px;
  line-height: 24px;
  color: white;
}
.img-viewer__detail {
  color: rgba(255, 255, 255, 0.7);
  line-height: 20px;
}
.img-viewer__dividing {
  position: relative;
  top: 2px;
  display: inline-block;
  width: 1px;
  height: 12px;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.7);
}
.img-viewer__main {
  position: absolute;
  top: 96px;
  right: 24px;
  bottom: 152px;
  left: 24px;
}
.img-viewer__trans {
  position: absolute;
  top: 0;
  right: 72px;
  bottom: 0;
  left: 72px;
  transition: all 0.5s;
}
.img-viewer__imgbox {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  img {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    max-height: 100%;
    max-width: 100%;
    user-select: none;
  }
}
.img-viewer__imgbox_left {
  right: 50%;
  img {
    margin-right: 4px;
  }
}
.img-viewer__imgbox_right {
  left: 50%;
  img {
    margin-left: 4px;
    display: none;
  }
}
.img-viewer__tag {
  position: absolute;
  top: 20px;
}
.img-viewer__tag_left {
  right: calc(~"50% + 10px");
}
.img-viewer__tag_right {
  left: calc(~"50% + 10px");
}
.img-viewer__btn {
  opacity: 0.7;
  transition: all 0.5s;
  color: white;
  cursor: pointer;
  z-index: 1;
  &:hover {
    opacity: 0.9;
  }
}
.img-viewer__btn_prev,
.img-viewer__btn_next {
  position: absolute;
  width: 72px;
  height: 100%;
  font-size: 72px;
  background-color: transparent;
  &.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
.img-viewer__btn_next {
  right: 0;
}
.img-viewer__btn_close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  line-height: 46px;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
}

.fadeIn {
  animation: fadeIn 0.3s;
}
.fadeOut {
  animation: fadeIn 0.3s reverse;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.trans--right {
  transform: translateX(150%);
  opacity: 0;
}
.trans--left {
  transform: translateX(-150%);
  opacity: 0;
}
</style>
