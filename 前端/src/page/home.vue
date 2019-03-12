<template>
  <div class="home-page">

    <div class="header">
      <div class="box">
        <div class="top">
          <div class="search">
            <img src="../../static/img/h5_icon_shousuo.png"/>
            <input type="search" placeholder="请输入商品名称搜索">
          </div>
          <div class="img-box" @click="showCode">
            <img src="../../static/img/h5_icon_erweima.png">
          </div>
        </div>
        <div class="bottom">
          <ul>
            <li class="active">精选</li>
            <li>美食</li>
            <li>美装</li>
            <li>女装</li>
            <li>男装</li>
            <li>居家百货</li>
            <li>国际</li>


            
            <li>美装</li>
            <li>女装</li>
            <li>男装</li>
            <li>居家百货</li>
            <li>国际</li>
            <li>美装</li>
            <li>女装</li>
            <li>男装</li>
            <li>居家百货</li>
            <li>国际</li>
          </ul>
          <div class="more">
            <img src="../../static/img/h5_nav_allow_down.png">
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <ul>
        <li>
          <router-link :to="{ name: 'productDetails', params: { id: 888 }}" tag="a">
            <div class="left">
              <div class="img" style="background-image: url(../../static/img/product1.png);"></div>
            </div>
            <div class="right">
              <div class="top">
                <div class="title ellipsis2 clearfix">
                    <div class="title-box">
                      <img src="../../static/img/h5_logo_tmall.png">
                      <span>春秋新款针织开衫女2019韩版毛衣百搭大码空调防晒长袖小披肩外套春秋新款针织开衫女2019韩版毛衣百搭大码空调防晒长袖小披肩外套</span>
                    </div>
                </div>
                <div class="desc ellipsis2">描述：该商品参与了公益宝贝计划，卖家承诺每笔成交将为免费午餐基金捐赠0.02元。该商品已累积捐赠30478笔。善款用途简介：该项目旨在以每天4元钱的平均标准，资助乡村学校师生吃上热腾腾、有营养的“免费午餐”，使得儿童免于饥饿、健康成长。</div>
              </div>
              <div class="bottom">
                <div class="type1">
                  <div class="price">
                    <span class="price1 price-color fz24">￥</span>
                    <span class="price2 price-color fz40">1928</span>
                    <span class="price3 gray-color delete-line fz24">￥2688</span>
                  </div>
                  <div class="situation">
                    <div class="express price-color scale-1px fz20">包邮</div>
                    <div class="coupon price-color fz20" style="background-image: url(../../static/img/bg_hyq.png);">券:￥6.00</div>
                    <div class="sales gray-color fz24">月销量13万件</div>
                  </div>
                </div>
                <div class="type2">
                  
                </div>
              </div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'productDetails', params: { id: 888 }}" tag="a">
            <div class="left">
              <div class="img" style="background-image: url(../../static/img/product2.png);"></div>
            </div>
            <div class="right">
              <div class="top">
                <div class="title ellipsis2 clearfix">
                    <div class="title-box">
                      <img src="../../static/img/h5_logo_tmall.png">
                      <span>春秋新款针织开衫女2019</span>
                    </div>
                </div>
                <div class="desc ellipsis2">描述：该商品参与了公益宝贝计划，卖家承诺每笔成交将为免费午餐基金捐赠0.02元。该商品已累积捐赠30478笔。善款用途简介：该项目旨在以每天4元钱的平均标准，资助乡村学校师生吃上热腾腾、有营养的“免费午餐”，使得儿童免于饥饿、健康成长。</div>
              </div>
              <div class="bottom">
                <div class="type1">
                  <div class="price">
                    <span class="price1 price-color fz24">￥</span>
                    <span class="price2 price-color fz40">1928</span>
                    <span class="price3 gray-color delete-line fz24">￥2688</span>
                  </div>
                  <div class="situation">
                    <div class="express price-color scale-1px fz20">包邮</div>
                    <div class="coupon price-color fz20" style="background-image: url(../../static/img/bg_hyq.png);">券:￥126.00</div>
                    <div class="sales gray-color fz24">月销量13万件</div>
                  </div>
                </div>
                <div class="type2">
                  
                </div>
              </div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'productDetails', params: { id: 888 }}" tag="a">
            <div class="left">
              <div class="img" style="background-image: url(../../static/img/product2.png);"></div>
            </div>
            <div class="right">
              <div class="top">
                <div class="title ellipsis2 clearfix">
                    <div class="title-box">
                      <img src="../../static/img/h5_logo_tmall.png">
                      <span>春秋新款针织开衫女2019</span>
                    </div>
                </div>
                <div class="desc ellipsis2">描述：该商品参与了公益宝贝计划，卖家承诺每笔成交将为免费午餐基金捐赠0.02元。该商品已累积捐赠30478笔。善款用途简介：该项目旨在以每天4元钱的平均标准，资助乡村学校师生吃上热腾腾、有营养的“免费午餐”，使得儿童免于饥饿、健康成长。</div>
              </div>
              <div class="bottom">
                <div class="type1" v-if="false">
                  <div class="price">
                    <span class="price1 price-color fz24">￥</span>
                    <span class="price2 price-color fz40">1928</span>
                    <span class="price3 gray-color delete-line fz24">￥2688</span>
                  </div>
                  <div class="situation">
                    <div class="express price-color scale-1px fz20">包邮</div>
                    <div class="coupon price-color fz20" style="background-image: url(../../static/img/bg_hyq.png);">券:￥126.00</div>
                    <div class="sales gray-color fz24">月销量13万件</div>
                  </div>
                </div>
                <div class="type2" v-if="true">
                  <div class="price">
                    <span class="price1 price-color fz24">￥</span>
                    <span class="price2 price-color fz40">1928</span>
                    <span class="price3 gray-color delete-line fz24">￥2688</span>
                  </div>
                  <div class="situation">
                    <div class="sales gray-color fz24">月销量13万件</div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>


    <Code ref="code"/>
    <HowBuy ref="howBuy"/>
  </div>
</template>

<script>
import Code from "./../components/code";
import HowBuy from "./../components/howBuy";
export default {
  name: 'home',
  data () {
    return {
      msg: '首页'
    }
  },
  components: {
    Code,
    HowBuy
  },
  mounted() {
    this.$nextTick(function () {
      // DOM 现在更新了
    });
  },
  methods: {
    showCode(){
      //显示二维码
      this.$refs.code.show();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home-page{
  .header{
    background: linear-gradient(to right, #FD8210 , #FF4022 );
    .box{
      .top{
        padding: 0.3rem;
        display: flex;
        align-items: center;
        .search{
          background-color: #fff;
          border-radius: 0.6rem;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width: 0.3rem;
            height: 0.3rem;
            margin-right: 0.1rem;
          }
          input{
            font-size: 0.28rem;
            padding: 0.15rem 0rem;
            color: #333;
            &::-webkit-input-placeholder{
              color: #98989F;
            }
          }
        }
        .img-box{
          min-width: 0.6rem;
          margin-left: 0.28rem;
          cursor: pointer;
          img{
            width: 0.6rem;
            height: 0.6rem;
          }
        }
      }
      .bottom{
        $val:0.6rem;
        position: relative;
        padding-right: $val;
        padding-left: 0.14rem;
        padding-bottom: 0.12rem;
        font-size:0.26rem;
        line-height: normal;
        ul{
          $h:0.5rem;
          display: flex;
          flex-wrap: wrap;
          height:$h;
          overflow: hidden;
          li{
            color: #FFD4AE;
            padding: 0.05rem 0.22rem;
            cursor: pointer;
            text-align: center;
            &.active{
              background-color: #fea05a;
              border-radius:$h;
            }
          }
        }
        .more{
          position: absolute;
          right: 0rem;
          top: 0rem;
          cursor: pointer;
          img{
            width: $val;
            height: 0.5rem;
          }
        }
      }
    }
  }
  .content{
    ul{
      li{
        a{
          position: relative;
          display: flex;
          padding: 0.3rem;
          &:after{
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0.3rem;
            height: 0.01rem;
            border-bottom: 0.01rem solid #ebebeb;
          }
          .left{
            $w:2.3rem;
            margin-right: 0.2rem;
            .img{
              width: $w;
              height: $w;
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
              border-radius: 0.1rem;
            }
          }
          .right{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .top{
              .title{
                font-size: 0.24rem;
                position: relative;
                top: -0.05rem;
                .title-box{
                  img{
                    float: left;
                    width: 0.3rem;
                    margin-top: 0.04rem;
                    margin-right: 0.08rem;
                  }
                  span{
                    color: #000;
                    display: inline;
                    line-height:normal;
                  }
                }
              }
              .desc{
                font-size: 0.2rem;
                color: #98989F;
              }
            }
            .bottom{
              .type1,.type2{
                .price{
                  line-height: normal;
                  display: flex;
                  align-items: flex-end;
                  .price1,.price3{
                    line-height: 1.5;
                  }
                }
              }
              .type1{
                .situation{
                  margin-top: 0.05rem;
                  position: relative;
                  display: flex;
                  align-items: center;
                  .express{
                    line-height: normal;
                    padding: 0rem 0.08rem;
                    margin-right: 0.1rem;
                    background: #ffeaef;
                  }
                  .coupon{
                    min-width: 0.98rem;
                    width: auto;
                    height: 0.3rem;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    background-position: center;
                    padding-left: 0.03rem;
                    padding-right: 0.1rem;
                  }
                  .sales{
                    position: absolute;
                    right: 0rem;
                    top: 50%;
                    transform: translateY(-50%);
                  }
                }
              }
              .type2{
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
              }
            }
          }
        }
      }
    }
  }
}
</style>
