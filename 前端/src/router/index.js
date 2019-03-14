import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import productDetails from '@/page/productDetails'
//import HelloWorld from '@/components/HelloWorld'




//不合法路径
import page404 from '@/page/404'

Vue.use(Router)

export default new Router({
    //mode: 'history', //可以是去掉#号
    routes: [{
            path: '/',
            name: 'home',
            component: home,
            meta: {
                keepAlive: true //缓存
            }
        },
        {
            path: '/productDetails/:did',
            name: 'productDetails',
            component: productDetails,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/404',
            name: '访问的页面不存在',
            component: page404
        },
        {
            path: '/*',
            hidden: true,
            redirect: {
                path: '/404'
            }
        }
    ]
})