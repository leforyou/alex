<template>
  <div class="wrap-list">
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <router-link :to="{ name: 'searchDetails', params: { id: item.goodsID }}" tag="a">
          <div class="left">
            <img class="img" v-lazy="item.pic">
          </div>
          <div class="right">
            <div class="top">
              <div class="title ellipsis2 clearfix">
                <div class="title-box">
                  <span>{{item.title}}</span>
                </div>
              </div>
              <div class="desc">
                <span class="tmall" v-if="item.isTmall == 1">天猫</span>
                <span class="shop">{{item.nick}}</span>
              </div>
              <div class="sales">月销量{{item.sales_num}}</div>
            </div>
            <div class="bottom">
              <div class="type">
                <div class="price">
                  <!-- <span class="price1 price-color fz24">￥</span> -->
                  <span class="price2 price-color fz48">￥{{item.price}}</span>
                  <span class="price3 gray-color delete-line fz32">￥{{item.org_Price}}</span>
                </div>
              </div>
              <div class="discount">优惠{{item.quan_price}}元</div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchList",
  props: ["arr", "freeShipping"],
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
            min-width: $w;
            height: $w;
            border-radius: 0.1rem;
            object-fit: cover;
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
              margin: 0.08rem 0rem;
              display: flex;
              align-items: center;
              .tmall {
                font-size: 0.22rem;
                background-color: #e31e27;
                line-height: normal;
                padding: 0.02rem 0.1rem;
                border-radius: 0.06rem;
                color: #fff;
              }
              .shop {
                font-size: 0.26rem;
                color: #666;
                margin-left: 0.15rem;
              }
            }
            .sales {
              font-size: 0.28rem;
              color: #888;
            }
          }
          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .type {
              .price {
                line-height: normal;
                display: flex;
                align-items: center;
                .price2 {
                  margin-right: 0.1rem;
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
            .discount {
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: normal;
              padding: 0.03rem 0.2rem;
              color: #ff3467;
              font-size: 0.28rem;
              background-color: #ffeaeb;
              border-radius: 0.44rem;
            }
          }
        }
      }
    }
  }
}
</style>
