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
        <div class="coupon-btn fz22" @click="getCoupon()">立即领取</div>
        <!--<a class="coupon-btn fz22" :href="item.quan_link" target="_blank">立即领取</a>-->
      </div>
    </div>

    <div class="line"></div>

    <!--<div class="shop">
      <router-link class="box" :to="{ name: 'shop', params: { nick: item.nick }}" tag="div">
        <div class="head">
          <div class="logo">
            <img src="../../static/img/shop-logo.jpg">
          </div>
          <div class="right">
            <div class="title">{{item.nick}}</div>
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
      </router-link>
    </div>

    <div class="line"></div>-->
    <div class="product-details" v-if="item.goodsDetailUrl">
      <div class="title fz28">商品详情</div>
      <div class="context">
        <!--<img :src="item.goodsDetailUrl">-->
        <div class="more_briefInfo"></div>
      </div>
    </div>

    <div class="footer">
      <div class="contain">
        <div class="box fz30 main-width">
          <div class="go-home" @click="goBack()">返回</div>
          <div class="get-coupon" @click="getCoupon()">
            <svg class="el-icon-loading" v-if="loading" viewBox="0 0 1024 1024" width="14" height="14">
                <path fill="#ffffff" d="M955.261 575.322H828.618c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322s-28.37 63.322-63.322 63.322zM780.616 332.925c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM512 1018.582c-34.955 0-63.322-28.37-63.322-63.322V828.617c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322V955.26c0 34.955-28.37 63.322-63.322 63.322z m0-759.875c-34.955 0-63.322-28.37-63.322-63.322V68.742c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322z m-268.616 611.45c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538z m0-537.232l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538s64.842-24.696 89.538 0l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538-24.822 24.696-64.842 24.696-89.538 0zM258.707 512c0 34.955-28.37 63.322-63.322 63.322H68.742c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322z m521.909 179.075l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538s-64.842 24.696-89.538 0l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538 24.822-24.696 64.842-24.696 89.538 0z m0 0z"></path>
            </svg>
            <span class="fc-fff">领券购买</span>
            <!--<a :href="item.quan_link" target="_blank">领券购买</a>-->
          </div>
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
      slideArr: [],
      today: formatDate(),
      isTokenTip: false,
      loading:false
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
     $("html,body").animate({scrollTop:0}, 500);//置顶
      this.sliderImg();
      this.getDetails();
      //console.log(this.$route.params,this.$route.params.id)
    });
  },
  methods: {
    goBack(){
      //返回
      if (window.history.length <= 1) {
          this.$router.push({path:'/'});
          return false;
      } else {
          this.$router.go(-1);
      }
    },
    getDetails() {
      //商品详情
      this.axios
        .get(`/api/goodsinfo/detailinfo/${this.$route.params.id}`, {})
        .then(response => {
          if (response.data.code == 200) {
            this.item = response.data.data;

            let goodsDetailUrl = this.item.goodsDetailUrl.split('?')[1];
            this.getItemImg(goodsDetailUrl);

            this.item.tb_token = this.item.tb_token || "每日内部价:没有复制到淘口令！";
            if(this.loading){
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
          console.log(error);
        });
    },
    sliderImg(){
      //轮播图
      this.axios
        .get(`/api/goods/detail_images/${this.$route.params.id}`, {})
        .then(response => {
          if (response.data.code == 200) {
            this.slideArr = response.data.data;
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
          console.log(error);
        });
    },
    getCoupon() {
      //领券
      //if(this.isPc())window.open(this.item.quan_link);//pc端打开优惠券页面
      console.log("商品详情页面复制口令：", this.item.tb_token);
      console.log("领券地址：", this.item.quan_link);
      if(!this.item.tb_token)return this.loading = true;
      let val = this.item.tb_token;
      JsCopy.makeCopy(val);
      if(this.item.tb_token){
        this.isTokenTip = true;
        let setTime = setTimeout(() => {
          this.isTokenTip = false;
          clearTimeout(setTime);
        }, 5e3);
      }
    },
    isPc(){
      //检测PC端或手机端--如果没用到，删除即可
      var browser = {
			    versions: function () {
			        var u = navigator.userAgent,
			            app = navigator.appVersion;
			        return { //移动终端浏览器版本信息,利用函数返回一个对象给versions，然后下面的if判断条件就可调用返回的值，这个写法是json数据结构（属于js语法）
			            trident: u.indexOf('Trident') > -1, //IE内核
			            presto: u.indexOf('Presto') > -1, //opera内核
			            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
			            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			            iPad: u.indexOf('iPad') > -1, //是否iPad
			            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			        };
			    }(),
			    language: (navigator.browserLanguage || navigator.language).toLowerCase()
			}
			if (browser.versions.android || browser.versions.iPhone || browser.versions.iPad) {
			    return false;
			} else {
			    return true;
			}
    },
    getItemImg(goodsDetailUrl) {
      //天猫图片跨域处理
      //console.log(goodsDetailUrl)
      var arr = goodsDetailUrl.split("&");
      var obj = new Object();//声明一个对象，储存链接的参数
      for(var i = 0 ; i < arr.length ; i ++){
        var names = arr[i].split("=")[0];
        var values = arr[i].split("=")[1];
        obj[names] = values;
      }
      let id = obj.id;
      //console.log(id);
      $.ajax({
        url: `https://hws.m.taobao.com/cache/desc/5.0?id=${id}`,
        timeout: 1000,
        tryCount: 0,
        dataType: "jsonp",
        jsonp: "callback",
        // beforeSend: function(XMLHttpRequest) {
        //     getfan = layer.load();
        // },
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
          $(".more_briefInfo").append("<p>抱歉！暂无宝贝详情</p>");
        }
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
  } /*
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
  }*/
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
          position: relative;
          .el-icon-loading {
              animation: rotating 2s linear infinite;
              margin-right:0.08rem;
          }
          a {
            color: #fff;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  .token-layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 9999999;
    &.active {
      opacity: 1;
      visibility: visible;
      .box {
        transform: scale(1);
        margin-top: -0.3rem;
      }
    }
    .box {
      border-radius: 5px;
      transition: all 0.3s;
      transform: scale(0.3);
      margin-top: 0rem;
      background-color: rgba(0, 0, 0, 0.8);
      .tip {
        color: #fff;
        line-height: 3;
        padding: 0rem 0.3rem;
        font-size: 0.28rem;
        white-space: nowrap;
      }
    }
  }
}
@-webkit-keyframes rotating {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes rotating {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
</style>
