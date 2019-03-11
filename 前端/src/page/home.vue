<template>
  <div class="home-page">
    <div class="header">
      <div class="box">
        <div class="top">
          <div class="search">
            <img src="../../static/img/h5_icon_shousuo.png"/>
            <input type="search" placeholder="请输入商品名称搜索">
          </div>
        </div>
        <div class="bottom">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: '首页'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-page{
  .header{
    background: linear-gradient(to right, #FD8210 , #FF4022 );
    .box{
      .top{
        padding: 0.3rem 0.4rem;
        .search{
          background-color: #fff;
          input{
            font-size: 0.46rem;
            color: #333;
            &::-webkit-input-placeholder{
              color: #98989F;
            }
          }
        }
      }
    }
  }
}
</style>
