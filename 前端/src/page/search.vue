<template>
  <div class="search-page">
    <div class="header">
      <divc class="contain">
        <div class="box main-width">
          <img class="ico-back" @click="goBack" src="../../static/img/ico-search-back.png">
          <input type="search" @keyup.enter="submit" v-model="searchValue" placeholder="请输入商品名称搜索">
          <div class="btn" @click="submit">搜索</div>
        </div>
      </divc>
    </div>

    <div class="product">
      <List :arr="goodsArr"/>
      <NotMoreTip :visible="isTip"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      searchValue: "",
      goodsArr: [],
      pageNo: 0,
      isTip: false
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
      this.goodsList();
    },
    goodsList() {
      //运营表分页
      if (this.isTip) return;
      this.pageNo++;
      this.$loading();
      //{"pageSize":10,"pageNo":1,"title":"男装","Introduce":"男装"}
      this.axios
        .post("/api/goods/page", {
          pageSize: 8,
          pageNo: this.pageNo,
          title: this.searchValue
        })
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            if (response.data.data.datalist.length == 0) {
              this.isTip = true;
              return;
            }
            if (response.data.data.datalist == null) {
              this.$message({
                message: "没查询到相关的数据！"
              });
              return;
            }
            this.goodsArr = this.goodsArr.concat(response.data.data.datalist);
            //this.goodsArr = this.goodsArr.push(response.data.data.datalist);
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
  .header {
    $h: 1.2rem;
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
        }
      }
    }
  }
}
</style>
