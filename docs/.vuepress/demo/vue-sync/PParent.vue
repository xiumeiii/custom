<template>
  <parent ref="group" v-model="holidayTime" :error-tips="'时段之间不能重合'"></parent>
</template>

<script>
import Parent from './Parent'
import moment from 'moment'
export default {
  name: 'PParent',

  components: {
    Parent
  },
  data () {
    return {
      holidayTime: [{
        startTime: moment().format('YYYY-MM-DD'),
        endTime: moment().add(1, 'day').format('YYYY-MM-DD')
      }],
    }
  }
}
</script>

