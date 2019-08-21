<template>
  <div class="home-right-image">
   {{msg}}
   <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'demo-1',
  data () {
    return {
      msg: '测试中。。。',
    }
  }
}
</script>