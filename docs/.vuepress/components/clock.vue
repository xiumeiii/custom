<template>
  <div class="clock">
    当前时间：<span>{{clockTime}}</span>
  </div>
</template>

<script>
import constant from '../mixins/constant.js'
export default {
  name: 'clock',
  mixins: [constant],
  data () {
    return {
      clockTime: '啦啦啦',
      interval: ''
    }
  },
  methods: {
    startTime () {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      m = this.timeStr(m)
      s = this.timeStr(s)
      this.clockTime = `${h}:${m}:${s}`
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.startTime()
    }, 1000)
  },
  destroyed () {
    // 清除定时器
    clearInterval(this.interval)
  }
}
</script>
<style>
.clock span {
  color: red;
}
</style>