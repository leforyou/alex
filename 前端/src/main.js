// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'


//npm install vue-awesome-swiper --save-dev
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' // require styles
Vue.use(VueAwesomeSwiper)

//import home from './page/home'
//console.log(home.methods.aaa)


Vue.use(VueAxios, axios)


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



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})