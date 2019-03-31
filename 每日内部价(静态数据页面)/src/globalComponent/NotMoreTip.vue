<template>
  <div class="not-more" v-show="visible">
    <div class="tip">没有更多内容了</div>
  </div>
</template>

<script>
export default {
  name: "NotMore",
  props:['visible'],
  data() {
    return {
      
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
    });
  },
  methods: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.not-more {
  .tip{
    line-height: 3;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
