  # vue 玩玩
  
  <template>
    <demo-1 v-model="aaa" placeholder="请输入">
    </demo-1>
  </template>

  
<script>
  export default {
    data() {
      return {
        aaa:'大发送到'
      }
    },
    create(){
      console.log('aaa',this.aaa)
    }
  }
</script>