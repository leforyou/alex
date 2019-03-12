<template>
  <div class="product-page">
    <div class="slider">
      <img src="../../static/img/slider.jpg">
    </div>

    <div class="head-info">
      <div class="price">
        <span class="price1 price-color fz24">￥</span>
        <span class="price2 price-color fz40">1928</span>
        <div class="express price-color scale-1px fz20">包邮</div>
      </div>
      <div class="title ellipsis6 clearfix">
          <div class="title-box">
            <img src="../../static/img/h5_pic_logo_tmall.png">
            <span>春秋新款针织开衫女2019韩版毛衣百搭大码空调防晒长袖小披肩外套春秋新款针织开衫女2019韩版毛衣百搭大码空调防晒长袖小披肩外套</span>
          </div>
      </div>
      <div class="three fz22">
        <span class="gray-color">快递：0.00</span>
        <span class="gray-color">月销：1325</span>
        <span class="gray-color">产地：广州</span>
      </div>
      <div class="coupon">
        <img src="../../static/img/bg_pic_youhuiquan.png">
        <div class="price-date">
          <div class="coupon-price fz60 fc-fff">10.00 优惠券</div>
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
          <div class="go-home">首页</div>
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
      msg: "商品详情"
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
    });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product-page {
  .slider {
    img {
      width: 100%;
    }
  }
  .line{
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
        bottom: -0.03rem;
      }
      .express {
        line-height: normal;
        padding: 0rem 0.1rem;
        margin-right: 0.1rem;
        background: #ffeaef;
        margin-left: 0.2rem;
        &,&:before{
          border-radius: 0.3rem;
        }
      }
    }
    .title{
      font-size: 0.28rem;
      margin-top: 0.1rem;
      padding: 0rem 0.25rem;
      .title-box{
        img{
          float: left;
          width: 0.68rem;
          height: 0.32rem;
          margin-top: 0.04rem;
          margin-right: 0.08rem;
        }
        span{
          color: #000;
          display: inline;
          line-height:normal;
        }
      }
    }
    .three{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.25rem;
      padding: 0rem 0.25rem;
    }
    .coupon{
      position: relative;
      margin-top: 0.3rem;
      line-height: normal;
      img{
        width: 100%;
      }
      .price-date{
        position: absolute;
        left: 0.64rem;
        top: calc(50% - 0.25rem);
        transform: translateY(-50%);
        .coupon-price{
          
        }
        .coupon-date{
          padding: 0.05rem 0.2rem;
          line-height: normal;
          background-color: #ffbe92;
          border-radius: 0.08rem;
          color: #f77425;
        }
      }
      .coupon-btn{
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
  .shop{
    .box{
      .head{
        padding: 0.3rem;
        display: flex;
        align-items: center;
        position: relative;
        &::before{
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0.3rem;
          border-bottom: 0.01rem solid #e8e8e8;
        }
        .logo{
          min-width: 1rem;
          width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          overflow: hidden;
          border: 0.01rem solid #ff5776;
          margin-right: 0.2rem;
          img{
            width: 100%;
          }
        }
        .right{
          width: 100%;
          position: relative;
          .title{
            font-size: 0.3rem;
            margin-bottom: 0.1rem;
          }
          ul{
            display: flex;
            justify-content: space-between;
            padding-right: 0.5rem;
            li{
              font-size: 0.22rem;
              color: #666;
            }
          }
          .more{
            width: 0.4rem;
            position: absolute;
            top: 50%;
            right: 0rem;
            transform: translateY(-50%);
          }
        }
      }
      .advantage{
        padding: 0.2rem 0.3rem;
        ul{
          display: flex;
          justify-content: space-between;
          li{
            display: flex;
            align-items: center;
            img{
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.08rem;
            }
            span{
              font-size: 0.2rem;
            }
          }
        }
      }
    }
  }
  .product-details{
    .title{
      text-align: center;
      line-height: 0.8rem;
    }
  }
  .footer{
    $h:1.28rem;
    height: $h;
    .contain{
      position: fixed;
      bottom: 0rem;
      left: 0;
      right: 0;
      z-index: 9999;
      height: $h;
      background-color: #fff;
      .box{
        height: 100%;
        padding: 0.2rem 0.16rem;
        display: flex;
        .go-home{
          color: #fa693b;
          border: 0.01rem solid #fa693b;
          white-space: nowrap;
          margin-right: 0.18rem;
          padding: 0rem 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.06rem;
        }
        .get-coupon{
          color: #fff;
          text-shadow:0rem 0rem 0.02rem #fe3a00;
          background: linear-gradient(#fd8111, #fe4b1f);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0.06rem;
        }
      }
    }
  }
}
</style>
