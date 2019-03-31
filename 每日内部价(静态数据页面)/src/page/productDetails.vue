<template>
  <div class="product-page">
    <!-- <img src="../../static/img/slider.jpg">-->
    <div class="wrap-swiper">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(src, index) in item.slideArr" :key="index">
          <div class="img-box" :style="{backgroundImage: 'url('+ src +')'}"></div>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination" v-if="item.slideArr>0">
          <!-- 导航点 -->
        </div>
      </swiper>
    </div>

    <div class="head-info">
      <div class="price">
        <span class="price1 price-color fz24">￥</span>
        <span class="price2 price-color fz40">{{item.price}}</span>
        <div class="express price-color scale-1px fz20">包邮</div>
      </div>
      <div class="title ellipsis6 clearfix">
        <div class="title-box">
          <img v-if="item.isTmall" src="../../static/img/h5_pic_logo_tmall.png">
          <span>{{item.d_title}}</span>
        </div>
      </div>
      <div class="three fz22">
        <span class="gray-color">快递：0.00</span>
        <span class="gray-color">月销：{{item.sales_num}}</span>
        <span class="gray-color">产地：{{item.provcity}}</span>
      </div>
      <div class="coupon">
        <img src="../../static/img/bg_pic_youhuiquan.png">
        <div class="price-date">
          <div class="coupon-price fz60 fc-fff">{{item.quan_price}} 优惠券</div>
          <div class="coupon-date fz22">有效期：{{today}}-{{item.quan_time | dateFilter}}</div>
        </div>
        <div
          class="coupon-btn fz22"
          :class="{'cannot':item.goodsDetailUrl === true}"
          @click="getCoupon()"
        >{{isReceive?'已领取':'立即领取'}}</div>
        <!--<a class="coupon-btn fz22" :href="item.quan_link" target="_blank">立即领取</a>-->
      </div>
    </div>

    <div class="line"></div>

    <div class="product-details" v-if="item.goodsDetailUrl">
      <div class="title fz28">商品详情</div>
      <div class="context">
        <!--<img :src="item.goodsDetailUrl">
        <div class="more_briefInfo"></div>-->
        <img v-for="(src,index) in item.detailsArr" :key="index" :src="src">
      </div>
    </div>

    <div class="footer">
      <div class="contain">
        <div class="box fz30 main-width">
          <div class="go-home" @click="goBack()">返回</div>
          <button
            class="get-coupon"
            :class="{'cannot':item.goodsDetailUrl === true}"
            @click="getCoupon()"
          >
            <svg
              class="el-icon-loading"
              v-if="loading"
              viewBox="0 0 1024 1024"
              width="14"
              height="14"
            >
              <path
                fill="#ffffff"
                d="M955.261 575.322H828.618c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322s-28.37 63.322-63.322 63.322zM780.616 332.925c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM512 1018.582c-34.955 0-63.322-28.37-63.322-63.322V828.617c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322V955.26c0 34.955-28.37 63.322-63.322 63.322z m0-759.875c-34.955 0-63.322-28.37-63.322-63.322V68.742c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322z m-268.616 611.45c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538z m0-537.232l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538s64.842-24.696 89.538 0l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538-24.822 24.696-64.842 24.696-89.538 0zM258.707 512c0 34.955-28.37 63.322-63.322 63.322H68.742c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322z m521.909 179.075l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538s-64.842 24.696-89.538 0l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538 24.822-24.696 64.842-24.696 89.538 0z m0 0z"
              ></path>
            </svg>
            <span class="fc-fff no-user-select">{{isReceive?'已领取':'领券购买'}}</span>
            <!--<a :href="item.quan_link" target="_blank">领券购买</a>-->
          </button>
        </div>
      </div>
    </div>

    <div class="token-layer" :class="{'active':isTokenTip}">
      <div class="box">
        <div class="tip">已自动复制口令，请打开手机淘宝购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDate from "@/../static/js/formatDate";
import JsCopy from "@/../static/js/JsCopy.js"; //复制
import $ from "jquery";
export default {
  name: "productDetails",
  data() {
    return {
      item: {},
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      //slideArr: [],
      today: formatDate(),
      isTokenTip: false,
      loading: false,
      recursionNum: 5, //淘宝详情图接口：递归次数
      isReceive: false //优券没领取
    };
  },
  filters: {
    dateFilter: function(date) {
      //默认会传个值进来
      date = date || "";
      return date.split(" ")[0].replace(/\-/g, "."); //只要年月日
    }
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
      $("html,body").animate({ scrollTop: 0 }, 0); //置顶
      this.getDetails();
      //this.getItemImg();
      //this.sliderImg();
      //console.log(this.$route.params,this.$route.params.id)
    });
  },
  methods: {
    goBack() {
      //返回
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    getDetails() {
      //商品详情
      this.$loading();
      this.axios
        //.get(`/static/data/productDetails.json/${this.$route.params.id}`, {})
        .get(`/static/data/productDetails.json`, {})
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            if (response.data.data) this.item = response.data.data;
            if (this.slideArr.length == 0) {
              this.slideArr = [response.data.data.pic];
            }

            this.item.tb_token =
              this.item.tb_token || "每日内部价:没有复制到淘口令！";
            if (this.loading) {
              this.loading = false;
              this.getCoupon();
            }
          } else {
            /*this.$message({
              message: error
            });*/
          }
        })
        .catch(error => {
          /*this.$message({
            message: error
          });*/
          this.$loading.close();
          console.log(error);
        });
    },
    /*sliderImg() {
      //轮播图
      this.$loading();
      this.axios
        .get(`/api/goods/detail_images/${this.$route.params.id}`, {})
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            let data = response.data.data;
            if (data.length > 0) this.slideArr = data;
          } else {
            
          }
        })
        .catch(error => {
          
          this.$loading.close();
          console.log(error);
        });
    },*/
    getCoupon() {
      //领券
      console.log("商品详情页面复制口令：", this.item.tb_token);
      console.log("领券地址：", this.item.quan_link);
      if (this.item.goodsDetailUrl === true) return;
      if (!this.item.tb_token) return (this.loading = true);
      let val = this.item.tb_token;
      JsCopy.makeCopy(val);
      if (this.item.tb_token) {
        this.isTokenTip = true;
        this.isReceive = true;
        let setTime = setTimeout(() => {
          this.isTokenTip = false;
          clearTimeout(setTime);
        }, 5e5);
      }
    }
    /*
    getItemImg() {
      //天猫图片跨域处理
      let self = this;
      this.recursionNum--;
      console.log("tag", this.recursionNum);
      $.ajax({
        url: `https://hws.m.taobao.com/cache/desc/5.0?id=${
          this.$route.params.id
        }`,
        timeout: 1000,
        tryCount: 0,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(result) {
          //layer.close(getfan);
          if (result.sellerId != "") {
            var regx = /<[^>]*>|<\/[^>]*>/gm;
            var len = result.wdescContent.pages.length;
            var image = new Array();
            for (var i = 0; i < len; i++) {
              if (result.wdescContent.pages[i].indexOf("<txt>") != -1) {
                image[i] = "";
              } else {
                image[i] =
                  "<img src='" +
                  result.wdescContent.pages[i].replace(regx, "") +
                  "' style='width:100%;max-width:100%'>";
              }
            }
            if (image) {
              $(".more_briefInfo").append(image);
            } else {
              $(".more_briefInfo").append("<p>抱歉！暂无宝贝详情</p>");
            }
          }
        },
        error: function(xhr, textStatus, errorThrown) {
          if (self.recursionNum >= 0) {
            self.getItemImg();
            return;
          }
          $(".more_briefInfo").append("<p>抱歉！暂无宝贝详情</p>");
        }
      });
    }*/
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.product-page {
  .wrap-swiper {
    padding-top: 100%;
    position: relative;
    .swiper-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .swiper-wrapper {
        .img-box {
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
}
</style>
<style scoped lang="scss">
.cannot {
  opacity: 0.6;
}
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
        display: block;
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
    $h: 1.2rem;
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
        display: flex;
        .go-home {
          line-height: $h;
          white-space: nowrap;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          padding: 0rem 0.8rem;
          background: #f3933d;
          color: #fff;
        }
        .get-coupon {
          outline: none;
          overflow: hidden;
          line-height: $h;
          color: #fff;
          text-shadow: 0rem 0rem 0.02rem #fe3a00;
          background: linear-gradient(to right, #fd8210, #ff4022);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0%;
            left: 0%;
            z-index: 1;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: all 0.1s ease-in-out;
            background: #f30213;
          }
          &:active::before {
            opacity: 1;
            transition: all 0s;
          }
          &:active {
            span {
              transform: scale(1.3);
            }
          }
          .el-icon-loading {
            animation: rotating 2s linear infinite;
            margin-right: 0.08rem;
            position: relative;
            z-index: 99;
          }
          span {
            position: relative;
            z-index: 99;
            transition: all 0.1s ease-in-out;
          }
        }
      }
    }
  }
  .token-layer {
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, 100%) translateZ(0);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.1s;
    z-index: 9999999;
    &.active {
      transform: translate(-50%, -0%) translateZ(0);
      opacity: 1;
      visibility: visible;
    }
    .box {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.8);
      .tip {
        color: #fff;
        line-height: normal;
        padding: 0.5rem 0.3rem;
        font-size: 0.3rem;
        white-space: nowrap;
      }
    }
  }
}
@-webkit-keyframes rotating {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
