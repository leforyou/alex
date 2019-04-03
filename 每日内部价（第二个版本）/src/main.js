// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


//轮播图npm install vue-awesome-swiper --save-dev
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' // require styles
Vue.use(VueAwesomeSwiper)


import lazyload from "vue-lazyload"
Vue.use(lazyload)


Vue.use(VueAxios, axios);
//添加一个请求拦截器
axios.interceptors.request.use(function(config) {
    //在请求发送之前做一些事
    //config.baseURL = 'https://buy.51dodoniu.com/'//在webpack配置了请求路径
    //config.baseURL = 'http://192.168.101.19/'; //测试环境
    //console.log(process.env.NODE_ENV);//在config文件夹下的dev.env.js和prod.env.js可修改设置
    if (process.env.NODE_ENV === 'development') { //【开发环境 development 】 【生产环境 production 】
        config.baseURL = 'https://buy.51dodoniu.com/'; //开发环境 
        //config.baseURL = 'http://192.168.101.2:8080/';
        //config.baseURL = 'http://192.168.101.19/'; //测试环境
    }
    return config;
}, function(error) {
    //当出现请求错误是做一些事
    return Promise.reject(error);
});

//添加一个返回拦截器
axios.interceptors.response.use(function(response) {
    //对返回的数据进行一些处理
    //console.log('response拦截器:', response.data);
    if (response.data.success == false && response.data.msg === '请先登录') {
        //接口必须登录才有权限访问
        sessionStorage.clear(); //退出quit与axios拦截器都会清除sessionStorage所有本地数据
        router.push("login"); //返回注册页面
    }
    return response;
}, function(error) {
    //对返回的错误进行一些处理
    return Promise.reject(error);
});


//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

Vue.config.productionTip = false



//全局注册组件（自定义的组件-loading加载/信息提示）：是通过this调用方法引入到页面
import loading from './plugins/Loading/index.js'; //可简写./plugins/Loading
import message from './plugins/Message'; //
Vue.use(loading);
Vue.use(message);


//全局注册的组件2：是通过标签的方式引入页面
import globalComponent from './globalComponent/MyGlobalComponent';
globalComponent(Vue);


//上拉触底加载
import refresh from './../static/js/scrollRefresh.js';
Vue.prototype.$refresh = refresh;



var share = function(title, desc, imgUrl) {

}

Vue.prototype.$share = share;




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})