<template>
  <div class="product-page">
    <!-- <img src="../../static/img/slider.jpg">-->
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in slideArr" :key="index">
        <div class="img-box" :style="{backgroundImage: 'url('+ item +')'}"></div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination" style="display:none;">
        <!-- 导航点 -->
      </div>
    </swiper>

    <div class="head-info">
      <div class="price">
        <span class="price1 price-color fz24">￥</span>
        <span class="price2 price-color fz40">{{item.org_Price}}</span>
        <div class="express price-color scale-1px fz20">包邮</div>
      </div>
      <div class="title ellipsis6 clearfix">
        <div class="title-box">
          <img v-if="item.isTmall" src="../../static/img/h5_pic_logo_tmall.png">
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="three fz22">
        <span class="gray-color">快递：0.00</span>
        <span class="gray-color">月销：{{item.sales_num}}</span>
        <span class="gray-color">产地：广州</span>
      </div>
      <div class="coupon">
        <img src="../../static/img/bg_pic_youhuiquan.png">
        <div class="price-date">
          <div class="coupon-price fz60 fc-fff">{{item.quan_price}} 优惠券</div>
          <div class="coupon-date fz22">有效期：2019.03.05-2019.03.22</div>
        </div>
        <div class="coupon-btn fz22">立即领取</div>
      </div>
    </div>

    <div class="line"></div>

    <div class="shop">
      <div class="box">
        <div class="head">
          <div class="logo">
            <img src="../../static/img/shop-logo.jpg">
          </div>
          <div class="right">
            <div class="title">这里是店铺名</div>
            <ul>
              <li>宝贝描述：4.9</li>
              <li>卖家服务：4.9</li>
              <li>物流服务：4.9</li>
            </ul>
            <img class="more" src="../../static/img/h5_allow_right.png">
          </div>
        </div>
        <div class="advantage">
          <ul>
            <li>
              <img src="../../static/img/h5_pic_dianpu.png">
              <span class="gray-color">正品保证</span>
            </li>
            <li>
              <img src="../../static/img/h5_pic_dianpu.png">
              <span class="gray-color">不支持7天退换</span>
            </li>
            <li>
              <img src="../../static/img/h5_pic_dianpu.png">
              <span class="gray-color">极速退款</span>
            </li>
            <li>
              <img src="../../static/img/h5_pic_dianpu.png">
              <span class="gray-color">赠运费险</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="line"></div>

    <div class="product-details">
      <div class="title fz28">商品详情</div>
      <div class="context">
        <img src="../../static/img/product1.png">
        <img src="../../static/img/product2.png">
        <img src="../../static/img/slider.jpg">
      </div>
    </div>

    <div class="footer">
      <div class="contain">
        <div class="box fz30 main-width">
          <router-link class="go-home" to="/" tag="div">首页</router-link>
          <div class="get-coupon">领券购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "productDetails",
  data() {
    return {
      item:{},
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      slideArr: [],
      
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
      this.getDetails();
    });
  },
  methods: {
    getDetails(){
      //商品详情
      this.axios
        .post(`http://47.112.105.131/api/goods/operator/detail/${this.$route.params.did}`, {})
        .then(response => {
          if (response.data.code == 200) {
            this.item = response.data.data;
            this.slideArr = [this.item.pic];
          } else {
            this.$message({
              message:response.data.msg
            });
          }
        })
        .catch(function(error) {
          this.$message({
            message:error
          });
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.product-page {
  .swiper-container {
    .swiper-wrapper {
      .img-box {
        padding-top: 66.666%;
        padding-top: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
    .swiper-pagination {
      bottom: 0.15rem;
      .swiper-pagination-bullet {
        background-color: #fd8010;
        opacity: 1;
      }
      .swiper-pagination-bullet-active {
        background-color: #ff4521;
      }
    }
  }
}
</style>
<style scoped lang="scss">
.product-page {
  .line {
    height: 0.3rem;
    background-color: #f3f4f5;
  }
  .head-info {
    padding: 0.3rem 0rem;
    .price {
      padding: 0rem 0.25rem;
      line-height: normal;
      display: flex;
      align-items: center;
      .price1 {
        position: relative;
        bottom: -0.02rem;
      }
      .express {
        line-height: normal;
        padding: 0rem 0.1rem;
        margin-right: 0.1rem;
        background: #ffeaef;
        margin-left: 0.2rem;
        &,
        &:before {
          border-radius: 0.3rem;
        }
      }
    }
    .title {
      font-size: 0.28rem;
      margin-top: 0.1rem;
      padding: 0rem 0.25rem;
      .title-box {
        img {
          float: left;
          width: 0.68rem;
          height: 0.32rem;
          margin-top: 0.04rem;
          margin-right: 0.08rem;
        }
        span {
          color: #000;
          display: inline;
          line-height: normal;
        }
      }
    }
    .three {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.25rem;
      padding: 0rem 0.25rem;
    }
    .coupon {
      position: relative;
      margin-top: 0.3rem;
      line-height: normal;
      img {
        width: 100%;
      }
      .price-date {
        position: absolute;
        left: 0.64rem;
        top: calc(50% - 0.25rem);
        transform: translateY(-50%);
        .coupon-price {
        }
        .coupon-date {
          padding: 0.05rem 0.2rem;
          line-height: normal;
          background-color: #ffbe92;
          border-radius: 0.08rem;
          color: #f77425;
        }
      }
      .coupon-btn {
        position: absolute;
        right: 0.6rem;
        top: calc(50% - 0.1rem);
        transform: translateY(-50%);
        background: linear-gradient(#ffebeb, #fdc49b);
        color: #ff2d08;
        line-height: normal;
        padding: 0.12rem 0.22rem;
        border-radius: 0.56rem;
        cursor: pointer;
      }
    }
  }
  .shop {
    .box {
      .head {
        padding: 0.3rem;
        display: flex;
        align-items: center;
        position: relative;
        &::before {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0.3rem;
          border-bottom: 0.01rem solid #e8e8e8;
        }
        .logo {
          min-width: 1rem;
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          overflow: hidden;
          border: 0.01rem solid #ff5776;
          border: 0.01rem solid rgba(255, 255, 255, 0);
          margin-right: 0.2rem;
          img {
            width: 100%;
          }
        }
        .right {
          width: 100%;
          position: relative;
          .title {
            font-size: 0.3rem;
            margin-bottom: 0.1rem;
          }
          ul {
            display: flex;
            justify-content: space-between;
            padding-right: 0.5rem;
            li {
              font-size: 0.22rem;
              color: #666;
            }
          }
          .more {
            width: 0.4rem;
            position: absolute;
            top: 50%;
            right: 0rem;
            transform: translateY(-50%);
          }
        }
      }
      .advantage {
        padding: 0.2rem 0.3rem;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            display: flex;
            align-items: center;
            img {
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.08rem;
            }
            span {
              font-size: 0.2rem;
            }
          }
        }
      }
    }
  }
  .product-details {
    .title {
      text-align: center;
      line-height: 0.8rem;
    }
    .context {
      img {
        width: 100%;
      }
    }
  }
  .footer {
    $h: 1.28rem;
    height: $h;
    .contain {
      position: fixed;
      bottom: 0rem;
      left: 0;
      right: 0;
      z-index: 9999;
      height: $h;
      background-color: #fff;
      .box {
        height: 100%;
        padding: 0.2rem 0.16rem;
        display: flex;
        .go-home {
          color: #fa693b;
          border: 0.01rem solid #fa693b;
          white-space: nowrap;
          margin-right: 0.18rem;
          padding: 0rem 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.06rem;
          cursor: pointer;
        }
        .get-coupon {
          color: #fff;
          text-shadow: 0rem 0rem 0.02rem #fe3a00;
          background: linear-gradient(#fd8111, #fe4b1f);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.06rem;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
