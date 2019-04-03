<template>
  <div class="wrap-list">
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <router-link :to="{ name: 'productDetails', params: { id: item.goodsID }}" tag="a">
          <div class="left">
            <div class="img" :style="`background-image: url(${item.pic});`"></div>
          </div>
          <div class="right">
            <div class="top">
              <div class="title ellipsis2 clearfix">
                <div class="title-box">
                  <img src="../../static/img/h5_logo_tmall.png" v-if="item.isTmall">
                  <span>{{item.d_title}}</span>
                </div>
              </div>
              <div class="desc ellipsis2">{{item.introduce}}</div>
            </div>
            <div class="bottom">
              <div class="type">
                <div class="price">
                  <span class="price1 price-color fz24">￥</span>
                  <span class="price2 price-color fz48">{{item.price}}</span>
                  <div class="express fz20">包邮</div>
                  <span class="price3 gray-color delete-line fz32">￥{{item.org_Price}}</span>
                </div>
              </div>
              <div class="sales-info">
                <div class="situation" v-if="!false">
                  <!--<div class="express price-color scale-1px fz20">包邮</div>-->
                  <div
                    class="coupon price-color fz20"
                    v-if="item.quan_surplus!==0"
                  >券:￥{{item.quan_price}}</div>
                </div>
                <div class="sales gray-color fz26">月销量{{item.sales_num}}</div>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ["arr"],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
    });
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap-list {
  ul {
    li {
      a {
        position: relative;
        display: flex;
        padding: 0.3rem;
        &:after {
          content: "";
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0.3rem;
          height: 0.01rem;
          border-bottom: 0.01rem solid #ebebeb;
        }
        .left {
          $w: 2.3rem;
          margin-right: 0.2rem;
          .img {
            width: $w;
            height: $w;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 0.1rem;
          }
        }
        .right {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            .title {
              font-size: 0.24rem;
              position: relative;
              top: -0.05rem;
              .title-box {
                min-height: 0.8rem;
                img {
                  float: left;
                  width: 0.3rem;
                  margin-top: 0.04rem;
                  margin-right: 0.08rem;
                }
                span {
                  color: #4b566a;
                  display: inline;
                  line-height: normal;
                }
              }
            }
            .desc {
              font-size: 0.28rem;
              color: #98989f;
              line-height: 1.8;
              margin-bottom: 0.06rem;
            }
          }
          .bottom {
            /*display: flex;
            align-items: flex-end;
            justify-content: space-between;*/
            .type {
              .price {
                line-height: normal;
                display: flex;
                align-items: center;
                .price2 {
                  margin-right: 0.1rem;
                  position: relative;
                  top: 0.03rem;
                }
                .express {
                  line-height: normal;
                  padding: 0rem 0.08rem;
                  margin-right: 0.1rem;
                  background: #c33;
                  border-radius: 0.08rem;
                  color: #fff;
                }
              }
            }
            .sales-info {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              margin-top: 0.14rem;
              .situation {
                margin-top: 0.08rem;
                position: relative;
                display: flex;
                align-items: center;
                margin-right: 0.08rem;
                .express {
                  line-height: normal;
                  padding: 0rem 0.08rem;
                  margin-right: 0.1rem;
                  background: #ffeaef;
                }
                .coupon {
                  display: none;
                  min-width: 0.98rem;
                  width: auto;
                  height: 0.3rem;
                  background-image: url(../../static/img/bg_hyq.png);
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  background-position: center;
                  padding-left: 0.03rem;
                  padding-right: 0.1rem;
                }
              }
              .sales {
                line-height: normal;
              }
            }
          }
        }
      }
    }
  }
}
</style>
