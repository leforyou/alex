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
          <div class="fz30">面举例：如何花9元购买价值19云的眼线笔！</div>
          <div class="fz30">1.点击喜欢的商品</div>
          <img src="../../static/img/how-buy-01.jpg">
          <div class="fz30">2.点击领劵购买，复制口令，打开手机掏宝</div>
          <img src="../../static/img/how-buy-02.jpg">
          <div class="fz30">3.打开手机掏宝后，会自动弹出【打开链接】</div>
          <img src="../../static/img/how-buy-03.jpg">
          <div class="fz30">4.点击立即购买（产品价格为19元，但是您领取了我们的专属优惠券10元，所以下单后会变成¥9元包邮），提交付款，完毕</div>
          <img src="../../static/img/how-buy-04.jpg">
          <img src="../../static/img/how-buy-05.jpg">
          <img src="../../static/img/how-buy-06.jpg">
          <div class="finish">
            <span class="fz38">完</span>
          </div>
          <div class="text-center">
            <div class="fz45 bold">每天发布超低价商品</div>
            <img src="../../static/img/how-code.jpg">
            <div class="fz45 bold" style="color:#e80303;">长按二维码识别关注</div>
          </div>
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
      //document.body.style.overflow = "auto";
    },
    show() {
      this.isActive = true;
      //document.body.style.overflow = "hidden";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  .buy-tip {
    position: fixed;
    bottom: 1.6rem;
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
        img {
          max-width: 100%;
          margin: 0.15rem 0rem;
        }
        .finish {
          display: flex;
          justify-content: center;
          margin: 0.3rem 0rem 0.8rem;
          span {
            color: #fff;
            background-color: #ab1942;
            padding: 0.1rem 0.3rem;
          }
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
