<template>
  <div class="loading" :class="{'active':visible}">
    <div class="box">
        <div class="content">
          <div class="title">信息提示</div>
          <div class="desc ellipsis5">{{message}}</div>
        </div>
        <div class="foot-btn">
          <div class="sure" @click="close">确定</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      visible: false,
      message:''
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
    });
  },
  methods: {
    close() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.ellipsis5 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
}
.loading{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2147483647;
  background-color: rgba(0, 0, 0, 0.6);
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}
.loading.active{
  opacity: 1;
  visibility: visible;
}
.loading .box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  max-width: 300px;
  background-color: #fff;
  border-radius: 5px;
}
.loading .box .content{
  padding: 20px 25px;
}
.loading .box .content .title{
  font-size: 18px;
  font-weight: 700;
  color: #222;
  text-align: center;
  line-height: normal;
  margin-bottom: 10px;
}
.loading .box .content .desc{
  font-size: 16px;
  color: #888;
  line-height: normal;
  text-align: center;
}
.loading .box .foot-btn{
  position: relative;
  line-height: normal;
}
.loading .box .foot-btn:before{
  content: '';
  display: block;
  height: 1px;
  background-color: #E5E5E5;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
.loading .box .foot-btn .sure{
  padding: 15px 5px;
  font-size: 20px;
  font-weight: 700;
  color: #576591;
  text-align: center;
  line-height: normal;
}
</style>
