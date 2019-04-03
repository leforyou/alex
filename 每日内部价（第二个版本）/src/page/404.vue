<template>
  <div class="not-find-page">
    没找到相关的内容404
  </div>
</template>

<script>
export default {
  name: 'notFind',
  data () {
    return {
      msg: '404'
    }
  },
  mounted() {
    this.$nextTick(function () {
      // DOM 现在更新了
    });
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.not-find-page{

}
</style>
