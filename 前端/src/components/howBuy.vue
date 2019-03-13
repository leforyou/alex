<template>
  <div class="wrap">
    <div class="buy-tip" @click="show" :class="{'hide':isActive}">
      <div class="box main-width">
        <div class="btn">
          <span>如何</span>
          <span>购买</span>
        </div>
      </div>
    </div>
    <div class="how-buy" :class="{'active':isActive}">
      <div class="box main-width">
        <div class="title fz34">如何购买？</div>
        <div class="content fz28">
          我们每天都在进行购物，但我们从没想过自己所购买的东西是否适合自己、自己是否用得上。生活中我们到底如何学会购物呢？
          我们每一次去市场都能看到某商场货物促销与折旧诱惑着我们去买。这时我们就要有一定的自我意识才扛得住促销的诱惑，需要
          不停地提配自己天地下没有亏本的卖买，心里要有个意识凡事打折或促销产品要不质量不行，要不就是快过期等。
        </div>
        <div class="btn fz32" @click="hide">知道了</div>
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
.wrap {
  .buy-tip {
    position: fixed;
    bottom: 1rem;
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
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.3rem;
        cursor: pointer;
        border-radius: 100%;
        box-shadow: 0rem 0rem 0.22rem rgba(0, 0, 0, 0.2);
        background-color: #fff;
        span {
          font-size: 0.2rem;
          color: #222;
          line-height: normal;
          position: relative;
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

  .how-buy {
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
      padding: 0.5rem;
      .title {
        padding-top: 0.3rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.01rem solid #eae9e8;
        text-align: center;
      }
      .content {
        padding: 0.3rem 0rem;
        line-height: 1.6;
        &,
        * {
          color: #666;
        }
      }
      .btn {
        margin-top: 1.2rem;
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
