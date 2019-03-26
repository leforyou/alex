<template>
  <div class="search-page">
    <div class="header">
      <div class="contain">
        <div class="box main-width">
          <img class="ico-back" @click="goBack" src="../../static/img/ico-search-back.png">
          <input
            type="search"
            @keyup.enter="submit"
            @focus="focus"
            v-model="searchValue"
            placeholder="请输入商品名称搜索"
          >
          <div class="btn" @click="submit">搜索</div>
        </div>
      </div>
    </div>

    <div class="content-info" v-show="isLayer">
      <div class="contain main-width">
        <div class="search-history" v-if="historyArr.length > 0">
          <div class="title no-user-select">
            <span>历史搜索</span>
            <img @click="deleteHistory" src="../../static/img/ico-delete.png">
          </div>
          <ul>
            <li v-for="(item,index) in historyArr" :key="index" @click="KeyWord(item)">{{item}}</li>
          </ul>
        </div>
        <div class="search-recommend">
          <div class="title">
            <span>搜索推荐</span>
          </div>
          <ul>
            <li v-for="(item,index) in recommendArr" :key="index" @click="KeyWord(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="product">
      <List :arr="goodsArr"/>
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
      pageNo: 0,
      isTip: false,
      historyArr: this.$searchArr || [],
      recommendArr: ["男装", "女人装", "好的基地", "基本原则遥"],
      isLayer: true
    };
  },
  components: {},
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
      document.querySelector('input[type="search"]').focus();
      this.$refresh(() => {
        if (this.searchValue == "") return;
        this.goodsList();
      });
      this.recommends();

      Vue.prototype.$searchArr = [];
    });
  },
  methods: {
    goBack() {
      //返回上一页
      this.$router.go(-1);
    },
    submit() {
      //点击搜索
      if (this.searchValue == "") {
        this.$message({
          message: "搜索的内容不能为空！"
        });
        return;
      }
      this.goodsArr = [];
      this.$searchArr.push(this.searchValue);
      this.historyArr = this.$searchArr;
      this.isLayer = false;
      document.querySelector('input[type="search"]').blur(); //失去焦点
      this.goodsList();
    },
    focus() {
      //获取焦点
      this.isLayer = true;
    },
    KeyWord(str) {
      //关键词点击
      console.log(str);
      this.searchValue = str;
      this.submit();
    },
    deleteHistory() {
      //删除历史记录
      this.historyArr = this.$searchArr = [];
    },
    goodsList() {
      //运营表分页
      this.pageNo++;
      this.$loading();
      //{"pageSize":10,"pageNo":1,"title":"男装","Introduce":"男装"}
      this.axios
        .post("/api/goods/page", {
          pageSize: 15,
          pageNo: this.pageNo,
          title: this.searchValue
        })
        .then(response => {
          this.$loading.close();
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
          console.log(error);
        });
    },
    recommends() {
      //搜索：推荐词
      this.axios
        .post("/api/goods/recommends", {})
        .then(response => {
          if (response.data.code == 200) {
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
  $h: 1.2rem;
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
      .box {
        height: 100%;
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
    }
  }
  .content-info {
    position: fixed;
    top: $h;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
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
        margin-bottom: 1rem;
        .title {
          margin-bottom: 0.2rem;
        }
        ul {
          margin: 0rem -0.06rem;
          li {
            padding: 0.05rem 0.3rem;
            background: #f4f4f4;
            border-radius: 0.3rem;
            margin: 0rem 0.06rem;
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
            padding: 0.08rem 0.1rem;
            width: 50%;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
