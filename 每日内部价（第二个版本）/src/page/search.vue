<template>
  <div class="search-page">
    <div class="header">
      <div class="contain">
        <div class="search main-width">
          <img class="ico-back" @click="goBack" src="../../static/img/ico-search-back.png">
          <input
            type="search"
            @focus="focus"
            v-model="searchValue"
            @keyup.enter="submit"
            :placeholder="placeholderTips"
          >
          <!-- <input
            type="search"
            @keyup.enter="submit"
            @focus="focus"
            v-model="searchValue"
            placeholder="100W+ 一元起包邮商品任你选"
          > -->
          <div class="btn" @click="submit">搜索</div>
        </div>
        <div class="tabs main-width">
          <div class="tab-box">
            <div class="list" :class="{'active':isTab==0}" @click="tab(0)">全网搜索（100w+）</div>
            <div class="list" :class="{'active':isTab==1}" @click="tab(1)">优惠推荐（包邮10w+）</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-info" v-show="isLayer">
      <div class="contain main-width">
        
        <div class="search-recommend" v-if="recommendArr.length > 0">
          <div class="title">
            <span>搜索推荐</span>
          </div>
          <ul>
            <li v-for="(item,index) in recommendArr" :key="index" @click="KeyWord(item)">{{item}}</li>
          </ul>
        </div>

        <div class="search-history" v-if="historyArr.length > 0">
          <div class="title no-user-select">
            <span>历史搜索</span>
            <img @click="deleteHistory" src="../../static/img/ico-delete.png">
          </div>
          <ul>
            <li v-for="(item,index) in historyArr" :key="index" @click="KeyWord(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>

     <div class="sort-bar" v-show="!isLayer">
      <div class="box main-width">
          <div class="no-sort-item" @click="sort(0)" :class="{'sort-item-active':sortType==0}" >综合</div>
          <div class="sort-item" @click="sort(1)" :class="{'sort-asc-active':sortType==1,'sort-desc-active':sortType==2}">价格</div>
          <div class="sort-item" @click="sort(3)" :class="{'sort-asc-active':sortType==4,'sort-desc-active':sortType==3}">销量</div>
      </div>
    </div>

    <div class="product">
      <SearchList :arr="goodsArr" :free-shipping='isTab==1'/>
      <NotMoreTip :visible="isTip"/>
    </div>

  </div>
</template>

<script>
import $ from "jquery";
import Vue from "vue";
export default {
  name: "home",
  data() {
    return {
      searchValue: "",
      goodsArr: [],
      //pageNo: 0,
      isTip: false,
      historyArr: this.$searchArr || [],
      recommendArr: [],
      isLayer: true,
      sortType:0,
      isTab:0,
      placeholderTips:'100w+衣饰鞋帽等商品等你搜'
    };
  },
  components: {},
  mounted() {
    let searchRecordsStr = localStorage.getItem("searchRecords");
    this.historyArr = Vue.prototype.$searchArr = searchRecordsStr
      ? JSON.parse(searchRecordsStr)
      : [];
    this.$nextTick(function() {
      // DOM 现在更新了
      document.querySelector('input[type="search"]').focus();
      // this.$refresh(() => {
      //   if (this.searchValue == "") return;
      //   this.goodsList();
      // });
      this.recommends();
    });
  },
  methods: {
    sort(num){
      var sortType = this.sortType;
      if(num==0){
        this.sortType = num;
      }else if(num==1){
        this.sortType = num + ( sortType == num );
      }else if(num==3){
        this.sortType=num + (sortType == num);
      }
      //this.pageNo=0;
      (document.documentElement||document.body).scrollTop = 0;
      if(this.isTab == 0){
        this.allWeb();
      }else if(this.isTab == 1){
        this.goodsList();
      }
    },
    goBack() {
      //返回上一页
      this.$router.go(-1);
    },
    tab(num){
      //全网搜索、优惠推荐：切换
      this.isTab = num;
      if(this.isTab == 0){
        this.placeholderTips = '100w+衣饰鞋帽等商品等你搜';
        if(this.searchValue!='')this.allWeb();
      }else if(this.isTab == 1){
        this.placeholderTips = '10w+一元起包邮商品任你选';
        if(this.searchValue!='')this.goodsList();
      }
      
    },
    submit() {
      //点击搜索
      if (this.searchValue == "") {
        return this.$message({
          message: "搜索的内容不能为空！"
        });
      }
      
      this.sortType = 0;

      let searchRecordsStr = localStorage.getItem("searchRecords");
      let searchRecords = searchRecordsStr ? JSON.parse(searchRecordsStr) : [];

      let index = searchRecords.indexOf(this.searchValue);
      if (index > -1) {
        searchRecords.splice(index, 1);
      }
      //this.pageNo = 0;
      searchRecords.unshift(this.searchValue);
      this.historyArr = searchRecords;
      localStorage.setItem("searchRecords", JSON.stringify(searchRecords));

      this.isLayer = false;
      document.querySelector('input[type="search"]').blur(); //失去焦点
      if(this.isTab == 0){
        this.allWeb();
      }else if(this.isTab == 1){
        this.goodsList();
      }
      
    },
    focus() {
      //获取焦点
      this.isLayer = true;
    },
    KeyWord(str) {
      //关键词点击
      this.searchValue = str;
      this.submit();
    },
    deleteHistory() {
      //删除历史记录
      localStorage.setItem("searchRecords", "");
      this.historyArr = this.$searchArr = [];
    },
    goodsList() {
      //运营表分页
      //this.pageNo++;
      this.goodsArr = [];
      this.$loading();
      var that = this;
      //{"pageSize":10,"pageNo":1,"title":"男装","Introduce":"男装"}
      this.axios
        .post( `/api/goods/page`,{
         //pageSize:15,
         //pageNo:this.pageNo,
         title:this.searchValue,
         orderBycul:this.sortType
        })
        .then(response => {
          that.$loading.close();
          if (response.data.code == 200) {
            let datalist = response.data.data.datalist;
            if (datalist == null || datalist.length == 0) {
              this.isTip = true;
              return;
            }
            if (datalist == null) {
              this.$message({
                message: "没查询到相关的数据！"
              });
              return;
            }
            this.goodsArr = this.goodsArr.concat(datalist);
            //this.goodsArr = this.goodsArr.push(datalist);
          } else {
            console.log(response.data.msg);
          }
        })
        .catch(function(error) {
          that.$loading.close();
          console.log(error);
        });
    },
    allWeb(){
      //全网搜索
      this.goodsArr = [];
      this.$loading();
      var that = this;
      this.axios
        .post( `/api/serach/superSer/`,{
         //pageSize:15,
         //pageNo:this.pageNo,
         keywords:this.searchValue,
         orderBycul:this.sortType
        })
        .then(response => {
          that.$loading.close();
          if (response.data.code == 200) {
            let datalist = response.data.data.datalist;
            if (datalist == null || datalist.length == 0) {
              this.isTip = true;
              return;
            }
            if (datalist == null) {
              this.$message({
                message: "没查询到相关的数据！"
              });
              return;
            }
            this.goodsArr = this.goodsArr.concat(datalist);
            //this.goodsArr = this.goodsArr.push(datalist);
          } else {
            console.log(response.data.msg);
          }
        })
        .catch(function(error) {
          that.$loading.close();
          console.log(error);
        });
    },
    recommends() {
      //搜索：推荐词
      this.axios
        .post("/api/goods/recommends", {})
        .then(response => {
          if (response.data.code == 200) {
            let data = response.data.data;
            if (data != null || data.length != 0) {
              this.recommendArr = response.data.data;
            }
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search-page {
  $h: 2.1rem;
  .header {
    height: $h;
    .contain {
      height: $h;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: #f5f5f5;
      .search {
        height: 1.2rem;
        display: flex;
        align-items: center;
        padding: 0.1rem 0.2rem;
        .ico-back {
          $val: 0.4rem;
          min-width: $val;
          width: $val;
          height: $val;
          margin-right: 0.1rem;
        }
        input {
          margin: 0rem 0.2rem;
          width: 100%;
          background-color: #fff;
          border-radius: 0.5rem;
          font-size: 0.28rem;
          padding: 0.14rem 0.25rem;
          color: #333;
          &::-webkit-input-placeholder {
            color: #999;
            font-size: 0.24rem;
          }
        }
        .btn {
          background: linear-gradient(to right, #fd8210, #ff4022);
          white-space: nowrap;
          color: #fff;
          font-size: 0.28rem;
          padding: 0.1rem 0.25rem;
          line-height: normal;
          border-radius: 0.5rem;
          cursor: pointer;
        }
      }
      .tabs{
        .tab-box{
          display: flex;
          .list{
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 0.88rem;
            cursor: pointer;
            border-bottom: 0.01rem solid #ddd;
            &.active{
              color: #ff4022;
              border-bottom: 0.01rem solid #ff4022;
            }
          }
        }
      }
    }
  }
  .content-info {
    position: fixed;
    top: $h;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    overflow: hidden;
    background-color: #fff;
    .contain {
      padding: 0.5rem 0.3rem;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .search-history,
      .search-recommend {
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
          span {
            font-size: 0.3rem;
            font-weight: bold;
            line-height: normal;
            padding: 0px 0px;
          }
          img {
            width: 0.36rem;
            cursor: pointer;
          }
        }
        ul {
          font-size: 0.24rem;
          display: flex;
          flex-wrap: wrap;
          line-height: normal;
          li {
            cursor: pointer;
          }
        }
      }
      .search-history {
        margin-top: 0.5rem;
        .title {
          margin-bottom: 0.1rem;
        }
        ul {
          margin: 0rem -0.06rem;
          li {
            padding: 0.05rem 0.3rem;
            background: #f4f4f4;
            border-radius: 0.3rem;
            margin: 0.06rem;
            color: #777;
          }
        }
      }
      .search-recommend {
        .title {
          margin-bottom: 0.12rem;
        }
        ul {
          li {
            // padding: 0.08rem 0.1rem;
            // width: 50%;
            // color: #666;
            padding: 0.05rem 0.3rem;
            background: #f4f4f4;
            border-radius: 0.3rem;
            margin: 0.06rem;
            color: #777;
          }
        }
      }
    }
  }
  .product{
    padding-top: .8rem;
  }

  
.sort-bar {
  background-color: #fff;
  position: fixed;
  top: $h;
  left: 0;
  width: 100%;
  z-index: 99999;
  border-bottom: 1px solid #dedede;
  .box{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 0.8rem;
      // box-shadow: 0 -4px 6px #000;
      .sort-item,
      .no-sort-item {
        position: relative;
        text-align: center;
        width: 20%;
        padding: .2rem 0;
        cursor: pointer;
      }
      .sort-item:before {
        content: "";
        width: 0;
        height: 0;
        display: block;
        border-style: solid;
        border-width: 0 0.08rem 0.08rem;
        border-color: transparent transparent #5e5e5e;
        position: absolute;
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        bottom: 0.28rem;
        right: 0.1rem;
      }

      .sort-item::after {
        content: "";
        width: 0;
        height: 0;
        display: block;
        border-style: solid;
        border-width: 0 0.08rem 0.08rem;
        border-color: transparent transparent #5e5e5e;
        position: absolute;
        top: 0.3rem;
        right: 0.1rem;
      }


      .sort-item-active,.sort-desc-active,.sort-asc-active{
        color:#ff4022;
      }

      .sort-asc-active:before {
        border-color: transparent transparent #ff4022;
      }
      .sort-asc-active:after {
        border-color: transparent transparent #5e5e5e;
      }

      .sort-item-active{
        color:#ff4022;
      }

      .sort-desc-active:before {
        border-color: transparent transparent #5e5e5e;
      }
      .sort-desc-active:after {
        border-color: transparent transparent #ff4022;
      }
    }
  }
}
</style>
