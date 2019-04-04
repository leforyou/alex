<template>
  <div class="home-page">
    <div class="header">
      <div class="box">
        <div class="top">
          <div class="top-box bg-lg main-width">
            <div class="search" @click="toSearchPage">
              <img src="../../static/img/h5_icon_shousuo.png">
              <span class="fz28 fc-999">100W+ 一元起包邮商品任你选</span>
            </div>
            <QrCode class="code-components" ref="code"/>
          </div>
        </div>
        <div class="about bg-lg">
          <div class="copywriting ellipsis5">{{writing}}</div>
          <div class="public-code">
            <img src="../../static/img/public-code.jpg" alt>
            <div class="desc">长按二维码关注我们</div>
          </div>
        </div>
        <div class="nav" id="wrap-nav">
          <div class="main-width">
            <div class="line"></div>
            <swiper :options="swiperOption" ref="mySwiper">
              <swiper-slide
                :class="{'swiper-no-swiping':true,'active':listIndex==index}"
                v-for="(item,index) in menuListArr"
                :key="index"
              >
                <div class="item" @click="listNav(index,item.did)">{{item.item_name}}</div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>

    <div class="product">
      <List :arr="goodsArr"/>
      <div class="loading" v-if="!isTip">加载中...</div>
      <NotMoreTip :visible="isTip"/>
    </div>

    <div class="keep-record">
      <div class="contain">
        <div class="box">
          <a href="http://www.miitbeian.gov.cn/" target="_blank">粤ICP备19028207号-1</a>
        </div>
      </div>
    </div>

    <HowBuy ref="howBuy"/>
  </div>
</template>

<script>
import QrCode from "./../components/QrCode";
import $ from "jquery";
//import refresh from '@/../static/js/scrollRefresh.js';//上拉触底加载
export default {
  name: "home",
  data() {
    return {
      listIndex: 0,
      menuListArr: [],
      goodsArr: [],
      pageNo: 0,
      isTip: false,
      item_id: null,
      writing:
        "每天为您精选淘宝天猫内部优惠券的包邮超值折扣商品，购物先领大额内部优惠券，省钱买好货，轻松打造品质生活！",
      swiperOption: {
        slidesPerView: 6,
        spaceBetween: 0,
        noSwiping: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    QrCode
  },
  mounted() {
    //window.location.href = 'intent://www.taobao.com/#Intent;scheme=taobao;package=com.taobao;end';
    //window.location.href = 'intent://scan/#Intent;scheme=taobao;package=com.google.taobao.client.android;S.browser_fallback_url=https://t.asczwa.com/taobao?backurl=https://m.tb.cn/h.3CQMfe6?sm=868ade;end';
    this.$nextTick(function() {
      // DOM 现在更新了
      this.$share();
      this.menuList();
      this.copyWriting();
      this.fixedNav();
      this.$refresh(() => {
        if (this.$route.name == "home") this.goodsList();
      });
    });
  },
  methods: {
    fixedNav() {
      //固定导航
      $(window).scroll(function() {
        var scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop; //这行代码主要兼容谷歌、火狐、IE浏览器
        var val = $(".home-page .header .box .top").height();
        if (scrollTop >= val) {
          $("#wrap-nav").addClass("fixed");
        } else if (scrollTop < val) {
          $("#wrap-nav").removeClass("fixed");
        }
      });
    },
    toSearchPage() {
      //跳转到搜索页面
      this.$router.push({
        path: "search"
      });
    },
    listNav(index, item_id) {
      //导航切换--商品列表更新
      console.log("item_id:", item_id);
      this.listIndex = index;
      this.goodsArr = [];
      this.pageNo = 0;
      this.isTip = false;
      this.item_id = item_id;
      this.goodsList();
    },
    copyWriting() {
      //文案
      this.axios
        .get("/api/operate/welcome")
        .then(response => {
          if (response.data.code == 200) {
            this.writing = response.data.data.welcome;
          }
        })
        .catch(error => {
          /*this.$message({
            message: error
          });*/
          console.log(error);
        });
    },
    menuList() {
      //菜单
      this.$loading();
      this.axios
        .get("/api/menuItem/list")
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            //this.menuListArr = response.data.data.slice(0, 3);
            this.menuListArr = response.data.data;
            this.item_id = this.menuListArr[0].did;
            this.goodsList();
          } 
        })
        .catch(error => {
          this.$loading.close();
          console.log(error);
        });
    },
    goodsList() {
      //运营表分页
      if (this.isTip) return;
      this.pageNo++;
      //this.$loading();
      let obj = {
        pageSize: 15,
        pageNo: this.pageNo,
        order: "op_order",
        orderType: "asc",
        item_id: this.item_id
      };
      this.axios
        .get(
          `/api/operate/page?pageSize=${obj.pageSize}&pageNo=${
            obj.pageNo
          }&item_id=${obj.item_id}`
        )
        .then(response => {
          //this.$loading.close();
          if (response.data.code == 200) {
            let datalist = response.data.data.datalist;
            if (datalist == null || datalist.length == 0) {
              this.isTip = true;
              return;
            }
            this.goodsArr = this.goodsArr.concat(datalist);
            //this.goodsArr = this.goodsArr.push(response.data.data.datalist);
          } else {
            /*
            this.$message({
              message: response.data.msg
            });*/
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-page {
  .header {
    .box {
      $lg: linear-gradient(to right, #fd8210, #ff4022);
      .bg-lg {
        background: $lg;
      }
      .top {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999999;
        .top-box {
          padding: 0.3rem;
          display: flex;
          align-items: center;
          .search {
            background-color: #fff;
            border-radius: 0.6rem;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
              width: 0.3rem;
              height: 0.3rem;
              margin-right: 0.1rem;
            }
            span {
              padding: 0.15rem 0rem;
            }
          }
        }
      }
      .about {
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding-top: 1.3rem;
        padding-bottom: 0.2rem;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10;
          background-image: url(../../static/img/home-bg.png);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .copywriting {
          text-align: center;
          margin-right: 0.3rem;
          font-size: 0.26rem;
          color: #fff;
          position: relative;
          z-index: 99;
        }
        .public-code {
          min-height: 1.82rem;
          background-color: #fff;
          min-width: 1.6rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-bottom: 0.22rem;
          position: relative;
          z-index: 99;
          img {
            display: block;
            width: 1.6rem;
          }
          .desc {
            position: absolute;
            bottom: 0;
            left: 50%;
            text-align: center;
            font-size: 0.24rem;
            color: #333;
            transform: translateX(-50%) scale(0.65);
            white-space: nowrap;
          }
        }
      }
      .nav {
        font-size: 0.26rem;
        line-height: normal;
        &.fixed {
          position: fixed;
          top: 1.28rem;
          left: 0;
          right: 0;
          z-index: 9999;
        }
      }
    }
  }
  .product {
    .loading {
      color: #999;
      text-align: center;
      font-size: 0.28rem;
      line-height: 3;
    }
  }
  .keep-record {
    $h: 0.6rem;
    height: $h;
    .contain {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 3;
      text-align: center;
      background-color: #c1c0c0;
      opacity: 0.8;
      z-index: 9999;
      .box {
        a {
          color: #3d4245;
          text-decoration: none;
          line-height: $h;
          display: block;
          text-align: center;
        }
      }
    }
  }
}
</style>

<style lang="scss">
#wrap-nav {
  background-color: #fff;
  .main-width {
    position: relative;
    .line {
      height: 2px;
      padding: 0px;
      display: block;
      position: absolute;
      bottom: 0rem;
      left: 0rem;
      right: 0rem;
      border-bottom: 0.02rem solid #ddd;
      z-index: 1;
    }
    .swiper-container {
      position: relative;
      z-index: 99;
      .swiper-wrapper {
        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 99;
          &.active {
            color: #ff4022;
            &::after {
              content: "";
              display: block;
              position: absolute;
              bottom: 0rem;
              left: 0rem;
              right: 0rem;
              border-bottom: 0.02rem solid #ff4022;
            }
          }
          .item {
            width: 100%;
            padding: 0.22rem 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
}
</style>

<style>
/* 
<div class="nav" id="wrap-nav">
  <div class="main-width">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide>
        <ul>
          <li class="line"></li>
          <li
            v-for="(item,index) in menuListArr"
            :key="index"
            :class="{'active':listIndex==index}"
            @click="listNav(index,item.did)"
          >{{item.item_name}}</li>
        </ul>
        <div class="swiper-scrollbar"></div>
      </swiper-slide>
    </swiper>
  </div>
</div>






data() {
  return {
    swiperOption: {
      pagination: {
        el: ".swiper-pagination"
      },
      direction: "horizontal",
      slidesPerView: "auto",
      freeMode: true,
      mousewheel: true,
      scrollbar: {
        el: ".swiper-scrollbar"
      }
    }
  };
},





#wrap-nav {
  background-color: #fff;
  .main-width {
    position: relative;
    .swiper-container {
      .swiper-wrapper {
        display: inline-block;
        white-space: nowrap;
        .swiper-slide {
          width: auto;
          display: inline-block;
          white-space: nowrap;
          ul {
            display: inline-block;
            white-space: nowrap;
            background: #fff;
            .line {
              height: 2px;
              padding: 0px;
              display: block;
              position: absolute;
              bottom: 0rem;
              left: 0rem;
              right: 0rem;
              border-bottom: 0.02rem solid #ddd;
              z-index: 2;
            }
            li {
              display: inline-block;
              color: #444;
              padding: 0.15rem 0.25rem;
              cursor: pointer;
              text-align: center;
              margin-bottom: 0rem;
              position: relative;
              z-index: 99;
              &.active {
                color: #ff4022;
                &::after {
                  content: "";
                  display: block;
                  position: absolute;
                  bottom: 0rem;
                  left: 0rem;
                  right: 0rem;
                  border-bottom: 0.02rem solid #ff4022;
                }
              }
            }
          }
        }
      }
    }
  }
}

 */
</style>

