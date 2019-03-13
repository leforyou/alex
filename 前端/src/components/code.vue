<template>
  <div class="wrap">
    <div class="ico-box" @click="show">
      <img src="../../static/img/h5_icon_erweima.png">
    </div>
    <div class="code" :class="{'active':isActive}">
      <div class="box main-width">
        <div class="wxcode">
          <img src="../../static/img/code.jpg">
        </div>
        <div class="save-tip fz24">截图保存二维码</div>
        <div class="friend fz28">识别二维码加攻略君好友获取更多福利</div>
        <div class="btn fz32" @click="hide">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "code",
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
    });
  },
  methods: {
    hide() {
      this.isActive = false;
    },
    show() {
      this.isActive = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap{
  .ico-box {
    min-width: 0.6rem;
    margin-left: 0.28rem;
    cursor: pointer;
    img {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .code {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #ffffff, $alpha: 0.95);
    z-index: 9999999;
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden;
    &.active {
      opacity: 1;
      visibility: visible;
    }
    .box {
      overflow: auto;
      height: 100%;
      .wxcode {
        padding-top: 1.2rem;
        text-align: center;
        img {
          width: 4rem;
          height: 4rem;
        }
      }
      .save-tip {
        padding: 0.5rem;
        text-align: center;
      }
      .friend {
        text-align: center;
      }
      .btn {
        margin-top: 1.2rem;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fa5826;
        border: 0.01rem solid #fa5826;
        border-radius: 0.08rem;
        cursor: pointer;
      }
    }
  }
}

</style>
