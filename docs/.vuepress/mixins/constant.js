export default {
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    /** 
     * javascript comment 
     * @Author: zouxiumei 
     * @Date: 2019-09-16 16:18:55 
     * @Desc: 补齐2位时间
     */
    timeStr (str) {
      return String(str).length === 2 ? str : `0${str}`
    }
  }
}