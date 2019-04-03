import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home'
import productDetails from '@/page/productDetails'
import search from '@/page/search'
import shop from '@/page/shop'
import howBuy from '@/page/howBuy'


//import HelloWorld from '@/components/HelloWorld'




//不合法路径
import page404 from '@/page/404'

Vue.use(Router)


// routes: [{
//     path: '/',
//     name: 'home',
//     component: home,
//     meta: {
//         keepAlive: true //缓存
//     }
// },
// {
//     path: '/productDetails/:id',
//     name: 'productDetails',
//     component: productDetails
// },
// {
//     path: '/search',
//     name: 'search',
//     component: search,
//     meta: {
//         keepAlive: true //缓存
//     }
// },
// {
//     path: '/shop/:nick',
//     name: 'shop',
//     component: shop
// }, {
//     path: '/howBuy',
//     name: 'howBuy',
//     component: howBuy,
//     meta: {
//         keepAlive: true //缓存
//     }
// },
// {
//     path: '/404',
//     name: '访问的页面不存在',
//     component: page404
// },
// {
//     path: '/*',
//     hidden: true,
//     redirect: {
//         path: '/404'
//     }
// }
// ]
let router = new Router({
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
            path: '/productDetails/:id',
            name: 'productDetails',
            component: () =>
                import ('@/page/productDetails')
        },
        {
            path: '/search',
            name: 'search',
            component: () =>
                import ('@/page/search'),
            meta: {
                keepAlive: true //缓存
            }
        },
        {
            path: '/searchDetails/:id',
            name: 'searchDetails',
            component: () =>
                import ('@/page/searchDetails')
        },
        {
            path: '/shop/:nick',
            name: 'shop',
            component: () =>
                import ('@/page/shop')
        }, {
            path: '/howBuy',
            name: 'howBuy',
            component: () =>
                import ('@/page/howBuy'),
            meta: {
                keepAlive: true //缓存
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
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});



export default router;