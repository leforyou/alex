<template>
  <div class="how-buy-page">
    <div class="how-buy">
      <div class="box main-width">
        <div class="title fz34">如何购买？</div>
        <div class="content fz28">
          <div class="list">
            <p class="list-title">第一步</p>
            <p class="list-desc">通过关键字搜索、浏览栏目等方式选好自己心仪的商品</p>
            <img src="/static/data/how-buy-01.jpg">
          </div>
          <div class="list">
            <p class="list-title">第二步</p>
            <p class="list-desc">点击领劵购买，复制口令，打开手机掏宝</p>
            <img src="/static/data/how-buy-02.jpg">
          </div>
          <div class="list">
            <p class="list-title">第三步</p>
            <p class="list-desc">打开手机掏宝后，会自动弹出【打开链接】</p>
            <img src="/static/data/how-buy-03.jpg">
          </div>
          <div class="list">
            <p class="list-title">第四步</p>
            <p class="list-desc">点击立即购买（产品价格为19元，但是您领取了我们的专属优惠券10元，所以下单后会变成9元包邮），提交付款，完毕</p>
            <img src="/static/data/how-buy-04.jpg">
          </div>
          <div class="list">
            <img src="/static/data/how-buy-05.jpg">
          </div>
          <div class="list">
            <img src="/static/data/how-buy-06.jpg">
          </div>
          <div class="finish">
            <span class="fz38">完</span>
          </div>
          <div class="text-center">
            <div class="fz45 bold">每天发布超低价商品</div>
            <img src="../../static/img/how-code.jpg">
            <div class="fz45 bold" style="color:#e80303;">长按二维码识别关注</div>
          </div>
        </div>
        <div class="btn" @click="goBack">
          <div class="btn-contain main-width">
            <div class="btn-box fz32">知道了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/../static/js/config.js"; //复制
export default {
  name: "howBuy",
  data() {
    return {
      imgUrl: config.imgUrl
    };
  },
  components: {},
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
      console.log("tag", this.imgUrl);
    });
  },
  methods: {
    goBack() {
      //返回上一页
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.how-buy-page {
  .how-buy {
    .box {
      overflow: auto;
      height: 100%;
      padding: 0.5rem 0.3rem;
      .title {
        padding-top: 0.3rem;
        padding-bottom: 0.2rem;
        border-bottom: 0.01rem solid #eae9e8;
        text-align: center;
      }
      .content {
        padding: 0.3rem 0rem;
        line-height: 1.6;
        .list {
          .list-title {
            font-size: 0.34rem;
            color: #000;
            font-weight: 700;
            font-style: italic;
          }
          .list-desc {
            font-size: 0.3rem;
            color: #333;
          }
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
        $h: 0.88rem;
        height: $h;
        margin-top: 1.2rem;
        .btn-contain {
          height: $h;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: #fa5826;
          .btn-box {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            border-radius: 0.08rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
