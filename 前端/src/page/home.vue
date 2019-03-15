<template>
  <div class="home-page">
    <div class="header">
      <div class="box">
        <div class="top">
          <div class="search" @click="toSearchPage">
            <img src="../../static/img/h5_icon_shousuo.png">
            <span class="fz28 fc-999">请输入商品名称搜索</span>
          </div>
          <QrCode class="code-components" ref="code"/>
        </div>
        <div class="bottom">
          <ul :class="{'active':isOpen}">
            <li
              v-for="(item,index) in menuListArr"
              :key="index"
              :class="{'active':listIndex==index}"
              @click="listIndex=index"
            >{{item.item_name}}</li>
          </ul>
          <div class="more" @click="isOpen = !isOpen">
            <img src="../../static/img/h5_nav_allow_down.png">
          </div>
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
      pageNo:0,
      isTip:false
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
      this.$refresh(()=>{
        this.goodsList();
      });

    });
  },
  methods: {
    toSearchPage(){
      //跳转到搜索页面
      this.$router.push({
        path: 'search'
      });
    },
    menuList() {
      //菜单
      this.$loading();
      this.axios
        .post("http://47.112.105.131/api/menuItem/list", {
          item_type: 1,
          item_level: 1
        })
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            this.menuListArr = response.data.data;
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
    },
    goodsList() {
      //运营表分页
      if(this.isTip)return;
      this.pageNo++;
      this.$loading();
      this.axios
        .post("http://47.112.105.131/api/goods/operator/page", {
          pageSize: 10,
          pageNo: this.pageNo,
          order: "price",
          orderType: "desc"
        })
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            if(response.data.data.datalist.length == 0){
              this.isTip = true;
              return;
            }
            this.goodsArr = this.goodsArr.concat(response.data.data.datalist);
            //this.goodsArr = this.goodsArr.push(response.data.data.datalist);
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
<style scoped lang="scss">
.home-page {
  .header {
    background: linear-gradient(to right, #fd8210, #ff4022);
    .box {
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
          span{
            padding: 0.15rem 0rem;
          }
        }
      }
      .bottom {
        $val: 0.6rem;
        position: relative;
        padding-right: $val;
        padding-left: 0.14rem;
        padding-bottom: 0.12rem;
        font-size: 0.26rem;
        line-height: normal;
        ul {
          $h: 0.5rem;
          display: flex;
          flex-wrap: wrap;
          max-height: $h;
          min-height: $h;
          transition: max-height 0.6s;
          overflow: hidden;
          &.active {
            max-height: 500px;
          }
          li {
            color: #ffd4ae;
            padding: 0.05rem 0.22rem;
            cursor: pointer;
            text-align: center;
            margin-bottom: 0.05rem;
            &.active {
              background-color: #fea05a;
              border-radius: $h;
            }
          }
        }
        .more {
          position: absolute;
          right: 0rem;
          top: 0rem;
          cursor: pointer;
          img {
            width: $val;
            height: 0.5rem;
          }
        }
      }
    }
  }
  .product {
    
  }
}
</style>
