import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//引入组件
import Home from '@/components/Home';
import Login from '@/components/Login';
import productList from '@/components/productList';
import goodsList from '@/components/goodsList';
import updateMm from '@/components/updateMm';
import updateZl from '@/components/updateZl';
import toUser from '@/components/toUser';
import addUser from '@/components/addUser';
import editUser from '@/components/editUser';
import addProductList from '@/components/addProductList';
import editProductList from '@/components/editProductList';
import addGoodsList from '@/components/addGoodsList';
import editGoodsList from '@/components/editGoodsList';

//配置路由
const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            {
                path: 'productList',
                name: 'productList',
                component: resolve => require(['@/components/productList'], resolve),
                meta: { requiresAuth: true },

            },
            {
                path: 'goodsList',
                name: 'goodsList',
                component: resolve => require(['@/components/goodsList'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: 'toUser',
                name: 'toUser',
                component: resolve => require(['@/components/toUser'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: 'addUser',
                name: 'addUser',
                component: resolve => require(['@/components/addUser'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: 'updateMm',
                name: 'updateMm',
                component: resolve => require(['@/components/updateMm'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: 'updateZl',
                name: 'updateZl',
                component: resolve => require(['@/components/updateZl'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: 'editUser',
                name: 'editUser',
                component: resolve => require(['@/components/editUser'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: '/addProductList',
                name: 'addProductList',
                component: resolve => require(['@/components/addProductList'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: '/editProductList',
                name: 'editProductList',
                component: resolve => require(['@/components/editProductList'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: '/addGoodsList',
                name: 'addGoodsList',
                component: resolve => require(['@/components/addGoodsList'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: '/editGoodsList',
                name: 'editGoodsList',
                component: resolve => require(['@/components/editGoodsList'], resolve),
                meta: { requiresAuth: true },
            },
            {
                path: '/dingdangl',
                name: 'dingdangl',
                component: resolve => require(['@/components/dingdangl'], resolve),
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: resolve => require(['@/components/Login'], resolve),
    },
    {
        path: '/',
        redirect: '/login'
    }, //默认跳转首页的路由
]

//实例化路由
const router = new VueRouter({
    routes
})

//路由拦截(全局)
router.beforeEach((to, from, next) => {
    // console.log(sessionStorage.getItem('token'))
    if (to.meta.requiresAuth) {
        if (sessionStorage.getItem('name')) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})
//暴露路由
export default router;