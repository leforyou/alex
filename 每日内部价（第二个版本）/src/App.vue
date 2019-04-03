<template>
  <div id="app" class="main-width">
    <!--<router-view/>-->

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    share:function(title,desc,imgUrl){
       var currentUrl = location.href;
    var index = currentUrl.indexOf("#");
    if (index > -1) {
      currentUrl = currentUrl.substring(0, index);
    }
    var hostUrl = location.protocol + "//" + location.host;
    var shareData = {
      title: '一个只做品牌折扣的商城',
      desc: '每日帮您精选3000余款特价品牌商品，搜索更有10W+品牌商品等着您！',
      link: currentUrl,
      imgUrl:'https://img.gtqad.com/tm.jpg'
    };

    this.axios
      .get(`api/remote/getWxShareParam?targetUrl=${currentUrl}`)
      .then(response => {
        //this.$loading.close();
        if (response.data.code == 200) {
          let wxData = response.data.data;
          if (!wxData) return;
          wx.config({
            //debug: true,
            appId: wxData.appId,
            timestamp: wxData.timestamp,
            nonceStr: wxData.nonceStr,
            signature: wxData.signature,
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
          });

          wx.ready(function() {
            wx.onMenuShareAppMessage({
              title: shareData.title, // 分享标题
              desc: shareData.desc, // 分享描述
              link: shareData.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: shareData.imgUrl, // 分享图标
              success: function() {}
            });

            wx.onMenuShareTimeline({
              title: shareData.title, // 分享标题
              link: shareData.link, // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: shareData.imgUrl, // 分享图标
              success: function() {}
            });
          });
        }

      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  mounted() {
    this.share();
  }
};
</script>

<style>
.main-width {
  width: 100%;
  max-width: 10rem;
  margin: 0 auto;
}
</style>

<style lang="scss">
@import "./../static/scss/reset.scss";
</style>
<style lang="scss" >
@import "./../static/scss/main.scss";
</style>
