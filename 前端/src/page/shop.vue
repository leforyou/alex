<template>
  <div class="shop-page">

    <div class="product">
      <List :arr="goodsArr"/>
      <NotMoreTip :visible="isTip"/>
    </div>
    

  </div>
</template>

<script>
export default {
  name: "shop",
  data() {
    return {
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
    goodsList() {
      //运营表分页
      if(this.isTip)return;
      this.pageNo++;
      this.$loading();
      this.axios
        .post(`/api/goods/shop?nick=${this.$route.params.nick}`, {})
        .then(response => {
          this.$loading.close();
          if (response.data.code == 200) {
            if(response.data.data.length == 0){
              this.isTip = true;
              return;
            }
            this.goodsArr = this.goodsArr.concat(response.data.data);
            //this.goodsArr = this.goodsArr.push(response.data.data.datalist);
          } else {
            this.$message({
              message:response.data.msg
            });
          }
        })
        .catch((error)=> {
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
.shop-page {
  
  .product {
    
  }
}
</style>
