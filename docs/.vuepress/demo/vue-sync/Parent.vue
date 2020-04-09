<template>
  <ul class="time-range-group">
    <li v-for="(range, index) in value" :key="index">
      <!-- value标志为sync异步更新，由子组件Child修改后通过set同步，修改value[index]，然后在value值被修改。PParent直接v-model的是value值即可直接获取 -->
      <child :value.sync="value[index]" style="width: 240px;"></child>
      <el-button v-if="value.length>1" class="time-range-remove" icon="icon-base-trashcan" @click="handleRemove(index)"></el-button>
    </li>
    <li>
      <el-button
        icon-border="icon-plus"
        class="add-icon-button"
        :max-width="240"
        style="width: 240px;"
        type="iconButton"
        :disabled="value.length >= 4"
        @click="handleAdd"
      >添加时段</el-button>
    </li>
  </ul>
</template>

<script>
import Child from './Child'
import { time } from '/dateTime'
import moment from 'moment'
export default {
  name: 'Parent',

  components: {
    Child
  },

  props: {
    // value直接作为父组件的v-model属性，可以直接获取
    value: Array,
    errorTips: String
  },

  methods: {
    valid () {
      const clone = this.value.concat()

      clone.sort((a, b) => {
        return time(a.start).getTime() - time(b.start).getTime()
      })

      return clone.every((range, index) => {
        if (index === 0) return true
        if (time(range.start) < time(clone[index - 1].end)) {
          this.$message.error({ message: this.errorTips })
          return false
        } else {
          return true
        }
      })
    },

    handleAdd () {
      this.value.push({
        start: moment().format('YYYY-MM-DD'),
        end: moment().add(1, 'day').format('YYYY-MM-DD')
      })
    },

    handleRemove (index) {
      this.value.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
.time-range-group {
  li {
    margin-bottom: 8px;
    .time-range-remove {
      position: relative;
      top: -2px;
    }
  }
}
</style>
