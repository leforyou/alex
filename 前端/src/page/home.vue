<template>
  <div class="home-page">
    <div class="header">
      <div class="box">
        <div class="top bg-lg">
          <div class="search" @click="toSearchPage">
            <img src="../../static/img/h5_icon_shousuo.png">
            <span class="fz28 fc-999">请输入商品名称搜索</span>
          </div>
          <QrCode class="code-components" ref="code"/>
        </div>
        <div class="about bg-lg">
          <div class="public-code">
            <img src="../../static/img/public-code.jpg" alt>
            <div class="desc">长按二维码关注我们</div>
          </div>
        </div>
        <div class="nav">
          <ul :class="{'active':isOpen}">
            <li
              v-for="(item,index) in menuListArr"
              :key="index"
              :class="{'active':listIndex==index}"
              @click="listIndex=index"
            >{{item.item_name}}</li>
          </ul>
          <!--<div class="more" @click="isOpen = !isOpen">
            <img src="../../static/img/h5_nav_allow_down.png">
          </div>-->
        </div>
      </div>
    </div>

    <!--
    <a href="https://t.asczwa.com/taobao?backurl=https://m.tb.cn/h.3CQMfe6?sm=868ade">淘宝淘宝淘宝</a>
    <br/>

    <a href="taobao://www.taobao.com">打开APP</a>

<br/>
    <a href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=https://www.taobao.com;end"> Take a QR code </a>
<br/>
     <a href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end"> Take a QR code 1111</a>
<br/>

     <a href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end">扫一扫</a>
<br/>
     <a href="intent://www.taobao.com/#Intent;scheme=taobao;package=com.taobao;end">打开taobao APP</a>


    -->
    <div class="product">
      <List :arr="goodsArr"/>
      <NotMoreTip :visible="isTip"/>
    </div>

    <HowBuy ref="howBuy"/>
  </div>
</template>

<script>
import QrCode from "./../components/QrCode";
export default {
  name: "home",
  data() {
    return {
      isOpen: false,
      listIndex: 0,
      menuListArr: [],
      goodsArr: [],
      pageNo: 0,
      isTip: false
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
      this.menuList();
      this.goodsList();
      this.$refresh(() => {
        this.goodsList();
      });
    });
  },
  methods: {
    toSearchPage() {
      //跳转到搜索页面
      this.$router.push({
        path: "search"
      });
    },
    menuList() {
      //菜单
      this.$loading();
      this.axios
        .post("/api/menuItem/list", {
          item_type: 1,
          item_level: 1
        })
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            this.menuListArr = response.data.data.slice(0, 3);
          } else {
            this.$message({
              message: response.data.msg
            });
          }
        })
        .catch(error => {
          this.$message({
            message: error
          });
          console.log(error);
        });
    },
    goodsList() {
      //运营表分页
      if (this.isTip) return;
      this.pageNo++;
      this.$loading();
      this.axios
        .post("/api/operate/page", {
          pageSize: 8,
          pageNo: this.pageNo,
          order: "price",
          orderType: "desc"
        })
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            if (response.data.data.datalist.length == 0) {
              this.isTip = true;
              return;
            }
            this.goodsArr = this.goodsArr.concat(response.data.data.datalist);
            //this.goodsArr = this.goodsArr.push(response.data.data.datalist);
          } else {
            this.$message({
              message: response.data.msg
            });
          }
        })
        .catch(error => {
          this.$message({
            message: error
          });
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-page {
  .header {
    .box {
      .bg-lg {
        background: linear-gradient(to right, #fd8210, #ff4022);
      }
      .top {
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
      .about {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 0.3rem;
        .public-code {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            display: block;
            width: 1.6rem;
          }
          .desc {
            text-align: center;
            font-size: 0.2rem;
            color: #fff;
            transform: scale(0.7);
          }
        }
      }
      .nav {
        $val: 0.6rem;
        position: relative;
        font-size: 0.26rem;
        line-height: normal;
        ul {
          $h: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          &.active {
            max-height: 500px;
          }
          &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0rem;
            left: 0rem;
            right: 0rem;
            border-bottom: 0.01rem solid #ddd;
            z-index: 1;
          }
          li {
            color: #444;
            padding: 0.15rem 0.22rem;
            cursor: pointer;
            text-align: center;
            margin-bottom: 0.05rem;
            position: relative;
            &.active {
              color: #ff4022;
              &::after {
                content: "";
                display: block;
                position: absolute;
                bottom: -0.01rem;
                left: 0rem;
                right: 0rem;
                border-bottom: 0.01rem solid #ff4022;
                z-index: 90;
              }
            }
          }
        } /*
        .more {
          position: absolute;
          right: 0rem;
          top: 0rem;
          cursor: pointer;
          img {
            width: $val;
            height: 0.5rem;
          }
        }*/
      }
    }
  }
  .product {
  }
}
</style>
