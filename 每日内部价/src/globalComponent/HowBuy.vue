<template>
  <div class="wrap">
    <div class="buy-tip" @click="goto">
      <div class="box main-width">
        <div class="btn">
          <span>如何</span>
          <span>购买</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "howBuy",
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
    goto() {
      this.$router.push({ path: "/howBuy" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  .buy-tip {
    position: fixed;
    bottom: 2rem;
    right: 0rem;
    left: 0rem;
    z-index: 99999;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s;
    height: 0px;
    display: flex;
    justify-content: center;
    &.hide {
      opacity: 0;
      visibility: hidden;
    }
    .box {
      display: flex;
      justify-content: flex-end;
      height: 0px;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.3rem;
        cursor: pointer;
        border-radius: 100%;
        box-shadow: 0rem 0rem 0.22rem rgba(0, 0, 0, 0.2);
        background-color: rgba($color: #ff4022, $alpha: 0.7);
        color: #fff;
        span {
          font-size: 0.3rem;
          color: #222;
          line-height: normal;
          position: relative;
          color: #fff;
        }
        span:nth-child(1) {
          bottom: -0.02rem;
        }
        span:nth-child(2) {
          top: -0.02rem;
        }
      }
    }
  }
}
</style>
