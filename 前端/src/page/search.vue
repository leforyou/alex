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
      searchValue:'',
      goodsArr: [],
      pageNo:0,
      isTip:false
    };
  },
  components: {
    
  },
  mounted() {
   this.$nextTick(function() {
      // DOM 现在更新了
      this.goodsList();
      this.$refresh(()=>{
        this.goodsList();
      });

    });
  },
  methods: {
    goBack(){
      //返回上一页
      this.$router.go(-1);
    },
    submit(){
      if(this.searchValue==""){
        this.$message({
          message:"搜索的内容不能为空！"
        });
        return;
      }
      
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
.search-page {
  .header {
    $h:1.2rem;
    height: $h;
    .contain{
      height: $h;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      background: #f5f5f5;
      .box{
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0.1rem 0.2rem;
        .ico-back{
          $val:0.4rem;
          min-width: $val;
          width: $val;
          height: $val;
          margin-right: 0.1rem;
        }
        input{
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
        .btn{
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
