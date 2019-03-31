<template>
  <div class="loading" v-show="visible">
    <div class="el-loading-mask">
        <div class="el-loading-spinner">
            <svg class="el-icon-loading" viewBox="0 0 1024 1024" width="16" height="16">
                <path fill="#ffffff" d="M955.261 575.322H828.618c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322s-28.37 63.322-63.322 63.322zM780.616 332.925c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538zM512 1018.582c-34.955 0-63.322-28.37-63.322-63.322V828.617c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322V955.26c0 34.955-28.37 63.322-63.322 63.322z m0-759.875c-34.955 0-63.322-28.37-63.322-63.322V68.742c0-34.955 28.37-63.322 63.322-63.322s63.322 28.37 63.322 63.322v126.643c0 34.955-28.37 63.322-63.322 63.322z m-268.616 611.45c-24.696 24.696-64.842 24.696-89.538 0s-24.696-64.842 0-89.538l89.538-89.538c24.696-24.696 64.842-24.696 89.538 0s24.696 64.842 0 89.538l-89.538 89.538z m0-537.232l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538s64.842-24.696 89.538 0l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538-24.822 24.696-64.842 24.696-89.538 0zM258.707 512c0 34.955-28.37 63.322-63.322 63.322H68.742c-34.955 0-63.322-28.37-63.322-63.322s28.37-63.322 63.322-63.322h126.643c34.955 0 63.322 28.37 63.322 63.322z m521.909 179.075l89.538 89.538c24.696 24.696 24.696 64.842 0 89.538s-64.842 24.696-89.538 0l-89.538-89.538c-24.696-24.696-24.696-64.842 0-89.538 24.822-24.696 64.842-24.696 89.538 0z m0 0z"></path>
            </svg>
            <p class="el-loading-text" v-show="text!=''">{{text}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      visible: false,
      text:"",//"拼命加载中"
      duration:10e3
    };
  },
  mounted() {
    this.$nextTick(function() {
      // DOM 现在更新了
      this.timer(); // 挂载的时候就开始计时，10s后消失
    });
  },
  methods: {
    timer() {
      //定时器
      let setTime = setTimeout(() => {
        this.close();
        clearTimeout(setTime);
      }, this.duration);
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style scoped>
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 9999;
  border-radius: 5px;
  overflow: hidden;
  width: 80px;
  height: 80px;
}
.el-loading-mask {
    position: absolute;
    z-index: 2000;
    background-color: rgba(0, 0, 0, 0.8);
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: opacity .3s;
}

.el-loading-spinner {
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
    position: absolute;
}

.el-loading-spinner .el-icon-loading path {
    color: #ffffff;
}

.el-icon-loading {
    animation: rotating 2s linear infinite;
}

.el-loading-spinner .el-loading-text {
    color: #ffffff;
    margin: 0px;
    font-size: 11px;
    text-align: center;
    font-weight: 100;
    line-height: normal;
}

@-webkit-keyframes rotating {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}

@keyframes rotating {
    0% {
        -webkit-transform: rotate(0);
        transform: rotate(0)
    }
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
</style>
