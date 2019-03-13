<template>
  <div class="home-page">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
//import HelloWorld from "./../components/HelloWorld";
export default {
  name: 'home',
  data () {
    return {
      msg: '这是首页'
    }
  },
  components: {
    
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
    });
  },
  methods: {
    
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-page{

}
</style>


<style lang="scss">
.home-page{

}
</style>
