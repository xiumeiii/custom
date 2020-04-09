<template>
  <date-picker v-model="range" type="daterange" :clearable="false"></date-picker>
</template>

<script>
import { time, dateFormat } from '/dateTime'

export default {
  name: 'Child',

  props: ['value'],

  computed: {
    range: {
      get () {
        // 获取props传过来的value属性,经过处理赋给range
        const { start, end } = this.value
        return [time(start), time(end)]
      },

      set (val) {
        // 更新Parent里面的value,Parent里面的value标志为sync异步更新
        this.$emit('update:value', {
          start: dateFormat(val[0], 'YYYY-MM-DD'),
          end: dateFormat(val[1], 'YYYY-MM-DD')
        })
      }
    }
  }
}
</script>

<style>

</style>
